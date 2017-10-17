<template lang="html">
  <div class="m-shape" ref="shape" >
    <el-dialog
      title="图片形状"
      :visible.sync="dialogShape"
      size="tiny">
      <ul class="selectLi" >
        <li @click="selectLiEvent('artwork')" :class="addClassVal=='artwork'?'on':''">
          <div class="imgbox">          
            <img src="../assets/shape/artwork.png" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>原图</span>
        </li>
        <li @click="selectLiEvent('square')" :class="addClassVal=='square'?'on':''">          
          <div class="imgbox"> 
            <img src="../assets/shape/square.png" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>正方形</span>
        </li>
        <li @click="selectLiEvent('fillet')" :class="addClassVal=='fillet'?'on':''">
          <div class="imgbox"> 
            <img src="../assets/shape/fillet.png" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>圆角</span>
        </li>
        <li @click="selectLiEvent('round')" :class="addClassVal=='round'?'on':''">
          <div class="imgbox"> 
            <img src="../assets/shape/round.png" alt="">
            <div class="animtip">✔</div>
          </div>
          <span>圆形</span> 
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
        let h = parseInt(picBox.css('height'))
        let w = parseInt(picBox.css('width'))
        if(h > w){
          picBox.css({'width': w ,'height': w})
        } else{
          picBox.css({'width': h ,'height': h})
        }        
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
    position: relative;
    margin: 10px;
    width: 150px;
    height: 120px;
    cursor: pointer;   
    border-radius: 4px;
    text-align: center;
  }
  .m-shape .selectLi li .imgbox{
    width: 150px;
    padding:10px 0;
    border: 2px solid #eaeefb;
    position: relative;
  }
  .m-shape .imgbox .animtip{
    position: absolute;
    right:-2px;
    bottom: -2px;
    display: none;
    width: 18px;
    background-color: #7fcc78;
    color: #fff;
  }
  .m-shape .selectLi li.on .imgbox {    
    border-color: #7fcc78;
  }
  .m-shape .selectLi li.on .imgbox .animtip {
    display:block;    
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
    display: block;
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
