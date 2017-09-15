// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import parent from './parent'
import router from './router'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
window.host = process.env.API_ROOT

/* eslint-disable no-new */
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})
new Vue({
  el: '#parent',
  router,
  template: '<parent/>',
  // components: { App }
  components: { parent }
})
