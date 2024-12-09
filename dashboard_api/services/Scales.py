
from sqlalchemy import text
from extensions import engine
import pandas as pd
import statistics


def select_scales_where_loginFkId(login_fk_id, patientId, id_scale_fk, stimulus):
    if(stimulus == '0' or stimulus == '1'):
        if(stimulus == '0'):
            valor_stimulus = 'Sem estímulo'
        else:
            valor_stimulus = 'Com estímulo'
        query = """
            SELECT id id_avaliacao FROM questionario.avaliacao 
            WHERE login_fk_id = :login_fk_id
            AND tipo_questionario_fk_id = :tipoScalaId
            AND participante_fk_id = :patientId
            AND observacao = :stimulus
        """
    else:
        valor_stimulus = stimulus
        query = """
            SELECT id id_avaliacao FROM questionario.avaliacao 
            WHERE login_fk_id = :login_fk_id
            AND tipo_questionario_fk_id = :tipoScalaId
            AND participante_fk_id = :patientId
        """

    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query),
            {
                "login_fk_id": login_fk_id,
                "tipoScalaId": id_scale_fk,
                "patientId": patientId,
                "stimulus": valor_stimulus,
            },
        )
        if resultproxy is None:
            return
        else:
            return [dict(row) for row in resultproxy]



def select_results_scale(avaliacaoId):
    query = """
        SELECT a.id, agrup.descricao descricao_pergunta, alt.descricao, alt.valor, q.titulo, a.observacao, r.id
        FROM questionario.resposta r
        INNER JOIN questionario.avaliacao a ON r.avaliacao_fk_id = a.id 
        INNER JOIN questionario.tipo_questionario tq ON r.tipo_questionario_fk_id = tq.id   
        INNER JOIN questionario.alternativa alt ON r.alternativa_fk_id = alt.id 
        INNER JOIN questionario.questao q ON r.questao_fk_id = q.id
        INNER JOIN questionario.agrupamento agrup ON q.agrupamento_fk_id = agrup.id
        WHERE a.id = :avaliacaoId
        GROUP BY a.id, agrup.descricao, alt.descricao, alt.valor, q.titulo, a.observacao, r.id
        ORDER BY r.id;

    """

    # array_answers = []

    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query),
            {
                "avaliacaoId": avaliacaoId,
            },
        ).all()
        if resultproxy is None:
            return
        else:
            # array_answers.append(resultproxy)
            return [dict(row) for row in resultproxy]


def get_result_scale(loginId, scaleId, patientId,  stimulus):
    avaliacoes = select_scales_where_loginFkId(loginId, patientId, scaleId, stimulus)
    resultados = []
    for i in range(len(avaliacoes)):
        resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
        resultados.append(resultado)
        dict_soma = {'soma': sum_of_scale_values(resultado)}
        resultados.append(dict_soma)
    return {"result": resultados}

# def get_result_scale_mca(loginId, patientId, stimulus):
#     avaliacoes = select_scales_where_loginFkId(loginId, patientId, 7, stimulus)
#     resultados = []
#     for i in range(len(avaliacoes)):
#         resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
#         resultados.append(resultado)
#         dict_soma = {'soma': sum_of_scale_values(resultado)}
#         resultados.append(dict_soma)
#     return {"result": resultados}

# def get_result_scale_sam(loginId, patientId, stimulus):
#     avaliacoes = select_scales_where_loginFkId(loginId, patientId, 8, stimulus)
#     resultados = []
#     for i in range(len(avaliacoes)):
#         resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
#         resultados.append(resultado)
#         dict_soma = {'soma': sum_of_scale_values(resultado)}
#         resultados.append(dict_soma)
#     return {"result": resultados}

# def get_result_scale_stai(loginId, patientId, stimulus):
#     avaliacoes = select_scales_where_loginFkId(loginId, patientId, 9, stimulus)
#     resultados = []
#     for i in range(len(avaliacoes)):
#         resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
#         resultados.append(resultado)
#         dict_soma = {'soma': sum_of_scale_values(resultado)}
#         resultados.append(dict_soma)
#     return {"result": resultados}

