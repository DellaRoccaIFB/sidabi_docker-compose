from flask import Flask
from flask_cors import CORS
from flasgger import Swagger
from swagger import swagger_config, template


def create_app():
    app = Flask(__name__)
    swagger = Swagger(app, config=swagger_config, template=template)
    CORS(app, origins='*')
    return app
