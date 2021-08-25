// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'

import Nav from './components/nav'
import Step from './components/step'
import Title from './components/title'
import Frame from './components/framework'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Router)
Vue.prototype.$axios = axios

Vue.component("Nav",Nav)
Vue.component("Step",Step)
Vue.component("Title", Title)
Vue.component("Frame", Frame)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
