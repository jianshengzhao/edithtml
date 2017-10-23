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
        </el-row>
        <el-row>
          <el-col :span="2">展示时长：</el-col>
          <el-col :span="5"><el-input-number v-model="showTime" :min="5" :max="20"></el-input-number></el-col>
          <el-col :span="2">切换时长：</el-col>
          <el-col :span="6"><el-input-number v-model="transitionTime" :min="0" :max="2" :step="0.2"></el-input-number></el-col>
        </el-row>        
        <div class="selectBox">
          <div class="diaimg_li" v-for="(item, index) in carouselData">
            <div class="carImgBox">
              <img :src="item.imgurl">
              <div class="update">修改</div>
              <div class="delete">删除</div>
            </div>            
            <div class="handleList">
              <el-row>
                <el-col :span="2">
                  <span @click="carouselShiftUpEvent(index)" class="spanTit" v-if="index!=0">上移</span>
                  <span v-else class="spanTit ban">上移</span>
                </el-col>  
                <el-col :span="19">
                  <span class="spanTit spanUrl">设置链接</span>
                </el-col>
                <el-col :span="3"><span @click="carouselDeleteEvent(index)" class="spanTit">修改</span></el-col>              
                <!-- <el-col :span="15">
                  <span class="spanTit spanUrl">跳转链接
                    <input type="text" placeholder="请输入链接 ( 默认为空,点击图片不跳转 )" :value="item.clickurl" @change="carouselChangeEvent(index)">
                  </span>
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="2">
                  <span @click="carouselShiftDownEvent(index)" class="spanTit" v-if="index!=carouselData.length-1">下移</span>
                  <span v-else class="spanTit ban">下移</span>
                </el-col>
                <el-col :span="19">
                  <span class="spanTit spanUrl"></span>
                </el-col>
                <el-col :span="3"><span @click="carouselDeleteEvent(index)" class="spanTit">删除</span></el-col>
              </el-row>
            </div>
          </div>
          <div class="diaimg_li" v-if="carouselData.length < 9">
            <el-upload
              class="carousel-uploader"
              name="upfile"
              action="/uploadv2/image.html"
              :show-file-list="false"
              :on-success="handleCarouselSuccess"
              :before-upload="beforePictureUpload">                  
              <i class="el-icon-plus"></i>
            </el-upload>
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
      carouselData: [{
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner1.jpg',
          clickurl: ''
        }, {
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner2.jpg',
          clickurl: ''
        }, {
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner3.jpg',
          clickurl: ''
        }],
        showTime: 5,
        transitionTime: 0.6,
        showSuit: 'false',
        showWidth: 1200,
        carouselTit: '轮播图',
        animStyle: [{
          value: false,
          label: '滚动'
        }, {
          value: true,
          label: '渐显'
        }],
        changeStyle: false,
    }
  },
  created: function () {
    let self = this
  },
  methods: { 
    show: function () { 
      let self = this     
      self.dialogCarousel = true   
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
      let self = this
      self.carouselData.splice(index, 1)
    },
    carouselChangeEvent: function (index) { // 设置跳转链接
      let self = this
      let val = $('.spanUrl input').eq(index).val()
      self.carouselData[index].clickurl = val
    },
    handleCarouselSuccess: function (res) { // 添加图片成功
      let self = this
      let code = res.code
      let data = res.data
      if (code === 0) {
        self.carouselData.push({imgurl: data.showurl, clickurl: ''})
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
    dialogCarouselEvent: function () { // 轮播图配置数据
      let self = this
      let obj = {
        changeStyle: self.changeStyle,
        showSuit: self.showSuit,
        showTime: self.showTime,
        transitionTime: self.transitionTime,
        carouselData: self.carouselData
      }
      let str = JSON.stringify(obj)
      self.dialogCarousel = false
      $('.on_module').attr('carouselData', str)
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
      right: 30px;
      top:0;
      line-height: 24px;
      color: #999;      
      background-color: #fff;
      cursor: pointer;
    }
    .diaimg_li .carImgBox:hover .update{
      display: block;
    }
    .diaimg_li .carImgBox .delete{
      display: none;
      position: absolute;
      right: 0;
      top:0;
      color: #999;
      line-height: 24px;
      background-color: #fff;
      cursor: pointer;
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
      height: 30px;
      line-height: 30px;
    }
    .selectBox .handleList .el-row .el-col{
      font-size: 30px;
      height: 30px;
    }
    .handleList{
      margin-top: 15px;
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
