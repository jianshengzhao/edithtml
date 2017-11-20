<template>
  <div class="rectangle">
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'rectangle',
  data () {
    return {  
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['basic'].push({
      name: 'rectangle',
      icon: 'imgicon icon-rectangle',
      text: '矩形'
    })
    // 配置模块参数   
    moduleData['rectangle'] = {
      style: 'width: 3rem; height: 1rem',
      tool: {
        private: {
          text: '',
          class: ''
        }, // 私有工具
        public: ['e'] // 公有工具
      },
      html: '<div class="rectangle module addmodule" datatext="矩形"><a></a></div>'
    }
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
