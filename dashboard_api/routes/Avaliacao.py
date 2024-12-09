from flask import Blueprint, jsonify
from services.Avaliacao import get_all_parts_assess_score
from flasgger import swag_from

avaliacao = Blueprint("assess", __name__, url_prefix="/assess")


@swag_from("../docs/assess/get_score.yaml")
@avaliacao.route("/results/<loginId>/patient/<patientId>", methods=["GET"])
def get_score(loginId, patientId):
    return jsonify(get_all_parts_assess_score(loginId, patientId))
