import dictionary from "../translationFiles/scaleMbss"

const { 
  CARD_PATIENT_SELECTED,
  ANSWERS_SCALE,
  SCALE_PARTS_NAMES_MBSS
  } = dictionary
export default {
    namespaced: true,
    state: {
      cardPatientSelected : CARD_PATIENT_SELECTED,
      answersScale : ANSWERS_SCALE,
      scalePartsNamesMbss : SCALE_PARTS_NAMES_MBSS
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
      getScaleParts(state, getters, rootState){
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.answersScale[lang]
      },
      getScalePartsNamesMbss(state, getters, rootState){

        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.scalePartsNamesMbss[lang]
      },

    }
  }