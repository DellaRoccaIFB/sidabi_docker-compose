import Vue from "vue";
import Vuex from "vuex";
import patients from "./patients";
import session from "./session";
import lang from "./language/lang";
import results from "./results";
import events from "./events";
import sensor from "./sensor";
import scales from "./scales";
import scaleSam from "./scaleSam";
import scaleMca from "./scaleMca";
import scaleAes from "./scaleAes";
import scaleMbss from "./scaleMbss";
import scaleSfss from "./scaleSfss";
import scaleStai from "./scaleStai";




import patientsListView from "./language/viewsTranslation/patientsListView";
import cardSelectionView from "./language/viewsTranslation/cardSelectionView";
import scaleSelectionView from "./language/viewsTranslation/scaleSelectionView";
import loginView from "./language/viewsTranslation/loginView";
import sensorView from "./language/viewsTranslation/sensorView";
import resultsView from "./language/viewsTranslation/resultsView";
import scaleView from "./language/viewsTranslation/scaleView";
import scaleViewSam from "./language/viewsTranslation/scaleViewSam";
import scaleViewMca from "./language/viewsTranslation/scaleViewMca";
import scaleViewAes from "./language/viewsTranslation/scaleViewAes";
import scaleViewMbss from "./language/viewsTranslation/scaleViewMbss";
import scaleViewSfss from "./language/viewsTranslation/scaleViewSfss";
import scaleViewStai from "./language/viewsTranslation/scaleViewStai";


import historyAssessComponents from "./language/componentsTrasnlation/historyAssessComponents";

import createPersistedState from "vuex-persistedstate";

// const jwt = require("../plugins/jwt")
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  modules: {
    patients,
    session,
    sensor,
    scales,
    lang,
    loginView,
    results,
    events,
    patientsListView,
    cardSelectionView,
    scaleSelectionView,
    sensorView,
    resultsView,
    scaleView,
    scaleViewSam,
    scaleViewMca,
    scaleViewAes,
    scaleViewMbss,
    scaleViewSfss,
    scaleViewStai,
    scaleSam,
    scaleMca,
    scaleAes,
    scaleMbss,
    scaleSfss,
    scaleStai,
    historyAssessComponents
  }
});