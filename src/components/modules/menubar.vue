<template>
  <div class="menubar">
    <el-dialog
      title="菜单"
      :visible.sync="dialogMenubar"
      size="menubar">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本设置" name="first">
          <el-row class="menu-head">
            <el-col >弹出方式：</el-col>
          </el-row>
          <el-row class="menu-show-style">
            <ul class="show-style-ul">
              <li class="on" showstyle="lefthalf">
                <div class="imgbox">
                  <img src="">
                  <div class="animtip">✔</div>
                </div>               
                <span>左侧半屏</span>
              </li>
            </ul>                      
          </el-row>
          <el-row class="menu-head">
            <el-col :span="5">模块形状：</el-col>
            <el-col :span="6">
              <el-radio class="radio" v-model="radioshape" label="1">方形</el-radio>
            </el-col>
            <el-col :span="6">
              <el-radio class="radio" v-model="radioshape" label="2">圆形</el-radio>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5" style="line-height: 42px;">选择图标：</el-col>
            <el-col :span="12">
            <div class="menuicon" :style="'background-image: url('+ beforebg +');'"></div>
            <span class="updateicon" @click="imagesEvent('beforebg')">修改</span>
            <span class="updateicon" @click="normalEvent('beforebg')">使用默认图</span>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="菜单管理" name="second">
          <el-row class="menu-head">
            <el-col :span="5" class="right" >模块颜色：</el-col>
            <el-col :span="6"><colorPicker v-model="moduleColorVal" ></colorPicker></el-col>
          </el-row>
          <el-row class="menu-head">
            <el-col :span="5" class="right">文字颜色：</el-col>
            <el-col :span="6"><colorPicker v-model="fontColorVal" ></colorPicker></el-col>
          </el-row>
          <el-row class="menu-head">
            <el-col :span="5" class="right">单菜单高度：</el-col>
            <el-col :span="12"><el-input-number size="small" v-model="menuH"></el-input-number></el-col>
          </el-row>
          <el-row class="newnav">
            <el-button type="primary" size="small" @click="addnavEvent('')">新增导航</el-button>
          </el-row>
          <el-row class="footer-th">
            <el-col :span="4" class="center">启用</el-col>
            <el-col :span="5">菜单名称</el-col>
            <el-col :span="3">图标</el-col>            
            <el-col :span="12">操作</el-col>
          </el-row>
          <el-row class="footer-tr" v-for="(item, index) in footerData" :key='index'>
            <el-col :span="4" class="center"><el-checkbox v-model="item.enable"></el-checkbox></el-col>
            <el-col :span="5">{{item.navname}}</el-col>
            <el-col :span="3"><img :src="item.before" alt=""></el-col>          
            <el-col :span="12">
              <span class="edit" @click="addnavEvent(index)">编辑</span>
              <span class="delete" v-if="item.navcode!='index'"  @click="deleteEvent(index)">删除</span>          
              <span class="up" v-if="index!=0" @click="upEvent(index)">上移</span>
              <span class="down" v-if="index!= footerData.length - 1" @click="downEvent(index)">下移</span>
            </el-col>
          </el-row>
        </el-tab-pane>       
      </el-tabs>      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogMenubarEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="title"
      :visible.sync="dialogAddNav"
      size="nav">
      <el-row>
        <el-col :span="7" class="right">导航名称：</el-col>
        <el-col :span="17" class="con">
          <el-input v-model="navname" placeholder="请输入导航名称" size="mini" :maxlength="4"></el-input>
          <span class="tip">最多不超过四个字</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" class="right">图标：</el-col>
        <el-col :span="17" class="con">
          <img :src="beforeImg" v-if="beforeImg!=''">
          <span class="updateicon" v-if="beforeImg!=''" @click="imagesEvent('beforeImg')">修改</span>
          <span class="addicon" v-if="beforeImg==''" @click="imagesEvent('beforeImg')">添加</span>
        </el-col>
      </el-row>  
      <el-row v-if="navcode!='index'">
        <el-col :span="7" class="right">链接：</el-col>
        <el-col :span="17" class="con">
          <span v-if="urlHref!=''">{{urlType}}:</span>
          <span class="deletehref" v-if="urlHref!=''" @click="deleteHrefsEvent">删除</span>
          <span class="updatehref" v-if="urlHref!=''" @click="hrefsEvent">修改</span>          
          <span class="addicon" v-if="urlHref==''" @click="hrefsEvent">添加</span><br>
          <span class="urlRoute" v-if="urlHref!=''" >{{urlRoute}}</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNav= false">取 消</el-button>
        <el-button type="primary" @click="dialogAddNavEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  import colorPicker from '../supendTools/colorPicker'
  export default {
    name: 'menubar',
    components:{
      colorPicker
    },
    data () {
      return { 
        dialogMenubar: false,
        activeName: 'first',
        radioshape: '1',
        beforebg: 'http://static.ebanhui.com/design/image/menu.png',
        moduleColorVal:'#404248',
        fontColorVal: '#fff',
        menuH: 40,
        footerData: [
          {
            enable: true,
            navname: '首页',
            navcode: 'index',
            before: '',     
            Type: '',
            Route: '',
            url:'/'
          },
          {
            enable: false,
            navname: '其它',
            navcode: '',
            before: '',        
            Type: '',
            Route: '',
            url:''
          },
          {
            enable: true,
            navname: '其它',
            navcode: '',
            before: '',          
            Type: '',
            Route: '',
            url:''
          }],
        dialogAddNav: false,
        navname: '',
        navcode: '',
        beforeImg: '',    
        urlType: '',
        urlRoute: '',
        urlHref: '',
        title:'新增导航'
      }
    },
    created: function () {
      let self = this
      let moduleData = self.$parent.moduleData
      // 注入左侧图标
      moduleData['toallGroup']['online'].push({
        name: 'menubar',
        icon: 'imgicon icon-menubar',
        text: '菜单栏'
      })
      // 配置模块参数   
      moduleData['menubar'] = {
        style: 'width:50px; height:50px',
        tool: {
          private: {
            text: '编辑菜单',
            class: 'st-menubar'
          }, 
          public: []
        },
        createEvent: function (self, element, me) {          
          if (me.top.find('.menubar').length > 1) {
            self.$notify({
              title: '警告',
              message: '您已经添加过菜单栏',
              type: 'warning'
            }) 
            element.remove()
          }   
        },
        html: '<div class="menubar module addmodule"  datatext="菜单栏"><div class="menubar-icon"></div><div class="menuCon"></div></div>'
      }
      $(document).on('mouseenter', '.menubar', function (e) {
        if (!$('.menubar').hasClass('on_module')) {
          $('.menu-fixed').show();
        }        
      })
      $(document).on('mouseleave', '.menu-fixed', function (e) {
        $('.menu-fixed').hide();
      })
    },
    methods: {
      show: function (element, me) {
        let self = this 
        self.activeName = 'first'
        self.dialogMenubar = true
        self.element = element
        if (element.attr('datamenu')) {
          let item = $.parseJSON(element.attr('datamenu'))
          $('.on').removeClass('on')
          $('li[showstyle = '+ item.showstyle +']').addClass('on')
          self.radioshape = item.radioshape
          self.beforebg = item.beforebg
          self.moduleColorVal = item.moduleColorVal
          self.fontColorVal = item.fontColorVal
          self.menuH = item.menuH
          self.footerData = item.footerData
        }
      },
      dialogMenubarEvent: function () { // 菜单设置完成确定按钮
        let self = this
        let showstyle = $('.show-style-ul').find('.on').attr('showstyle')
        // todolist:
        if (self.radioshape == '2') {
          self.element.css('borderRadius', '50%')
        } else {
          self.element.css('borderRadius', '0')
        }
        $('.menu-fixed').remove()
        let lihtm = ''
        for (let i = 0, len = self.footerData.length; i < len; i++) {
          let item = self.footerData[i]
          if (item.enable) {
            lihtm += '<a hrefD="' + item.url + '"><li style="background-image:url(' + item.before + ');height:' + (self.menuH / 37.5) + 'rem;line-height:' + (self.menuH / 37.5) + 'rem;">' + item.navname + '<span class="rj"></span></li></a>'
          }          
        }
        let menuHtm = '<div class="menu-fixed" style="background-color:' + self.moduleColorVal + '; color:' + self.fontColorVal + '">' + lihtm + '</div>'
        $('.space').append(menuHtm)        
        // save Data
        let obj = {
          showstyle: showstyle,
          radioshape: self.radioshape,
          beforebg: self.beforebg,
          moduleColorVal: self.moduleColorVal,
          fontColorVal: self.fontColorVal,
          menuH: self.menuH,
          footerData:self.footerData
        }
        let str = window.JSON.stringify(obj)
        self.element.attr('datamenu', str)
        self.dialogMenubar = false
      },
      imagesEvent: function (seat) {
        let self = this
        self.$parent.$refs.myimages.show('footer', self, function (self, data, imgSize) { 
          self[seat] = data
        })
      },
      normalEvent: function (seat) {
        let self = this
        self[seat] = 'http://static.ebanhui.com/design/image/menu.png'
      },
      addnavEvent: function (index) { // 新增导航
        let self = this
        if (index != undefined) {
          self.index = index
          self.title = '编辑菜单'
          let item = self.footerData[index]
          self.enable = item.enable
          self.navname = item.navname
          self.navcode = item.navcode
          self.beforeImg = item.before        
          self.urlType = item.Type
          self.urlRoute = item.Route
          self.urlHref = item.url
        } else {
          self.index = ''
          self.title = '新增导航' 
          self.navname = ''
          self.navcode = ''
          self.beforeImg = ''    
          self.urlHref = '' 
        }
        self.dialogAddNav = true      
      },
      deleteEvent: function (index) { // 删除导航
        let self = this
        let item = self.footerData.splice(index, 1)
      },
      upEvent: function (index) { // 上移导航
        let self = this
        let item = self.footerData.splice(index, 1)
        self.footerData.splice(index - 1, 0, item[0])
      },
      downEvent: function (index) { // 下移导航
        let self = this
        let item = self.footerData.splice(index, 1)
        self.footerData.splice(index + 1, 0, item[0])
      },
      dialogAddNavEvent: function () { // 新增导航确定
        let self = this
        let message = ''
        if (self.navname == '') {
          message = '你还未填写导航名称'
        } else if (self.beforeImg == '') {
          message = '你还未添加图标（操作前）'
        } else if (self.urlHref == '' && self.navcode != 'index') {
          message = '你还未添加链接'
        } else {
          if (self.index == undefined) {
            self.footerData.push({
              enable: false,
              navname: self.navname,
              navcode: '',
              before: self.beforeImg,            
              Type: self.urlType,
              Route: self.urlRoute,
              url: self.urlHref      
            })
          } else {
            self.footerData[self.index] = {
              enable: self.enable,
              navname: self.navname,
              navcode: self.navcode,
              before: self.beforeImg,       
              Type: self.urlType,
              Route: self.urlRoute,
              url: self.urlHref      
            }
          }        
          self.dialogAddNav = false
          return false
        }
        self.$notify({
          title: '警告',
          message: message,
          type: 'warning'
        })      
      },
      hrefsEvent: function () { // 添加链接
        let self = this
        self.$parent.$refs.hrefdialogp.show('carousel', self, function (self, data, linkType) {
          let urlType = ''
          let urlHref = ''
          let urlRoute = ''
          let navcm             
          switch(linkType){
            case 'online':
              urlType = '外部链接'            
              urlRoute = data.href
              urlHref = data.href
              break
            case 'news':
              urlType = '资讯'
              switch (data.active) {
                case 1:      
                  switch (data.newscode) {
                    case 'news':
                      urlHref = '/dyinformation.html'
                    break
                    default:
                      navcm = data.newscode.split('n')[1]  
                      urlHref = '/navcm/' + navcm + '.html'
                  }              
                  urlRoute = data.news.label
                  break
                case 2: 
                  let w = data.newscode.indexOf("s");
                  navcm = data.newscode.substring(0,w).split('n')[1]
                  let ns = data.newscode.split('s')[1]
                  if (ns) {
                    urlHref = '/navcm/' + navcm + '.html?s=' + ns
                  } else {
                    urlHref = '/navcm/' + navcm + '.html'
                  }               
                  urlRoute = data.news.label + '/' + data.news.label1
                  break
                case 3:
                  urlHref = '/dyinformation/' + data.newscode + '.html'
                  urlRoute = data.news.label1 != '' ? data.news.label + '/' + data.news.label1 + '/' + data.newsTitle : data.news.label + '/' + data.newsTitle
                  break
              }             
              break
            case 'course':
              switch (data.course) {
                case 1:
                  urlType = '课程链接'
                  urlRoute = '选课中心'
                  urlHref = '/platform.html'
                  break
                case 2:
                  urlType = '课程主类'
                  urlRoute = (data.name || '本校课程') + ' / ' + data.pname
                  urlHref = '/platform-1-0-0.html?pid='+ data.pid
                  break
                case 3:
                  urlType = '课程主类'
                  urlRoute = (data.name || '本校课程') + ' / ' + data.pname + ' / ' + data.sname     
                  if(data.sid == 0){
                    urlHref ='/platform-1-0-0.html?pid='+ data.pid
                  } else {
                    urlHref ='/platform-1-0-0.html?pid='+ data.pid + '&sid=' + data.sid
                  }
                  break
                case 4:
                  urlType = '课程'
                  urlRoute = (data.name || '本校课程') + ' / ' + data.pname + ' / ' + data.sname + ' / ' + data.foldername
                  urlHref ='/courseinfo/' + data.itemid + '.html'
                  break
                case 5:
                  urlType = '课件'
                  urlRoute = (data.name || '本校课程') + ' / ' + data.pname + ' / ' + data.sname + ' / ' + data.foldername + ' / ' + data.cwname
                  if(data.cwpay == '1'){
                    urlHref = '/ibuy.html?cwid=' + data.cwid
                  }else{
                    urlHref = '/courseinfo/' + data.itemid + '.html'
                  }
                  break
              }            
              break
            case 'teacher':
              urlType = '教师主页'
              urlRoute = '教师：' + data.realname
              urlHref = '/master/'+ data.teauid +'.html'
              break
            case 'onlineschool':
              let origin = window.location.origin
              urlType = '网校应用'                
              switch (data.oneinlineschool) {
                case 'summary':
                  urlRoute = '网校简介'
                  urlHref = '/introduce.html'
                break
                case 'course':
                  urlRoute = '选课中心'
                  urlHref = '/platform.html'
                break
                case 'contact':
                  urlRoute = '联系我们'
                  urlHref = '/contacts.html'
                break              
                case 'password':
                  urlRoute = '忘记密码'
                  urlHref = '/forget.html' 
                break              
                case 'QQ':
                  urlRoute = '第三方QQ登录'
                  urlHref =  'http://www.ebh.net/otherlogin/qq.html?returnurl=' + origin
                break
                case 'weibo':
                  urlRoute = '第三方微博登录'
                  urlHref = 'http://www.ebh.net/otherlogin/sina.html?returnurl=' + origin
                break
                case 'WeChat':
                  urlRoute = '第三方微信登录'
                  urlHref = 'http://www.ebh.net/otherlogin/wx.html?returnurl=' + origin    
                break
                case 'register':               
                  urlRoute = '注册'
                  urlHref = 'registerEvent'
                break
                case 'username':
                  urlRoute = '获取用户名'
                  urlHref = 'getUserNameEvent'             
                break
                case 'login':
                  urlRoute = '登录弹框'
                  urlHref = 'loginEvent'             
                break
                case 'login1':
                  urlRoute = '登录弹框'
                  urlHref = 'loginEvent'
                break
              }
              break
            }
          self.urlType = urlType
          self.urlRoute = urlRoute
          self.urlHref = urlHref
        })
      },
      deleteHrefsEvent: function () { // 删除链接
        let self = this
        self.urlHref = ''
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .right {
    text-align: right;
  }
/* ------- 控制模块是否可以拉伸 ------- */
  .menubar .resize{
    display: none;
  }
/* ------- 菜单弹出框宽度 ------- */
  .el-dialog--menubar{
    width: 420px;
  }
/* ------- 弹框样式 ------- */
  .menu-head{
    margin-bottom: 15px;
  }
  .menu-head .el-col{
    height: 24px;
    line-height: 24px;
    font-size: 13px;
  }
  .show-style-ul li{
    float: left;
    width: 126.66px;
    height: 130px;
    margin-bottom: 10px;  
    cursor: pointer;  
  }
  .show-style-ul .imgbox{
    position: relative;
    width: 90px;
    height: 110px;
    border:1px solid #797979;
  }
  .show-style-ul .animtip{
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background-color: #20a0ff;
    color: #fff;
    text-align: center;
    line-height: 16px;
  }
  li.on .imgbox{
    border:1px solid #20a0ff;
  }
  li.on .animtip {
    display: block;
  }
  .menu-show-style img{
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
  .menu-show-style span{
    display: block;
    width: 90px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
  .menuicon{
    float: left;
    width: 40px;
    height: 40px;
    background-image: url(http://static.ebanhui.com/design/image/menu.png);
    background-size: 0.427rem 0.384rem ;
    background-position: center;
    background-repeat: no-repeat;
    border:1px solid #ccc;
  }
  .updateicon{
    color: #20A0FF;
    line-height: 40px;
    margin-left: 10px;
    cursor: pointer;
  }
  .el-dialog--menubar .m-colorPicker{
    margin-top: 3px;
    width: 18px;
    height: 18px;
    border: 1px solid #CDCDCD;
  }
  .el-dialog--menubar .m-colorPicker .colorBtn{
    width: 18px;
    height: 18px;
  }
  .el-dialog--menubar .m-colorPicker .box.open{
    z-index: 9;
  }
  .el-dialog--menubar .el-tabs__content {
    overflow: visible;
  }
  .space .menu-fixed {    
    position: absolute;
    height: 630px;
    top: 108px;
    left: 50%;
    margin-left:-5rem;  
    z-index: 99
  }
</style>
