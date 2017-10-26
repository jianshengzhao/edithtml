<template>
  <div id="preview">
    <div class="top">
      <div class="t_right">
        <div class="tl_li" style="margin-left:50px;" @click="saveEvent">
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
        httppost: function (getParam) { // 封装的异步请求数据
          let self = this
          self.$http.post(window.host + getParam.url, getParam.params, {emulateJSON: true}).then((response) => {
            if (getParam.fun !== undefined) {
              getParam.fun(response)
            }
          }).catch(function (response) {
          })
        },
        carouselEvent: function (self, element, id) { // 轮播图
        // ------------渲染轮播结构------------
          let C = element
          if (C.length < 1) return false
          let U = C.find('.img_ul')
          let B = C.find('.barbox')
          let D
          if (C.attr('carouseldata')) {
            D = $.parseJSON(C.attr('carouseldata'))
          } else {
            let ds = '{"changeStyle":false,"showWidth":1200,"showTime":5,"transitionTime":0.6,"carouselData":[{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner1.jpg","clickurl":""},{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner2.jpg","clickurl":""},{"imgurl":"http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner3.jpg","clickurl":""}]}'
            D = $.parseJSON(ds)
          }
          let bloo = D.changeStyle
          let d = D.carouselData
          let Lw = parseInt($('.screenBox').css('width'))
          let Uw
          let H = bloo ? '' : '<div class="img_li"><a href="' + d[d.length - 1].clickurl + '" target="_blank"><img src="' + d[d.length - 1].imgurl + '"></a></div>'
          let Hb = ''
          for (let i = 0, len = d.length; i < len; i++) {
            let m = d[i]
            H += '<div class="img_li"><a href="' + m.clickurl + '" target="_blank"><img src="' + m.imgurl + '"></a></div>'
            Hb += '<li></li>'
          }
          H += bloo ? '' : '<div class="img_li"><a href="' + d[0].clickurl + '" target="_blank"><img src="' + d[0].imgurl + '"></a></div>'
          if (bloo) {
            let x = $('.screenBox')
            x.addClass('screenBox2')
          } else {
            Uw = Lw * (d.length + 2)
            U.css('width', Uw) // 计算出img_ul的宽度
          }
          U.html(H)
          B.html(Hb)
          let imgLi = $('.img_li')
          imgLi.css('width', D.showWidth + 'px')
        // ------------动        画------------
          U.addClass('transition')
          clearInterval(self['carInter' + id])
          let T = D.showTime * 1000
          let S = D.transitionTime
          let L = Lw
          let I = 0
          let Bl = B.find('li')
          if (bloo) {
            imgLi.css({'transition-duration': S + 's', '-moz-transition-duration': S + 's', '-webkit-transition-duration': S + 's', '-o-transition-duration': S + 's'})
            imgLi.eq(I).css('opacity', '1')
          } else {
            U.css({'transition-duration': S + 's', '-moz-transition-duration': S + 's', '-webkit-transition-duration': S + 's', '-o-transition-duration': S + 's'})
            U.css('left', '-' + L + 'px')
          }
          Bl.eq(I).addClass('on')
          carouselInterval()
          function carouselInterval () {
            self['carInter' + id] = setInterval(function () {
              if (bloo) {
                I++
                if (I >= imgLi.length) {
                  I = 0
                }
                imgLi.css('opacity', '0')
                imgLi.eq(I).css('opacity', '1')
              } else {
                L += Lw
                I++
                if (L === Uw - Lw) {
                  I = 0
                  clearInterval(carIime)
                  var carIime = setTimeout(function () {
                    L = Lw
                    U.css('transition-duration', '')
                    U.removeClass('transition')
                    U.css('left', '-' + L + 'px')
                  }, S * 1000) // todo 过渡时间替换
                } else {
                  U.addClass('transition')
                  U.css({'transition-duration': S + 's', '-moz-transition-duration': S + 's', '-webkit-transition-duration': S + 's', '-o-transition-duration': S + 's'})
                }
                U.css('left', '-' + L + 'px')
              }
              Bl.removeClass('on')
              Bl.eq(I).addClass('on')
            }, T) // todo 展示时间替换
          }
        // ------------hover   暂停------------
          C.hover(function () {
            clearInterval(self['carInter' + id])
          }, function () {
            carouselInterval()
            // clearInterval(self.carInter)
          })
        // ----------点击底部图标切换----------
          Bl.on('click', function () {
            I = $(this).index()
            Bl.removeClass('on')
            Bl.eq(I).addClass('on')
            if (bloo) {
              imgLi.css('opacity', '0')
              imgLi.eq(I).css('opacity', '1')
            } else {
              L = Lw * (I + 1)
              U.css('left', '-' + L + 'px')
            }
          })
        },
        getTime: function (value) { // 换日期格式不包括时分
          let d = new Date(parseInt(value) * 1000)
          let year = d.getFullYear()
          let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
          let date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
          // let hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
          // let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
          // let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()
          return year + '-' + month + '-' + date
        },
        getnews: function (carouseldata) {
          let self = this
          let col
          let pagesize
          let navcode
          if (carouseldata) {
            let newscarouseldata = $.parseJSON(carouseldata)
            if (newscarouseldata.oncol === '0') {
              col = newscarouseldata.col
            } else {
              col = newscarouseldata.oncol
            }
            pagesize = col * newscarouseldata.onrow
            navcode = newscarouseldata.newssource
          } else {
            pagesize = 6
            navcode = 'news'
          }
          self.$http.get(window.host + '/aroomv3/news.html', {
            params: {
              q: '',
              pagesize: pagesize,
              pagenum: 1,
              navcode: navcode,
              starttime: '',
              endtime: ''
            }
          }, {emulateJSON: true}).then(function (response) {
            let datas = response.data.data
            $('.newsList').empty()
            if (datas.length) {
              for (let i = 0; i < datas.length; i++) {
                let time = self.getTime(datas[i].dateline)
                let newli = '<div class="news_li"><div class="news_li_left"><img src="' + datas[i].thumb + '"></div><div class="news_li_right"><h3><a href="/dyinformation/' + datas[i].itemid + '.html" target="_blank" title="' + datas[i].subject + '"><span class="news_title">' + datas[i].subject + '</span></a><span class="times">' + time + '</span></h3><p class="news_cont" title="' + datas[i].note + '">' + datas[i].note + '</p></div></div>'
                $('.newsList').append(newli)
              }
            }
          }, function (response) {
            console.log(response)
          })
        },
        switchPwd: function () {
          var passwordeye = $('#passwordeye')
          var showPwd = $('#password')
          passwordeye.off('click').on('click', function () {
            if (passwordeye.hasClass('invisible')) {
              passwordeye.removeClass('invisible').addClass('visible') // 密码可见
              showPwd.prop('type', 'text')
            } else {
              passwordeye.removeClass('visible').addClass('invisible') // 密码不可见
              showPwd.prop('type', 'password')
            }
          })
        },
        userlogin: function () {
          let signbtn = $('#signbtnsubmit')
          let carouseldata = $('.login').attr('carouseldata') || ''
          let logincarouseldata
          if (carouseldata) {
            logincarouseldata = $.parseJSON(carouseldata)
          }
          let onlogin = '<div class="risfgr"><img width="100" height="100" src="http://img.ebanhui.com/avatar/2017/08/04/1501818990_120_120.jpg" style="border-radius:50px;"></div><div class="erseasd"><h2 class="waisrd">超级管理...</h2><p class="mdistr">上次登录时间：</p><p class="mdistr">2017-08-22 17:21</p></div><div style="clear: both;"></div><div class="entryandexit"><a href="/logout.html" class="exitbtn fl">退出</a><input class="signbtnexit" value="马上进入" id="enter" name="Submit" type="submit"></div></div>'
          let logintype1 = '<div class="risfgr"><img width="100" height="100" src="http://img.ebanhui.com/avatar/2017/08/04/1501818990_120_120.jpg" style="border-radius:50px;"></div><div class="erseasd"><h2 class="waisrd">超级管理...</h2><p class="mdistr">上次登录时间：</p><p class="mdistr">2017-08-22 17:21</p></div><div style="clear: both;"></div><div class="entryandexit"><a href="/logout.html" class="tuichu fl"></a><a href="/troomv2.html" class="masjr fr"></a></div>'
          signbtn.on('click', function () {
            if (logincarouseldata.logintype === 'logintype1') {
              $('.login .denser').empty().append(logintype1)
            } else {
              $('.login .denser').empty().append(onlogin)
            }
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
                  'body a[href]:hover{color:' + pp.fontHover + ';}' +
                  'body,#preview{background-color:' + pp.bg + '}' +
                  '.content{width:' + pp.width + ';height:' + pp.height + ';background-color:' + pp.pg + '}' +
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
        head.append(module.top)
        middle.append(module.body)
        foot.append(module.foot)
        let carousel = $('.carousel')
        for (let i = 0, len = carousel.length; i < len; i++) {
          self.carouselEvent(self, carousel.eq(i), i)
        }       
        // let newscarouseldata = $('.news').attr('carouseldata') || ''
        // self.getnews(newscarouseldata)
        self.switchPwd()
        self.userlogin()
      })
    },
    methods: {
      returnEvent: function () {
        let self = this
        let carousel = $('.carousel')
        for (let i = 0, len = carousel.length; i < len; i++) {
          clearInterval(self['carInter' + i])
        }
        self.$router.push('/')
      },
      saveEvent: function () { // 页面保存
        let self = this
        let obj = window.saveParams
        let setting = {
          pg: obj.page.pg,
          bg: obj.page.bg,
          fontHover: obj.page.fontHover,
          pgImage:obj.page.pgImage,
          bgImage:obj.page.bgImage,
          width: obj.page.width + 'px',
          height: obj.page.height + 'px',
          top: obj.page.top,
          body: obj.page.body,
          foot: obj.page.foot
        }
        let strSetting = window.JSON.stringify(setting)
        let headArray = obj.module.top
        let bodyArray = obj.module.body
        let footArray = obj.module.foot
        let audition = $('.audition ')
        let auditions = ''
        for (let i = 0, len = audition.length; i < len; i++) {
          let item = audition.eq(i)
          auditions += item.attr('auditionid')
          if (i < len - 1) {
            auditions += ','
          }
        }
        let param = {
          url: '/room/design/save.html',
          params: {
            head: headArray,
            foot: footArray,
            body: bodyArray,
            settings: strSetting,
            status: 0,
            auditions: auditions
          },
          fun: function (response) {
            let body = response.body
            let code = body.code
            let msg = body.msg
            if (code === 0) {
              self.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              })
            } else {
              self.$notify({
                title: '警告',
                message: msg,
                type: 'warning'
              })
            }
          }
        }
        self.httppost(param)
      }
    }
  }
