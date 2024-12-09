import pandas as pd
from sqlalchemy import text
from flask import jsonify
from exceptions import InvalidFileType
from extensions import engine
from config import Config


def list_files(id, loginId):
    query = """
            select s.nome_arquivo as nome,
            s.dt_sessao as data, s.hora, gr.nome as grupo_estudo, equip.nome as equipamento from biodata.sessao s
            inner join biodata.equipamento equip
            on s.equipamento_fk_id = equip.id
            inner join biodata.grupo_estudo gr
            on s.grupo_estudo_fk_id = gr.id
            where s.usuario_logado = :loginId and s.participante_fk_id = :id
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(text(query), {"id": id, "loginId": loginId})
        result = [dict(row) for row in resultproxy]
        for i in range(len(result)):
            data = result[i]["data"].strftime("%d/%m/%Y")
            hora = result[i]["hora"]
            result[i]["data"] = f"{data} {hora}"
        return jsonify(result)


def get_file_result(filename):
    # TODO: lançar erro casa arquivo nao seja csv ou nao possua estrutura desejada
    if filename.endswith(".csv"):
        file_path = Config.SENSOR_FILE_DIR
        df = pd.read_csv(file_path + filename)
        df_dict = df.to_dict("records")
        frequency = 250
        df["x"] = df["x"].abs()
        min_value = df["x"].min()
        max_value = df["x"].max()
        metrics = dict(df["x"].describe())
        result = {
            "T1": 0,
            "T2": 0,
            "T3": 0,
            "T4": 0,
            "T5": 0,
            "metrics": {},
        }
        T1 = 0
        T2 = 0
        T3 = 0
        T4 = 0
        T5 = 0
        for idx, row in enumerate(df_dict):
            row["x"] = 100 * ((row["x"] - min_value) / (max_value - min_value))

            if row["x"] < 20:
                T1 += 1
            elif row["x"] > 20 and row["x"] < 40:
                T2 += 1
            elif row["x"] > 40 and row["x"] < 60:
                T3 += 1
            elif row["x"] > 60 and row["x"] < 80:
                T4 += 1
            else:
                T5 += 1
        result["T1"] = T1 / frequency
        result["T2"] = T2 / frequency
        result["T3"] = T3 / frequency
        result["T4"] = T4 / frequency
        result["T5"] = T5 / frequency
        result["metrics"] = metrics
        return result
    else:
        raise InvalidFileType("Esse arquivo não está no formato csv", status_code=422)
