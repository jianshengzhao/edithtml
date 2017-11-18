<template>
  <div class="hline">
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'hline',
  data () {
    return {  
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['basic'].push({
      name: 'hline',
      icon: 'imgicon icon-level_Line',
      text: '横线'
    })
    // 配置模块参数   
    moduleData['hline'] = {
      style: 'width:10rem; height:1px',
      tool: {
        private: {
          text: '',
          class: ''
        }, 
        public: []
      },
      html: '<div class="hline module addmodule"  datatext="横线"><div class="click-hline"></div></div>'
    }
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
