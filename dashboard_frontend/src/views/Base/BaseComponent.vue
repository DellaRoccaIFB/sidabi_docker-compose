<template>
  <div>
    <side-bar></side-bar>
    <!-- <alert /> -->
    <v-main class="pl-2 pr-2">
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
import SideBar from "@/components/lib/SideBar.vue";

export default {
  name: "Base",

  components: {
    SideBar
  },
  mounted() {
    this.$route.params.login; // 10
  }
};
</script>
