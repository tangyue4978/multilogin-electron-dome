<template>
  <v-container>
    <v-row class="config_header d-flex align-center mb-1">
      <v-col class="text-left" sm="5">
        <span class="text-sm-h5" style="color: rgb(156, 156, 156);">浏览器配置文件列表</span>
      </v-col>
      <v-col class="text-left" sm="2">
        <div class="mode_box d-flex" @click="currentMode = (currentMode === 1 ? 0 : 1)">
          <div :class="['mode_item', 'cursor-pointer', 'd-flex', 'justify-center', 'align-center', currentMode === 0 ? 'active' : '']">
            <v-icon color="#000000" size="16">mdi-cloud</v-icon>
          </div>
          <div :class="['mode_item', 'cursor-pointer', 'd-flex', 'justify-center', 'align-center', currentMode === 1 ? 'active' : '']">
            <v-icon color="#000000" size="16">mdi-television</v-icon>
          </div>
        </div>
      </v-col>
      <v-col class="text-right" sm="4" offset-sm="1">
        <v-icon class="mr-3 cursor-pointer" color="rgb(224, 224, 224)" size="20">mdi-bell</v-icon>
      </v-col>
    </v-row>

    <v-tabs v-model="currentTab">
      <v-tab>所有浏览器配制文件</v-tab>
      <v-tab>分组</v-tab>
      <v-tab>未分配</v-tab>
    </v-tabs>

    <v-divider />

    <div class="config_body">
      <div class="no_config d-flex flex-column justify-center align-center text-caption">
          <v-img width="200" contain max-height="160" :src="require('../../assets/welcome.png')"></v-img>
          <p>
            <span>欢迎使用 </span>
            <span class="font-weight-bold">Multilogin !</span>
          </p>
          <span>您没有有效的订购方案</span>
          <p>
            <span>若要创建浏览器配置文件，请</span>
            <span class="blue--text cursor-pointer" @click="openUrl(orderUrl)"> 订购 </span>
            <span>通过我们的网址。</span>
          </p>
          <v-btn class="white--text text-caption" color="rgb(120, 179, 0)" @click="openUrl(orderUrl)">现在订购</v-btn>
        </div>
    </div>
  </v-container>
</template>

<script>
import {shell} from "electron";

export default {
  name: "config_list",

  data() {
    return {
      currentMode: 0, // 当前模式
      currentTab: 0, // 当前 Tab
      orderUrl: 'https://billing.multilogin.com/auth'
    }
  },

  watch:{
    // 监听路由变化
    $route(to){
      this.currentTab = parseInt(to.query.tab)
    }
  },

  mounted() {
    let query = this.$route.query

    if (query.tab) {
      this.currentTab = parseInt(query.tab || '')
    }
  },

  methods: {
    // 打开默认浏览器链接
    openUrl(url) {
      shell.openExternal(url)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 96vh;
}

.mode_box {
  width: 100px;
  height: 33px;
  background: rgb(214, 214, 214);
  border-radius: 20px;
  border: solid 1px rgb(214, 214, 214);
}

.mode_box .mode_item {
  width: 50px;
  height: 100%;
  border-radius: 20px;
}

.mode_box .mode_item.active {
  background: white;
}

.config_body {
  width: 100%;
  height: calc(96vh - 100px);
}

.config_body .no_config {
  width: 100%;
  height: 100%;
}
</style>
