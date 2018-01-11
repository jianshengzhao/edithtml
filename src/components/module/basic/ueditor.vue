<template>
  <div class="ueditor">
    <el-dialog
      title="文本"
      :visible.sync="dialogEditor"
       class="ueditor el-dialog--small">
      <div ref="ueditor" class='editorC'></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditor = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditorEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
function guidGenerator () {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }
import $ from 'jquery'
export default {
  name: 'ueditor',
  data () {
    return {
      dialogEditor: false,
      editorConfig: {
        zIndex: 3000,
        toolbars: [[
          'undo', 'redo', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', 'forecolor', 'backcolor', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'simpleupload', 'emotion', 'spechars', '|', 'selectall', 'removeformat'
        ]]
      }
    }
  },
  created: function () {
    let self = this
    self.ueditorid = guidGenerator()
    let moduleData = self.$parent.datahtml
  // ---------------------- 矩形 -------------------
    moduleData['toallGroup']['basic'].push({
      name: 'rectangle',
      icon: 'imgicon icon-rectangle',
      text: '矩形'
    })
    moduleData['rectangle'] = { 
      style: 'width: 80px; height: 40px',
      tool: {
        private: {
          text: '',
          class: ''
        }, // 私有工具
        public: [ 'd','f', 'e'] // 公有工具
      },
      html: '<div class="rectangle module addmodule" datatext="矩形"><a></a></div>'
    }  
  // ---------------------- 圆形 -------------------
    moduleData['toallGroup']['basic'].push({
      name: 'radius',
      icon: 'imgicon icon-round',
      text: '圆形'
    })
    moduleData['radius'] = { 
      style: 'width:50px; height:50px',
      tool: {
        private: {
          text: '',
          class: ''
        },
        public: [ 'd','f', 'e']
      },
      html: '<div class="radius module addmodule"  datatext="圆形"><a></a></div>'
    }
  // ---------------------- 文本 -------------------
    moduleData['toallGroup']['basic'].push({
      name: 'editor',
      icon: 'imgicon icon-text',
      text: '文本'
    })    
    moduleData['editor'] = { 
      style: 'width:96px; height:40px',
      tool: {
        private: {
          text: '编辑文本',
          class: 'st-text'
        },
        public: ['f','e']
      },
      html: '<div class="editor module addmodule"  datatext="富文本"><a><div class="editorCon">请输入内容</div></a></div>'
    }
  // ---------------------- 图片 -------------------
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
      resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调
        let picimg = parent.find('img')
        let picBox = parent.find('.picBox')  
        if (picBox.hasClass('round')||picBox.hasClass('square')) {
          if(self.inp_h < self.inp_w) {
            picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
          } else {
            picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
          }
        } else {
          picimg.css('width', self.inp_w)
        }
        resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
      },
      attributeChange: function (self, type, element, val) { // 属性变化事件
        if (type == 'width' || type == 'height') { 
          let resizeBox = element.find('.resizeBox')
          if (element.hasClass('picture')) {            
            let picimg = element.find('img')
            let picBox = element.find('.picBox')
            if (picBox.hasClass('round')||picBox.hasClass('square')) {
              if(self.inp_h < self.inp_w) {
                picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
              } else {
                picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
              }
            } else {
              picimg.css('width', self.inp_w)
            }
          }          
          resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        }
        if (type.indexOf('boxShadow') > -1) {
          element.css('boxShadow', 'none')
          let picBox = element.find('.picBox')
          switch (type) {
            case 'boxShadow':
              if (!val) {
                picBox.css('boxShadow', 'none')
              } else {
                self.inp_weight_x = 1
                self.inp_weight_y = 1
                self.inp_blur = 1
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)
              }
              break
            case 'boxShadowX':
              picBox.css('boxShadow', val + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)              
              break
            case 'boxShadowY':
              picBox.css('boxShadow', self.inp_weight_x + 'px ' + val + 'px ' + self.inp_blur + 'px ' + self.bw_color)
              break
            case 'boxShadowBlur':
              picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + val + 'px ' + self.bw_color)
              break
            case 'boxShadowColor':
              picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + val)
              break
          }
        }
      },
      beforeSelecting: function (self, element, me) { // 选中元素的回调，回调参数:self指向主实例, element当前要操作的模块, me指向tool.js
        clearTimeout(self.beforeTime)        
        self.beforeTime = setTimeout(function() {
          let picBox = element.find('.picBox')          
          if (picBox.css('boxShadow') == 'none') {
            self.check_shadow = false
            self.inp_weight_x = ''
            self.inp_weight_y = ''
            self.inp_blur = ''
            self.bw_color = '#ccc'
          } else {
            let shadowArr = picBox.css('boxShadow').split(' ')
            self.check_shadow = true
            self.inp_weight_x = shadowArr[3].split('p')[0]
            self.inp_weight_y = shadowArr[4].split('p')[0]
            self.inp_blur = shadowArr[5].split('p')[0]
            self.bw_color = shadowArr[0] + shadowArr[1] + shadowArr[2]
          }          
        },0)
      },
      html: '<div class="picture module addmodule"  datatext="图片"><a class="picBox"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"></a></div>'
    }
  // ---------------------- 横线 -------------------
    moduleData['toallGroup']['basic'].push({
      name: 'hline',
      icon: 'imgicon icon-level_Line',
      text: '横线'
    })    
    moduleData['hline'] = { 
      style: 'width:200px; height:1px',
      tool: {
        private: {
          text: '',
          class: ''
        },
        public: []
      },
      html: '<div class="hline module addmodule"  datatext="横线"><div class="click-hline"></div></div>'
    }
  // ---------------------- 竖线 -------------------
    moduleData['toallGroup']['basic'].push({
      name: 'sline',
      icon: 'imgicon icon-vertical_Line',
      text: '竖线'
    })    
    moduleData['sline'] = { 
      style: 'width:1px; height:200px',
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
  methods: {
    dialogEditorEvent: function () {
        let self = this
        let content = self.editor.getContent()
        let h = $('.ueditor .edui-editor-iframeholder').css('height')
        self.dialogEditor = false
        // $('.on_module').find('.editorCon').html(content)
        self.element.children('a').children('.editorCon').html(content)
        let textw = $('.on_module').innerWidth()
        let texth = $('.on_module').innerHeight()
        $('.on_module .resizeBox').css({
          'width':textw,
          'height':texth
        })
    },
    show: function (element) {
      let self = this
      self.element = element
      let html = element.children('a').children('.editorCon').html()
      self.dialogEditor = true
      self.$nextTick(function () {
      self.$refs.ueditor.id = self.ueditorid
      // $('.ueditor .el-dialog').css('width', w + 40)
      // $('.ueditor .edui-editor,.ueditor .edui-editor-iframeholder').css('width', w)
      self.editor = window.UE.getEditor(self.ueditorid, self.editorConfig)
      self.editor.ready(function () {
        self.editor.setContent(html)
      })
    })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

  .editorC{
    margin: 0 auto;
    min-height: 400px
  }
  .el-dialog__footer {
    padding: 10px 10px 15px;
  }
  .el-dialog--small .el-dialog{
    width: 1000px;
  }
  .ueditor .el-dialog__body{
    padding: 5px 10px;
  }
</style>
