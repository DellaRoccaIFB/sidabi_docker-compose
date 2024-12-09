from flask import request
from services.Login import authenticate, verify_user
from services.Individuo import (
    select_participant_by_id,
    select_updrs_participants_by_login_id,
    select_sensor_participants_by_login_id,
    select_scale_participants_by_login_id,
)
from flask import Blueprint, abort
from jinja2 import TemplateNotFound
from flasgger import swag_from

core = Blueprint("core", __name__, url_prefix="/core")


@swag_from("../docs/core/login.yaml")
@core.route("/authenticate/", methods=["POST"])
def login():
    try:
        auth_token = request.headers.get("authorization")
        username, password = authenticate(auth_token)
        return verify_user(username, password)
    except TemplateNotFound:
        abort(404)


@swag_from("../docs/core/search_participant_by_id.yaml")
@core.route("/individuo/<id>", methods=["GET"])
def search_participant_by_id(id):
    return select_participant_by_id(id)


@swag_from("../docs/core/search_updrs_participants.yaml")
@core.route("/individuos/<loginId>", methods=["GET"])
def search_updrs_participants(loginId):
    return select_updrs_participants_by_login_id(loginId)


@swag_from("../docs/core/search_sensor_participants.yaml")
@core.route("/individuos/sensor/<loginId>", methods=["GET"])
def search_sensor_participants(loginId):
    return select_sensor_participants_by_login_id(loginId)


@swag_from("../docs/core/search_scale_participants.yaml")
@core.route("/individuos/scale/<loginId>", methods=["GET"])
def search_scale_participants(loginId):
    return select_scale_participants_by_login_id(loginId)