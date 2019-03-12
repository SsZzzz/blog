import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VeeValidate, { Validator } from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import api from './api/api'
import 'font-awesome/css/font-awesome.css'
import '@/assets/css/normalize.css'
import '@/assets/css/base.scss'
import '@/assets/css/animate.css'

import message from './components/Message'

Validator.localize('zh_CN', zh_CN)
const config = {
  locale: 'zh_CN'
}
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(VeeValidate, config)
Vue.use(message)

const dictionary = {
  zh_CN: {
    messages: {
      required: (field) => "请输入" + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      username: '账号',
      captcha: '验证码'
    }
  }
};
Validator.localize(dictionary);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
