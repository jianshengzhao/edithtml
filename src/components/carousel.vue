<template>
  <div id="carousel">
    <el-dialog :title="carouselTit" :visible.sync="dialogCarousel" size="carousel" >
      <div class="scrollBox">
        <el-row>
          <el-col :span="2">自适应：</el-col>
          <el-col :span="5">
            <el-radio class="radio" v-model="showSuit" label="true">是</el-radio>
            <el-radio class="radio" v-model="showSuit" label="false">否</el-radio>
          </el-col>
         <!--  <el-col :span="2">切换方式：</el-col>
          <el-col :span="5">
            <el-select v-model="changeStyle" placeholder="请选择">
              <el-option
                v-for="item in animStyle"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="2">展示时长：</el-col>
          <el-col :span="5"><el-input-number v-model="showTime" :min="1" :max="99"></el-input-number></el-col>
          <el-col :span="2">切换时长：</el-col>
          <el-col :span="6"><el-input-number v-model="transitionTime" :min="0.5" :max="5" :step="0.2"></el-input-number></el-col>
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
                <el-col :span="3"><span @click="carouselDeleteEvent(index)" class="spanTit" v-if="item.clickurl">删除</span></el-col>
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
        showSuit: 'false',
        showWidth: 1200,
        carouselTit: '轮播图',
        animStyle: [{
          value: true,
          label: '渐显'
        }],
        changeStyle: true,
    }
  },
  created: function () {
    let self = this
  },
  methods: { 
    show: function (that, element) { 
      let self = this
      self.that = that     
      self.dialogCarousel = true      
    },
    addPictureEvent: function () {
      let self = this    
      self.that.$refs.myimages.show('carousel', self, function (self, data) {        
        self.carouselData.push({
          imgurl: data,
          clickurl: '',
          urlType: '',
          urlRoute: ''
        })
      })
    },
    updatePictureEvent: function (index) {
      let self = this 
      self.index = index   
      self.that.$refs.myimages.show('carousel', self, function (self, data) {        
        self.carouselData[self.index]['imgurl'] = data
      })
    },
    deletePictureEvent: function (index) {
      let self = this;
      self.carouselData.splice(index,1)
    },
    dialogCarouselEvent: function () { // 轮播图配置数据
      let self = this
      let obj = {
        changeStyle: self.changeStyle,
        showSuit: self.showSuit,
        showTime: self.showTime,
        transitionTime: self.transitionTime,
        carouselData: self.carouselData
      }
      let str = window.JSON.stringify(obj)
      self.dialogCarousel = false
      $('.on_module').attr('carouselData', str)
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
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
    .carousel .el-dialog__header {
      border-bottom: 1px solid #CECECE;
      height: 40px;
    }
    .el-dialog--carousel{
      width: 1000px;
    }
    .el-dialog--carousel{
      width: 980px;
    }
    .scrollBox{
    }
    .selectBox{
      margin-top: 20px;
      height: 500px;
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
      height: 86px;
      border-bottom: 1px solid #e3e3e3;
    }
    .diaimg_li .carImgBox{
      float: left;
      position: relative;
      margin: 10px;
      width: 480px;
      height: 66px;
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
      background-image: url(../assets/newslibIcon/update.png);
      background-position: center;
      background-repeat: no-repeat;
    }
    .diaimg_li .carImgBox:hover .update{
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
      background-image: url(../assets/newslibIcon/delete.png);
      background-position: center;
      background-repeat: no-repeat;
    }
    .diaimg_li .carImgBox:hover .delete{
      display: block;
    }
    .diaimg_li img{
      width: 480px;
      height: 66px;
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
      width: 430px;
      height:70px;
      float: right;
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
      margin-top: 6px;
      font-size: 14px;
      line-height: 16px;
      padding-left: 5px;
      color: #666;
      height: 36px;
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
      margin-bottom: 15px;
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
</style>