# def get_result_scale_sfss(loginId, patientId, stimulus):
#     avaliacoes = select_scales_where_loginFkId(loginId, patientId, 10, stimulus)
#     resultados = []
#     for i in range(len(avaliacoes)):
#         resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
#         resultados.append(resultado)
#         dict_soma = {'soma': sum_of_scale_values(resultado)}
#         resultados.append(dict_soma)
#     return {"result": resultados}

# def get_result_scale_aes(loginId, patientId, stimulus):
#     avaliacoes = select_scales_where_loginFkId(loginId, patientId, 11, stimulus)
#     resultados = []
#     for i in range(len(avaliacoes)):
#         resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
#         resultados.append(resultado)
#         dict_soma = {'soma': sum_of_scale_values(resultado)}
#         resultados.append(dict_soma)
#     return {"result": resultados}

# def get_result_scale_mbss(loginId, patientId, stimulus):
#     avaliacoes = select_scales_where_loginFkId(loginId, patientId, 12, stimulus)
#     resultados = []
#     for i in range(len(avaliacoes)):
#         resultado = select_results_scale(avaliacoes[i]['id_avaliacao'])
#         resultados.append(resultado)
#         dict_soma = {'soma': sum_of_scale_values(resultado)}
#         resultados.append(dict_soma)
#     return {"result": resultados}


def sum_of_scale_values(scale):
    soma = 0
    for i in range(len(scale)):
        soma += scale[i]['valor']
    return soma



def get_sum_all_pacient_by_scale(login_fk_id, scaleId, groupName, stimulus):
    scale = query_sum_scales(login_fk_id, scaleId, groupName, stimulus)


    resultados = []
    medidas = []
    pacientes = []
    soma_geral = 0
    cont_geral = 0
    for dados_gerais in scale:
        resultado_individual = []
        medida_individual = []
        soma_individual = 0
        cont_individual = 0
        for dados_pacientes in dados_gerais:
            soma_individual += dados_pacientes['valor']
            resultado_individual.append(dados_pacientes['valor'])
        # print(soma_individual)
        pacientes.append(dados_pacientes['nome'])

        soma_geral += soma_individual
        medidas.append(soma_individual)
        cont_geral += 1
        resultados.append(soma_individual)

    
    # media = soma_geral/cont_geral

    if(len(resultados) == 0):
        return {
            'mensagem': 'Não há resultados para essa escala ou houve erro na obtenção dos dados'
        }
    else:
        media = statistics.mean(resultados)
        media = round(media, 2)
        moda = statistics.mode(resultados)
        mediana = statistics.median(resultados)
        dict_soma = {
            # 'escala': scale[0]['escala'],
            'soma': soma_geral,
            'max': max(medidas),
            'min': min(medidas),
            'media': media,
            'mediana': mediana,
            'moda': moda,
            'score': resultados,
            'pacientes': pacientes,
            }
        return {"result": dict_soma}







