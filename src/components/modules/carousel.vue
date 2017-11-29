<template>
  <div id="carousel">
    <el-dialog :title="carouselTit" :visible.sync="dialogCarousel" size="carousel" @close="beforeCloseEvent">
      <div class="scrollBox">
       <!--  <el-row>
         <el-col :span="2">切换方式：</el-col>
          <el-col :span="5">
            <el-select v-model="changeStyle" placeholder="请选择">
              <el-option
                v-for="item in animStyle"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="5">展示时间（s）：</el-col>
          <el-col :span="14">
            <el-input-number v-model="showTime" :min="1" :max="99"  size="small"></el-input-number>
            <span style="color: #999;">（1~99）</span>
          </el-col>
         </el-row>
         <el-row>
          <el-col :span="5">切换速度（s）：</el-col>
          <el-col :span="14">
            <el-input-number v-model="transitionTime" :min="0.5" :max="5" :step="0.5" size="small"></el-input-number>
             <span style="color: #999;">（0.5~5）</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            添加图片：<span style="color: #999;">（最多8张图片）</span>
          </el-col>
        </el-row>        
        <div class="selectBox">
          <div class="diaimg_li" v-for="(item, index) in carouselData">
            <div class="carImgBox">
              <img :src="item.imgurl">
              <div class="update" @click="updatePictureEvent(index)"></div>
              <div class="delete" @click="deletePictureEvent(index)"></div>
            </div>            
            <div class="handleList">
              <el-row>
                <el-col :span="2">
                  <span @click="carouselShiftUpEvent(index)" class="spanTit" v-if="index!=0">上移</span>
                  <span v-else class="spanTit ban">上移</span>
                </el-col>  
                <el-col :span="19">
                  <span class="spanTit spanUrl" :style="!item.clickurl ? 'display:block' : 'display:none'" @click="carouselChangeEvent(index)">设置链接</span>
                  <div class="urlType" v-if="item.clickurl">{{item.urlType}}：</div>
                </el-col>
                <el-col :span="3"><span @click="carouselChangeEvent(index)" class="spanTit" v-if="item.clickurl">修改</span></el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <span @click="carouselShiftDownEvent(index)" class="spanTit" v-if="index!=carouselData.length-1">下移</span>
                  <span v-else class="spanTit ban">下移</span>
                </el-col>
                <el-col :span="19">
                  <div class="urlRoute" v-if="item.clickurl">{{item.urlRoute}}</div>
                </el-col>
                <el-col :span="3"><span @click="carouselDeleteEvent(index)" class="spanTit" v-if="item.clickurl" style="color: #FF0000;">删除</span></el-col>
              </el-row>
            </div>
          </div>
          <div class="diaimg_li" v-if="carouselData.length < 8">
            <div class="carousel-uploader" @click="addPictureEvent">
              <div class="el-upload el-upload--text">
                <i class="el-icon-plus"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogCarousel = false">取 消</el-button>
        <el-button type="primary" @click="dialogCarouselEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'carousel',
  data () {
    return {
      dialogCarousel: false,
      carouselData: [],
      showTime: 3,
      transitionTime: 1.5,     
      showWidth: 1200,
      carouselTit: '轮播图',
      animStyle: [{
        value: true,
        label: '渐显'
      }],
      changeStyle: true,
      imgSizeArr:[]
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
      // 注入左侧图标
      moduleData['toallGroup']['online'].push({
        name: 'carousel',
        icon: 'imgicon icon-carousel',
        text: '轮播'
      })
      // 配置模块参数   
      moduleData['carousel'] = {
        style: 'width:10rem; height:4.53rem',
        tool: {
          private: {
            text: '编辑轮播',
            class: 'st-carousel'
          }, 
          public: []
        },
        createEvent: function (self, element, me) {      
          self.$refs.carousel.show(self, element)
        },
        html: '<div class="carousel module addmodule" datatext="轮播图"><div class="screenBox"><div class="img_ul"><div class="img_li"><img src="http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner1.jpg"></div></div><div class="barbox"><li></li><li></li><li></li></div></div></div>'      
      }
  },
  methods: { 
    show: function (that, element) { 
      let self = this
      self.that = that
      self.element = element     
      self.dialogCarousel = true 
      self.carouselData = []
      let cData = element.attr('carouseldata')
      if (cData) {
        cData = $.parseJSON(cData)
        self.changeStyle = cData.changeStyle   
        self.showTime = cData.showTime
        self.transitionTime = cData.transitionTime
        self.carouselData = cData.carouselData
      }     
    },
    addPictureEvent: function () {
      let self = this    
      self.that.$refs.myimages.show('carousel', self, function (self, data, imgSize) {        
        self.carouselData.push({
          imgurl: data,
          clickurl: '',
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
      self.that.$refs.myimages.show('carousel', self, function (self, data, imgSize) {        
        self.carouselData[self.index]['imgurl'] = data
        self.carouselData[self.index]['imgW'] = imgSize.w
        self.carouselData[self.index]['imgh'] = imgSize.h
      })
    },
    deletePictureEvent: function (index) {
      let self = this;
      self.carouselData.splice(index,1)
    },
    dialogCarouselEvent: function () { // 轮播图配置数据
      let self = this
      if (self.carouselData.length < 1) {
        self.$notify({
          title: '警告',
          message: '您还未添加图片',
          type: 'warning'
        })
        return false
      } 
      
      let maxW = 0 // 最大值
      let maxH = 0 // 最大值
      let maxI = 0
      let barHtm = ''
      for(let i = 0, len = self.carouselData.length; i < len; i++) {
        let item = self.carouselData[i]
        if (item.imgW && parseInt(item.imgW) > maxW) {
          maxW = parseInt(item.imgW)
          maxH = parseInt(item.imgh)
          maxI = i
        }
        barHtm += '<li></li>'
      }
      console.log(maxH)
      self.element.find('.barbox').html(barHtm)
      if (maxW > 0) {
        self.element.css({         
          height: (maxH / maxW) * 10 + 'rem'
        })
        
        self.element.find('.img_li').css({
           width: '10rem',
           height: (maxH / maxW) * 10 + 'rem'
        })
        self.element.find('.resizeBox').css({
           height: (maxH / maxW) * 10 + 'rem'
        })        
      }

      let obj = {
        changeStyle: self.changeStyle,
        showTime: self.showTime,
        transitionTime: self.transitionTime,
        carouselData: self.carouselData
      }
      let str = window.JSON.stringify(obj)
      self.dialogCarousel = false
      self.element.find('img').attr('src', self.carouselData[maxI].imgurl)
      self.element.show()
      self.element.attr('carouselData', str)      
    },     
    beforePictureUpload: function (file) { // 上传图片验证
      let self = this
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        self.$notify({
          title: '警告',
          message: '上传的图片只能是jpg、png或gif格式。',
          type: 'warning',
          offset: 50,
          duration: 4000
        })
        return false
      }
    },
    carouselShiftUpEvent: function (index) { // 上移
      let self = this
      let item = self.carouselData.splice(index, 1)
      self.carouselData.splice(index - 1, 0, item[0])
    },
    carouselShiftDownEvent: function (index) { // 下移
      let self = this
      let item = self.carouselData.splice(index, 1)
      self.carouselData.splice(index + 1, 0, item[0])
    },
    carouselDeleteEvent: function (index) { // 删除     
      let self = this;
      self.carouselData[index].clickurl = ''       
    },
    carouselChangeEvent: function (index) { // 设置跳转链接
      let self = this    
      self.index = index
      self.that.$refs.hrefdialogp.show('carousel', self, function (self, data, linkType) {
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
        self.carouselData[self.index]['urlType'] = urlType
        self.carouselData[self.index]['urlRoute'] = urlRoute
        self.carouselData[self.index]['clickurl'] = urlHref
      })
      // self.carouselData[index].clickurl = val
    },
    beforeCloseEvent: function () { // 关闭弹框前的回调     
      let self = this      
      if (self.carouselData.length < 1) {
        let parent = self.element.parent()
        self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
        self.element.remove()        
        self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
    .carousel .resize{
      display: none;
    }
    .carousel .n, .carousel .s{
      display: block;
    }
    #carousel .el-dialog__header{
      border-bottom: 1px solid #CECECE;
      height: 30px;
    } 
    #carousel .el-dialog--carousel{
      width: 660px;
    }
    #carousel .el-dialog__body{
      padding: 10px 20px;
    }
    .selectBox{
      margin-top: 10px;
      height: 360px;
      overflow-y:auto;
      border: 1px solid #d1dbe5;      
    }
    .selectBox span {
      font-size: 14px;
      line-height: 30px;
    }
    .diaimg_li {
      position:relative;    
      width: 100%;
      height: 80px;
      border-bottom: 1px solid #e3e3e3;
    }
    .diaimg_li .carImgBox{
      float: left;
      position: relative;
      margin: 10px;
      width: 160px;
      height: 60px;
    }
    .diaimg_li .carImgBox .update{
      display: none;
      position: absolute;
      right: 24px;
      top:0;
      width: 24px;
      height: 24px;
      cursor: pointer;
      background-color: #20a1ff;
      background-image: url(../../assets/newslibIcon/update.png);
      background-position: center;
      background-repeat: no-repeat;
    }
    .diaimg_li:hover .carImgBox .update{
      display: block;
    }
    .diaimg_li .carImgBox .delete{
      display: none;
      position: absolute;
      right: 0;
      top:0;
      width: 24px;
      height: 24px;
      cursor: pointer;
      background-color: #f92121;
      background-image: url(../../assets/newslibIcon/delete.png);
      background-position: center;
      background-repeat: no-repeat;
    }
    .diaimg_li:hover .carImgBox .delete{
      display: block;
    }
    .diaimg_li img{
      width: 160px;
      height: 60px;
    }
    .selectBox .handleList .el-row{
      margin-bottom: 0;
      height: 35px;
      line-height: 35px;
    }
    .selectBox .handleList .el-row .el-col{
      font-size: 30px;
      height: 30px;
    }
    .handleList{
      margin-top: 10px;
      width: 420px;
      height:70px;
      float: left;
    }    
    .handleList .el-col{
      text-align: left;
      cursor: pointer;
    }
    .handleList .el-col .spanTit{
      display: block;
      width: 100%;
      height: 100%;
      color: #20a0ff;
    }    
    .handleList .el-col .ban{
      color: #ccc;
      cursor: not-allowed;
      height: 35px;
      line-height: 35px;
    }
    .handleList .urlType{
      display: inline-block;
      font-size: 16px;
      color: #666;
      height: 34px;
      line-height: 34px;
      font-weight: 600;
      text-indent: 5px;
      overflow: hidden;
    }
    .handleList .urlRoute{
      width: 330px;
      display: inline-block;     
      font-size: 14px;
      line-height: 16px;
      padding-left: 5px;
      color: #666;
      height: 34px;
      overflow: hidden;     
    }
    .spanUrl{
      text-align: left;
      text-indent: 10px;
    }
    .spanUrl input{
      text-indent: 10px;
      margin-left: 10px;
      width: 300px;
      border-radius: 4px;
      border: 1px solid #9a9a9a;
      color: #999;
    }
    .carousel-uploader{
      height: 100%;
    }
    .carousel-uploader .el-upload--text{    
      display: block;
      margin:0 auto;
      transform:translateY(30px);
      -ms-transform:translateY(30px);   /* IE 9 */
      -moz-transform:translateY(30px);  /* Firefox */
      -webkit-transform:translateY(30px); /* Safari 和 Chrome */
      -o-transform:translateY(30px); 
    }
    .carousel-uploader .el-icon-plus{
      font-size: 24px;
      color: #e3e3e3;
    }  
    .scrollBox .el-row{
      margin-bottom: 5px;
    }
    .scrollBox .el-col{
      height: 36px;
      line-height: 36px;
      text-align: left;
      font-size: 14px;
    }
    .editBox .screenBox .img_ul{
      left: 50%;
      transform: translateX(-50%);
      -ms-transform:translateX(-50%);  
      -moz-transform:translateX(-50%); 
      -webkit-transform:translateX(-50%);
      -o-transform:translateX(-50%);
    }
    .scrollBox .el-select{
      width: 180px;
    }
    #carousel .el-input{
      height: 31px;
      line-height: 31px;
      overflow: hidden;
    }
    #carousel .el-input-number__decrease, #carousel .el-input-number__increase{
      height: 28px;
    }
</style>
