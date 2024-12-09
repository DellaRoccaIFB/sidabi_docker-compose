from flask import jsonify
from sqlalchemy import text
from extensions import engine


def select_participant_by_id(id):
    #     query = """
    #     SELECT individuo.id, individuo.nome patient_name, individuo.email,
    #         individuo.cpf, individuo.rg, individuo.telefone1 phone,
    #         tipo_sangue.tipo bloodType 
    #     FROM public.individuo individuo
    #     INNER JOIN public.tipo_sangue tipo_sangue 
    #     ON individuo.tipo_sangue_fk_id = tipo_sangue.id 
    #     WHERE individuo.id = :id;
    # """
    query = """
        SELECT individuo.id, individuo.nome patient_name, individuo.email,
            individuo.cpf, individuo.rg, individuo.telefone1 phone
        FROM public.individuo individuo
        WHERE individuo.id = :id;
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(text(query), {"id": id}).first()
        return jsonify(dict(resultproxy))


def select_updrs_participants_by_login_id(login_fk_id):
    query = """
        SELECT individuo.nome  patient_name, individuo.id id, individuo.email, individuo.cpf, individuo.rg, individuo.telefone1 phone,
        to_char(individuo.data_nascimento,'DD/MM/YYYY') date_of_birth,
        EXTRACT(YEAR FROM AGE(now(), individuo.data_nascimento)) age,
        tipo_sangue.tipo  blood_type
        FROM public.individuo individuo LEFT JOIN public.tipo_sangue tipo_sangue 
        ON individuo.tipo_sangue_fk_id = tipo_sangue.id 
        WHERE individuo.id in(SELECT participante_fk_id FROM questionario.avaliacao WHERE login_fk_id = :login_fk_id)
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(text(query), {"login_fk_id": login_fk_id})
        return jsonify({"participants": [dict(row) for row in resultproxy]})


def select_sensor_participants_by_login_id(login_fk_id):
    query = """
        SELECT individuo.nome  patient_name, individuo.id id, individuo.email, individuo.cpf, individuo.rg, individuo.telefone1 phone,
        to_char(individuo.data_nascimento,'DD/MM/YYYY') date_of_birth,
        EXTRACT(YEAR FROM AGE(now(), individuo.data_nascimento)) age,
        tipo_sangue.tipo  blood_type
        FROM public.individuo individuo LEFT JOIN public.tipo_sangue tipo_sangue 
        ON individuo.tipo_sangue_fk_id = tipo_sangue.id 
        WHERE individuo.id in(SELECT distinct s.participante_fk_id from biodata.sessao s where s.usuario_logado = :usuario_logado )
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(text(query), {"usuario_logado": login_fk_id})
        return jsonify({"participants": [dict(row) for row in resultproxy]})


def select_scale_participants_by_login_id(login_fk_id):
    query = """
        SELECT individuo.nome  patient_name, individuo.id id, individuo.email, individuo.cpf, individuo.rg, individuo.telefone1 phone,
        to_char(individuo.data_nascimento,'DD/MM/YYYY') date_of_birth,
        EXTRACT(YEAR FROM AGE(now(), individuo.data_nascimento)) age,
        tipo_sangue.tipo  blood_type
        FROM public.individuo individuo left JOIN public.tipo_sangue tipo_sangue 
        ON individuo.tipo_sangue_fk_id = tipo_sangue.id 
        WHERE individuo.id in(SELECT participante_fk_id FROM questionario.avaliacao WHERE login_fk_id = :login_fk_id)
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(text(query), {"login_fk_id": login_fk_id})
        return jsonify({"participants": [dict(row) for row in resultproxy]})
