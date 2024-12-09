<template>
  <v-app id="app">
    <alert></alert>
    <dialog-language></dialog-language>
    <dialog-logout></dialog-logout>
    <router-view> </router-view>
  </v-app>
</template>

<script>
// import SideBar from './components/lib/SideBar.vue';

import DialogLanguage from "./components/dialogs/dialogLanguage.vue";
import DialogLogout from "./components/dialogs/dialogLogout.vue";

import Alert from "./components/lib/Alert.vue";

export default {
  name: "App",

  components: {
    DialogLanguage,
    DialogLogout,
    Alert
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
@import "~bootstrap/dist/css/bootstrap.css";

#app {
  font-family: "Lato", sans-serif;
  // font-weight: 24px;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  //color: #2c3e50;
  //margin-top: 60px;
  .v-main__wrap {
    padding: 1% 10% 0 10% !important;
  }
}
</style>
