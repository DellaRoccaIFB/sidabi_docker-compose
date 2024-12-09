from myapp import create_app
from routes.Core import core
from routes.Avaliacao import avaliacao
from routes.Sensor import sensor
from routes.Scales import scales
from extensions import db

app = create_app()
app.config.from_object("config.DevelopmentConfig")
db.init_app(app)

app.register_blueprint(core)
app.register_blueprint(avaliacao)
app.register_blueprint(sensor)
app.register_blueprint(scales)