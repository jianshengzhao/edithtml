<template>
  <div id="information">
    <el-dialog
    title="资讯"
    :visible.sync="dialogInformation"
    size="myinformation"
    :close-on-click-modal="false"   
    :before-close="beforeclose">
      <div class="style-wrap">
        <div class="infordesc" style="padding-top: 5px;">选择样式：</div>
        <div class="imgdesc" style="margin-right: 20px;">
          <div class="img-wrap" style="border-color: #557CE1;">
            <img src="../../assets/img/inforpictext.jpg" alt="图文" />
            <span class="checked_infor" style="display: block;"></span>
          </div>
          <p class="desc">图文</p>
        </div>
        <div class="imgdesc">
          <div class="img-wrap">
            <img src="../../assets/img/infortext.jpg" alt="纯文字" />
            <span class="checked_infor"></span>
          </div>
          <p class="desc">纯文字</p>
        </div>
      </div>
      <div class="icon-wrap" v-if="infortype == 2">
        <div class="infordesc">前置图标：</div>
        <img :src="beforeImg" v-if="beforeImg!=''">
        <span class="updateicon" v-if="beforeImg!=''" @click="imagesEvent('beforeImg')">修改</span>
        <span class="deleteicon" v-if="beforeImg!=''" @click="deteleEvent('beforeImg')">删除</span>
        <span class="addicon" v-if="beforeImg==''" @click="imagesEvent('beforeImg')">添加</span>
      </div>
      <div class="classify-wrap">
        <div class="infordesc">资讯分类：</div>
        <el-cascader
          :props="propsclassify"
          :options="optionsclassify"         
          v-model="selectedclassify"
          @change="classifyChangeEvent">
        </el-cascader>
      </div>      
      <div class="contentrange-wrap">
        <div class="infordesc">内容区间：</div>
        <el-input-number v-model="num1" :min="num1 > 0 ? 1 : 0" :max="count"></el-input-number>&nbsp;~&nbsp;
        <el-input-number v-model="num2" :min="num1" :max="count"></el-input-number>&nbsp;条
      </div>
      <p class="infrotips">（选择后显示已选择分类下对应位置资讯）</p>
      <span slot="footer">
        <el-button @click="cancelInformation" size="large">取 消</el-button>
        <el-button type="primary" @click="confirmInformation" size="large">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    name: 'information',
    data: function () {
      return {
        dialogInformation: false,
        infortype:1,
        optionsclassify:[],
        propsclassify:{
          label: 'name',
          value: 'code',
          children: 'subnav',
        },
        beforeImg:'',
        selectedclassify: [],
        num1: 1,
        num2: 5,
        count: 0,
        currTit: '',
        getinfordesc:function(){
          var self = this;
          self.$http.get(window.host + "/aroomv3/news/newsCategory.html",{},{emulateJSON: true}).then(function(response) {
            var datas = response.data;
            if(datas.code == 0){
              self.optionsclassify = datas.data;
            }
          }, function(response){
            console.log(response)
          });
        },
        getLocalTime:function (nS) {//时间戳转换日期格式
          var now = new Date(nS*1000),
          year = now.getFullYear(),
          month = (now.getMonth()+1) < 10 ? '0' + (now.getMonth()+1):now.getMonth()+1,
          date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate(),
          hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours(),
          minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
          second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
          return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
      },
      currentEle_info:''
      }
    },
    created:function(){
      var self = this;
      let moduleData = self.$parent.moduleData
      // 注入左侧图标
      moduleData['toallGroup']['online'].push({
        name: 'information',
        icon: 'imgicon icon-information',
        text: '资讯'
      })
      // 配置模块参数   
      moduleData['information'] = {
        style: 'width:10rem',
        tool: {
          private: {
            text: '编辑资讯',
            class: 'st-information'
          }, 
          public: []
        },
        createEvent: function (self, element, me) {      
          self.$refs.information.show(self,element)
        },
        html: '<div class="information module addmodule" datatext="资讯"><div class="inforCon"></div></div>'
      }
    },
    methods:{
      //用于主页调用当前模板函数，弹出弹框并加载数据
      show: function (that,element) {
        var self = this;
        self.that = that
        self.element = element 
        self.dialogInformation = true;
        if (!element.length) {
          self.currentEle_info = $('.on_module')
        } else {
          self.currentEle_info = element
        } 
        self.count = 5  
        self.openInformation()       
      },      
      openInformation:function(){
        var self = this;        
        if (self.currentEle_info.attr('infoData')) {
          let infoData = $.parseJSON(self.currentEle_info.attr('infoData'))
          self.infortype = infoData.infortype;
          self.selectedclassify = infoData.navcode;
          self.num1 = infoData.begin;
          self.num2 = infoData.last;
          self.currTit = infoData.currTit;
          self.beforeImg = infoData.beforeImg
          self.count = infoData.count          
        } else {
          self.infortype = 1;
          self.selectedclassify = [];
          self.num1 = 1;
          self.num2 = 5;
          self.currTit = '';
          self.beforeImg = ''
          self.count = 5
        }
        $(".img-wrap").css("border-color","#FFFFFF");
        $($(".img-wrap")[self.infortype - 1]).css("border-color","#557CE1");
        $('.checked_infor').hide();
        $($('.checked_infor')[self.infortype - 1]).show();
        self.getinfordesc();
        self.$nextTick( () => {
          let $imgwrap = $(".img-wrap");
          $imgwrap.on("click",function(){
            $(this).css("border-color","#557CE1");
            $(this).children(".checked_infor").show();
            $(this).parent().siblings().children(".img-wrap").css("border-color","#FFFFFF");
            $(this).parent().siblings().children(".img-wrap").children(".checked_infor").hide();
            self.infortype = $(this).siblings("p").html() == "图文"?1:2;
          });
        })
      },
      beforeclose:function(done){
        var self = this;
        if(self.currentEle_info.find(".inforCon").children().length < 1){
          let parent = self.element.parent()
          self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
          self.element.remove()        
          self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
        }
        done();
      },
      cancelInformation:function(){
        var self = this;
        if(self.currentEle_info.find(".inforCon").children().length < 1){
          let parent = self.element.parent()
            self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
            self.element.remove()        
            self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
        }
        self.dialogInformation = false;
      },
      confirmInformation:function(){
        var self = this;       
        let i = self.selectedclassify.length;
        if (i < 1) {
          self.$notify({
            title: '提示',
            message: '请选择资讯分类！',
            type: 'warning',
            offset: 40,
            duration: 2000
          })
          return false;
        }  
        if (self.count < 1) {
          self.$notify({
            title: '提示',
            message: '当前分类资讯条数总共只有0条，请重新选择。',
            type: 'warning',
            offset: 40,
            duration: 3000
          })
        }
        let obj = {
          infortype: self.infortype,
          begin: self.num1,
          last: self.num2,
          navcode: self.selectedclassify,
          currTit: self.currTit,
          beforeImg: self.beforeImg,
          count: self.count
        }
        self.currentEle_info.attr('infoData', window.JSON.stringify(obj))
        self.$http.post(window.host + "/aroomv3/news/getnewslists.html", {
          begin: self.num1,
          last: self.num2,
          navcode: self.selectedclassify[i - 1],
        }, {emulateJSON: true}).then(function (response) {
          let datas = response.data;
          let newslist = datas.data.newslist
          if(datas.code == 0){           
            let inforhtml = "";
            let lih = 2.25 
            for (let i in newslist) {
              let item  = newslist[i]
              item.dateline = self.getLocalTime(item.dateline);
              if (self.infortype == 1) {
                inforhtml += '<a href="/dyinformation/' + item.itemid +'.html"><li>'
                          +    '<div class="title">' + item.subject + '</div>'
                          +    '<img class="newImg" src="' + item.thumb + '">'
                          +    '<div class="info"><span>' + self.currTit + '</span><span>阅读 ' + item.viewnum + '</span><span>' + item.dateline + '</span></div>'
                          +  '</li></a>'
                lih = 2.25
              } else {
                inforhtml += '<a href="/dyinformation/' + item.itemid +'.html"><li class="news-text">'
                          +    (self.beforeImg == '' ? '' : '<img src="' + self.beforeImg + '">')
                          +    '<div class="title">' + item.subject + '</div>'                         
                          +  '</li></a>'
                lih = 0.854
                self.currentEle_info.find(".inforCon").css('border', '0')
              }
            }
            self.currentEle_info.find(".inforCon").html(inforhtml);            
            self.currentEle_info.css('height',newslist.length * lih + 'rem')             
            self.currentEle_info.find('.resizeBox').css('height',newslist.length * lih + 'rem')
            self.dialogInformation = false;
          }
        }, function(response) {
          console.log(response)
        })
      },
      classifyChangeEvent: function (val) {
        let self = this
        let curr = val[val.length - 1]
        for (let i = 0, len = self.optionsclassify.length; i < len; i++ ) {
          let item = self.optionsclassify[i]
          if (item.code == curr) {
            self.count = item.newsCount
            self.currTit = item.name
            break;
          } else if (item.subnav){
            for (let j = 0, jen = item.subnav.length; j < jen; j++) {
              let jtem = item.subnav[j]
              if (jtem.code == curr) {
                self.count = jtem.newsCount    
                self.currTit = item.name
                break;
              }
            }
          }
        } 
        console.log(self.count)
        self.num2 = self.count > 0 ? self.count > 5 ?  5 : self.count : 0
        self.num1 = self.count > 0 ? 1 : 0
      },
      deteleEvent: function (seat) {
        let self = this
        self[seat] = ''
      },
      imagesEvent: function (seat) {
        let self = this
        self.$parent.$refs.myimages.show('footer', self, function (self, data, imgSize) { 
          self[seat] = data
        })
      }
    }
  }
