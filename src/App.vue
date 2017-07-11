<template>
  <div id="app">
    <div class="top">
      <div class="t_logo">logo</div>
      <div class="t_left">
        <div class="tl_li">
          <i class="iconfont icon-save"></i>
          <span>保存</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-textalignjustify"></i>
          <span>对齐</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-tuceng"></i>
          <span>图层</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-handle"></i>
          <span>操作</span>
        </div>
      <!--   <div class="tl_li">
          <i class="iconfont icon-shanchu"></i>
          <span>删除</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '@/assets/iconfont/demo.css'
  import '@/assets/iconfont/iconfont.css'
  export default {
    name: 'app',
    data: function () {
      return {
      }
    },
    created: function () {},
    methods: {
      sdas: function () {
        $('body').html('')
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
/*top*/
  .top{
    height: 45px;
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
    width: 210px;  
  }
  .tl_li{
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
  .tl_li span{
    display: inline-block;
    width: 100%;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #525e71;
  }
</style>
