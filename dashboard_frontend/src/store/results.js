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
    partsAssessSelected: {
      data: []
    },
    allParts: []
  },

  mutations: {
    SET_HISTORY(state, scoreHistory) {
      state.scoreHistoryGraphData = scoreHistory;
    },
    SET_PARTS_SELECTED(state, data) {
      state.partsAssessSelected.data = data;
    },
    SET_PARTS_ARRAY(state, data) {
      state.allParts = data;
    }
  },

  actions: {
    async getScoreHistory({ commit, rootState }) {
      const { token, loginId } = rootState.session;
      const { lang } = rootState.lang;
      const { id } = rootState.patients.patientSelected;
      const url = `${apiConfig.baseUrl}:${apiConfig.port}/assess/results/${loginId}/patient/${id}`;
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
      const dates = [];

      result.map(r => {
        if (!r.score.scoreTotal || r.score.scoreTotal == null) {
          return;
        }
        scores.push(r.score.scoreTotal);
        const date = formatDate(r.date, lang);
        dates.push(date);
      });
      commit("SET_HISTORY", { categories: dates, data: scores });

      const handleValues = result => {
        const dataParts = [];
        for (let index = 0; index < result.length; index++) {
          Object.values(result[index].score.scoreParts).map(part => {
            if (!part) {
              return;
            }
            dataParts.push(part);
          });

          if (dataParts.length > 0) {
            return dataParts;
          }
        }
      };
      const dataParts = handleValues(result);
      const allParts = [];
      Object.values(result).map(part => {
        part = part.score.scoreParts;
        if (!part.partI || !part.partII || !part.partIII || !part.partIV) {
          return;
        }
        allParts.push(part);
      });

      commit("SET_PARTS_ARRAY", allParts);
      //console.log(dataParts )
      commit("SET_PARTS_SELECTED", dataParts);
      return result;
    }
  }
};
