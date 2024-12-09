import dictionary from "../translationFiles/scaleAes"

const { 
  CARD_PATIENT_SELECTED,
  ANSWERS_SCALE,
  SCALE_PARTS_NAMES_AES
  } = dictionary
export default {
    namespaced: true,
    state: {
      cardPatientSelected : CARD_PATIENT_SELECTED,
      answersScale : ANSWERS_SCALE,
      scalePartsNamesAes : SCALE_PARTS_NAMES_AES
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
      getScalePartsNamesAes(state, getters, rootState){

        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.scalePartsNamesAes[lang]
      },

    }
  }