import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm

DATABASE_URL = "sqlite:///./database.db"

engine = _sql.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# check_same_thread is for sqlite, usually you don't need it

session_local = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = _declarative.declarative_base()
