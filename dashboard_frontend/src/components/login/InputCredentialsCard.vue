<template>
  <div class="input-card-login" @keyup.enter="handleLogin"  rounded>
    <div class="input-card-login-title pb-3">
      <h2>Login</h2>
    </div>


      <div class="input-card-login-inputs" >
        <div>
          <v-text-field
            class="password-input-card"
            rounded
            solo
            v-model="usernameScreen"

            @change="setUsername({ username: usernameScreen })"
            :label="_usernamePlaceHolder"
          />
        </div>
        <div>
          <v-text-field
            class="user-input-card"
            rounded
            solo
            v-model="passwordScreen"
            type="password"
            @change="setPassword({ password: passwordScreen })"
            :label="_passwordPlaceHolder"
          />
        </div>
      </div>
      <div>
        <span class="aviso">*{{_infoSidabiMessage}}</span>
      </div>
      <div class="input-card-login-actions pt-2">
        <v-btn
          class="btn"
          color="#3175D3"
          style="color: white"
          rounded
          @click="handleLogin()"
          
        >
          {{_btnLogin}}
        </v-btn>
      </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {

  props:[
    "validation_passord",
    "validation_username"
],
  data() {
    return {
      usernameScreen: "",
      passwordScreen: "",
      usernameLabel: "Username",
      passwordLabel: "Password",
      errors: false
        };
  },
  computed: {
    ...mapState('session',["username", "password", "token", "sessionAuth"]),
    ...mapGetters('loginView', [ "getInfoSidabiMessage",
    "getUsernamePlaceHolder",
    "getPasswordPlaceHolder",
    "getBtnLogin"]),
    _infoSidabiMessage(){
      return this.getInfoSidabiMessage
    },
    _usernamePlaceHolder(){
      return this.getUsernamePlaceHolder
    },
     _passwordPlaceHolder(){
      return this.getPasswordPlaceHolder
    },
     _btnLogin(){
      return this.getBtnLogin
    }
  },
  methods: {
    ...mapActions('session',["setUsername", "setPassword", "generateToken", "login"]),

    ...mapActions('events',["alert", "warning"]),

    async handleLogin() {
      this.checkForm();
      if ( this.errors ) {
        return
      }
      await this.generateToken();
      await this.login(); // TODO - method name
      await this.doLogin();

    },
    async doLogin() {
      if (this.sessionAuth) {
        //this.$router.go("/patients")
        this.$router.push("patients");
      } else {
        //todo - deal with the error case
        return
      }
    },

    checkForm:  function () {
      this.errors = false;

      if (!this.usernameScreen) {
        this.warning(this.validation_username);
        this.errors = true
      }

      if (!this.passwordScreen) {
        this.warning(this.validation_passord);
        this.errors = true
      }
      
    },
  },
  created() {
    //this.$router.push({ name: 'patients'})
    this.$route.params.login; // 10
  },
};
</script>
<style lang='scss'>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@100&family=Noto+Sans+JP:wght@100&family=Roboto:wght@300&display=swap");
.input-card-login {
 // padding: 40px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  background: #ffffff;
  max-height: 83%;
  justify-content: center;
  justify-items: center;
  border-radius: 20px;
  //height: max-content !important;
  padding-top: calc(37% - (55px/2) - 15.5px);
  //box-shadow: 0 10px 6px -6px rgb(153, 214, 233);
  //border: 12px solid blue !important;
  & .input-card-login-title {
    & h2 {
      color: #000;
      font-family: "Lato", sans-serif;
      font-family: Lato;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 38px;
      /* identical to box height */

      text-align: center;
    }
    & h2:after {
      content: "";
      display: block;
      width: 41px;
      height: 3px;
      background: #3175d3;
      margin: 0 auto;
    }
  }
  & .aviso {
    color: #000;
    font-family: "Lato", sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: bold;
  }
  & .input-card-login-inputs {
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-self: center;
    width: calc(100% - 200px);
    //& div {
    //margin: 0;
    //}
  }
  & .btn {
    height: 40px;
    width: 182px;
    left: 0px;
    top: 0px;
    border-radius: 50px;
  }
}
</style>
