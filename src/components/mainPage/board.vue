<template>
  <div id="board">
    <div class="list-li" v-for="(item, index) in templateArray">
      <div class="list-img">
        <img :src="item.logo">
      </div>
      <div class="li_show">       
        <img :src="item.logo">
         <div class="li_pic">
          <div class="btn_preview1" @click="previewEvent(item)">预览</div>
          <div class="btn_apply1" @click="applyEvent(item)">应用</div>
        </div>
      </div>
    </div>
    <div v-if=" templateArray.length == 0" class="list-none">暂无精选</div>
    <span class="list-more" @click="dialogTemplateListEvent"><span>全部模板</span></span>

    <!-- 预览 -->
    <el-dialog     
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      size="pictures">
      <img :src="dialogPath" class="prev_img">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
        <el-button type="primary" @click="applyEvent(previewItem)">应 用</el-button>
      </span>
    </el-dialog>
    <!-- 预览 -->
    <!-- 全部模板 -->
    <el-dialog
      title="全部模板"   
      :modal-append-to-body="false"
      :visible.sync="dialogTemplateList"
      size="allplate"> 
      <el-row>
        <el-radio-group v-model="mainClass" @change="changeMainClassEvent">
          <el-radio-button :label="item.aid" :key="item.aid" v-for="(item, index) in templateList">
            {{item.alname}}
          </el-radio-button>        
        </el-radio-group>       
      </el-row> 
      <el-row>
        <el-radio-group size="small" v-model="subsClass" v-if="mainClass == item.aid" :key="item.aid" v-for="(item, index) in templateList">
          <el-radio-button :label="items.aid" :key="items.aid" v-for="(items, index) in item.subs" >
            {{items.alname}}
          </el-radio-button>        
        </el-radio-group>    
      </el-row> 
      <el-row class="tempListScroll"  v-if="mainClass == item.aid" :key="item.aid" v-for="(item, index) in templateList">
        <div  v-if="subsClass == items.aid" :key="items.aid" class="" v-for="(items, index) in item.subs">
          <div class="li_picture" :key="iteml.aid" v-for="(iteml, index) in items.list">
            <div class="li_pic_mask">
              <div class="btn_preview" @click="previewEvent(iteml)">预览</div>
              <div class="btn_apply" @click="applyEvent(iteml)">应用</div>
            </div>
            <img :src="iteml.logo">
            <div class="tel_name">
              {{iteml.name}}
            </div>
          </div>
        </div>
      </el-row> 
    </el-dialog>
    <!-- 全部模板 -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'board',
  data () {
    return {
      dialogVisible: false,
      dialogTemplateList: false,
      dialogPath: '',
      templateArray: [],
      templateList: [{
            "aid": "232",
            "alname": "教育",
            "displayorder": "1",
            "subs": [
                {
                    "aid": "233",
                    "alname": "教育分类1",
                    "displayorder": "1",
                    "list": [
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        },
                        {
                            "path": "http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg",
                            "width": "560",
                            "height": "336",
                            "aid": "233",
                            "paid": "232",
                            "alname": "教育分类1",
                            "displayorder": "1",
                            "pdisplayorder": "1",
                            "palname": "教育",
                            "did": "51",
                            "client_type": "0",
                            "name": "未命名",
                            "remark": ""
                        }
                    ]
                },
                {
                  "aid": "234",
                  "alname": "教育分类2",
                }
            ]
        },{
          "aid": "223",
          "alname": "教育2"
        }],
      mainClass: '',
      subsClass: '',
      previewItem: {}, 
      httpget: function (getParam) { // 封装的异步请求数据
        let self = this
        self.$http.get(window.host + getParam.url, {params: getParam.params}).then((response) => {
          if (getParam.fun !== undefined) {
            getParam.fun(response)
          }
        }).catch(function (response) {
        })
      },
      httppost: function (getParam) { // 封装的异步请求数据
        let self = this
        self.$http.post(window.host + getParam.url, getParam.params, {emulateJSON: true}).then((response) => {
          if (getParam.fun !== undefined) {
            getParam.fun(response)
          }
        }).catch(function (response) {
        })
      },
      selectedTemplates: function () { // 获取精选模板
        let self = this
        let getParam = {
          url: '/room/design/getdesigntemplates.html',
          params: {
            client_type: 0,
            istop: 1,
            num: 10
          },
          fun: function (response) {
            let body = response.body
            let code = body.code
            let msg = body.msg
            let data = body.data
            if (code == 0) {
              self.templateArray = data                         
            } else {
              self.$notify.error({
                title: '错误',
                message: msg
              })
            }
          }
        }
        self.httpget(getParam)
      },
      getTemplateList:function () { // 获取模板列表
        let self = this
        let getParam = {
          url: '/room/design/getdesigntemplates.html',
          params: {
            client_type: 0,
            istop: 0
          },
          fun: function (response) {
            let body = response.body
            let code = body.code
            let msg = body.msg
            let data = body.data
            if (code == 0) {             
              self.templateList = data
              let first = data[0]
              self.mainClass = first.aid
              self.subsClass = first.subs[0].aid             
            } else {
              self.$notify.error({
                title: '错误',
                message: msg
              })
            }
          }
        }
        self.httpget(getParam)
      }
    }
  },
  created: function () {
    let self = this
    self.$nextTick(function () {
      self.selectedTemplates()
    })
  },
  methods: { 
    previewEvent: function (data) {
      let self = this
      self.dialogVisible = true
      self.dialogPath = data.path
      self.previewItem = data
    },
    applyEvent: function (item) {
      let self = this
      let getParam = {
          url: '/room/design/getdesign.html',
          params: {
            crid: 0,
            did: item.did,
            clientType: 0
          },
          fun: function (response) {
            let body = response.body
            let code = body.code
            let msg = body.msg            
            if (code == 0) {              
              self.dialogTemplateList = false
              if (body.data.body == '') {
                self.$notify({
                  title: '警告',
                  message: '暂无模板数据',
                  type: 'warning'
                })
                return false
              } 
              let canvas = $('.canvas')
              let space = $('.space')
              let head = $('.c_top')
              let middle = $('.c_body')
              let foot = $('.c_foot')
              let saveParams = body.data             
              let headHtml = saveParams.head.replace(/[\\]/g, '')
              let bodyHtml = saveParams.body.replace(/[\\]/g, '')
              let footHtml = saveParams.foot.replace(/[\\]/g, '')
              let pp = $.parseJSON(saveParams.settings.replace(/[\\]/g, ''))
              let parent = self.$parent             
              parent.prospectColorVal = pp.pg =='transparent'?null:pp.pg
              parent.bgColorVal = pp.bg =='transparent'?null:pp.bg
              parent.fontHoverColorVal = pp.fontHover||'#333'
              parent.inp_width = parseInt(pp.width)
              parent.inp_height = parseInt(pp.height)
              //  背景
              parent.bgImageUrl = pp.bgImage.backgroundImage.split('(')[1].split(')')[0]
              if (parent.bgImageUrl != '') {
                space.css(pp.bgImage)
              }
              parent.inp_percent = pp.bgImage.backgroundSize.split('%')[0]
              parent.repeatBgValue = pp.bgImage.backgroundRepeat
              parent.attachmentBgValue = pp.bgImage.backgroundAttachment
              //  前景
              parent.pgImageUrl = pp.pgImage.backgroundImage.split('(')[1].split(')')[0]
              if (parent.pgImageUrl != '') {
                canvas.css(pp.pgImage)
              }
              parent.inp_pgPercent = pp.pgImage.backgroundSize.split('%')[0]
              parent.repeatPgValue = pp.pgImage.backgroundRepeat
              parent.attachmentPgValue = pp.pgImage.backgroundAttachment

              space.css('backgroundColor', pp.bg)             
              canvas.css('backgroundColor', pp.pg)              
              canvas.css('width', parent.inp_width)
              canvas.css('height', parent.inp_height)
              head.css('height', pp.top)
              foot.css('height', pp.foot)
              canvas.css({'paddingTop': pp.top, 'paddingBottom': pp.foot})
              head.html(headHtml)
              middle.html(bodyHtml)
              foot.html(footHtml)
              parent.moduleElement = $('.on_module')
              let tool = parent.tool.tool
              tool.carryLayerEvent(parent, head)
              tool.carryLayerEvent(parent, middle)
              tool.carryLayerEvent(parent, foot)
              tool.carryLineHeightEvent()
              tool.carryUpdateElementStorageEvent(parent, head, head.find('.module'))
              tool.carryUpdateElementStorageEvent(parent, middle, middle.find('.module'))
              tool.carryUpdateElementStorageEvent(parent, foot, foot.find('.module'))
              if ($('.waiter').length < 2 && $('.waiter').length > 0) {
                $('.editBox').append('<div class="waiter "><div class="kf-head"></div><div class="kf-top"></div></div>')
                $('.waiter').on('click', function() {
                  parent.$refs.waiter.show(parent, canvas.find('.waiter'))
                })
              }
              tool.topRangeY = parseInt(tool.top.css('height')) + parent.paddingtop + parent.postop // top选区范围
              tool.bodyRangeY = parseInt(tool.body.css('height')) + tool.topRangeY // body选区范围 
              // 特殊的初始化
              let schoolqr = canvas.find('.schoolqr') // 二维码
              if (schoolqr.length > 0) {
                canvas.find('.schoolqr').find('img').attr("src",window.roominfo.wechatimg)
              }

              let schoollogo = canvas.find(".schoollogo") // 网校logo
              if(schoollogo.length > 0){
                schoollogo.find("img").attr("src",window.roominfo.cface)
              }

              let introduce = canvas.find(".introduce") // 网校介绍
              if (introduce.length > 0) {
                introduce.find(".picBox").html(window.roominfo.summary)
              }
              let taxonomy = canvas.find(".taxonomy") // 网校介绍
              if (taxonomy.length > 0) {
                parent.getcoursecategorys(taxonomy)
              }
            }
          }
        }
      self.$confirm('此操作将清除页面原有装扮, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.httppost(getParam)
      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消应用'
        });          
      })
    },
    dialogTemplateListEvent: function (item) {
      let self = this
      self.dialogTemplateList = true
      self.getTemplateList()
    },
    changeMainClassEvent: function (aid) {
      let self = this
      let first = {}
      for (let i = 0, len = self.templateList.length; i < len; i++) {
        let item = self.templateList[i]
        if (item.aid == aid) {
          first = item
          break
        }
      }  
      if (first.subs) {
        self.subsClass = first.subs[0].aid
      }      
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* ---------------- 列表 ----------------- */
/* ---------------- board ---------------- */
  #board{
    float: left;
    margin-left: 10px;
    padding: 2px 0px 2px 4px;
    width: auto;
    height: 50px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
  }
  #board .list-li{
    position:relative;
    float: left;
    margin-right:4px;
    width: 68px;
    height: 42px;
    cursor: pointer;
  }
  .list-none{
    float: left;
    margin-right:4px;
    width: 68px;
    height: 42px;
    line-height: 42px;
    text-align: center;
  }
  .list-img, .list-img img{
    width: 100%;
    height: 100%;
  }
  .list-more{
    float: left;
    width: 68px;
    height: 42px;
    background-image: url(./image/more.png);
    background-repeat: no-repeat;
    background-position: center 5px;
    cursor: pointer;
  }
  .list-more span{
    display: block;
    margin: 26px auto;
    text-align: center;
  }
  .list-li .li_show {
    padding-top: 20px;
    display: none;
    position: absolute;
    width: 366px;
    height: 236px; 
  }
  .list-li:hover .li_show {    
    display: block;
  }  
  .li_show img{
    display: block;
    padding: 4px;
    width: 100%;
    height: 210px;
    border: 1px solid #409efe;
    box-sizing: border-box;
    background-color: #fff;
  }
  .li_show .li_pic{
    position: absolute;
    width:366px;
    height: 26px;
  }
  .li_pic .btn_preview1{   
    float: left;
    width: 162px;
    height: 26px;
    line-height: 26px;
    background-color: #409efe;
    text-align: center;
    color: #fff;
  }
  .li_pic .btn_apply1{ 
    float: left;
    width: 204px;
    height: 26px;
    line-height: 26px;
    background-color: #f0f0f0;
    text-align: center;
    color: #ccc;
  }
