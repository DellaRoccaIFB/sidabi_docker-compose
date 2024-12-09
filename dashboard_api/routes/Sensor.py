from exceptions import InvalidFileType
from services.Sensor import list_files, get_file_result
from flask import Blueprint, request, jsonify
from flasgger import swag_from

sensor = Blueprint("sensor", __name__, url_prefix="/sensor")


@swag_from("../docs/sensor/list_sensor_files.yaml")
@sensor.route("/<id>/<loginId>", methods=["GET"])
def list_sensor_files(id, loginId):
    return list_files(id, loginId)


@swag_from("../docs/sensor/select_file.yaml")
@sensor.route("/", methods=["GET"])
def select_file():
    args = request.args
    filename = args.get("filename")
    try:
        result = get_file_result(filename)
        return result
    except InvalidFileType as e:
        raise e


@sensor.errorhandler(InvalidFileType)
def handle_invalid_file_type(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response
