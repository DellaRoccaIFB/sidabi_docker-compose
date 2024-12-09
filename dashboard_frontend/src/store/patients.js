import apiConfig from "../config/api.js";

export default {
  namespaced: true,
  state: {
    patientsList: [],
    patientSelected: {
      name: "",
      gender: "",
      age: "",
      id: "",
      phone: ""
    }
  },

  mutations: {
    SET_PATIENT_SELECTED(state, patient) {
      state.patientSelected = patient;
    },
    SET_PATIENTS_LIST(state, patientsList) {
      state.patientsList = patientsList;
    }
  },

  actions: {
    async getUPDRSPatientsList({ commit, dispatch }, { token, loginId }) {
      try {
        const url = `${apiConfig.baseUrl}:${apiConfig.port}/core/individuos/${loginId}`;
        const requestParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        };

        const response = await fetch(url, requestParams);
        const data = await response.json();

        commit("SET_PATIENTS_LIST", data.participants);
      } catch (e) {
        const errorMessage = `Erro ao listar pacientes - ${e.message} `;
        dispatch("events/alert", errorMessage, { root: true });
      }
    },
    async getSensorPatientsList({ commit, dispatch }, { token, loginId }) {
      try {
        const url = `${apiConfig.baseUrl}:${apiConfig.port}/core/individuos/sensor/${loginId}`;
        const requestParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        };

        const response = await fetch(url, requestParams);
        const data = await response.json();

        commit("SET_PATIENTS_LIST", data.participants);
      } catch (e) {
        const errorMessage = `Erro ao listar pacientes - ${e.message} `;
        dispatch("events/alert", errorMessage, { root: true });
      }
    },
    async getScalePatientsList({ commit, dispatch }, { token, loginId }) {
      try {
        const url = `${apiConfig.baseUrl}:${apiConfig.port}/core/individuos/scale/${loginId}`;
        const requestParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        };

        const response = await fetch(url, requestParams);
        const data = await response.json();

        commit("SET_PATIENTS_LIST", data.participants);
      } catch (e) {
        const errorMessage = `Erro ao listar pacientes - ${e.message} `;
        dispatch("events/alert", errorMessage, { root: true });
      }
    },
    async selectPatient({ commit }, patient) {
      commit("SET_PATIENT_SELECTED", patient);
    }
 }
};
