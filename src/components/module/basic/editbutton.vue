<template>
  <div class="editbuttondia">
    <el-dialog
      title="设置样式"
      :visible.sync="dialogeditbutton"
      class="el-dialog-editbutton">
      <el-tabs v-model="activeName">
        <el-tab-pane label="样式" name="first">
          <el-row>
            <el-col>
              <div @click="editbutton('button_radius')" :class="buttontype=='button_radius'?'editbuttonlist typeactive':'editbuttonlist'">
                  <div class="buttonstyle button_radius">
                  </div>
              </div>
              <div @click="editbutton('button_rightangle')" :class="buttontype=='button_rightangle'?'editbuttonlist typeactive':'editbuttonlist'">
                  <div class="buttonstyle button_rightangle">
                  </div>
              </div>
              <div @click="editbutton('button_border')" :class="buttontype=='button_border'?'editbuttonlist typeactive':'editbuttonlist'">
                  <div class="buttonstyle button_border">
                  </div>
              </div>
              <div @click="editbutton('button_gradients')" :class="buttontype=='button_gradients'?'editbuttonlist typeactive':'editbuttonlist'" >
                  <div class="buttonstyle button_gradients">
                  </div>
              </div>
              <div @click="editbutton('button_gradients_border')" :class="buttontype=='button_gradients_border'?'editbuttonlist typeactive':'editbuttonlist'" >
                  <div class="buttonstyle button_gradients_border">
                  </div>
              </div>

            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="文字" name="second">
          <el-input v-model="inpBtnText" placeholder="请输入按钮文字"></el-input>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogeditbutton = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditorEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'editbuttondia',
  data () {
    return {
      activeName: 'first',
      dialogeditbutton: false,
      buttontype: '',
      inpBtnText: ''
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.datahtml
  // ------------------- button ------------------
    moduleData['toallGroup']['basic'].push({
      name: 'button',
      icon: 'imgicon icon-button',
      text: '按钮'
    })
    // 配置模块参数
    moduleData['button'] = {
      style: 'width:80px; height:30px',
      tool: {
        private: {
          text: '设置样式',
          class: 'st-style'
        },
        public: ['f','e']
      },
      html: '<div class="button module addmodule"  datatext="按钮"><a target="_blank">按钮</a></div>'
    }
  // ------------------- taxonomy ------------------
    moduleData['toallGroup']['basic'].push({
      name: 'taxonomy',
      icon: 'imgicon icon-classify',
      text: '分类'
    })
    moduleData['taxonomy'] = {
      style: 'width:1200px;',
      tool: {
        private: {
          text: '',
          class: ''
        },
        public: []
      },
      createEvent: function (self, element, me) { // 入参: self指向主文件上下文, element生成的元素集合。// 生成模块时所触发的事件
        self.$refs.editbutton.getcoursecategorys(element)
      },
      html: '<div class="taxonomy module addmodule" datatext="分类"><div class="click-taxonomy"></div><div class="taxonomycont"><ul class="fl allson"></ul><ul class="fl allsondouble"></ul><div style="clear: both;"></div></div></div>'
    }
  },
  methods: {
    show: function () {
      let self = this
      let a =  $('.on_module');
      let buttontype = a.attr('buttontype')
      self.buttontype = buttontype || '';
      self.dialogeditbutton = true
      self.inpBtnText = a.find('a').eq(0).text()
    },
    editbutton: function (val){
      let self = this
      self.buttontype =  val;
    },
    dialogEditorEvent: function (){
      let self = this;
      let a =  $('.on_module');
      a.removeClass('button_radius')
      a.removeClass('button_rightangle')
      a.removeClass('button_border')
      a.removeClass('button_gradients')
      a.removeClass('button_gradients_border')
      a.addClass(self.buttontype);
      a.attr('buttontype',self.buttontype)
      self.dialogeditbutton = false
      a.find('a').eq(0).text(self.inpBtnText)
    },
    getcoursecategorys: function (html) {
      let self = this
      self.$http.get(window.host + '/room/design/getcoursecategorys.html', {
        params: {
        }
      }, {emulateJSON: true}).then(function (response) {
        let datas = response.data
        if(datas.code == 0) {
          let packages = datas.data.packages
          let sorts = datas.data.sorts
          let packageshtml = ''
          let sortshtml = ''
          for(var i=0;i<packages.length;i++){
            if(packages[i].pid == 0){
              packageshtml += '<li class="fl"><a href="/platform.html" class="courselist">'+packages[i].pname+'</a></li>'
            }else{
              if(packages[i].cur){
                packageshtml += '<li class="fl"><a href="/platform-1-0-0.html?pid='+packages[i].pid+'" class="courselist onhover">'+packages[i].pname+'</a></li>'
              }else{
                packageshtml += '<li class="fl"><a href="/platform-1-0-0.html?pid='+packages[i].pid+'" class="courselist">'+packages[i].pname+'</a></li>'
              }
            }
          }
          for(var i=0;i<sorts.length;i++){
            if(sorts[i].sid == -1){
              sortshtml += '<li class="fl"><a href="/platform-1-0-0.html?pid='+sorts[i].pid+'" class="courselist onhover">'+sorts[i].sname+'</a></li>'
            }else{
              sortshtml += '<li class="fl"><a href="/platform-1-0-0.html?pid='+sorts[i].pid+'&sid='+sorts[i].sid+'" class="courselist">'+sorts[i].sname+'</a></li>'
            }
          }
          let allson = html.find('.allson')
          let allsondouble = html.find('.allsondouble')
          allson.html(packageshtml)
          allsondouble.html(sortshtml)
          let awidth = allson.css('width')
          let aheight = parseInt(allson.css('height')) + parseInt(allsondouble.css('height'))
          html.css({
            'width': awidth,
            'height': aheight
          })
        }
      }, function (response) {
        console.log(response)
      })
    },
    handleClick: function (){

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-dialog-editbutton .el-dialog{
    width: 600px;
  }
  .el-dialog-editbutton .el-dialog__header{
    border-bottom:1px solid #ccc;
  }
  .el-dialog-editbutton .el-dialog__body{
    padding: 10px 20px;
  }
  .el-dialog-editbutton .editbuttonlist{
    width: 162px;
    height: 122px;
    border:1px solid #f2f2f2;
    float: left;
    margin: 0 10px 10px;
    cursor: pointer;

  }
  .el-dialog-editbutton .editbuttonlist:hover,.el-dialog-editbutton .typeactive{
    border-color: #8DC526;
  }
  .el-dialog-editbutton .buttonstyle{
    width: 96px;
    height: 32px;
    margin: 0 auto;
    margin-top: 40px;
  }
/*   .button_radius{
  background: #4AB344;
  border-radius: 3px;
  border:none;
}
.button_rightangle{
  background: #4AB344;
  border:none;
}
.button_border{
  border:1px solid #4AB344;
}
.button_gradients{
  background: -webkit-linear-gradient(#A5D9A2, #4BB345); Safari 5.1 - 6.0
  background: -o-linear-gradient(#A5D9A2, #4BB345); Opera 11.1 - 12.0
  background: -moz-linear-gradient(#A5D9A2, #4BB345); Firefox 3.6 - 15
  background: linear-gradient(#A5D9A2, #4BB345); 标准的语法
  border-radius: 3px;
  box-shadow: 0 2px 5px 2px rgba(0,0,0,0.2);
  border:none;
}
.button_gradients_border{
  background: -webkit-linear-gradient(#A5D9A2, #4BB345); Safari 5.1 - 6.0
  background: -o-linear-gradient(#A5D9A2, #4BB345); Opera 11.1 - 12.0
  background: -moz-linear-gradient(#A5D9A2, #4BB345); Firefox 3.6 - 15
  background: linear-gradient(#A5D9A2, #4BB345); 标准的语法
  border-radius: 3px;
  border:1px solid #4AB344;
} */
</style>
