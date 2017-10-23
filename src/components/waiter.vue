<template>
  <div id="waiter">
    <el-dialog
      title="客服"
      :visible.sync="dialogWaiter"
      size="waiter" >
      <el-row>
        <el-col :span="4">显示方式</el-col>
        <el-col :span="18">
           <el-select v-model="showStyle" placeholder="请选择悬浮位置" >
            <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">添加图标</el-col>
        <el-col :span="4">
          <div class="waiterImgBox" :style="'background-image:url('+ waiterImg +')'" v-if="waiterImg!=''">        
          </div>
          <span class="addPic">{{waiterImg==''?'添加':'修改'}}</span>
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
    // let self = this 
  },
  methods: {     
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
    show: function () {
      let self = this
      self.showStyle = ''
      self.waiterImg = ''
      self.dialogWaiter = true
      let waiter = $('.waiter')
      if (waiter.length > 0) {
        let jsonS = $.parseJSON(waiter.attr('waiterData'))
        self.showStyle = jsonS.showStyle || 'left'
        self.waiterImg = jsonS.waiterImg || 'http://static.ebanhui.com/ebh/tpl/2016/images/kfico.png'
      }
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
    background-color: #333;    
    background-position: center;
    background-repeat: no-repeat;
  }  
  #waiter .addPic {
    cursor: pointer;
    color: #169BD5;
  }
</style>
