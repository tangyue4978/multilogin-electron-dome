<template>
  <v-container>
    <v-row class="d-flex align-center mb-1">
      <v-col class="text-left" sm="5">
        <span class="text-sm-h5" style="color: rgb(156, 156, 156);">帮助 & 支持</span>
      </v-col>
      <v-col class="text-right" sm="4" offset-sm="3">
        <v-icon class="mr-3 cursor-pointer" color="rgb(224, 224, 224)" size="20">mdi-bell</v-icon>
      </v-col>
    </v-row>

    <div class="table_box d-flex flex-column text-sm-body-2">
      <v-row class="d-flex justify-center">
        <v-col class="table_item" sm="4" style="border-right: none; border-bottom: none;">
          <span>有一个技术相关的问题？</span>
        </v-col>

        <v-col class="table_item" sm="4" style="border-bottom: none;">
          <span>有一个软件功能方面的问题？</span>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col class="table_item" sm="4" style="border-right: none;">
          <span>不知道如何使用软件？</span>
        </v-col>

        <v-col class="table_item" sm="4" style="border: solid 1px #ccc;">
          <span>仍然没有找到答案？</span>
        </v-col>
      </v-row>
    </div>

    <div class="alert_area_box">
      <v-alert
          :value="isShowAlert"
          dense
          text
          type="success"
      >
        已将令牌复制到剪贴板。
      </v-alert>
    </div>
  </v-container>
</template>

<script>
import { shell } from "electron";

export default {
  name: "services",

  data() {
    return {
      orderUrl: 'https://billing.multilogin.com/auth',
      isShowAlert: false // 是否显示 alert 弹窗
    }
  },

  mounted() {

  },

  methods: {
    // 打开默认浏览器链接
    openUrl(url) {
      shell.openExternal(url)
    },

    // 复制文字
    toCopyText(_text) {
      const { clipboard } = require('electron')
      clipboard.writeText(_text)
      this.isShowAlert = true

      setTimeout(() => {
        this.isShowAlert = false
      }, 1500)
    },

    // 打开文件夹
    openFileHandler(_fileUrl) {
      const { shell } = require("electron");

      const fs = require("fs");

      console.log(fs.existsSync(_fileUrl))
      if (!fs.existsSync(_fileUrl)) return false
      shell.showItemInFolder(_fileUrl)
    },

    // 返回登录页
    toBackLogin() {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 96vh;
}

.alert_area_box {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.table_box {
  margin-top: 120px;
}

.table_item {
  height: 150px;
  border: solid 1px #cccccc;
}
</style>
