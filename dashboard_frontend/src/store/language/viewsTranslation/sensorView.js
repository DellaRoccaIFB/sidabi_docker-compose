import dictionary from "../translationFiles/sensor";

const {
  CARD_FILE_LIST,
  CARD_COLUMN_CHART,
  CARD_METRIC_TABLE,
  GENERIC
} = dictionary;
export default {
  namespaced: true,
  state: {
    cardFileList: CARD_FILE_LIST,
    cardColumnChart: CARD_COLUMN_CHART,
    cardMetricTable: CARD_METRIC_TABLE,
    generic: GENERIC
  },
  getters: {
    getCardFileList(state, getters, rootState) {
      const lang = rootState.lang.lang ? rootState.lang.lang : "pt-br";
      return state.cardFileList[lang];
    },
    getCardColumnChart(state, getters, rootState) {
      const lang = rootState.lang.lang ? rootState.lang.lang : "pt-br";
      return state.cardColumnChart[lang];
    },
    getCardMetricTable(state, getters, rootState) {
      const lang = rootState.lang.lang ? rootState.lang.lang : "pt-br";
      return state.cardMetricTable[lang];
    },
    getGeneric(state, getters, rootState) {
      const lang = rootState.lang.lang ? rootState.lang.lang : "pt-br";
      return state.generic[lang];
    }
  }
};
