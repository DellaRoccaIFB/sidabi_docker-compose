from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from config import Config

# start configuration
db = SQLAlchemy()
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
