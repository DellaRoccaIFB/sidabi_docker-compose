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
    SET_DATA_SCALE_MCA(state, scoreHistoryMca) {
      state.scoreHistoryMcaGraphData = scoreHistoryMca;
    },
    SET_PARTS_SELECTED(state, data) {
      state.partsScaleSelectedMca = data;
    },
    SET_PARTS_ARRAY(state, data) {
      state.allParts = data;
    }
  },

  actions: {
    async getScoreScaleMca({ commit, rootState }, scaleId, nameScale) {

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
      // const {scaleId} = rootState.patients.partsScaleSelected;
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
      // const dates = [];
      // console.log(data.result)
      result.map(r => {
        // console.log(r[0].descricao)
        // console.log(r[0])
        if(r[0] !== undefined){

          const json = r;

          const chaves = Object.keys(json);
          for (let chave of chaves) {
            const valor = json[chave];
            console.log(valor.valor)
            scores.push(valor.valor);

          }
        }
        console.log(scores)
        // if (!r.score.scoreTotal || r.score.scoreTotal == null) {
        //   return;
        // }
        // const date = formatDate(r.date, lang);
        // dates.push(date);
      });

      commit("SET_DATA_SCALE_MCA", {data: scores });

      // const handleValues = result => {
      //   const scaleParts = [];
      //   for (let index = 0; index < result.length; index++) {
      //     Object.values(result[index].score).map(part => {
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
      //   part = part.score;
      //   if (!part.partI || !part.partII || !part.partIII || !part.partIV) {
      //     return;
      //   }
      //   allParts.push(part);
      // });

      // commit("SET_PARTS_ARRAY", allParts);
      // //console.log(dataParts )
      commit("SET_PARTS_SELECTED", {data: scores});
      return result;
    }
  }
};