<template>
  <div id="waiter">
    <el-dialog
      title="客服"
      :visible.sync="dialogWaiter"
      size="waiter" >
      <el-row style = 'margin-bottom: 56px;'>
        <el-col :span="4">显示方式：</el-col>
        <el-col :span="18">
          <el-radio-group v-model="showStyle">
            <el-radio-button label="left">
              <img src="../assets/newdialog/left.jpg">
              <span class="stylename">左悬浮</span>
              <div class="pitchIcon">✔</div>
            </el-radio-button>
            <el-radio-button label="right">
              <img src="../assets/newdialog/right.jpg">
              <span class="stylename">右悬浮</span>
              <div class="pitchIcon">✔</div>
            </el-radio-button>
          </el-radio-group>
          <!-- <el-select v-model="showStyle" placeholder="请选择悬浮位置" >
            <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">添加图标（20*20）：</el-col>
        <el-col :span="4">
          <div class="waiterImgBox" :style="'background-image:url('+ waiterImg +')'" v-if="waiterImg!=''">        
          </div>
          <span class="addPic" @click="addPictureEvent">{{waiterImg==''?'添加':'修改'}}</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogWaiter = false">取 消</el-button>
        <el-button type="primary" @click="dialogWaiterEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'waiter',
  data () {
    return {
      dialogWaiter: false,
      showStyle: 'left',
      styleOptions: [
        {
          label: '左悬浮',
          value: 'left'
        },
        {
          label: '右悬浮',
          value: 'right'
        }
      ],
      waiterImg: 'http://static.ebanhui.com/ebh/tpl/default/images/t_man_50_50.jpg'
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.datahtml  
    moduleData['toallGroup']['basic'].push({
      name: 'waiter',
      icon: 'imgicon icon-waiter',
      text: '客服'
    })
    // 配置模块参数
    moduleData['waiter'] = { 
      style: 'width:50px; height:50px',
      tool: {
        private: {
          text: '编辑客服',
          class: 'st-waiter'
        },
        public: []
      },
      createEvent: function (self, element, me) {
        self.$refs.waiter.show(self, element)
        if (me.$('.waiter').length < 3) {
          me.editBox.append('<div class="waiter "><div class="kf-head"></div><div class="kf-top"></div></div>')
          me.$('.waiter').on('click', function() {
            self.$refs.waiter.show(self, element)
          })
        } else {
          element.remove()
        }
      },
      html: '<div class="waiter module addmodule" style="display:none;" datatext="客服"><div class="kf-head"></div><div class="kf-top"></div></div>'
    }
  },
  methods: {
    show: function (that, element) {
      let self = this
      self.that = that
      self.showStyle = 'left'
      self.waiterImg = ''
      self.dialogWaiter = true
      let waiter = $('.waiter')
      if (waiter.length > 0) {
        let waiterData = waiter.attr('waiterData')
        if (waiterData) {
          let jsonS = $.parseJSON(waiterData)
          self.showStyle = jsonS.showStyle || 'left'
          self.waiterImg = jsonS.waiterImg || 'http://static.ebanhui.com/ebh/tpl/2016/images/kfico.png'
        } else {
          self.showStyle = 'left'
          self.waiterImg = 'http://static.ebanhui.com/ebh/tpl/2016/images/kfico.png'
        }
      }
    },
    dialogWaiterEvent: function () {
      let self = this
      let waiter = $('.waiter')
      let waiterhide = $('.waiterhide')
      let obj = {
        showStyle: self.showStyle,
        waiterImg: self.waiterImg
      }
      let str = window.JSON.stringify(obj)
      waiter.attr('waiterData', str)
      waiter.find('.kf-head').css('background-image', 'url(' + self.waiterImg + ')')
      waiterhide.attr('waiterData', str)
      if (self.showStyle == 'right'){
        let rig = $('.editBox').css('paddingRight')
        waiter.css({
          left: 'auto',
          right: rig
        });
      } else {
        waiter.css({
          left: '0',
          right: 'auto'
        });
      }
      self.dialogWaiter = false
    },
    addPictureEvent: function () {
      let self = this    
      self.that.$refs.myimages.show('waiter', self, function (self, data) {
        self.waiterImg = data
      })
    }
  }
}
</script>
<style>
  .el-dialog--waiter {
    width: 500px;
  }
  #waiter .el-dialog__header {
    border-bottom: 1px solid #CECECE;
    height: 30px;
  }
  #waiter .el-row {
    margin-bottom: 10px;
  }
  #waiter .el-col {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
  }
  #waiter .el-input .el-input__inner {
    color: #48576a;
  }
  #waiter .waiterImgBox{
    display: inline-block;
    width: 36px;
    height: 36px;
    background-size: 20px;
    background-color: #18A8F7;    
    background-position: center;
    background-repeat: no-repeat;
  }  
  #waiter .addPic {
    cursor: pointer;
    color: #169BD5;
  }  
  #waiter .el-radio-button__inner{
    position: relative;
    display: block;
    width: 90px;
    height: 60px;
    padding: 0;
    margin-right:10px;
    border-radius: 0;
    border: 0;
    box-shadow: none;  
    border: 1px solid #999999;  
    box-sizing: content-box; 
  }
  #waiter .is-active .el-radio-button__inner {
    border: 1px solid #20a0ff;
    background-color: #fff;
  }
  #waiter .is-active .el-radio-button__inner .stylename{
    color: #20a0ff;
  }
  #waiter .el-radio-button__inner img{
    display: block;   
    width: 90px;
    height: 60px;
  }
  #waiter .el-radio-button__inner .stylename{
    position: absolute;
    left: 24px;
    bottom: -20px;
    color: #999999;
  }
</style>
