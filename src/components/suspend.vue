<template lang="html">
  <div class="m-suspend" ref="suspend" >
    <el-dialog
      title="悬浮特效"
      :visible.sync="dialogSuspend"
      size="tiny">
      <ul class="selectLi" >
        <li @click="selectLiEvent('enlarge')" :class="addClassVal=='enlarge'?'on':''">
          <span>放大:</span>
          <img src="../assets/supend/enlarge.gif" alt="">
        </li>
        <li @click="selectLiEvent('moveup')" :class="addClassVal=='moveup'?'on':''">
          <span>上移:</span>
          <img src="../assets/supend/moveup.gif" alt="">
        </li>
        <li @click="selectLiEvent('left')" :class="addClassVal=='left'?'on':''">
          <span>左移:</span>
          <img src="../assets/supend/left.gif" alt="">
        </li>
        <li @click="selectLiEvent('right')" :class="addClassVal=='right'?'on':''">
          <span>右移:</span> 
          <img src="../assets/supend/right.gif" alt="">
        </li>        
        <li @click="selectLiEvent('none')" :class="addClassVal=='none'?'on':''">
          <span>无效果:</span> 
          <img src="../assets/supend/none.png" alt="">
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
  .m-suspend .el-dialog--tiny{
    width: 400px;
  }
  .m-suspend .selectLi{  
    overflow: hidden;  
  }
  .m-suspend .selectLi li{
    float: left;
    margin: 10px;
    width: 150px;
    height: 115px;
    cursor: pointer;
    border:1px solid #eaeefb;
    border-radius: 4px;
  }
  .m-suspend .selectLi li.on{
    border-color:#20a0ff;
    color:#20a0ff;
  }
  .m-suspend .selectLi li.on span{
    color:#20a0ff;
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
  .m-suspend .selectLi li img{
    margin-left: 15px;
  }
  .m-suspend .selectLi .none{   
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
  }  
</style>
