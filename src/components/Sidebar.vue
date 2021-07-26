<template>
  <v-card
      class="sidebar_box"
      elevation="12"
  >
    <v-navigation-drawer
        color="rgb(23, 75, 201)"
        floating
        permanent
    >
      <v-row class="px-4">
        <v-col class="d-flex flex-column align-start px-4">
          <v-icon class="pt-3" color="white" size="60">mdi-account-circle-outline</v-icon>

          <span class="white--text text-caption mt-5">浏览器配置文件</span>

          <v-btn
              class="mt-2"
              color="rgba(46, 93, 206, 0.1)"
              disabled
          >
            <span class="text-caption px-5" style="color: rgb(139, 226, 258);">新建</span>
          </v-btn>
        </v-col>
      </v-row>

      <v-list
          dense
          rounded
      >
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :disabled="item.isLock"
        >
          <v-list-item-icon v-if="item.icon">
            <v-icon :color="item.isLock ? 'rgb(115, 147, 222)' : 'white'" size="20">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :style="{ color: item.isLock ? 'rgb(115, 147, 222)' : 'white' }" class="text-left">{{ item.title }}</v-list-item-title>
          </v-list-item-content>

          <template slot="default">
            <v-icon :color="item.right_icon.color" :size="item.right_icon.size" v-if="item.right_icon">{{ item.right_icon.icon }}</v-icon>
          </template>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-row>
            <v-col class="append_box mx-6 mb-6 white--text text-caption px-0">
              <div class="d-flex justify-space-between align-center px-3 pt-1 pb-2">
                <span>{{ userInfo.email }}</span>
                <v-icon class="cursor-pointer" color="white">mdi-chevron-right</v-icon>
              </div>

              <v-divider style="border-color: rgb(67, 108, 254);"></v-divider>

              <div>
                <div class="d-flex justify-space-between align-center px-3 pt-2 pb-1">
                  <span class="font-weight-bold">Default</span>
                  <span class="cursor-pointer text-decoration-underline yellow--text" @click="openUrl(update_app_url)">升级</span>
                </div>

                <div class="d-flex justify-space-between align-center px-3 pt-1 pb-2">
                  <span>浏览器配置文件</span>
                  <span>- / 1</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import {shell} from "electron";

export default {
  name: "Sidebar",

  data () {
    return {
      items: [
        {
          title: '所有浏览器配置文件',
          icon: 'mdi-home',
          isLock: false
        },
        {
          title: '团队成员',
          icon: 'mdi-account-supervisor',
          right_icon: {
            icon: 'mdi-lock',
            color: 'rgb(115, 147, 222)',
            size: 16
          },
          isLock: true
        },
        {
          title: '我的账户',
          icon: 'mdi-account-box',
          isLock: false
        },
        {
          title: '插件',
          icon: 'mdi-file-document-multiple',
          isLock: false
        },
        {
          title: '客服中心',
          icon: 'mdi-alert-circle',
          isLock: false
        },
        {
          title: '分组',
          icon: '',
          right_icon: {
            icon: 'mdi-sort-variant',
            color: 'rgba(255, 255, 255, 0.8)',
            size: 20
          },
          isLock: false
        },
        {
          title: '未分配（0）',
          icon: '',
          isLock: false
        },
      ], // 菜单
      userInfo: {
        email: 'chaoslover@126.com'
      },
      update_app_url: 'https://billing.multilogin.com/?mlEmail=chaoslover@126.com&utm_source=app&utm_medium=appLink&utm_campaign=sideBarUpgrade'
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
.sidebar_box {
  width: 256px;
  height: 100vh;
}

.v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child {
  margin-right: 12px;
}

.append_box {
  background: rgb(35, 84, 204);
}
</style>
