<template>
  <v-main class="login-screen">
    <div class="login-screen-title">
      <h1>
        {{ _title }}
      </h1>
      <p>
        {{ _subtitle }}
      </p>
    </div>
    <div class="input-card">
      <input-credentials-card
        class="input-login-screen"
        :validation_passord="getValidationPasswordMessage"
        :validation_username="getValidationUsernameMessage"
      >
      </input-credentials-card>
    </div>
  </v-main>
</template>

<script>
import InputCredentialsCard from "../components/login/InputCredentialsCard.vue";
import eventBus from "../events/EventBus";
import { mapGetters } from "vuex";
export default {
  components: {
    "input-credentials-card": InputCredentialsCard
  },
  data() {
    return {
      dashboard_title: "Parkinson Dashboard",
      dashboard_subtitle:
        "Painel para visualização de resultados da UPDRS, Sensores e Escalas integrado ao SIDABI"
    };
  },
  computed: {
    ...mapGetters("loginView", [
      "getTitle",
      "getSubtitle",
      "getValidationUsernameMessage",
      "getValidationPasswordMessage"
    ]),
    _title() {
      return this.getTitle;
    },
    _subtitle() {
      return this.getSubtitle;
    }
  },
  created() {
    eventBus.$emit("open-dialog-language");
  },

  renderTracked() {
    localStorage.clear();
  }
};
</script>

<style lang="scss">
.login-screen {
  margin: 0;
  padding: 0;
  background-image: url("../assets/background.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden !important;
  /* Hide scrollbars */
  justify-items: center;
  width: 100% !important;
  height: calc(100%);

  & .v-main__wrap {
    display: flex;
    justify-content: space-between;
  }

  & .input-card {
    width: 400px;
    margin-left: auto;
    height: 70%;
    margin-top: 100px;

    background: #ffffff;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.29);
    border-radius: 20px;

    & .input-login-screen {
      //width: 100% !important;
      //height: 100% !important;
      //border: 12px solid rgb(0, 255, 98) !important;
    }
  }

  & .login-screen-title {
    // align-self: center;
    //justify-self: center;
    // padding-left: 4%;
    //width: 50% !important;
    // height: 100% !important;
    //border: 12px solid rgb(255, 0, 149) !important;
    //position: absolute;
    width: calc(90% - 600px);
    padding-top: 14%;
    // bottom: 54.67%;
    font-family: Lato;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 34px;
    /* identical to box height */

    color: #ffffff;

    & h1 {
      padding-top: 15%;
      padding-left: 0;
      padding-bottom: 0%;
      color: #fff;
      font-family: "Lato", sans-serif;
      font-size: 40px;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 48px;
    }

    & p {
      font-family: "Lato", sans-serif;
      font-size: 20px;
      font-style: normal;
      color: #fff;
      font-weight: normal;
      line-height: 19px;
    }
  }
}
</style>
