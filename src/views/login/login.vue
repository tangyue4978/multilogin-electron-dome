<template>
  <v-main class="d-flex align-center">
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <v-col class="login_box" sm="6" md="6" lg="4">
          <v-row>
            <v-col class="d-flex flex-column align-center">
              <v-icon color="blue" size="60">mdi-account-circle-outline</v-icon>
              <span class="text-h5 blue--text">用户登录</span>
            </v-col>
          </v-row>

          <form>
            <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="电子邮箱地址"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
            ></v-text-field>

            <v-text-field
                v-model="password"
                :error-messages="passwordErrors"
                label="密码"
                :type="show_password ? 'text' : 'password'"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
            >
              <v-icon
                  slot="append"
                  color="black"
                  @click="show_password = !show_password"
              >
                {{ show_password ? 'mdi-eye' : 'mdi-eye-off' }}
              </v-icon>
            </v-text-field>

            <v-btn
                class="mt-5 white--text"
                color="blue"
                @click="onSubmit"
            >
              登录
              <v-icon right>mdi-login</v-icon>
            </v-btn>
          </form>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-space-between" sm="6" md="6" lg="4">
          <router-link to="/register" replace>
            <span class="white--text text-caption cursor-pointer">创建新账户</span>
          </router-link>
          <router-link to="/password_forget" replace>
            <span class="white--text text-caption cursor-pointer">忘记密码？</span>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: "login",

  mixins: [validationMixin], // 验证插件
  // 验证
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
  },

  data() {
    return {
      email: '', // 邮箱
      password: '', // 密码
      show_password: false // 显示密码
    }
  },

  computed: {
    // 邮箱验证
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('必须填写有效邮箱')
      !this.$v.email.required && errors.push('请输入邮箱')
      return errors
    },

    // 密码验证
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('密码最少为6位字符')
      !this.$v.password.required && errors.push('请输入密码')
      return errors
    }
  },

  methods: {
    // 提交表单
    onSubmit() {
      this.$v.$touch()

      if (!(this.emailErrors.length || this.passwordErrors.length)) {
        this.$router.push('/homepage')
      }
    }
  }
}
</script>

<style scoped>
.v-main {
  width: 100vw;
  height: 100vh;
  background: rgb(35, 106, 213);
}

.login_box {
  background: #ffffff;
  padding: 7vh 5vw;
}
</style>
