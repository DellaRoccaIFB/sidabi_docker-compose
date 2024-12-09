import apiConfig from "../config/api.js";
const formatDate = (date, lang) => {
  const d = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  let stringDate = d.toLocaleDateString(lang, options);
  stringDate = stringDate.split("de");

  return stringDate.join("");
};

export default {
  namespaced: true,
  state: {
    scoreHistoryGraphData: {
      categories: [],
      data: [],
      dataLong: []
    },
    partsScaleSelected: {
      data: []
    },
    allParts: []
  },

  mutations: {
    SET_DATA_SCALE_STAI(state, scoreHistoryStai) {
      state.scoreHistoryStaiGraphData = scoreHistoryStai;
    },
    SET_PARTS_SELECTED(state, data) {
      state.partsScaleSelectedStai = data;
    },
    SET_PARTS_ARRAY(state, data) {
      state.allParts = data;
    }
  },


  actions: {
    async getScoreScaleStai({ commit, rootState }, scaleId, nameScale, hue) {
      var urlAtual = window.location.href;
      var urlClass = new URL(urlAtual);
      // variaveis de verificação do estímulo
      let st;
      var vts = urlClass.searchParams.get("stimulus");
      if (vts == '1'){
        st = 1;
      } else {
        st = 0;
      }

      const { token, loginId } = rootState.session;
      const { lang } = rootState.lang;
      const { id } = rootState.patients.patientSelected;
      const url = `${apiConfig.baseUrl}:${apiConfig.port}/scales/${loginId}/${scaleId}/${id}/${st}`;
      console.log(url);
      const requestParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      };

      const response = await fetch(url, requestParams);
      const data = await response.json();
      const result = data.result;
      const scores = [];

      result.map(r => {

        if(r[0] !== undefined){

          const json = r;

          const chaves = Object.keys(json);
          for (let chave of chaves) {
            const valor = json[chave];
            scores.push(valor.valor);
          }
        }
      });

      commit("SET_DATA_SCALE_STAI", {data: scores });
      commit("SET_PARTS_SELECTED", {data: scores});
      return result;
    }
  }
};