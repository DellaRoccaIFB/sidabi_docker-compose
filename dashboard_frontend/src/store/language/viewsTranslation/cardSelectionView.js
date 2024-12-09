import dictionary from "../translationFiles/cardSelection";

const { TITLE } = dictionary;

export default {
  namespaced: true,
  state: {
    title: TITLE
  },

  getters: {
    getTitle(state, getters, rootState) {
      const lang = rootState.lang.lang ? rootState.lang.lang : "pt-br";
      return state.title[lang];
    }
  }
};