def query_sum_scales(login_fk_id, scaleId, groupName, stimulus):
    if(groupName == 'Grupo Experimental' or groupName == 'Grupo de Controle'):
        if(stimulus == '0' or stimulus == '1'):
            if(stimulus == '0'):
                valor_stimulus = 'Sem estímulo'
            else:
                valor_stimulus = 'Com estímulo'

            query = """
                SELECT a.id, tq.titulo as escala, agrup.descricao descricao_pergunta, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, a.participante_fk_id, ind.nome
                FROM questionario.resposta r
                INNER JOIN questionario.avaliacao a ON r.avaliacao_fk_id = a.id 
                INNER JOIN questionario.tipo_questionario tq ON r.tipo_questionario_fk_id = tq.id   
                INNER JOIN questionario.alternativa alt ON r.alternativa_fk_id = alt.id 
                INNER JOIN questionario.questao q ON r.questao_fk_id = q.id
                INNER JOIN questionario.agrupamento agrup ON q.agrupamento_fk_id = agrup.id
                INNER JOIN biodata.grupo_estudo_participante grup_part ON a.participante_fk_id = grup_part.participante_fk_id
                INNER JOIN biodata.grupo_estudo grup ON grup.id = grup_part.grupo_estudo_fk_id
                INNER JOIN public.individuo ind ON a.participante_fk_id = ind.id
                WHERE tq.id = :scaleId AND a.login_fk_id = :login_fk_id AND a.observacao = :stimulus AND grup.nome = :groupName
                GROUP BY a.id, escala, agrup.descricao, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, ind.nome;
            """
        else:
            valor_stimulus = stimulus
            query = """
                SELECT a.id, tq.titulo as escala, agrup.descricao descricao_pergunta, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, a.participante_fk_id, ind.nome
                FROM questionario.resposta r
                INNER JOIN questionario.avaliacao a ON r.avaliacao_fk_id = a.id 
                INNER JOIN questionario.tipo_questionario tq ON r.tipo_questionario_fk_id = tq.id   
                INNER JOIN questionario.alternativa alt ON r.alternativa_fk_id = alt.id 
                INNER JOIN questionario.questao q ON r.questao_fk_id = q.id
                INNER JOIN questionario.agrupamento agrup ON q.agrupamento_fk_id = agrup.id
                INNER JOIN biodata.grupo_estudo_participante grup_part ON a.participante_fk_id = grup_part.participante_fk_id
                INNER JOIN biodata.grupo_estudo grup ON grup.id = grup_part.grupo_estudo_fk_id
                INNER JOIN public.individuo ind ON a.participante_fk_id = ind.id
                WHERE tq.id = :scaleId AND a.login_fk_id = :login_fk_id AND grup.nome = :groupName
                GROUP BY a.id, escala, agrup.descricao, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, ind.nome;
            """
    else:
        if(stimulus == '0' or stimulus == '1'):
            if(stimulus == '0'):
                valor_stimulus = 'Sem estímulo'
            else:
                valor_stimulus = 'Com estímulo'

            query = """
                SELECT a.id, tq.titulo as escala, agrup.descricao descricao_pergunta, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, a.participante_fk_id, ind.nome
                FROM questionario.resposta r
                INNER JOIN questionario.avaliacao a ON r.avaliacao_fk_id = a.id 
                INNER JOIN questionario.tipo_questionario tq ON r.tipo_questionario_fk_id = tq.id   
                INNER JOIN questionario.alternativa alt ON r.alternativa_fk_id = alt.id 
                INNER JOIN questionario.questao q ON r.questao_fk_id = q.id
                INNER JOIN questionario.agrupamento agrup ON q.agrupamento_fk_id = agrup.id
                INNER JOIN biodata.grupo_estudo_participante grup_part ON a.participante_fk_id = grup_part.participante_fk_id
                INNER JOIN biodata.grupo_estudo grup ON grup.id = grup_part.grupo_estudo_fk_id
                INNER JOIN public.individuo ind ON a.participante_fk_id = ind.id
                WHERE tq.id = :scaleId AND a.login_fk_id = :login_fk_id AND a.observacao = :stimulus
                GROUP BY a.id, escala, agrup.descricao, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, ind.nome;
            """
        else:
            valor_stimulus = stimulus
            query = """
                SELECT a.id, tq.titulo as escala, agrup.descricao descricao_pergunta, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, a.participante_fk_id, ind.nome
                FROM questionario.resposta r
                INNER JOIN questionario.avaliacao a ON r.avaliacao_fk_id = a.id 
                INNER JOIN questionario.tipo_questionario tq ON r.tipo_questionario_fk_id = tq.id   
                INNER JOIN questionario.alternativa alt ON r.alternativa_fk_id = alt.id 
                INNER JOIN questionario.questao q ON r.questao_fk_id = q.id
                INNER JOIN questionario.agrupamento agrup ON q.agrupamento_fk_id = agrup.id
                INNER JOIN biodata.grupo_estudo_participante grup_part ON a.participante_fk_id = grup_part.participante_fk_id
                INNER JOIN biodata.grupo_estudo grup ON grup.id = grup_part.grupo_estudo_fk_id
                INNER JOIN public.individuo ind ON a.participante_fk_id = ind.id
                WHERE tq.id = :scaleId AND a.login_fk_id = :login_fk_id
                GROUP BY a.id, escala, agrup.descricao, alt.descricao, alt.valor, q.titulo, grup.nome, a.observacao, ind.nome;
            """
    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query),
            {
                "login_fk_id": login_fk_id,
                "scaleId": scaleId,
                "groupName": groupName,
                "stimulus": valor_stimulus
            },
        )
        # print(query)
        if resultproxy is None:
            return
        else:
            data_to_return = returns_filtered_scales(resultproxy)

            return data_to_return
            # return [dict(row) for row in resultproxy]


