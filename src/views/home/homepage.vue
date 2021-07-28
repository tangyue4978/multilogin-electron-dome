<template>
  <div class="homepage_box">
    <Sidebar @changeMenu="changeMenu" />

    <v-container class="main_box">
      <router-view :key="$route.fullpath" />
    </v-container>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar";

export default {
  name: "homepage",

  components: {
    Sidebar,
  },

  mounted() {

  },

  methods: {
    // 切换菜单
    changeMenu(router) {
      this.$router.replace(router).catch(() => {})
    }
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