</script>
<style>
/*top*/  
  #preview .top{
    padding-top: 3px;
    padding-left: 10px;
    padding-right: 60px;
    position: relative;    
    min-width: 1024px;
    border-bottom: 1px solid #d9d9d9;
    z-index: 4;
    background-color: #fff;
    letter-spacing: 0;
    float: left;
    width: 100%;
    box-sizing: border-box;
    height: 34px;
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
    width: 380px;  
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
      cursor:not-allowed;
    }
    .top .tl_li_Disable span{
      color: #cacaca;
    }
    .top .tl_li_Disable i{
      color: #cacaca;
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
      min-width: 112px;
      background: #fff;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
    }
    .toolbar li{
      padding: 10px;
      text-align:left;
      list-style-type: none;
      color: #525e71;
      text-indent:4px;
      letter-spacing: 2px;
    }
    .toolbar li:hover{
      background-color: #f5f5f7;
    }
    .toolbar li i{
      margin-top: -3px;
      margin-right:5px;
      float: left;
    }  
    .toolbar input::-webkit-inner-spin-button{
      display: none;
    }
    #preview .t_right{
      position: absolute;    
      width: 180px;
      height: 28px;
      top: 3px;
      right: 4px;
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
    width: 100%;
    position: relative;
  }
</style>