def get_all_scales_by_patient(login_fk_id, patientId):
    query = """
        SELECT DISTINCT q.id,titulo, descricao FROM questionario.tipo_questionario q
        INNER JOIN questionario.avaliacao a ON  q.id = a.tipo_questionario_fk_id
        WHERE a.participante_fk_id = :patientId AND a.login_fk_id = :login_fk_id;
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query),
            {
                "login_fk_id": login_fk_id,
                "patientId": patientId,
            },
        )
        if resultproxy is None:
            return
        else:
            return [dict(row) for row in resultproxy]
        
def get_all_scale(login_fk_id):
        
    # query = """
    #     SELECT DISTINCT q.id, titulo, descricao FROM questionario.tipo_questionario q
    #     INNER JOIN questionario.avaliacao a ON q.id = a.tipo_questionario_fk_id
    #     WHERE a.login_fk_id = :login_fk_id;
    # """
    query = """
        SELECT DISTINCT q.id, q.titulo, q.descricao FROM questionario.tipo_questionario q
        WHERE (q.titulo = 'Modelo Circumplexo de Afeto' OR
        q.titulo = 'Escala Multidimensional do Estado de Tédio' OR
        q.titulo = 'Escala para Avaliação da Atividade' OR
        q.titulo = 'Escala Curta de Fluxo' OR
        q.titulo = 'Manequim de Auto-Avaliação' OR
        q.titulo = 'Inventário de Ansiedade Traço-Estado');
    """

    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query),
            {
                "login_fk_id": login_fk_id,
            },
        )
        if resultproxy is None:
            return
        else:
            return [dict(row) for row in resultproxy]
        


def returns_filtered_scales(resultado):
    scale = [dict(row) for row in resultado]
    
    array_nomes = []
    for k in scale:
        array_nomes.append(k['nome'])
    nomes = list(set(array_nomes))
    
    array_dados = []

    for nome in nomes:
        array_dados_paciente=[]
        filtered_records = filter_set(scale, nome)
        for fil in filtered_records:
            array_dados_paciente.append(fil)
        # array_dados.append(nome)
        array_dados.append(array_dados_paciente)

    # print(array_dados)


    # for matriz in array_dados:
    #     print(matriz)
        # for linha in matriz:
        #     print(linha)
    # matriz = [] # lista vazia
    # for i in range(n_linhas):
    #     # cria a linha i
    #     linha = [] # lista vazia
    #     for j in range(n_colunas):
    #          linha.append(valor)
    #     # coloque linha na matriz
    #     matriz.append(linha)
	

















    # array_nomes = []
    # # array_nomes_filtrados=[]
    # for k in scale:
    #     array_nomes.append(k['nome'])
    
    # nomes = list(set(array_nomes))
    # # print(nomes)


    # # print(array_nomes_filtrados)

    # # print(list(filtered_records))
    # for k in array_nomes_filtrados:
    #     print(list(k))
        # for z in k:
            # print(list(z))
        # for z in k:
        #     print(k[z])
    # return nomes

    return array_dados


def filter_set(scales, ids_search):
    def iterator_func(x):
        for v in x.values():
            v = str(v)
            if ids_search in v:
                return True
        return False
    return filter(iterator_func, scales)


# def get_names(result_names):
#     array_nomes = []

#     for data in result_names:
#         array_nomes.append(data.nome)
#     nomes = set(array_nomes)
#     return nomes

# def get_scales(result_scales):
#     return scale