import dictionary from '../translationFiles/login'

const {
  TITLE,
  SUBTITLE,
  INFO_SIDABI_MESSAGE,
  USER_NAME_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  BUTTON_LOGIN_TEXT,
  VALIDATION_PASSWORD,
  VALIDATION_USERNAME
} = dictionary

export default {
    namespaced: true,
    state: {
        title:TITLE,
        subtitle:SUBTITLE,
        infoSidabiMessage:INFO_SIDABI_MESSAGE,
        usernamePlaceHolder:USER_NAME_PLACEHOLDER,
        passwordPlaceHolder:PASSWORD_PLACEHOLDER,
        btnLogin:BUTTON_LOGIN_TEXT,
        passwordValidation: VALIDATION_PASSWORD,
        usernameValidation: VALIDATION_USERNAME 
    },
   
    getters: {
      getTitle (state, getters, rootState) {
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.title[lang]
      },
      getSubtitle(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.subtitle[lang]
      },
      getInfoSidabiMessage(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.infoSidabiMessage[lang]
      },
      getUsernamePlaceHolder(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.usernamePlaceHolder[lang]
      },
      getPasswordPlaceHolder(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.passwordPlaceHolder[lang]
      },
      getBtnLogin(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.btnLogin[lang]
      },
      getValidationUsernameMessage(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.passwordValidation[lang]
      },
      getValidationPasswordMessage(state, getters, rootState){
       
        const lang = rootState.lang.lang ? rootState.lang.lang : 'pt-br'
        return state.usernameValidation[lang]
      },
    }
  }
  
