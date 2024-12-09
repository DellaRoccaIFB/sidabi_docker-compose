import dictionary from "../translationFiles/results"

const { 
  CARD_PATIENT_SELECTED,
  UPDRS_PARTS,
  UPDRS_PARTS_NAMES
  } = dictionary
export default {
    namespaced: true,
    state: {
      cardPatientSelected : CARD_PATIENT_SELECTED,
      updrsParts : UPDRS_PARTS,
      updrsPartsNames : UPDRS_PARTS_NAMES
    },
    getters: {
      getHeadersTablePatients (state, getters, rootState) {
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.headersTablePatients[lang]
      },
      getPageTitle(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.pageTile[lang]
      },
      getTableFooterProps(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.tableFooterProps[lang]
      },
      getTableLabelSearch(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.tableLabelSearch[lang]
      },
      getTableLabelNoData(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.tableLabelNoData[lang]
      },
      getCardPatientSelected(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.cardPatientSelected[lang]
      },
      getUpdsParts(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.updrsParts[lang]
      },
      getUpdsPartsNames(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.updrsPartsNames[lang]
      },
    }
  }
  
