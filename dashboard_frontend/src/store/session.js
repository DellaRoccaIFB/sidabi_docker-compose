import jwt from "../plugins/jwt";
import config from "../config/api";

export default {
  namespaced: true,
  state: {
    token: "",
    username: "",
    password: "",
    loginId: null,
    sessionAuth: false
  },

  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
    },

    setUsername(state, newUsername) {
      state.username = newUsername;
    },
    setPassword(state, newPassword) {
      state.password = newPassword;
    },
    login(state, loginId) {
      state.sessionAuth = true;
      state.loginId = loginId;
    },
    loginFailed(state) {
      state.sessionAuth = false;
    }
  },
  getters: {
    isAuthenticated: state => state.sessionAuth
  },
  actions: {
    async generateToken({ commit, state, dispatch }) {
      try {
        if (state.username != "" && state.password != "") {
          const token = await jwt.gerarToken({
            username: state.username,
            password: state.password
          });
          localStorage.setItem("token", token);
          commit("setToken", token);
        }
      } catch (e) {
        const errorMessage = `Erro de autenticação - ${e.message} `;
        console.error(errorMessage + " | geração de token. ");
        dispatch("events/genericError", errorMessage, { root: true });
      }
    },

    setUsername({ commit }, { username }) {
      commit("setUsername", username);
    },
    setPassword({ commit }, { password }) {
      commit("setPassword", password);
    },

    async login({ commit, state, dispatch }) {
      try {
        const url = `${config.baseUrl}:${config.port}/core/authenticate/`;
        const requestParams = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: state.token
          }
        };
        const response = await fetch(url, requestParams);
        const data = await response.json();
        if (response && response.status == 200) {
          dispatch("events/alert", "Login bem sucedido!", { root: true });
          commit("login", data.id);
        }
      } catch (error) {
        commit("loginFailed");
        console.error(error.message);
        const errorMessage = ` Credenciais invalidas!`;
        dispatch("events/warning", errorMessage, { root: true });
      }
    }
  }
};
