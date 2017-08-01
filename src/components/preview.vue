<template>
  <div id="preview">
    <div class="top">
      <div class="t_logo">logo</div>
      <div class="t_right">
        <div class="tl_li" style="margin-left:50px;">
          <i class="iconfont icon-baocun2"></i>
          <span>保存</span>
        </div>
        <div class="tl_li" @click='returnEvent'>
          <i class="iconfont icon-tuichu"></i>
          <span>返回</span>
        </div>
      </div> 
    </div>
    <div class="content">
      <div class="head"></div>
      <div class="middle"></div>
      <div class="foot"></div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'preview',
    data: function () {
      return {
      }
    },
    created: function () { // 增加白名单，各模块所加载的js
      let self = this
      $('#previewStyle').remove()
      if (!window.saveParams) return false
      let params = window.saveParams
      let pp = params.page
      let style = '<style id="previewStyle">' +
                  'body,#preview{background-color:' + pp.bg + '}' +
                  '.content{width:' + pp.width + 'px;height:' + pp.height + 'px;background-color:' + pp.pg + '}' +
                  '.head{height:' + pp.top + ';}' +
                  '.middle{height:' + pp.body + ';}' +
                  '.foot{height:' + pp.foot + ';}' +
                  '</style>'
      $('head').append(style)
      self.$nextTick(function () {
        let head = $('.head')
        let middle = $('.middle')
        let foot = $('.foot')
        let module = params.module
        // let html = ''
        // for (let i = 0, len = module.top.length; i < len; i++) {
        //   let item = module.top[i]
        //   html += '<div class="' + item.class + '" style="' + item.style + '"><div>asdasdadad</div>asdadadsadad</div></div>'
        // }
        head.append(module.top)
        // html = ''
        // for (let i = 0, len = module.body.length; i < len; i++) {
        //   let item = module.body[i]
        //   html += '<div class="' + item.class + '" style="' + item.style + '"><div>asdasdadad</div>asdadadsadad</div></div>'
        // }
        middle.append(module.body)
        // html = ''
        // for (let i = 0, len = module.foot.length; i < len; i++) {
        //   let item = module.foot[i]
        //   html += '<div class="' + item.class + '" style="' + item.style + '"><div>asdasdadad</div>asdadadsadad</div></div>'
        // }
        foot.append(module.foot)
      })
    },
    methods: {
      returnEvent: function () {
        let self = this
        self.$router.push('/')
      }
    }
  }
</script>
<style>
/*top*/
  .top{
    position: relative;
    height: 45px;
    min-width: 1024px;
    border-bottom: 1px solid #d9d9d9;
    z-index: 4;
    background-color: #fff;
  }
  .top>div{
    height: 45px;
  }
  .t_logo{
    float: left;
    width: 40px;    
    line-height: 45px;
    font-size: 20px;
    color: #ccc;
    text-align: center;
  }
  .t_left{
    float: left;
    width: 400px;  
  }
  .tl_li{
    position: relative;
    padding-top: 2px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 37px;
    margin: 2px ;
    cursor: pointer; 
    text-align: center; 
    border:1px solid #fff;  
  }
  .tl_li_on{
    background: rgba(0, 0, 0, 0.04);
    border-color:rgba(0,0,0,.1);
  }
  .tl_li_Disable{
    opacity: 0.6;
    cursor:not-allowed;
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
  .tl_li_Disable:hover .toolbar{
    display: none;
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
  .toolbar input::-webkit-inner-spin-button{
    display: none;
  }
  .t_right{
    position: relative;
    float: right;
    width: 300px;
    text-align: left;
  } 
  .toolbar .el-col{
    height: 36px;
    line-height: 36px;
  }
  .toolbar .el-input__inner{
    height: 30px;
    width: 80px;
    color: #555;
  }
/*content*/
  #preview{
    overflow-y:auto;
    height: 100%;
  }
  .content{
    margin: 0 auto;
  }
  .head, .middle, .foot{
    position: relative;
  }
</style>
