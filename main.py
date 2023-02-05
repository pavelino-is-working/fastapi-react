import fastapi as _fastapi
import fastapi.security as _security
from typing import List
import sqlalchemy.orm as _orm

import services as _services, schemas as _schemas

app = _fastapi.FastAPI()


@app.post("/api/users")
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
    db_user = await _services.get_user_by_username(user.username, db)

    if db_user:
        raise _fastapi.HTTPException(status_code=400, detail="Username already in use")
    await _services.create_user(user, db)

    return _services.create_token(user)


@app.post("/api/token")
async def generate_token(form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
                         db: _orm.Session = _fastapi.Depends(_services.get_db)):
    user = await _services.authentificate_user(form_data.username, form_data.password, db)
    if not user:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Credentials")
    return await _services.create_token(user)


@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/appointments", response_model=_schemas.Appointment)
async def create_appointment(appointment: _schemas.AppointmentCreate,
                             user: _schemas.User = _fastapi.Depends(_services.get_current_user),
                             db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await _services.create_appointment(user=user, db=db, appointment=appointment)


@app.get("/api/appointments", response_model=List[_schemas.Appointment])
async def get_appointments(user: _schemas.User = _fastapi.Depends(_services.get_current_user),
                           db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await  _services.get_appointments(user=user, db=db)


@app.get("/api/appointments/{appointment_id}", status_code=200)
async def get_appointment(appointment_id: int,
                          user: _schemas.User = _fastapi.Depends(_services.get_current_user),
                          db: _orm.Session = _fastapi.Depends(_services.get_db)):
    return await  _services.get_appointment(user=user, db=db, appointment_id=appointment_id)


@app.delete("/api/appointments/{appointment_id}", status_code=204)
async def delete_appointment(appointment_id: int,
                             user: _schemas.User = _fastapi.Depends(_services.get_current_user),
                             db: _orm.Session = _fastapi.Depends(_services.get_db)):
    await _services.delete_appointment(user=user, db=db, appointment_id=appointment_id)
    return {"message", "Successfully Deleted"}


@app.put("/api/appointments/{appointment_id}", status_code=200)
async def update_appointment(appointment_id: int,
                             appointment: _schemas.AppointmentCreate,
                             user: _schemas.User = _fastapi.Depends(_services.get_current_user),
                             db: _orm.Session = _fastapi.Depends(_services.get_db)):
    await _services.update_appointment(appointment_id=appointment_id, appointment=appointment, user=user, db=db)
    return {"message", "Successfully Updated"}
