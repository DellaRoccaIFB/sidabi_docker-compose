import dictionary from '../translationFiles/patients'

const
 { HEADERS_TABLE_PATIENTS,
  PAGE_TITLE,
  TABLE_LABEL_SEARCH,
  TABLE_LABEL_NODATA,
  TABLE_FOOTER_PROPS
} = dictionary

export default {
    namespaced: true,
    state: {
        headersTablePatients: HEADERS_TABLE_PATIENTS,
        pageTile:PAGE_TITLE,
        tableLabelSearch:TABLE_LABEL_SEARCH,
        tableLabelNoData:  TABLE_LABEL_NODATA,
        tableFooterProps:TABLE_FOOTER_PROPS
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
    }
  }
  
