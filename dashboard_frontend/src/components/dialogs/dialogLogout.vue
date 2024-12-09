<template>
  <v-dialog v-model="dialogLogout" scrollable max-width="265px">
    <v-card>
      <v-card-title>Sair</v-card-title>
      <v-card-text
        style="height: auto;align-items: center;justify-content: center;"
      >
        Você tem certeza que deseja sair?
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel()" color="red" text>
          Cancelar
        </v-btn>

        <v-btn @click="logout()" color="blue" text>
          Sim, sair
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import eventBus from "../../events/EventBus";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialogLogout: false
    };
  },
  methods: {
    ...mapActions("session", ["setUsername", "setPassword", "setToken"]),
    cancel() {
      this.dialogLogout = false;
    },
    logout() {
      this.setUsername("");
      this.setPassword("");
      window.localStorage.clear();
      this.dialogLogout = false;
      window.location.reload();
    }
  },

  beforeCreate() {
    eventBus.$on("open-dialog-logout", () => {
      this.dialogLogout = true;
    });
  }
};
</script>

<style lang="scss"></style>
