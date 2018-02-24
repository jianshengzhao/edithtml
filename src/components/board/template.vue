<template>
  <div id="board">
    <div class="headers layerhead">
      <span class="tit">精选模板</span>
      <span class="all" @click="dialogTemplateListEvent">全部模板</span>
    </div>
    <div class="lib_ol">
      <div class="ele_li" v-for="(item, index) in templateArray">
        <div class="li_head">
          <div class="li_icon">{{index + 1}}</div><span>{{item.name}}</span>
        </div>
        <div class="li_picture">
          <div class="li_pic_mask">
            <div class="btn_preview" @click="previewEvent(item.path)">预览</div>
            <div class="btn_apply" @click="applyEvent(item)">应用</div>
          </div>
          <img :src="item.path">
        </div>
      </div>
    </div>  
    <!-- 预览 -->
    <el-dialog     
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      size="pictures">
      <img :src="dialogPath" class="prev_img">
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
              <div class="btn_preview" @click="previewEvent(iteml.path)">预览</div>
              <div class="btn_apply" @click="applyEvent(iteml)">应用</div>
            </div>
            <img :src="iteml.path">
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
  name: 'Canvas',
  data () {
    return {
      dialogVisible: false,
      dialogTemplateList: false,
      dialogPath: '',
      templateArray: [{
        name: '青虫岁月',
        path: 'http://static.ebanhui.com/ebh/tpl/2012/images/face/3.jpg'
      },{
        name: '青虫岁月2',
        path: 'http://static.ebanhui.com/ebh/tpl/2012/images/face/6.jpg'
      }],
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
      let board = $('#board')   
      // let li_head = board.find('.li_head')
      board.on('click', '.li_head', function(e) {
        let ele_li = $(this).parent()
        if (ele_li.hasClass('onclick')) {
          $('.onclick').removeClass('onclick')
        } else {
          $('.onclick').removeClass('onclick')
          ele_li.addClass('onclick')
        } 
      })
    })      
  },
  methods: { 
    previewEvent: function (path) {
      let self = this
      self.dialogVisible = true
      self.dialogPath = path
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
              parent.pgImageUrl = pp.pgImage.backgroundImage.split('(')[1].split(')')[0]
              parent.inp_pgPercent = pp.pgImage.backgroundSize.split('%')[0]
              parent.repeatPgValue = pp.pgImage.backgroundRepeat
              parent.attachmentPgValue = pp.pgImage.backgroundAttachment
              parent.bgImageUrl = pp.bgImage.backgroundImage.split('(')[1].split(')')[0]
              parent.inp_percent = pp.bgImage.backgroundSize.split('%')[0]
              parent.repeatBgValue = pp.bgImage.backgroundRepeat
              parent.attachmentBgValue = pp.bgImage.backgroundAttachment
              space.css('backgroundColor', pp.bg)
              space.css(pp.bgImage)
              canvas.css('backgroundColor', pp.pg)
              canvas.css(pp.pgImage)
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
/* ---------------- board ---------------- */
  #board{
    overflow: hidden;
    border-bottom: 1px solid #d9d9d9;
  }
  #board .headers{
    float: left; 
    width: 100%;
    height: 30px;
    padding-left: 5px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    color: #7d8695;   
    font-size: 12px;    
    line-height: 30px;
    text-indent: 10px;
    cursor: pointer;    
  }
  #board .tit{
    font-size: 14px;
    color: #333333;
  }
  #board .all{
    float: right;
    margin-right: 5px;
  }
  #board .lib_ol{
    margin-bottom: 5px;
    border: 0;
  }
  #board .lib_ol .ele_li:nth-child(1) .li_icon{
    background-color: #FF0000;
  }
  #board .lib_ol .ele_li:nth-child(2) .li_icon{
    background-color: #FF6600;
  }
  #board .lib_ol .ele_li:nth-child(3) .li_icon{
    background-color: #339933;
  }
  #board .ele_li{
    margin-top: 5px;
    border: 0;
    height: auto;
    cursor: default;
  }
  #board .ele_li:hover{
    background-color: #fff;
  }
  #board .li_head{
    text-indent: 15px;
    height: 25px;
    cursor: pointer;
  }
  #board .li_icon{
    float: left;
    margin-left: 10px;
    width: 25px;
    height: 25px;
    background-color: #CCCCCC;
    line-height: 25px;
    text-indent: 0;
    text-align: center;
    color: #fff;
    border-radius: 2px;
  }
  #board .ele_li span {
    text-indent: 0;
    display: inline-block;
    font-size: 14px;
    color: #333333;  
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
  }
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
/* ---------------- dialog --------------- */
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
 /* #board .li_picture .btn_preview{
    margin-top: 50px;
  }*/
</style>
