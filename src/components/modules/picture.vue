<template>
  <div class="picture">
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'picture',
  data () {
    return {  
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['basic'].push({
      name: 'picture',
      icon: 'imgicon icon-picture',
      text: '图片'
    })
    // 配置模块参数   
    moduleData['picture'] = {
      style: 'width:5rem; height:2.88rem',
      tool: {
        private: {
          text: '编辑图片',
          class: 'st-picture'
        },
        public: ['b', 'c', 'd', 'e']
      },
      html: '<div class="picture module addmodule"  datatext="图片"><a class="picBox"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"></a></div>'
    }
  },
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
