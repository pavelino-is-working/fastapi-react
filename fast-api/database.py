import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
import os

# if os.environ.get('SQLALCHEMY_DATABASE_URL') is not None:
#     DATABASE_URL = "sqlite:///./database.db"
# else:
DATABASE_URL ='mysql+mysqlconnector://root:dadada123@localhost:3306/appointments'

engine = _sql.create_engine(DATABASE_URL)
# check_same_thread is for sqlite, usually you don't need it

SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = _declarative.declarative_base()
