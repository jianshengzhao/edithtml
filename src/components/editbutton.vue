<template>
  <div class="editbutton">
    <el-dialog
      title="设置样式"
      :visible.sync="dialogeditbutton"
      size="editbutton">
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
  name: 'editbutton',
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
  },
  methods: { 
    show: function () {
      let self = this
      let a =  $('.on_module');
      let buttontype = a.attr('buttontype')
      self.buttontype = buttontype || '';
      self.dialogeditbutton = true
      self.inpBtnText = a.find('a').text()
    },
    editbutton(val){
      let self = this
      self.buttontype =  val;
    },
    dialogEditorEvent(){
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
      a.find('a').text(self.inpBtnText)
    },
    handleClick(){
    
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-dialog--editbutton{
    width: 600px;
  }
  .el-dialog--editbutton .editbuttonlist{
    width: 162px;
    height: 122px;
    border:1px solid #f2f2f2;
    float: left;
    margin: 0 10px 10px;
    cursor: pointer;

  }
  .el-dialog--editbutton .editbuttonlist:hover,.el-dialog--editbutton .typeactive{
    border-color: #8DC526;
  }
  .el-dialog--editbutton .buttonstyle{
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
