<template>
  <div id="advert">
    <el-dialog
      title="悬浮广告"
      :visible.sync="dialogAdvert"
      size="advert"
      @close="beforeCloseEvent" >
      <el-row style="margin-bottom: 26px;">
        <el-col :span="4">悬浮方式</el-col>
        <el-col :span="18">
          <el-radio-group v-model="showStyle">
            <el-radio-button label="static">
              <img src="../assets/newdialog/static.jpg">
              <span class="stylename">静态悬浮</span>
              <div class="pitchIcon">✔</div>
            </el-radio-button>
            <el-radio-button label="dynamic">
              <img src="../assets/newdialog/dynamic.gif">
              <span class="stylename">动态悬浮</span>
              <div class="pitchIcon">✔</div>
            </el-radio-button>
          </el-radio-group>
          <!-- <el-select v-model="showStyle" placeholder="请选择悬浮方式" >
            <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col >添加图片：<span style="color: #999;">（最多添加5张图片）</span></el-col>
        <el-col >
          <div class="addImgList">
            <div class="addLi" v-for="(item, index) in advertData">
              <div class="imgbox">
                <img :src="item.img" alt="">
                <div class="update" @click="updatePictureEvent(index)"></div>
                <div class="delete" @click="deletePictureEvent(index)"></div>
              </div>  
              <div class="set-url-btn" :style="!item.url ? 'display:block' : 'display:none'" @click="settingHrefEvent(index)">设置链接</div>
              <div class="update-url-box" v-if="item.url">
                <div class="urlType">{{item.urlType}}：</div>
                <div class="urlRoute">{{item.urlRoute}}</div>
                <div class="update" @click="settingHrefEvent(index)">修改</div>
                <div class="delete" @click="deleteHrefEvent(index)">删除</div>
              </div>
            </div>
            <div class="addLi" v-if="advertData.length < 5">
              <div class="advert-uploader">
                <div class="el-upload el-upload--text" @click="addPictureEvent">
                  <i class="el-icon-plus"></i>
                  <span>添加图片</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogAdvert = false">取 消</el-button>
        <el-button type="primary" @click="dialogAdvertEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'advert',
  data () {
    return {
      dialogAdvert: false,
      showStyle: 'static',
      advertData: [],
      styleOptions: [
        {
          label: '静态悬浮',
          value: 'static'
        },
        {
          label: '动态悬浮',
          value: 'dynamic'
        }
      ],
      currentEle:''
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.datahtml
    moduleData['toallGroup']['online'].push({
      name: 'advert',
      icon: 'imgicon icon-advert',
      text: '悬浮广告'
    })
    // 配置模块参数
    moduleData['advert'] = { 
      style: 'width:300px; height:150px',
      tool: {
        private: {
          text: '编辑广告',
          class: 'st-advert'
        },
        public: []
      },
      createEvent: function (self, element, me) {
        self.$refs.advert.show(self, element)
      },
      html: '<div class="advert module addmodule"  datatext="悬浮广告"><div class="advCon"></div></div>'
    }
  },
  methods: {
    show: function (that, element) {
      let self = this
      self.that = that
      self.showStyle = 'static' 
      self.advertData = [] 
      self.dialogAdvert = true
      self.currentEle = element     
      let advertData = self.currentEle.attr('advertData')
      if(advertData) {
        let jsonAdvert = $.parseJSON(advertData)
        self.showStyle = jsonAdvert.floatStyle      
        self.advertData = jsonAdvert.advertData
      }      
    },    
    dialogAdvertEvent: function () {
      let self = this
      if (self.advertData.length < 1) {
        self.$notify({
          title: '警告',
          message: '您还未添加广告图片',
          type: 'warning'
        })
        return false
      }
      self.currentEle.show()
      self.dialogAdvert = false

      /* 计算最宽的图片 */

      let maxW = 0 // 最大值      
      for(let i = 0, len = self.advertData.length; i < len; i++) {
        let item = self.advertData[i]       
        if (item.imgW && parseInt(item.imgW) > maxW) {
          maxW = parseInt(item.imgW)        
        }
      }
     
      if (maxW > 0) {
        self.currentEle.css({
          width: maxW
        })       
      } 


      /* 参数设置存储 */
      
      let obj = {
        floatStyle: self.showStyle,       
        advertData: self.advertData
      }
      let str = window.JSON.stringify(obj)
      self.currentEle.attr('advertData', str)

      /* 添加广告图片和跳转链接 */
    
      let advHtml = ''

      for (let i = 0, len = self.advertData.length; i < len; i++) {
        let item = self.advertData[i]
        if (item.url == 'loginEvent' || item.url == 'getUserNameEvent' || item.url == 'registerEvent' ) {
          advHtml += '<a class="' + item.url + '" target="_blank"><img src="'+ item.img +'"></a>'
        } else {
          advHtml += '<a href="'+ item.url +'" target="_blank"><img src="'+ item.img +'"></a>'
        }        
      }
      let advCon = self.currentEle.find('.advCon')
      advCon.html(advHtml) 

      /* 计算广告高度 */  
   
      self.currentEle.ready(function() {
        let imgs = advCon.find('img')
        let hs = 0
        for (let i = 0, len = imgs.length; i < len; i++) {
          let imgi =  imgs.eq(i)
          hs = hs + parseInt(imgi.css('height'))
        }
        // if (self.showStyle == 'static') {
        self.currentEle.css('height',hs + 'px')
        // } else {
        //   self.currentEle.css({
        //     'height': hs + 'px',
        //     'top': 0,
        //     'left': 0
        //   })
        // }
        self.currentEle.find('.resizeBox').css('height',hs + 'px')
        let as = advCon.find('a')
        for (let i = 0, len = as.length; i < len; i++) {
          let ai = as.eq(i)
          let aih = (parseInt(ai.css('height')) / hs) * 100          
          ai.css('height', aih + '%')
        }
      })
    },
    addPictureEvent: function () {
      let self = this    
      self.that.$refs.myimages.show('advert', self, function (self, data, imgSize) {        
        self.advertData.push({
          img: data,
          url: '',
          urlType: '',
          urlRoute: '',
          imgW: imgSize.w,
          imgh: imgSize.h
        })
      })
    },
    updatePictureEvent: function (index) {
      let self = this 
      self.index = index   
      self.that.$refs.myimages.show('advert', self, function (self, data, imgSize) {        
        self.advertData[self.index]['img'] = data
        self.advertData[self.index]['imgW'] = imgSize.w
        self.advertData[self.index]['imgh'] = imgSize.h
      })
    },
    deletePictureEvent: function (index) {
      let self = this;
      self.advertData.splice(index,1)
    },
    settingHrefEvent: function (index) {
      let self = this;
      self.index = index
      self.that.$refs.hrefdialogp.show('advert', self, function (self, data, linkType) {
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
         self.advertData[self.index]['urlType'] = urlType
         self.advertData[self.index]['urlRoute'] = urlRoute
         self.advertData[self.index]['url'] = urlHref
      })     
    },
    deleteHrefEvent: function (index) {
      let self = this;
      self.advertData[index].url = ''     
    },
    beforeCloseEvent: function () { // 关闭弹框前的回调     
      let self = this      
      if (self.advertData.length < 1) {
        let parent = self.currentEle.parent()
        self.that.tool.carryUpdateElementStorageEvent(self.that, parent, self.currentEle, self.currentEle) // 更新选区
        self.currentEle.remove()        
        self.that.tool.carryLayerEvent(self.that, parent) // 更新图层
      }
    }
  }
}
</script>
<style>
  .el-dialog--advert {
    width: 500px;
  }
  #advert .el-dialog__header {
    border-bottom: 1px solid #CECECE;
    height: 30px;
  }
  #advert .el-row {
    margin-bottom: 10px;
  }
  #advert .el-col {   
    line-height: 36px;
    font-size: 14px;
  }
  #advert .el-input .el-input__inner {
    color: #48576a;
  }  
  #advert .addImgList{
    width: 450px;
    border:1px solid #E4E4E4;
    padding-bottom: 15px;
  }
  #advert .addLi{
    height: 60px;
    margin-top: 15px;
  }
  #advert .advert-uploader {
    margin: 0px 10px 0 15px;
    height: 60px;
    width: 94px;
  }
  #advert .advert-uploader .el-upload {
    width: 100%;
    height: 100%;
    border:1px solid #E4E4E4;
    color: #999;
    box-sizing: border-box;
  }
  #advert .el-icon-plus {
    display: block;
    margin:15px auto 0;
  }
  #advert .addLi .imgbox{
    position: relative;
    margin: 0px 10px 0 15px;
    width: 94px;
    height: 60px;
    float: left;
  }
  #advert .addLi .imgbox .update {
    display: none;
    position: absolute;
    top:0;
    right: 20px;
    line-height: 14px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: #20a1ff;
    background-image: url(../assets/newslibIcon/update.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 16px;
  }
  #advert .addLi:hover  .imgbox .update{
    display: block;
  }
  #advert .addLi .imgbox .delete {
    display: none;
    position: absolute;
    top:0;
    right: 0px;
    line-height: 14px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-color: #f92121;
    background-image: url(../assets/newslibIcon/delete.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 16px;
  }
  #advert .addLi:hover .imgbox .delete{
    display: block;
  }
  #advert .addLi .imgbox img{
    width: 100%;
    height: 100%;
  }
  #advert .addLi .set-url-btn{
    margin-top: 10px;
    float: left;
    color: #169BD5;
    cursor: pointer;
  }
  #advert .addLi .update-url-box{
    position: relative;
    float: left;
    width: 320px;
    height: 60px;
  }
  #advert .addLi .update-url-box div {
    line-height: 24px;
  }
  #advert .addLi .update-url-box .urlRoute{
    width: 290px;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
    color: #999999;
  }
  #advert .update-url-box .update{
    position: absolute;
    top: 0px;
    right: 5px;
    color: #169BD5;
  }
  #advert .update-url-box .delete{
    position: absolute;
    top:24px;
    right: 5px;
    color: #FF0000;
  }
  #advert .el-radio-button__inner{
    position: relative;
    display: block;
    width: 90px;
    height: 60px;
    padding: 0;
    margin-right:10px;
    border-radius: 0;
    border: 0;
    box-shadow: none;  
    border: 1px solid #999999;  
    box-sizing: content-box; 
  }
  
  #advert .is-active .el-radio-button__inner {
    border: 1px solid #20a0ff;
    background-color: #fff;
  }
  #advert .is-active .el-radio-button__inner .stylename{
    color: #20a0ff;
  }
  #advert .el-radio-button__inner img{
    display: block;   
    width: 90px;
    height: 60px;
  }
  #advert .el-radio-button__inner .stylename{
    position: absolute;
    left: 24px;
    bottom: -20px;
    color: #999999;
  }
</style>
