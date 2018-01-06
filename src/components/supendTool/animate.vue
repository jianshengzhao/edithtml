<template lang="html">
  <div class="scrollanim" ref="scrollanim" >
    <el-dialog
      title="模块动画"
      :visible.sync="dialogscrollanim"
      class="el-dialog-scrollanim"
      :close-on-click-modal="false">
      <el-row>
        <el-col>
          <div @click="editanim()" class="animlist active"><div :class="animtype==''?'animimg active':'animimg'">无<div class="animtip">✔</div></div><p>无效果</p></div>
          <div @click="editanim('fadeIn')" class="animlist"><div :class="animtype=='fadeIn'?'animimg active':'animimg'">
            <img  src="./image/fadeIn_icon.png">
          <div class="animtip">✔</div></div><p>淡入</p></div>
          <div @click="editanim('slideInRight')" class="animlist"><div :class="animtype=='slideInRight'?'animimg active':'animimg'">
            <img  src="./image/slideInRight_icon.png">
          <div class="animtip">✔</div></div><p>飞入</p></div>
          <div @click="editanim('zoomIn')" class="animlist"><div :class="animtype=='zoomIn'?'animimg active':'animimg'">
            <img src="./image/zoomIn_icon.png">
          <div class="animtip">✔</div></div><p>放大</p></div>
          <div @click="editanim('bounceInRight')" class="animlist"><div :class="animtype=='bounceInRight'?'animimg active':'animimg'">
            <img src="./image/bounceInRight_icon.png">
          <div class="animtip">✔</div></div><p>跳入</p></div><br>
          <div @click="editanim('flash')" class="animlist"><div :class="animtype=='flash'?'animimg active':'animimg'">
            <img src="./image/flash_icon.png">
          <div class="animtip">✔</div></div><p>闪现</p></div>
          <div @click="editanim('rotateIn')" class="animlist"><div :class="animtype=='rotateIn'?'animimg active':'animimg'">
            <img src="./image/rotateIn_icon.png">
          <div class="animtip">✔</div></div><p>滚入</p></div>
          <div @click="editanim('flipInY')" class="animlist"><div :class="animtype=='flipInY'?'animimg active':'animimg'">
            <img src="./image/flipInY_icon.png">
          <div class="animtip">✔</div></div><p>翻转</p></div>
          <div @click="editanim('bounceIn')" class="animlist"><div :class="animtype=='bounceIn'?'animimg active':'animimg'">
            <img src="./image/bounceIn_icon.png">
          <div class="animtip">✔</div></div><p>弹性放大</p></div>
          <div @click="editanim('bounceOut')" class="animlist"><div :class="animtype=='bounceOut'?'animimg active':'animimg'">
            <img src="./image/bounceOut_icon.png">
          <div class="animtip">✔</div></div><p>弹性缩小</p></div>
        </el-col>

      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogscrollanim = false">取 消</el-button>
        <el-button @click="editanimate()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery' 
export default {
  name: 'scrollanim',
  props: { // 当前颜色值
  },
  data () {
    return {
      dialogscrollanim:false,
      animtype : 0,
      anim:''
    }
  },
  methods: {
    show () {
      let self = this
      let anim  = $('.on_module').attr('data-kui-anim')
      self.anim = anim;
      self.animtype = anim;
      self.dialogscrollanim = true
    },    
    editanim(val){
      let self = this;
      let anim = val || ''
      self.animtype = anim;
      self.anim = anim;
      let a = $('.on_module');
      a.addClass('animated '+anim);
      setTimeout(function(){
        a.removeClass(anim);
        a.removeClass('animated');
      }, 1000);
    },
    editanimate(){
      let self = this;
      let a = $('.on_module');
      a.attr('data-kui-anim',self.anim)
      self.dialogscrollanim = false
    }
  },
  mounted () {
    // 点击页面上其他地方，关闭弹窗
    let self = this    
  }
}
</script>

<style >
  .el-dialog-scrollanim .el-dialog{
    width: 510px;
  }
</style>