/* ---------------- dialog --------------- */
  #board .li_picture {
    position: relative;
    height: 0;
    transition: height 0.3s;
    -moz-transition: height 0.3s; /* Firefox 4 */
    -webkit-transition: height 0.3s; /* Safari 和 Chrome */
    -o-transition: height 0.3s; /* Opera */
    overflow: hidden;
    cursor: default;
  }
  #board .onclick .li_picture {
    height: 136px;
  }
  #board .li_picture img{
    display: block;
    margin-left: 50px;
    width: 175px;
    height: 136px;
    text-indent: 0;
  }
  #board .li_pic_mask {
    position: absolute;
    top: 0;
    left: 50px;
    display: none;
    width: 175px;
    height: 136px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  #board .ele_li:hover .li_pic_mask{
    display: block;
  }
  #board .btn_preview{
    margin: 40px auto 0;
    width: 60px;
    height: 25px;
    border: 1px solid #fff;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: #409EFF;
    cursor: pointer;
    line-height: 25px;
    text-align: center;
    text-indent: 0;
    color: #fff;
  }
  #board .btn_apply{
    margin: 10px auto 0;
    width: 60px;
    height: 25px;
    border: 1px solid #fff;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: #333;
    cursor: pointer;
    line-height: 25px;
    text-align: center;
    text-indent: 0;
    color: #fff;
  }
  #board .el-radio-group{
    margin-left: 12px;
  }
  .el-dialog--pictures{
    width: 980px;
  }
  .el-dialog--pictures .el-dialog__headerbtn{
    margin-top: 10px;
    margin-right: 15px;
  }
  .el-dialog--pictures .el-dialog__header{
    padding: 0;
  }
  .el-dialog--pictures .el-dialog__body{
    padding-top: 35px;
    min-height: 600px;
  }
  .el-dialog--pictures .prev_img{
    width: 100%;    
  }
  .el-dialog--allplate{
    width: 980px;
  }
  .el-dialog--allplate .el-dialog__header{
    height: 28px;
    border-bottom: 1px solid #ccc;
  }
  .el-dialog--allplate .el-row{
    margin-bottom: 15px;
  }
  #board .el-dialog--allplate .li_picture{
    float: left;
    margin: 0 12px;
    height: 200px;
  }
  #board .el-dialog--allplate .li_picture img{
    margin-left: 0;
    width: 210px;
    height: 163px;
  }
  #board .li_picture:hover .li_pic_mask{
    display: block;
  }
  #board .el-dialog--allplate .li_picture .li_pic_mask{
    left: 0;
    width: 100%;
    height: 163px;
  }
  .li_picture .tel_name{
    width: 200px;
    height: 37px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #board .tempListScroll{
    overflow-y: scroll;
    height: 400px; 
  }
  #board .el-radio-button:last-child .el-radio-button__inner{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  #board .el-radio-button:first-child .el-radio-button__inner{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
 /* #board .li_picture .btn_preview{
    margin-top: 50px;
  }*/
</style>
