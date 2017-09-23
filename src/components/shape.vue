<template lang="html">
  <div class="m-shape" ref="shape" >
    <el-dialog
      title="图片形状"
      :visible.sync="dialogShape"
      size="tiny">
      <ul class="selectLi" >
        <li @click="selectLiEvent('artwork')" :class="addClassVal=='artwork'?'on':''">
          <span>原图:</span>
          <img src="../assets/shape/artwork.png" alt="">
        </li>
        <li @click="selectLiEvent('square')" :class="addClassVal=='square'?'on':''">
          <span>正方形:</span>
          <img src="../assets/shape/square.png" alt="">
        </li>
        <li @click="selectLiEvent('fillet')" :class="addClassVal=='fillet'?'on':''">
          <span>圆角:</span>
          <img src="../assets/shape/fillet.png" alt="">
        </li>
        <li @click="selectLiEvent('round')" :class="addClassVal=='round'?'on':''">
          <span>圆形:</span> 
          <img src="../assets/shape/round.png" alt="">
        </li>
      </ul>        
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShape = false">取 消</el-button>
        <el-button type="primary" @click="confirmShapeEvent">确 定</el-button>
      </span>
    </el-dialog>   
  </div>
</template>

<script>
import $ from 'jquery' 
export default {
  name: 'shape',
  props: { // 当前颜色值
  },
  data () {
    return {
      dialogShape: false,
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
    confirmShapeEvent: function () {
      let self = this
      let mod = $('.on_module')
      let picBox = mod.find('.picBox')
      let dataShape = mod.attr('dataShape')      
      picBox.removeClass(dataShape).removeAttr('style')
      mod.removeClass(dataShape)
      mod.attr('dataShape', self.addClassVal)     
      if (self.addClassVal != 'fillet' && self.addClassVal != 'artwork') {
        let w = picBox.css('height')
        picBox.css({'width': w ,'height': w})
      } else {
        mod.addClass(self.addClassVal)
        picBox.removeAttr('style')
      }
      
      picBox.addClass(self.addClassVal)     
      self.dialogShape = false
    },
    show () {
      let self = this
      self.dialogShape = true
      let dataShape = $('.on_module').attr('dataShape')
      if (dataShape) {
        self.addClassVal = dataShape
      } else{
        self.addClassVal = 'artwork'
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
  .m-shape{
    position:relative;
  }
  .m-shape .el-dialog--tiny{
    width: 400px;
  }
  .m-shape .selectLi{  
    overflow: hidden;  
  }
  .m-shape .selectLi li{
    float: left;
    margin: 10px;
    width: 150px;
    height: 115px;
    cursor: pointer;
    border:1px solid #eaeefb;
    border-radius: 4px;
  }
  .m-shape .selectLi li.on{
    border-color:#20a0ff;
    color:#20a0ff;
  }
  .m-shape .selectLi li.on span{
    color:#20a0ff;
  }
  .m-shape .selectLi li span{
    display: inline-block;
    margin-top: 6px;
    margin-left: 6px;
  }
  .imgHover{    
    margin: 5px 0 0 30px;
    width: 200px;
    height: 118px;
    border: 1px solid #c4c4c4;   
    overflow: hidden;
  }
  .m-shape .selectLi li img{
    margin-left: 15px;
  }  
  .imgHover.round{
    margin: 0 auto;
    border-radius: 50%;
    width: 118px;
    height: 118px;
    overflow: hidden;
  }
  .imgHover.square{
    margin: 0 auto;
    width: 118px;
    height: 118px;
    overflow: hidden;
  }
  .imgHover.square img{
    width: auto;
    height: 100%;
    margin-left: 50%;
    transform:translateX(-50%) ;
    -ms-transform:translateX(-50%);   /* IE 9 */
    -moz-transform:translateX(-50%);  /* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
  }
</style>
