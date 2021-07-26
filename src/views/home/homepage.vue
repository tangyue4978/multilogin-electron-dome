<template>
  <div class="homepage_box">
    <Sidebar />

    <v-container class="main_box">
      <router-view />
    </v-container>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar";

export default {
  name: "homepage",

  components: {
    Sidebar,
  }
}
</script>

<style scoped>
.homepage_box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}

.main_box {
  width: calc(100vw - 256px);
}
</style>
