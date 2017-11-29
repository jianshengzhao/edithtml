<template>
  <div id="footernav">   
    <el-dialog
      :title="title"
      :visible.sync="dialogFooterNav"
      size="footer" 
      @close="beforeCloseEvent">
      <el-row class="newnav">
        <el-button type="primary" size="small" @click="addnavEvent('')">新增导航</el-button>
      </el-row>
      <el-row class="footer-th">
        <el-col :span="2" class="center">启用</el-col>
        <el-col :span="3">导航名称</el-col>
        <el-col :span="4">图标（操作前）</el-col>
        <el-col :span="4">图标（操作后）</el-col>
        <el-col :span="10">操作</el-col>
      </el-row>
      <el-row class="footer-tr" v-for="(item, index) in footerData" :key='index'>
        <el-col :span="2" class="center"><el-checkbox v-model="item.enable"></el-checkbox></el-col>
        <el-col :span="3">{{item.navname}}</el-col>
        <el-col :span="4" class="center"><img :src="item.before" alt=""></el-col>
        <el-col :span="4" class="center"><img :src="item.after" alt=""></el-col>
        <el-col :span="10">
          <span class="edit" @click="addnavEvent(index)">编辑</span>
          <span class="delete" v-if="item.navcode!='index'"  @click="deleteEvent(index)">删除</span>          
          <span class="up" v-if="index!=0" @click="upEvent(index)">上移</span>
          <span class="down" v-if="index!= footerData.length - 1" @click="downEvent(index)">下移</span>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFooterNav = false">取 消</el-button>
        <el-button type="primary" @click="dialogFooterEvent">确 定</el-button>
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
        <el-col :span="7" class="right">图标（操作前）：</el-col>
        <el-col :span="17" class="con">
          <img :src="beforeImg" v-if="beforeImg!=''">
          <span class="updateicon" v-if="beforeImg!=''" @click="imagesEvent('beforeImg')">修改</span>
          <span class="addicon" v-if="beforeImg==''" @click="imagesEvent('beforeImg')">添加</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" class="right">图标（操作后）：</el-col>
        <el-col :span="17" class="con">
          <img :src="afterImg" v-if="afterImg!=''">
          <span class="updateicon" v-if="afterImg!=''" @click="imagesEvent('afterImg')">修改</span>
          <span class="addicon" v-if="afterImg==''" @click="imagesEvent('afterImg')">添加</span>
        </el-col>
        <el-col></el-col>
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
export default {
  name: 'footernav',
  data () {
    return {
      dialogFooterNav: false,
      footerData: [
        {
          enable: true,
          navname: '首页',
          navcode: 'index',
          before: '',
          after: '',
          Type: '',
          Route: '',
          url:'/'
        },
        {
          enable: false,
          navname: '其它',
          navcode: '',
          before: '',
          after: '',
          Type: '',
          Route: '',
          url:''
        },
        {
          enable: true,
          navname: '其它',
          navcode: '',
          before: '',
          after: '',
          Type: '',
          Route: '',
          url:''
        }],
      dialogAddNav: false,
      navname: '',
      navcode: '',
      beforeImg: '',
      afterImg: '',    
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
      name: 'footernav',
      icon: 'imgicon icon-menubar',
      text: '底部导航'
    })
    // 配置模块参数   
    moduleData['footernav'] = {
      style: 'width:10rem; height:1.5rem',
      tool: {
        private: {
          text: '编辑底部导航',
          class: 'st-footernav'
        }, 
        public: []
      },
      createEvent: function (self, element, me) {  
        if (me.top.find('.footernav').length > 1) {
          self.$notify({
            title: '警告',
            message: '您已经添加过底部导航栏',
            type: 'warning'
          }) 
          element.remove()
        } else {
          self.$refs.footernav.show(element, me)      
        }       
      },
      html: '<div class="footernav module addmodule"  datatext="底部导航"><div class="editbox"></div></div>'
    }
  },
  methods: {
    show: function (element, me) { // 导航弹框显示
      let self = this
      self.element = element
      self.dialogFooterNav = true
      let navData = self.element.attr('navData')
      if (navData) {
        self.footerData = $.parseJSON(navData)
      } else {
        self.footerData =[
          {
            enable: true,
            navname: '首页',
            navcode: 'index',
            before: '',
            after: '',
            Type: '',
            Route: '',
            url:'/'
          },
          {
            enable: false,
            navname: '其它',
            navcode: '',
            before: '',
            after: '',
            Type: '',
            Route: '',
            url:''
          },
          {
            enable: true,
            navname: '其它',
            navcode: '',
            before: '',
            after: '',
            Type: '',
            Route: '',
            url:''
          }]
      }
      if ($('.footernav').length < 1) { // 判断是否已设置过导航
        self.addstate = true
      }     
    },
    dialogFooterEvent: function () { // 导航设置完成
      let self = this
      let selectLen = 0
      let arrdata = []
      let navhtml = ''      
      for (let i = 0, len = self.footerData.length; i < len; i++) {
        let item = self.footerData[i]
        if (item.enable) {
          selectLen++
          arrdata.push(item)
        }
      }
      if (selectLen > 5) {
        self.$notify({
          title: '警告',
          message: '最多只能勾选5个导航',
          type: 'warning'
        })
      } else {
        self.element.show()
        self.addstate = false
        self.dialogFooterNav = false
        let strData = window.JSON.stringify(self.footerData)
        self.element.attr('navData', strData)
        let arrLen = arrdata.length
        let classname = ''
        switch(arrLen) {
          case 1:
            classname = 'one'
          break
          case 2:
            classname = 'two'
          break
          case 3:
            classname = 'three'
          break
          case 4:
            classname = 'four'
          break
          case 5:
            classname = 'five'
          break
        }
        for (let i = 0, len = arrLen; i < len; i++) {
          let item = arrdata[i]
          navhtml += '<li class="' + classname + '"><a hrefD="' + item.url + '"><img src="' + item.before + '"><img src="' + item.after + '"><span>' + item.navname + '</span></a></li>'
        }
        self.element.find('.editbox').html(navhtml)
      }
    },
    beforeCloseEvent: function () { // 导航弹框关闭执行事件
      let self = this
      if (self.addstate) { // 是否设置失败，则还原初始化
        let parent = self.element.parent()    
        self.$parent.tool.tool.carryUpdateElementStorageEvent(self.$parent, parent, self.element, 'delete') // 更新选区
        self.element.remove()        
        self.$parent.tool.tool.carryLayerEvent(self.$parent, parent) // 更新图层
      }      
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
    addnavEvent: function (index) { // 新增导航
      let self = this
      if (index !== '') {
        self.index = index
        self.title = '编辑菜单'
        let item = self.footerData[index]
        self.enable = item.enable
        self.navname = item.navname
        self.navcode = item.navcode
        self.beforeImg = item.before
        self.afterImg = item.after
        self.urlType = item.Type
        self.urlRoute = item.Route
        self.urlHref = item.url
      } else {
        self.index = undefined
        self.title = '新增导航' 
        self.navname = ''
        self.navcode = ''
        self.beforeImg = ''
        self.afterImg = ''
        self.urlHref = '' 
      }
      self.dialogAddNav = true      
    },
    dialogAddNavEvent: function () { // 新增导航确定
      let self = this
      let message = ''
      if (self.navname == '') {
        message = '你还未填写导航名称'
      } else if (self.beforeImg == '') {
        message = '你还未添加图标（操作前）'
      } else if (self.afterImg == '') {
        message = '你还未添加图标（操作后）'
      } else if (self.urlHref == '' && self.navcode != 'index') {
        message = '你还未添加链接'
      } else {
        if (self.index == undefined) {
          self.footerData.push({
            enable: false,
            navname: self.navname,
            navcode: '',
            before: self.beforeImg,
            after: self.afterImg,
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
            after: self.afterImg,
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
    imagesEvent: function (seat) { // 添加图片
      let self = this
      self.$parent.$refs.myimages.show('footer', self, function (self, data, imgSize) { 
        self[seat] = data
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
  .center{
    text-align:center;
  }
  .right{
    text-align: right;
  } 
/* ------------ 模块样式 --------------- */
  .el-dialog--footer{
    width: 660px;
  }
  .el-dialog--footer .el-dialog__body{
    padding-top: 15px;
  }
  .newnav{
    text-align: right;
    margin-bottom: 15px;
  }
  .footer-th{
    background-color: #eef1f6;
    border:1px solid #dfe6ec;
  }
  .footer-th .el-col{
    height: 40px;
    line-height: 40px;
    color: #1f2d3d;
    font-size: 14px;
    font-weight: 700;
  }
  .footer-tr{
    border:1px solid #dfe6ec;
    border-top:0;
  }
  .footer-tr .el-col{
    height: 40px;
    line-height: 40px;
    color: #1f2d3d;
    font-size: 14px;
  }
  .footer-tr .el-col img{
    display: inline-block;
    margin-top: 8px;
    width: 24px;
    height: 24px;
    background-color: #ccc;
  }
  .footer-tr .el-col span{
    padding: 0 5px;
    font-size: 14px;
    color: #20A0FF;
    cursor: pointer;
  }
  .footer-tr .el-col .delete{
    color: #FF0000;
  }  
  .footernav{
    width: 375px;
    left:50%!important;
    top: 718px!important;
    margin-left: -211px;
    display: none;
    z-index: 100;
  }
  .spaceon .footernav{
    top: 751px!important;
  }
  .onsupendTools{
    position: fixed;
    left:50%!important;
    top: 718px!important;
    margin-left: -215px;
  }
  .spaceon .onsupendTools{
    top: 750px!important; 
  }
  .footernav .resize{
    display: none;
  }
  #footernav .el-dialog__header {
    border-bottom: 1px solid #CECECE;
    height: 30px;
  }
/* ------------ 导航编辑 ----------------*/
  .el-dialog--nav{
    width: 420px;
  }
  .el-dialog--nav .el-dialog__body{
    padding: 15px 5px;
  }
  .el-dialog--nav .el-row{
    height: 30px;
    line-height: 30px;
    font-size: 13px;
  }
  .el-dialog--nav .con{
    padding-left: 5px;
  }
  .el-dialog--nav .con img{
    float: left;
    margin: 2px 4px 0 0;
    width: 24px;
    height: 24px;
  }
  .el-dialog--nav .el-input{
    width: 160px;
    margin-right: 10px;
  }
  .el-dialog--nav .tip{
    color: #ccc;
  }
  .el-dialog--nav .addicon, .el-dialog--nav .updateicon, .el-dialog--nav .updatehref, .el-dialog--nav .deletehref{
    color: #20A0FF;
    cursor: pointer;
  }
  .el-dialog--nav .updatehref, .el-dialog--nav .deletehref{
    float: right;
    margin-right: 10px;
  }
  .el-dialog--nav .deletehref{
    color: #FF0000;   
  }
  .el-dialog--nav .urlRoute{
    display: block;
    margin-top: -4px;
    line-height: 18px;
    color: #999;
  }
</style>
