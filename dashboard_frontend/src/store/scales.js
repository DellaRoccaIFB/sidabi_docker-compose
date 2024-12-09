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
    SET_HISTORY(state, scoreHistory) {
      state.scoreHistoryGraphData = scoreHistory;
    },
    SET_PARTS_SELECTED(state, data) {
      state.partsScaleSelected.data = data;
    },
    SET_PARTS_ARRAY(state, data) {
      state.allParts = data;
    }
  },

  actions: {
    async getScoreScale({ commit, rootState }, scaleId, nameScale) {


      // switch (nameScale) {
      //   case 'mca':
      //     scaleId = 7;
      //     break;
      //   case 'sfss':
      //     scaleId = 8;
      //     break;
      //   case 'aes':
      //     scaleId = 9;
      //     break;
      //   case 'mbss':
      //     scaleId = 10;
      //     break;
      //   case 'stai':
      //     scaleId = 11;
      //     break;
      //   case 'sam':
      //     scaleId = 12;
      //     break;

      //   default:
      //     break;
      // }


      
      const { token, loginId } = rootState.session;
      const { lang } = rootState.lang;
      const { id } = rootState.patients.patientSelected;
      // const {scaleId} = rootState.patients.partsScaleSelected;
      const url = `${apiConfig.baseUrl}:${apiConfig.port}/scales/${loginId}/${scaleId}/${id}/undefined`;
      const requestParams = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      };

      const response = await fetch(url, requestParams);
      const data = await response.json();
      console.log('scale');
      console.log(data);
      return data;
      // console.log(data.result[0]);
      // const result = data.result;
      // const scores = [];
      // const dates = [];

      // result.map(r => {
      //   if (!r.score.scoreTotal || r.score.scoreTotal == null) {
      //     return;
      //   }
      //   scores.push(r.score.scoreTotal);
      //   const date = formatDate(r.date, lang);
      //   dates.push(date);
      // });
      // commit("SET_HISTORY", { categories: dates, data: scores });

      // const handleValues = result => {
      //   const dataParts = [];
      //   for (let index = 0; index < result.length; index++) {
      //     Object.values(result[index].score.scoreParts).map(part => {
      //       if (!part) {
      //         return;
      //       }
      //       dataParts.push(part);
      //     });

      //     if (dataParts.length > 0) {
      //       return dataParts;
      //     }
      //   }
      // };
      // const dataParts = handleValues(result);
      // const allParts = [];
      // Object.values(result).map(part => {
      //   part = part.score.scoreParts;
      //   if (!part.partI || !part.partII || !part.partIII || !part.partIV) {
      //     return;
      //   }
      //   allParts.push(part);
      // });

      // commit("SET_PARTS_ARRAY", allParts);
      // //console.log(dataParts )
      // commit("SET_PARTS_SELECTED", dataParts);
      // return result;
    }
  }
};