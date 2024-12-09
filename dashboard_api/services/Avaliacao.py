from sqlalchemy import text
from extensions import engine
from models.Updrs import Updrs


def select_all_assess_where_loginFkId(login_fk_id, patientId):
    query = """
        SELECT  id, data_avaliacao FROM questionario.avaliacao 
        WHERE login_fk_id = :login_fk_id
        AND tipo_questionario_fk_id = :tipoQuestionarioUPDRSId
        AND participante_fk_id = :patientId
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query),
            {
                "login_fk_id": login_fk_id,
                "tipoQuestionarioUPDRSId": Updrs["tipoQuestionarioUPDRSId"],
                "patientId": patientId,
            },
        )
        if resultproxy is None:
            return
        else:
            return [dict(row) for row in resultproxy]


def select_score_by_part(avaliacaoId):
    query = """
    SELECT a.id, agrup.descricao, SUM(alt.valor) score
    FROM questionario.resposta r
    INNER JOIN questionario.avaliacao a ON r.avaliacao_fk_id = a.id 
    INNER JOIN questionario.tipo_questionario tq  ON r.tipo_questionario_fk_id = tq.id   
    INNER JOIN questionario.alternativa alt ON r.alternativa_fk_id = alt.id 
    INNER JOIN questionario.questao q ON r.questao_fk_id = q.id
    INNER JOIN questionario.agrupamento agrup ON q.agrupamento_fk_id = agrup.id
    WHERE agrup.descricao LIKE :part AND a.id = :avaliacaoId
    GROUP BY   a.id, agrup.descricao;
    """

    scoreParts = {
        "partI": 0.0,
        "partII": 0.0,
        "partIII": 0.0,
        "partIV": 0.0,
    }

    with engine.begin() as conn:
        for k, v in scoreParts.items():
            resultproxy = conn.execute(
                text(query),
                {
                    "part": "%" + Updrs[k]["tituloRegex"] + "%",
                    "avaliacaoId": avaliacaoId,
                },
            ).first()
            if resultproxy is None:
                continue
            else:
                scoreParts[k] = resultproxy["score"]
    return scoreParts


def get_all_parts_assess_score(loginId, patientId):
    scoreParts = []
    scoreTotal = []
    resultArray = []
    avaliacoes = select_all_assess_where_loginFkId(loginId, patientId)
    for avaliacao in avaliacoes:
        scoreParts.append(select_score_by_part(avaliacao["id"]))
    for score in scoreParts:
        sumScore = 0
        for value in score.values():
            sumScore += value
        scoreTotal.append(sumScore)
    for i in range(len(avaliacoes)):
        resultArray.append(
            {
                "id": avaliacoes[i]["id"],
                "date": avaliacoes[i]["data_avaliacao"],
                "score": {"scoreParts": scoreParts[i], "scoreTotal": scoreTotal[i]},
            }
        )
    return {"result": resultArray}
