import passlib.hash as _hash
import database as _database, models as _models, schemas as _schemas
import sqlalchemy.orm as _orm
import jwt as _jwt
import fastapi as _fastapi
import fastapi.security as _security

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = "doesnotmatterwhatyouput"  # this should be in the .env file? Assume that should contain all the ENV Var secrets which is also


# git ignored


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_username(username: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.username == username).first()


async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(username=user.username, hashed_password=_hash.bcrypt.hash(user.hashed_password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authentificate_user(username: str, password: str, db: _orm.Session):
    user = await get_user_by_username(username, db)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user


async def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user)
    token = _jwt.encode(user_obj.dict(), JWT_SECRET)
    return dict(access_token=token, token_type="bearer")


async def get_current_user(db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema)):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Username or Password")
    return _schemas.User.from_orm(user)


async def create_appointment(user: _schemas.User, db: _orm.Session, appointment: _schemas.AppointmentCreate):
    appointment = _models.Appointment(**appointment.dict(), owner_id=user.id)
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return _schemas.Appointment.from_orm(appointment)


async def get_appointments(user: _schemas.User, db: _orm.Session):
    appointments = db.query(_models.Appointment).filter_by(owner_id=user.id)
    return list(map(_schemas.Appointment.from_orm, appointments))


async def _appointment_selector(user: _schemas.User, db: _orm.Session, appointment_id: int):
    appointment = (
        db.query(_models.Appointment)
        .filter_by(owner_id=user.id)
        .filter(_models.Appointment.id == appointment_id)
        .first()
    )
    if appointment is None:
        raise _fastapi.HTTPException(status_code=404, detail="appointment does not exist")
    return appointment


async def get_appointment(user: _schemas.User, db: _orm.Session, appointment_id: int):
    appointment = await _appointment_selector(user=user, db=db, appointment_id=appointment_id)
    return _schemas.Appointment.from_orm(appointment)


async def delete_appointment(user: _schemas.User, db: _orm.Session, appointment_id: int):
    appointment = await _appointment_selector(user=user, db=db, appointment_id=appointment_id)
    db.delete(appointment)
    db.commit()


async def update_appointment(user: _schemas.User, db: _orm.Session, appointment_id: int, appointment: _schemas.AppointmentCreate):
    appointment_db = await _appointment_selector(user=user, db=db, appointment_id=appointment_id)
    appointment_db.date = appointment.date

    db.commit()
    db.refresh(appointment_db)
    return _schemas.Appointment.from_orm(appointment_db)
