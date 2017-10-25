<template>
  <div id="advert">
    <el-dialog
      title="悬浮广告"
      :visible.sync="dialogAdvert"
      size="advert" >
      <el-row>
        <el-col :span="4">悬浮方式</el-col>
        <el-col :span="18">
           <el-select v-model="showStyle" placeholder="请选择悬浮方式" >
            <el-option
              v-for="item in styleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col >添加图片：</el-col>
        <el-col >
          <div class="addImgList">
            <div class="addLi" v-for="(item, index) in advertData">
              <div class="imgbox">
                <img :src="item.img" alt="">
                <div class="update">修改</div>
                <div class="delete">删除</div>
              </div>  
              <div class="set-url-btn" v-if="!item.url">设置链接</div>
              <div class="update-url-box" v-if="item.url">
                <div class="urlType">{{item.urlType}}：</div>
                <div class="urlRoute">{{item.urlRoute}}</div>
                <div class="update">修改</div>
                <div class="delete">删除</div>
              </div>
            </div>
            <div class="addLi">
              <el-upload
                class="advert-uploader"
                name="upfile"
                action="/uploadv2/image.html"
                :show-file-list="false"
                :on-success="handleAdvertSuccess"
                :before-upload="beforePictureUpload">                  
                <i class="el-icon-plus"></i>
                <span>添加图片</span>
              </el-upload>
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
      advertData: [
        {
          img: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner1.jpg',
          url: 'asdads',
          urlType: '课程',
          urlRoute: '路径'
        }
      ],
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
    // let self = this 
  },
  methods: {     
    dialogAdvertEvent: function () {
      let self = this
      self.dialogAdvert = false

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
        advHtml += '<a href="'+ item.url +'" target="_blank"><img src="'+ item.img +'"></a>'
      }
      let advCon = self.currentEle.find('.advCon')
      advCon.html(advHtml) 

      /* 计算广告高度 */  
   
      self.currentEle.ready(function() {
        let imgs = advCon.find('img')
        let hs = 0
        for(let i = 0, len = imgs.length; i < len; i++) {
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
      })
    },
    beforePictureUpload: function (file) {
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
    handleAdvertSuccess: function (res) {
      let self = this
      let code = res.code
      let data = res.data
      if (code === 0) {
        self.advertData.push({img: data.showurl, url: '', urlType:'',urlRoute:''})
      } else {
        self.$notify({
          title: '警告',
          message: res.msg,
          type: 'warning',
          offset: 50,
          duration: 4000
        })
      }
    },
    show: function (element) {
      let self = this      
      self.dialogAdvert = true
      if (!element) {
        self.showStyle = '' 
        self.advertData = [] 
        self.currentEle = $('.on_module')
        let advertData = self.currentEle.attr('advertData')
        if(advertData) {
          let jsonAdvert = $.parseJSON(advertData)
          self.showStyle = jsonAdvert.floatStyle      
          self.advertData = jsonAdvert.advertData
        }
      } else {
        self.currentEle = element
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
    width: 440px;
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
    position: absolute;
    top:0;
    right: 30px;
    line-height: 14px;
    cursor: pointer;
  }
  #advert .addLi .imgbox .delete {
    position: absolute;
    top:0;
    right: 0px;
    line-height: 14px;
    cursor: pointer;
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
  #advert .urlRoute{
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
</style>
