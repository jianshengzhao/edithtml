<template>
  <div id="preview">
    <div class="top">
      <div class="t_right">
        <div class="tl_li" style="margin-left:50px;">
          <i class="iconfont icon-save"></i>
          <span>保存</span>
        </div>
        <div class="tl_li" @click='returnEvent'>
          <i class="iconfont icon-undo"></i>
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
        carInter: '',
        carouselEvent: function (self) { // 轮播图
        // ------------渲染轮播结构------------
          let carousel = $('.carousel')
          if (carousel.length < 1) return false
          let imgul = carousel.find('.img_ul')
          let barbox = carousel.find('.barbox')
          let data
          if (carousel.attr('carouseldata')) {
            data = $.parseJSON(carousel.attr('carouseldata'))
          } else {
            let dataStatic = '{"showWidth":1200,"showTime":5,"transitionTime":0.6,"carouselData":[{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg","clickurl":"https://www.baidu.com1"},{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg","clickurl":"https://www.baidu.com2"},{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg","clickurl":"https://www.baidu.com3"},{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg","clickurl":"https://www.baidu.com4"}]}'
            data = $.parseJSON(dataStatic)
          }
          let obj = data.carouselData
          let imgliWidth = parseInt($('.screenBox').css('width'))
          let imgulWidth = imgliWidth * (obj.length + 2)
          let htm = '<div class="img_li"><img src="' + obj[obj.length - 1].imgurl + '"></div>'
          let htmBar = ''
          for (let i = 0, len = obj.length; i < len; i++) {
            let item = obj[i]
            htm += '<div class="img_li"><img src="' + item.imgurl + '"></div>'
            htmBar += '<li></li>'
          }
          htm += '<div class="img_li"><img src="' + obj[0].imgurl + '"></div>'
          imgul.css('width', imgulWidth) // 计算出img_ul的宽度
          imgul.html(htm)
          barbox.html(htmBar)
          $('.img_li').css('width', data.showWidth + 'px')
        // ------------动        画------------
          imgul.addClass('transition')
          clearInterval(self.carInter)
          let timer = data.showTime * 1000
          let space = data.transitionTime
          let left = imgliWidth
          let index = 0
          let barLi = barbox.find('li')
          imgul.css({'transition-duration': space + 's', '-moz-transition-duration': space + 's', '-webkit-transition-duration': space + 's', '-o-transition-duration': space + 's'})
          imgul.css('left', '-' + left + 'px')
          barLi.eq(index).addClass('on')
          carouselInterval()
          function carouselInterval () {
            self.carInter = setInterval(function () {
              left += imgliWidth
              index++
              if (left === imgulWidth - imgliWidth) {
                index = 0
                clearInterval(carIime)
                var carIime = setTimeout(function () {
                  left = imgliWidth
                  imgul.css('transition-duration', '')
                  imgul.removeClass('transition')
                  imgul.css('left', '-' + left + 'px')
                }, space * 1000) // todo 过渡时间替换
              } else {
                imgul.addClass('transition')
                imgul.css({'transition-duration': space + 's', '-moz-transition-duration': space + 's', '-webkit-transition-duration': space + 's', '-o-transition-duration': space + 's'})
              }
              barLi.removeClass('on')
              barLi.eq(index).addClass('on')
              imgul.css('left', '-' + left + 'px')
            }, timer) // todo 展示时间替换
          }
        // ------------hover   暂停------------
          carousel.hover(function () {
            clearInterval(self.carInter)
          }, function () {
            carouselInterval()
          })
        // ----------点击底部图标切换----------
          barLi.on('click', function () {
            index = $(this).index()
            barLi.removeClass('on')
            barLi.eq(index).addClass('on')
            left = imgliWidth * (index + 1)
            imgul.css('left', '-' + left + 'px')
          })
        }
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
        self.carouselEvent(self)
      })
    },
    methods: {
      returnEvent: function () {
        let self = this
        clearInterval(self.carInter)
        self.$router.push('/')
      }
    }
  }
</script>
<style>
/*top*/
  .top{
    padding-top: 4px;
    position: relative;
    height: 30px;
    min-width: 1024px;
    border-bottom: 1px solid #d9d9d9;
    z-index: 4;
    background-color: #fff;
  }
  .top>div{
    height: 28px;
  }
  .t_logo{
    float: left;
    width: 20px; 
  }
  .t_left{
    float: left;
    width: 600px;  
    height: 28px;
  }
  .tl_li{
    position: relative;
    padding: 2px 4px 0 2px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    height: 24px;
    margin: 2px ;
    cursor: pointer; 
    text-align: center; 
    border:1px solid #fff;  
    box-sizing: border-box;
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
    float: left;
    font-size: 18px;
    line-height: 18px;
    color:#f55d54;
  }
  .tl_li>span{
    float: left;
    text-indent: 2px;    
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    color: #525e71;
    padding-left: 2px;
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
