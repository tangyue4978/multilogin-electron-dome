<template>
  <v-container class="service_container">
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
        <v-col class="table_item d-flex flex-column align-center justify-space-around" sm="4" style="border-right: none; border-bottom: none;">
          <v-icon color="blue accent-4" size="45">mdi-wrench</v-icon>
          <span>有一个技术相关的问题？</span>
          <span class="cursor-pointer blue--text text-caption" @click="openUrl(malfunctionDocUrl)">查看“故障排除”相关的文章</span>
        </v-col>

        <v-col class="table_item d-flex flex-column align-center justify-space-around" sm="4" style="border-bottom: none;">
          <v-icon color="blue accent-4" size="45">mdi-information</v-icon>
          <span>有一个软件功能方面的问题？</span>
          <span class="cursor-pointer blue--text text-caption" @click="openUrl(softwareDocUrl)">查看文档资料</span>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col class="table_item d-flex flex-column align-center justify-space-around" sm="4" style="border-right: none;">
          <v-icon color="blue accent-4" size="45">mdi-school</v-icon>
          <span>不知道如何使用软件？</span>
          <span class="cursor-pointer blue--text text-caption" @click="openUrl(studyDocUrl)">查看学习资料</span>
        </v-col>

        <v-col class="table_item d-flex flex-column align-center justify-space-around" sm="4" style="border: solid 1px #ccc;">
          <v-icon color="blue accent-4" size="45">mdi-email</v-icon>
          <span>仍然没有找到答案？</span>
          <v-dialog
              v-model="isShowDialog"
              width="450px"
              :scrollable="false"
          >
            <template v-slot:activator="{ on, attrs }">
              <span class="cursor-pointer blue--text text-caption" v-bind="attrs" v-on="on">联系客服</span>
            </template>
            <v-card>
              <v-card-title class="w-100 d-flex justify-space-between align-center pb-4" style="background: rgb(23, 75, 201);">
                <span class="text-body-1 white--text">发送消息</span>
                <v-icon color="white cursor-pointer" @click="isShowDialog = false">mdi-close</v-icon>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-row>
                      <v-col cols="12" class="text-left">
                        <span class="text-caption">请您给我们的技术支持团队发送消息，我们将尽快联系您。我们的回复将被发送到 {{ userInfo.email }}</span>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-text-field
                            v-model="formData.title"
                            label="主题 *"
                            :rules="titleRules"
                            outlined
                            required
                            dense
                        ></v-text-field>
                      </v-col>
                      <v-col
                          cols="12"
                      >
                        <v-textarea
                            v-model="formData.content"
                            label="信息内容 *"
                            :rules="contentRules"
                            outlined
                            required
                            dense
                            rows="3"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions class="d-flex justify-center align-center pb-8">
                <v-btn
                    color="blue lighten-4"
                    class="blue--text text-caption"
                    depressed
                    @click="sendMessage"
                >
                  发送
                </v-btn>
                <v-btn
                    color="grey lighten-3"
                    class="grey--text text-caption"
                    depressed
                    @click="isShowDialog = false"
                >
                  取消
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        消息发送成功。
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
      malfunctionDocUrl: 'https://docs.multilogin.com/l/zh/category/zs3p07okfz-?utm_source=app&utm_medium=txt&utm_campaign=help-tshooting',
      softwareDocUrl: 'https://docs.multilogin.com/l/zh?utm_source=app&utm_medium=txt&utm_campaign=help-documentation',
      studyDocUrl: 'https://multilogin.com/zh-hans/academy/?utm_source=app&utm_medium=txt&utm_campaign=help-academy',
      isShowDialog: false, // 是否显示 dialog 弹窗
      isShowAlert: false, // 是否显示 alert 弹窗
      formData: {
        title: '',
        content: ''
      },
      titleRules: [
        v => !!v || '请输入主题'
      ],
      contentRules: [
        v => !!v || '请输入信息内容'
      ],
      userInfo: {
        email: 'chaoslover@126.com'
      }
    }
  },

  mounted() {

  },

  methods: {
    // 打开默认浏览器链接
    openUrl(url) {
      shell.openExternal(url)
    },

    // 发送消息
    sendMessage() {
      if (this.$refs.form.validate()) {
        this.isShowDialog = false
        this.isShowAlert = true

        setTimeout(() => {
          this.isShowAlert = false
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
.service_container {
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
  height: 200px;
  border: solid 1px #cccccc;
}

.w-100 {
  width: 100% !important;
}
</style>
