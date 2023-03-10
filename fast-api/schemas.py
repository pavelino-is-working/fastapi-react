import datetime
import datetime as _dt
import pydantic as _pydantic


class _UserBase(_pydantic.BaseModel):
    username: str


class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(_UserBase):
    id: int

    class Config:
        orm_mode = True


class _AppointmentBase(_pydantic.BaseModel):
    title: str
    label: str
    description: str
    day: int
    

class AppointmentCreate(_AppointmentBase):
    pass


class Appointment(_AppointmentBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

