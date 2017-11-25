<template>
  <div id="headers">
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'headers',
  data () {
    return {  
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['online'].push({
      name: 'headers',
      icon: 'imgicon icon-rectangle',
      text: '头部'
    })
    // 配置模块参数   
    moduleData['headers'] = {
      style: 'width:10rem; height:1.33rem',
      tool: {
        private: {
          text: '',
          class: ''
        }, 
        public: []
      },
      createEvent: function (self, element, me) {  
        if (me.top.find('.headers').length > 1) {
          self.$notify({
            title: '警告',
            message: '您已经添加过头部公共区域',
            type: 'warning'
          }) 
          element.remove()
        }     
      },
      html: '<div class="headers module addmodule"  datatext="头部"></div>'
    }
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .canvas .headers {
    top:0!important;
  }
  .canvas .headers .resize{
    display: none;
  }
  .canvas .headers .s{
    display: block;
  }
</style>
