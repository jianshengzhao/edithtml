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
Vue.filter('time', function (value) {
    let d = new Date(parseInt(value) * 1000)
    let year = d.getFullYear(),
    month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1):d.getMonth()+1,
    date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
    hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
   	minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
    second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
})
new Vue({
  el: '#parent',
  router,
  template: '<parent/>',
  // components: { App }
  components: { parent }
})
