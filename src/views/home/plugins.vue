<template>
  <v-container>
    <v-row class="d-flex align-center mb-1">
      <v-col class="text-left" sm="5">
        <span class="text-sm-h5" style="color: rgb(156, 156, 156);">插件</span>
      </v-col>
      <v-col class="text-right" sm="4" offset-sm="3">
        <v-icon class="mr-3 cursor-pointer" color="rgb(224, 224, 224)" size="20">mdi-bell</v-icon>
      </v-col>
    </v-row>

    <v-divider />

    <div class="d-flex flex-column align-start text-sm-body-2">
      <v-row class="mt-4">
        <v-col>
          <v-text-field
              class="ma-0 py-0 px-1"
              label="搜索插件..."
              outlined
              dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="w-100" justify="center">
        <v-col>
          <v-expansion-panels accordion>
            <v-expansion-panel
                v-for="(item, index) in pluginList"
                :key="index"
            >
              <v-expansion-panel-header>{{ item.name }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="w-100 text-justify">
                  <span>{{ item.describe }}</span>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
  name: "plugins",

  data() {
    return {
      orderUrl: 'https://billing.multilogin.com/auth',
      search_text: '',
      isShowAlert: false, // 是否显示 alert 弹窗
      pluginList: [
        {
          name: 'GeoSurf',
          describe: 'GeoSurf is a global enterprise-level proxy network. It provides an access to over 2 million residential IP addresses and can be used for accessing any types of websites. Contact customer support if you need additional information.',
          version: '1.0',
          publisher: 'Multilogin Ltd.',
          contact: 'support@multilogin.com'
        },
        {
          name: 'GeoSurf',
          describe: 'GeoSurf is a global enterprise-level proxy network. It provides an access to over 2 million residential IP addresses and can be used for accessing any types of websites. Contact customer support if you need additional information.',
          version: '1.0',
          publisher: 'Multilogin Ltd.',
          contact: 'support@multilogin.com'
        },
        {
          name: 'GeoSurf',
          describe: 'GeoSurf is a global enterprise-level proxy network. It provides an access to over 2 million residential IP addresses and can be used for accessing any types of websites. Contact customer support if you need additional information.',
          version: '1.0',
          publisher: 'Multilogin Ltd.',
          contact: 'support@multilogin.com'
        }
      ]
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

.search_input {
  border: solid 2px rgb(25, 118, 210);
  border-radius: 6px;
}

.search_input input {
  height: unset;
  padding: 5px 0;
}
</style>

<style>

.search_input .v-label {
  background: white;
  padding: 0 10px;
}

.v-overflow-btn .v-input__slot::before {
  border-color: grey !important;
}
</style>
