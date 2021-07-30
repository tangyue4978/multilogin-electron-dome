<template>
  <v-container>
    <v-row class="d-flex align-center mb-1">
      <v-col class="text-left" sm="5">
        <span class="text-sm-h5" style="color: rgb(156, 156, 156);">我的账户</span>
      </v-col>
      <v-col class="text-right" sm="4" offset-sm="3">
        <v-icon class="mr-3 cursor-pointer" color="rgb(224, 224, 224)" size="20">mdi-bell</v-icon>
      </v-col>
    </v-row>

    <v-tabs v-model="currentTab">
      <v-tab>我的账户</v-tab>
      <v-tab>偏好设置</v-tab>
    </v-tabs>

    <v-divider />

    <div class="d-flex flex-column align-start text-sm-body-2" v-if="!currentTab">
      <v-row class="w-100 mt-3">
        <v-col class="text-left" sm="2">
          <span class="font-weight-bold">账户邮箱</span>
        </v-col>
        <v-col class="text-left">
          <span>{{ userInfo.account }}</span>
        </v-col>
      </v-row>

      <v-row class="w-100 mt-1">
        <v-col class="text-left" sm="2">
          <span class="font-weight-bold">密码</span>
        </v-col>
        <v-col class="text-left">
          <span class="cursor-pointer blue--text">更改密码</span>
        </v-col>
      </v-row>

      <v-row class="w-100 mt-1">
        <v-col class="text-left" sm="2">
          <span class="font-weight-bold">方案</span>
        </v-col>
        <v-col class="text-left">
          <span>{{ userInfo.program }}</span>
        </v-col>
      </v-row>

      <v-row class="w-100 mt-1">
        <v-col class="text-left" sm="2">
          <span class="font-weight-bold">端口号</span>
        </v-col>
        <v-col class="text-left">
          <span>{{ userInfo.port }}</span>
        </v-col>
      </v-row>

      <v-row class="w-100 mt-1 d-flex align-center">
        <v-col class="text-left" sm="2">
          <span class="font-weight-bold">令牌</span>
        </v-col>
        <v-col class="text-left" sm="8">
          <v-text-field class="ma-0 pa-0" :type="isShowEye ? 'text' : 'password'" v-model="userInfo.token" readonly hide-details>
            <v-icon
                slot="append"
                class="cursor-pointer"
                @click="isShowEye = !isShowEye"
            >
              {{ isShowEye ? 'mdi-eye' : 'mdi-eye-off' }}
            </v-icon>
          </v-text-field>
        </v-col>
        <v-col class="text-left" sm="2">
          <v-icon
              slot="append"
              class="cursor-pointer"
              @click="toCopyText(userInfo.token)"
          >
            mdi-content-copy
          </v-icon>
        </v-col>
      </v-row>

      <v-row class="w-100 mt-1">
        <v-col class="text-left" sm="2">
          <span class="font-weight-bold">日志文件</span>
        </v-col>
        <v-col class="text-left">
          <span class="cursor-pointer blue--text" @click="openFileHandler(userInfo.logFile)">打开日志文件目录</span>
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col>
          <v-btn outlined @click="toBackLogin">退出账号</v-btn>
        </v-col>
      </v-row>
    </div>

    <div class="d-flex flex-column align-start text-sm-body-2" v-else>
      <v-row class="w-100 mt-3">
        <v-col class="text-left">
          <span>应用整体设置</span>
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
  name: "account",

  data() {
    return {
      currentTab: 0, // 当前 Tab
      orderUrl: 'https://billing.multilogin.com/auth',
      userInfo: {
        account: 'chaoslover@126.com',
        password: '',
        program: 'Default (1 浏览器配置文件)',
        port: 49188,
        token: 'A1uRyH5gPq6kE_fDNVrxH3dYEdLlx7OQvSA77QO6gj1oevy1JgTBUGZxRM4OcGz5HQw4ZDzRn6uurL2WrjVHGPPjWc9ljWIIZ5oFg-A6lWDIdYqiQvJwbxNzV25ILlFZJicZ8hXTsewmo-ouhZEx5RjKUpPeeq3LZ1VWAKWvGpyxS64wuxOJfOfI-jkPklFUdJelNLiq-xU__r3Y7EIGh84725GRx9PzuYmX64_iCCCxarf8AwEKTjekMbwjo0HVyj9GZ2XpKAWA0jdWWyJ75tNAy7dDllrCwgEHcw4tMGJvjlA4R-NPBdp-RftOABLa9EmJcEp-KNO51WvZtjR8A2ax5XW7X193LWoMLr8TTjh1PXso4-IyCLZgICJJKWA_sA151elxwMb_fbIbUHP-t42p1RVk_34NPoLxkFutFMb5uFFpsmyivUNs6mHLoRSu8LTY1dsB0lPTWptTpUI1ud7zt5QPy_flAQPldDBQwfZ6VTPdEw',
        logFile: 'D:project_private'
      },
      isShowEye: false, // 是否显示令牌
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

.config_body {
  width: 100%;
  height: calc(96vh - 100px);
}

.w-100 {
  width: 100%;
}

.config_body .no_config {
  width: 100%;
  height: 100%;
}
</style>
