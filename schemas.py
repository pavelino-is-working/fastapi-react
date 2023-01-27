import datetime
import datetime as _dt
import pydantic as _pydantic


class _UserBase(_pydantic.BaseModel):
    _username: str


class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True

class User(_UserBase):
    id: int

    class Config:
        orm_mode = True

class _AppointmentBase(_pydantic.BaseModel):
    _date: datetime.datetime


class AppointmentCreate(_AppointmentBase):
    pass

class Appointment(_AppointmentBase):
    id: int
    owner_id: int
    color: str

    class Config:
        orm_mode = True


