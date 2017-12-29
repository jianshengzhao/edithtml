<template>
  <div id="parent">
    <router-view></router-view> 
  </div>
</template>
<script>
  import '@/assets/common.css'
  import '@/assets/module.css'  
  // import '@/assets/iconfont/demo.css'
  import '@/assets/border/iconfont.css' 
  import '@/assets/iconfont/maodaofont.css'
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)
  export default {
    name: 'parent'
  }
</script>
<style>
  #parent{
    width: 100%;
    height: 100%;
  }
</style>
