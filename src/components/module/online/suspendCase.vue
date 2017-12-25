<template>
  <div id="suspendCase">
   
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'suspendCase',
  data () {
    return {      
    }
  },
  created: function () {   
    let self = this
    let moduleData = self.$parent.datahtml  
    moduleData['toallGroup']['online'].push({
      name : 'suspend',
      icon: 'imgicon icon-addsearch',
      text: '悬浮框'
    })
    
    moduleData['suspend'] = { 
      style: 'width: 200px; height: 120px',
      tool: {
        private: {
          text: '',
          class: ''
        },
        public: []
      },
      container: true, // 是否为容器
      containerClass: '.suspenddiv', // 作为容器节点的class名称
      containerOffset: {
        y: 0,
        x: 0
      }, 
      AddModuleRule: function (box) { // 添加模块的限制
        if (!box.hasClass('c_top')){
          self.$notify({
            title: '警告',
            message: '悬浮框只能添加在页头选区',
            type: 'warning'
          })
          return false
        } else {
          return true
        } 
      },
      // resize: undifend, // 拉伸方向: 默认为空,自由拉伸
      // resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调
      // },
      // beforeSelecting: function (self, element, me) { // 选中元素要执行的特殊操作 
      // }, 
      createEvent: function (self, element, me) {
      },
      html:'<div class="suspend module addmodule" datatext="悬浮框"><div class="suspenddiv"></div></div>' 
    } 
  },
  methods: {
    show: function () {
    }
  }
}
</script>
<style >
  
</style>
