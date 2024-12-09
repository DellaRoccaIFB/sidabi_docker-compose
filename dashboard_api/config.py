import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SENSOR_FILE_DIR=os.environ.get('FILE_LOCATION')
    SWAGGER = {
        'title': 'Parkinson Dashboard API',
        'uiversion': 3
    }

class ProductionConfig(Config):
    DEBUG = False

class StagingConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
class TestingConfig(Config):
    TESTING = True
