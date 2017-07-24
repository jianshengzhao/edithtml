import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/preview',
      component: function (resolve) { require.ensure([], function (require) { resolve(require('@/components/preview.vue')) }, 'preview') },
      children: []
    }
  ]
})
