import dictionaryError from "../store/language/translationFiles/eventsTranslation/errors";

const { GENERIC_MESSAGE } = dictionaryError;

import dictionaryAlerts from "../store/language/translationFiles/eventsTranslation/alert";

const { GENERIC_ALERT_MESSAGE, GENERIC_WARNING_MESSAGE } = dictionaryAlerts;
import eventBus from "../events/EventBus";

export const genericError = message => {
  const errorMessage = ` ${GENERIC_MESSAGE} ${500} - ${message} `;

  eventBus.$emit("alert-error", errorMessage);
};

export const alert = message => {
  const alertMessage = `${message}`;
  eventBus.$emit("alert-info", alertMessage);
};

export const warning = message => {
  const warningMessage = `${message} `;
  eventBus.$emit("alert-warning", warningMessage);
};
