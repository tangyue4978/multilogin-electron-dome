import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /*************** 登录注册模块 ****************/
  {
    path: '',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/login/login')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册'
    },
    component: () => import('../views/login/register')
  },
  {
    path: '/password_forget',
    name: 'PasswordForget',
    meta: {
      title: '忘记密码'
    },
    component: () => import('../views/login/password_forget')
  },

  /*************** 登录注册模块 ****************/
  {
    path: '/homepage',
    name: 'Homepage',
    meta: {
      title: '首页'
    },
    component: () => import('../views/home/homepage'),
    children: [
      {
        path: '/',
        name: 'ConfigList',
        meta: {
          title: '浏览器配置文件列表'
        },
        component: () => import('../views/home/config_list')
      },
      {
        path: '/account',
        name: 'Account',
        meta: {
          title: '我的账户'
        },
        component: () => import('../views/home/account')
      },
      {
        path: '/plugins',
        name: 'Plugins',
        meta: {
          title: '插件'
        },
        component: () => import('../views/home/plugins')
      },
      {
        path: '/services',
        name: 'Services',
        meta: {
          title: '客服中心'
        },
        component: () => import('../views/home/services')
      }
    ],
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面 title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router
