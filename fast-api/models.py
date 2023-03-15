import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database


class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String(50), default="")
    username = _sql.Column(_sql.String(50), unique=True)
    hashed_password = _sql.Column(_sql.String(255))
    color = _sql.Column(_sql.String(30), default="")
    appointments = _orm.relationship("Appointment", back_populates="owner")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class Appointment(_database.Base):
    __tablename__ = "appointments"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    day = _sql.Column(_sql.BigInteger)
    title = _sql.Column(_sql.String(50), default="")
    label = _sql.Column(_sql.String(50), default="")
    description = _sql.Column(_sql.String(255), default="")
    owner = _orm.relationship("User", back_populates="appointments")
