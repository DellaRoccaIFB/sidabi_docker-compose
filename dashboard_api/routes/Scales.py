from flask import Blueprint, jsonify
# from services.Scales import get_result_scale_mca, get_result_scale_sam, get_result_scale_stai, get_result_scale_sfss, get_result_scale_aes, get_result_scale_mbss, get_sum_all_pacient_by_scale, get_all_scales, get_result_scale_teste
from services.Scales import get_sum_all_pacient_by_scale, get_all_scales_by_patient, get_result_scale, get_all_scale

from flasgger import swag_from

scales = Blueprint("scales", __name__, url_prefix="/scales")


# @swag_from("../docs/scales/get_scale_mca.yaml")
# @scales.route("/mca/<loginId>/<patientId>/<stimulus>", methods=["GET"])
# def get_result_by_id_scale_mca(loginId, patientId, stimulus):
#     return jsonify(get_result_scale_mca(loginId, patientId, stimulus))

# @swag_from("../docs/scales/get_scale_sam.yaml")
# @scales.route("/sam/<loginId>/<patientId>/<stimulus>", methods=["GET"])
# def get_result_by_id_scale_sam(loginId, patientId, stimulus):
#     return jsonify(get_result_scale_sam(loginId, patientId, stimulus))

# @swag_from("../docs/scales/get_scale_stai.yaml")
# @scales.route("/stai/<loginId>/<patientId>/<stimulus>", methods=["GET"])
# def get_result_by_id_scale_stai(loginId, patientId, stimulus):
#     return jsonify(get_result_scale_stai(loginId, patientId, stimulus))


# @swag_from("../docs/scales/get_scale_sfss.yaml")
# @scales.route("/sfss/<loginId>/<patientId>/<stimulus>", methods=["GET"])
# def get_result_by_id_scale_sfss(loginId, patientId, stimulus):
#     return jsonify(get_result_scale_sfss(loginId, patientId, stimulus))

# @swag_from("../docs/scales/get_scale_aes.yaml")
# @scales.route("/aes/<loginId>/<patientId>/<stimulus>", methods=["GET"])
# def get_result_by_id_scale_aes(loginId, patientId, stimulus):
#     return jsonify(get_result_scale_aes(loginId, patientId, stimulus))

# @swag_from("../docs/scales/get_scale_mbss.yaml")
# @scales.route("/mbss/<loginId>/<patientId>/<stimulus>", methods=["GET"])
# def get_result_by_id_scale_mbss(loginId, patientId, stimulus):
#     return jsonify(get_result_scale_mbss(loginId, patientId, stimulus))



@swag_from("../docs/scales/list_data_by_scale.yaml")
@scales.route("/scale/<loginId>/<scaleId>/<groupName>/<stimulus>", methods=["GET"])
def get_sum_scale(loginId, scaleId, groupName, stimulus):
    return jsonify(get_sum_all_pacient_by_scale(loginId, scaleId, groupName, stimulus))

@swag_from("../docs/scales/list_scales_by_patient.yaml")
@scales.route("/<loginId>/<patientId>", methods=["GET"])
def get_list_scale_by_id_patient(loginId, patientId):
    return jsonify(get_all_scales_by_patient(loginId, patientId))

@swag_from("../docs/scales/list_data_by_patient.yaml")
@scales.route("/<loginId>/<scaleId>/<patientId>/<stimulus>", methods=["GET"])
def get_result_by_id_scale(loginId, scaleId ,patientId, stimulus):
    return jsonify(get_result_scale(loginId, scaleId ,patientId, stimulus))

@swag_from("../docs/scales/list_all_scales.yaml")
@scales.route("/<loginId>", methods=["GET"])
def get_all_loginId_scale(loginId):
    return jsonify(get_all_scale(loginId))



