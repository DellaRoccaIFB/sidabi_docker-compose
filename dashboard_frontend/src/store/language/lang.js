export default {
  namespaced: true,
  state: {
    lang: "en-us"
  },

  mutations: {
    SET_LANG(state, lang) {
      state.lang = lang;
    }
  },

  actions: {
    setLang({ commit }, lang) {
      commit("SET_LANG", lang);
    }
  },

  getters: {
    getLang(state) {
      return state.lang;
    }
  }
};
