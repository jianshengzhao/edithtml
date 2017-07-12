<template>
  <div id="app">
    <div class="top">
      <div class="t_logo">logo</div>
      <div class="t_left">
        <div class="tl_li">
          <i class="iconfont icon-weibiaoti1"></i>
          <span>量尺</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-xuxianxuankuang"></i>
          <span>格线</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-textalignjustify"></i>
          <span>对齐</span>
          <ul class="toolbar">          
            <li><i class="iconfont icon-dingduiqi"></i>上对齐</li>
            <li><i class="iconfont icon-diduiqi"></i>下对齐</li>
            <li><i class="iconfont icon-zuoduiqi"></i>左对齐</li>
            <li><i class="iconfont icon-youduiqi"></i>右对齐</li>
            <li><i class="iconfont icon-juzhongduiqi"></i>水平居中</li>
            <li><i class="iconfont icon-v-top-copy"></i>垂直居中</li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-tuceng"></i>
          <span>图层</span>
          <ul class="toolbar">          
            <li><i class="iconfont icon-dingceng"></i>置于顶层</li>
            <li><i class="iconfont icon-diceng"></i>置于底层</li>
            <li><i class="iconfont icon-shangyiyiceng"></i>上移一层</li>
            <li><i class="iconfont icon-xiayiyiceng"></i>下移一层</li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-handle"></i>
          <span>操作</span>
          <ul class="toolbar">          
            <li><i class="iconfont icon-jianqie"></i>剪切</li>
            <li><i class="iconfont icon-fuzhi"></i>复制</li>
            <li><i class="iconfont icon-zhantie"></i>粘贴</li>
            <li><i class="iconfont icon-shanchu"></i>删除</li>
          </ul>
        </div>     
      </div>
      <div class="t_right">
        <div class="tl_li">
          <i class="iconfont icon-fangda-copy"></i>
          <span>100%</span> 
          <ul class="toolbar">          
            <li><i class="iconfont icon-fangda-copy"></i>放大</li>
            <li><i class="iconfont icon-suoxiao"></i>缩小</li>
          </ul>
        </div>
        <div class="tl_li bgColor">
          <i class="iconfont icon-beijingyanse" @click="bgColorShow"></i>
          <span>背景</span>
          <ul class="toolbar" style="min-width: 76px;display: block;" v-if="bgcoloer">          
            <li ><el-color-picker v-model="color1" @change="changeBgColor" ></el-color-picker></li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-fenbianshuai"></i>
          <span>分辨率</span>
          <ul class="toolbar" >          
            <li style="width: 250px">
              <el-row>
                <el-col :span="6">分辨率:</el-col>
                <el-col :span="9"><el-input v-model="inp_width" placeholder="宽" type="number" @change="widthRangeConstraint"></el-input> </el-col>
                <el-col :span="9"><el-input v-model="inp_height" placeholder="高" type="number" ></el-input></el-col>
              </el-row>
            </li>
          </ul>
        </div>        
        <div class="tl_li" style="margin-left:50px;">
          <i class="iconfont icon-baocun"></i>
          <span>保存</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-yulan2"></i>
          <span>预览</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-tuichu"></i>
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery'
  import '@/assets/iconfont/demo.css'
  import '@/assets/iconfont/iconfont.css'
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)
  export default {
    name: 'app',
    data: function () {
      return {
        bgcoloer: false,
        color1: '#20a0ff',
        inp_width: 1200,
        inp_height: 1600
      }
    },
    created: function () {},
    methods: {
      bgColorShow: function () {
        var self = this
        if (!self.bgcoloer) {
          self.bgcoloer = true
        } else {
          self.bgcoloer = false
        }
      },
      changeBgColor: function () {
        var self = this
        self.bgcoloer = false
      },
      widthRangeConstraint: function () {
        var self = this
        if (self.inp_width < 980) {
          self.inp_width = 980
          self.$notify({
            title: '警告',
            message: 'pc页面宽度最好不要低于980',
            type: 'warning'
          })
        }
      }
    }
  }
</script>

<style>
/*app*/
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  *{
    font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
  }
  input::-webkit-inner-spin-button{
    display: none;
  }
/*top*/
  .top{
    height: 45px;
    min-width: 1024px;
    border:1px solid #d9d9d9;
  }
  .top>div{
    height: 45px;
  }
  .t_logo{
    float: left;
    width: 180px;    
    line-height: 45px;
    font-size: 20px;
    color: #ccc;
  }
  .t_left{
    float: left;
    width: 300px;  
  }
  .tl_li{
    position: relative;
    display: inline-block;
    width: 40px;
    height: 37px;
    margin: 4px;
    cursor: pointer; 
    text-align: center;   
  }
  .tl_li i{
    font-size: 18px;
    line-height: 18px;
    color:#f55d54;
  }
  .tl_li>span{
    display: inline-block;
    width: 100%;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #525e71;
  }
  .tl_li:hover .toolbar{
    display: block;
  }  
  .toolbar{
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    min-width: 124px;
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  }
  .toolbar li{
    padding: 10px;
    text-align:left;
    list-style-type: none;
    color: #525e71;
  }
  .toolbar li:hover{
    background-color: #f5f5f7;
  }
  .toolbar li i{
    margin-right:5px;
  }  
  .t_right{
    position: relative;
    float: right;
    width: 500px;
    text-align: left;
  } 
  .toolbar .el-col{
    height: 36px;
    line-height: 36px;
  }
  .toolbar .el-input__inner{
    height: 30px;
    width: 80px;
  }

</style>
