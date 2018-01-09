<template lang="html">
  <div class="m-suspend" ref="suspend" >
    <el-dialog
      title="悬浮特效"
      :visible.sync="dialogSuspend"
      class="el-dialog-suspend">
      <ul class="selectLi" >
        <li @click="selectLiEvent('enlarge')" :class="addClassVal=='enlarge'?'on':''">
          <div class="imgbox">
            <img src="./image/enlarge.gif" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>放大</span>
        </li>
        <li @click="selectLiEvent('moveup')" :class="addClassVal=='moveup'?'on':''">  
          <div class="imgbox">
            <img src="./image/moveup.gif" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>上移</span>
        </li>
        <li @click="selectLiEvent('left')" :class="addClassVal=='left'?'on':''"> 
          <div class="imgbox">         
            <img src="./image/left.gif" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>左移</span>
        </li>
        <li @click="selectLiEvent('right')" :class="addClassVal=='right'?'on':''"> 
          <div class="imgbox">         
            <img src="./image/right.gif" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>右移</span> 
        </li>        
        <li @click="selectLiEvent('none')" :class="addClassVal=='none'?'on':''"> 
          <div class="imgbox">         
            <img src="./image/none.png" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>无效果</span> 
        </li>
      </ul>        
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSuspend = false">取 消</el-button>
        <el-button type="primary" @click="confirmSuspendEvent">确 定</el-button>
      </span>
    </el-dialog>   
  </div>
</template>

<script>
import $ from 'jquery' 
export default {
  name: 'suspend',
  props: { // 当前颜色值
  },
  data () {
    return {
      dialogSuspend: false,
      addClassVal:'none'
    }
  },
  computed: { // 接受的数据变化所执行的事件
  },
  methods: {
    selectLiEvent:function (val) {
      let self = this    
      this.addClassVal = val      
    },
    confirmSuspendEvent: function () {
      let self = this
      let mod = $('.on_module')
      mod.removeClass(mod.attr('dataHover'))
      mod.attr('dataHover', self.addClassVal)
      if (self.addClassVal != 'none') {
        mod.addClass(self.addClassVal)
      }
      self.dialogSuspend = false
    },
    show () {
      let self = this
      self.dialogSuspend = true
      let dataHover = $('.on_module').attr('dataHover')
      if (dataHover) {
        self.addClassVal = dataHover
      } else{
        self.addClassVal = 'none'
      }
      
    }
  },
  mounted () {
    // 点击页面上其他地方，关闭弹窗
    let self = this    
  }
}
</script>

<style >
  .m-suspend{
    position:relative;
  }
  .el-dialog-suspend .el-dialog{
    width: 400px;
  }
  .el-dialog-suspend .el-dialog__body{
    padding: 10px 20px;
  }
  .m-suspend .selectLi{  
    overflow: hidden;
    height: 440px;
  }
  .m-suspend .selectLi li{
    float: left;
    margin: 10px;
    width: 150px;
    height: 120px;
    cursor: pointer;    
    border-radius: 4px;
    text-align: center;
  }
  .m-suspend .selectLi li .imgbox{
    width: 150px;
    padding:10px 0;
    border: 2px solid #eaeefb;
    position: relative;
  }
  .m-suspend .imgbox .animtip{
    position: absolute;
    right:-2px;
    bottom: -2px;
    display: none;
    width: 18px;
    background-color: #7fcc78;
    color: #fff;
  }
  .m-suspend .selectLi li.on .imgbox {    
    border-color: #7fcc78;
  }
  .m-suspend .selectLi li.on .imgbox .animtip {
    display:block;    
  }
  .m-suspend .selectLi li span{
    display: inline-block;
    margin-top: 6px;
    margin-left: 6px;
  }
  .m-suspend .selectLi li .imgHover{
    float: left;    
    margin: 5px 0 0 30px;
    width: 200px;
    height: 118px;
    border: 1px solid #c4c4c4;   
    overflow: hidden;
  }
  
  .m-suspend .selectLi .none{   
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
  }  
</style>
