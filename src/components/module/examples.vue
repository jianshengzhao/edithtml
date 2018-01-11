<template>
  <div class="examples">
    
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'examples',
    data: function() {
      return {}
    },
    created: function () {
      let self = this    
      let moduleData = self.$parent.datahtml    
    
      moduleData['toallGroup']['basic'].push({
        name: 'picture',
        icon: 'imgicon icon-picture',
        text: '图片'
      })    
      moduleData['picture'] = {
        style: 'width:243px; height:144px',
        tool: {
          private: {
            text: '编辑图片',
            class: 'st-picture'
          },
          public: ['b', 'c', 'd','f', 'e']
        },
        // resize: ['e', 'w'], // 拉伸方向: 默认为空,自由拉伸。不为空时选填（nw sw ne se e n w s）,空数组则隐藏小圆点
        // // 方法列表
        // resizeMousemove: function (self, parent, resizeBox) { // 拖动小圆点拉伸模块形状时的回调,回调参数:self指向主实例, parent当前要操作的模块, resizeBox选中模块的描边
        //   // let picimg = parent.find('img')
        //   // let picBox = parent.find('.picBox')  
        //   // if (picBox.hasClass('round')||picBox.hasClass('square')) {
        //   //   if(self.inp_h < self.inp_w) {
        //   //     picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
        //   //   } else {
        //   //     picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
        //   //   }
        //   // } else {
        //   //   picimg.css('width', self.inp_w)
        //   // }
        //   // resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        // },
        // resizeMouseUp: function (self, parent) { // 拖动小圆点拉伸松开鼠标结束拖动时的回调，回调参数:self指向主实例, parent当前要操作的模块,
        //   // if(parent.find("#schoolmap").hasClass("schoolmap_box")){
        //   //   parent.find("#schoolmap").remove();
        //   //   var schoolmap = '<div class="schoolmap_box" id="schoolmap"></div>';
        //   //   parent.append(schoolmap);
        //   //   self.$refs.information.createmap()        
        //   //   resizeBox.hide();
        //   // }
        // },
        // attributeChange: function (self, type, element) { // 属性栏手动改变值时的回调，回调参数:self指向主实例, type将要改变的属性, element当前选中的模块
        //   // if (type == 'width' || type == 'height') {
        //   //   let resizeBox = element.find('.resizeBox')
        //   //   if (element.hasClass('picture')) {            
        //   //     let picimg = element.find('img')
        //   //     let picBox = element.find('.picBox')
        //   //     if (picBox.hasClass('round')||picBox.hasClass('square')) {
        //   //       if(self.inp_h < self.inp_w) {
        //   //         picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
        //   //       } else {
        //   //         picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
        //   //       }
        //   //     } else {
        //   //       picimg.css('width', self.inp_w)
        //   //     }
        //   //   }          
        //   //   resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        //   // }
        // beforeSelecting: function (self, element, me) { // 选中元素的回调，回调参数:self指向主实例, element当前要操作的模块, me指向tool.js
        //   let allcourse = parseInt(element.find('.allcourse').css('height'))
        //   let second_mune_ul = parseInt(element.find('.second_mune_ul').css('height'))
        //   element.css('height', allcourse + second_mune_ul)
        //   element.find('.resizeBox').css('height', allcourse + second_mune_ul)
        //   element.find('.second_mune_ul').show()        
        // },
        // cancelSelect: function (self, element, me) { // 取消选中的回调，回调参数:self指向主实例, element当前要操作的模块, me指向tool.js
        //   let allcourse = parseInt(element.find('.allcourse').css('height'))
        //   var carouseldata = element.attr('carouseldata')
        //   if(carouseldata){
        //     var jsoncarouseldata = me.$.parseJSON(carouseldata)
        //     if(jsoncarouseldata.type == '2'){
        //       element.css('height', allcourse)
        //       element.find('.second_mune_ul').hide()
        //     }
        //   }
        // },
        // createEvent: function (self, element, me) { // 添加元素时的回调，回调参数:self指向主实例, element当前添加的模块
        //   self.$refs.advert.show(self, element)
        // },
        // container: true, // 是否可以为容器
        // containerClass: '.tab_content .active', // 可以添加模块的容器节点，（填：class名）
        // containerOffset: { // 实际容器与容器父模块的相对位置。y：向上的距离，x: 向左的距离用容器内的相对坐标计算。
        //   y: 28,
        //   x: 0
        // }, 
        // AddModuleRule: function (box) { // 向添加模块限制的回调，回调参数:box将要添加的容器节点
        //   if (box.attr('class') == 'active cont' || box.attr('class') == 'cont active'){
        //     self.$notify({
        //       title: '警告',
        //       message: '标签页中不可插入标签页',
        //       type: 'warning'
        //     })
        //     return false
        //   } else {
        //     return true
        //   } 
        // },
        html: '<div class="picture module addmodule"  datatext="图片"><a class="picBox"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"></a></div>'
      }
    },
    methods: {
      dialogEditorEvent: function () {
      },
      show: function (element) {
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
