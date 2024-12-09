import dictionary from "../translationFiles/graphs"

const { 
    HISTORY_ASSESSES_GRAPH_TITLE,
  
  } = dictionary
export default {
    namespaced: true,
    state: {
        historyGraphTitle : HISTORY_ASSESSES_GRAPH_TITLE,
    },
    getters: {
      gethistoryGraphTitle (state, getters, rootState) {
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.historyGraphTitle[lang]
      },
     
    }
  }
  