</script>

<style type="text/css">
  .information .resize{
    display: none;
  }
  .el-dialog--myinformation{
    width: 420px;
  }
  .style-wrap{
    width: 100%;
    height: 116px;
  }
  .icon-wrap{
    width: 100%;
    height: 40px;
  }
  .icon-wrap .infordesc{
    padding: 0;
    height: 40px;
    line-height: 40px;
  }
  .icon-wrap .updateicon, .icon-wrap .deleteicon, .icon-wrap .addicon{
    color: #20A0FF;
    cursor: pointer;
    line-height: 40px;
  } 
  .icon-wrap .deleteicon{
    color: #FF0000;
  }
  .icon-wrap img {
    float: left;
    margin-top: 10px;
    margin-right: 5px;
    width: 0.53rem;
    height: 0.53rem;
  }
  .infordesc{
    float: left;
    padding-top: 10px;
    width: 78px;
    height: 50px;
  }
  .imgdesc{
    float: left;
  }
  .img-wrap{
    width: 120px;
    height: 80px;
    cursor: pointer;
    border: 2px solid #FFFFFF;
    position: relative;
  }
  .img-wrap img{
    float: left;
  }
  .desc{
    width: 124px;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
  .checked_infor{
    display: none;
    width: 17px;
    height: 13px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 5;
    background: url(http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png);
  }
  .classify-wrap{
    width: 100%;
    height: 60px;
    margin-top: 20px;
  }
  .contentrange-wrap{
    width: 100%;
    height: 50px;
  }
  .contentrange-wrap .el-input-number{
    width: 40px;
  }
  .contentrange-wrap .el-input-number .el-input__inner{
    padding: 0;
    text-indent: 5px;
  }
  .contentrange-wrap .el-input-number__decrease,.contentrange-wrap .el-input-number__increase{
    display: none;  
  }
  .information .el-dialog__header{
      border-bottom: 1px solid #CECECE;
      height: 30px;
  }
  .infrotips{
    width: 100%;
    margin-left: 78px;
    color: #999999;
  }
</style>