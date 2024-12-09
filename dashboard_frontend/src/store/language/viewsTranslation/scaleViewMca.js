import dictionary from "../translationFiles/scaleMca"

const { 
  CARD_PATIENT_SELECTED,
  ANSWERS_SCALE,
  SCALE_PARTS_NAMES_MCA
  } = dictionary
export default {
    namespaced: true,
    state: {
      cardPatientSelected : CARD_PATIENT_SELECTED,
      answersScale : ANSWERS_SCALE,
      scalePartsNamesMca : SCALE_PARTS_NAMES_MCA
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
      getScalePartsNamesMca(state, getters, rootState){

        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.scalePartsNamesMca[lang]
      },

    }
  }