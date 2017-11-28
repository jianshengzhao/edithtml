<template>
  <div class="ueditor">
    <el-dialog
      title="文本"
      :visible.sync="dialogEditor"
      size="small" class="ueditor">
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
  },
  methods: {
    dialogEditorEvent: function () {
        let self = this
        let content = self.editor.getContent()
        let h = $('.ueditor .edui-editor-iframeholder').css('height')
        self.dialogEditor = false
        $('.on_module').find('.editorCon').html(content)
        let textw = $('.on_module').innerWidth()
        let texth = $('.on_module').innerHeight()
        $('.on_module .resizeBox').css({
          'width':textw,
          'height':texth
        })
    },
    show: function () {
      let self = this
      let html = $('.on_module').find('.editorCon').html()
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
  .el-dialog--small{
    width: 1000px;
  }
  .ueditor .el-dialog__body{
    padding: 5px 10px;
  }
</style>
