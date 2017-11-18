<template>
  <div class="sline">
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'sline',
  data () {
    return {  
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['basic'].push({
      name: 'sline',
      icon: 'imgicon icon-vertical_Line',
      text: '竖线'
    })
    // 配置模块参数   
    moduleData['sline'] = {
      style: 'width:1px; height:10rem',
      tool: {
        private: {
          text: '',
          class: ''
        }, 
        public: []
      },
      html: '<div class="sline module addmodule"  datatext="竖线"><div class="click-sline"></div></div>'
    }
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
