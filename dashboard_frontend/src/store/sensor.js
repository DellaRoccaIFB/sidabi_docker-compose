import apiConfig from "../config/api.js";

export default {
  namespaced: true,
  state: {
    fileList: [],
    fileSelected: {
      nome: "",
      data: "",
      grupo_estudo: "",
      equipamento: ""
    },
    tremor: {
      T1: 0,
      T2: 0,
      T3: 0,
      T4: 0,
      T5: 0,
      metrics: {}
    },
    isChartDataLoading: false,
    isFileListDataLoading: false,
    tremorLevelData: {
      outliers: [],
      yaxis: [],
      outlierReference: "",
      normalReference: "",
      isOutlierChart: false,
      colors: []
    }
  },

  mutations: {
    SET_FILE_SELECTED(state, file) {
      state.fileSelected = file;
    },
    SET_FILE_LIST(state, fileList) {
      state.fileList = fileList;
    },
    SET_TREMOR(state, tremor) {
      state.tremor = tremor;
    },
    SET_CHART_LOADING(state, isChartDataLoading) {
      state.isChartDataLoading = isChartDataLoading;
    },
    SET_FILE_LIST_LOADING(state, isFileListDataLoading) {
      state.isFileListDataLoading = isFileListDataLoading;
    },
    SET_TREMOR_LEVEL_DATA(state, tremorLevelData) {
      state.tremorLevelData = tremorLevelData;
    }
  },

  actions: {
    async getFileList({ commit, dispatch }, { token, loginId, id }) {
      try {
        const url = `${apiConfig.baseUrl}:${apiConfig.port}/sensor/${id}/${loginId}`;
        const requestParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        };

        const response = await fetch(url, requestParams);
        const data = await response.json();

        commit("SET_FILE_LIST", data);
      } catch (e) {
        const errorMessage = `Erro ao listar arquivos - ${e.message} `;
        dispatch("events/alert", errorMessage, { root: true });
      }
    },
    selectFile({ commit }, file) {
      commit("SET_FILE_SELECTED", file);
    },
    setChartLoading({ commit }, isLoading) {
      commit("SET_CHART_LOADING", isLoading);
    },
    setFileListLoading({ commit }, isLoading) {
      commit("SET_FILE_LIST_LOADING", isLoading);
    },
    setTremor({ commit }, tremor) {
      commit("SET_TREMOR", tremor);
    },
    setTremorLevelData({ commit }, tremorData) {
      commit("SET_TREMOR_LEVEL_DATA", tremorData);
    },
    async loadHistogramData({ commit, dispatch }, { token, filename }) {
      try {
        const url = `${apiConfig.baseUrl}:${apiConfig.port}/sensor/?filename=${filename}`;
        const requestParams = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          }
        };

        const response = await fetch(url, requestParams);
        const data = await response.json();

        commit("SET_TREMOR", data);
      } catch (e) {
        const errorMessage = `Erro ao carregar arquivo - ${e.message} `;
        dispatch("events/alert", errorMessage, { root: true });
      }
    }
  }
};
