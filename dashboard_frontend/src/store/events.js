import dictionaryError from "./language/translationFiles/eventsTranslation/errors";

const { GENERIC_MESSAGE } = dictionaryError;

import dictionaryAlerts from "./language/translationFiles/eventsTranslation/alert";

const { GENERIC_ALERT_MESSAGE, GENERIC_WARNING_MESSAGE } = dictionaryAlerts;

import eventBus from "../events/EventBus";

export default {
  namespaced: true,

  actions: {
    genericError({ commit, rootState }, message) {
      const { lang } = rootState.lang;
      const errorMessage = ` ${GENERIC_MESSAGE[lang]} ${500} - ${message} `;

      eventBus.$emit("alert-error", errorMessage);
    },

    alert({ commit, rootState }, message) {
      const { lang } = rootState.lang;
      const alertMessage = `${message} `;
      eventBus.$emit("alert-info", alertMessage);
    },
    warning({ commit, rootState }, message) {
      const { lang } = rootState.lang;
      const warningMessage = `${message} `;
      eventBus.$emit("alert-warning", warningMessage);
    }
  }
};
