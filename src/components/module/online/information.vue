<template>
  <div class="information">
    <el-dialog
        title="资讯"
        :visible.sync="dialogInformation"
        class="el-dialog--myinformation"
        :close-on-click-modal="false"
        @open="openInformation"
        :before-close="beforeclose">
            <div class="style-wrap">
              <div class="infordesc" style="padding-top: 5px;">选择样式：</div>
              <div class="imgdesc" style="margin-right: 20px;">
                <div class="img-wrap" style="border-color: #557CE1;">
                  <img src="./image/inforpictext.jpg" alt="图文" />
                  <span class="checked_infor" style="display: block;"></span>
                </div>
                <p class="desc">图文</p>
              </div>
              <div class="imgdesc">
                <div class="img-wrap">
                  <img src="./image/infortext.jpg" alt="纯文字" />
                  <span class="checked_infor"></span>
                </div>
                <p class="desc">纯文字</p>
              </div>
            </div>
            <div class="scroll-wrap" v-if="infortype == 2">
              <div class="infordesc">是否滚动：</div>
              <el-radio v-model="isscroll" label="1">是</el-radio>
              <el-radio v-model="isscroll" label="2">否</el-radio>
            </div>
            <div class="icon-wrap" v-if="infortype == 2">
              <div class="infordesc">前置图标：</div>
              <img :src="beforeImg" v-if="beforeImg!=''">
              <span class="updateicon" v-if="beforeImg!=''" @click="imagesEvent('beforeImg')">修改</span>
              <span class="deleteicon" v-if="beforeImg!=''" @click="deteleEvent('beforeImg')">删除</span> 
              <span class="addicon" v-if="beforeImg==''" @click="imagesEvent('beforeImg')">添加</span>
            </div>
            <div class="rows-wrap" v-if="infortype == 2">
              <div class="infordesc" style="text-indent: 10px;">行间距：</div>
              <el-input-number v-model="rowspacing" :min="5" :max="50"></el-input-number>
              <span class="rows-tips">（5~50）</span>
            </div>
            <div class="classify-wrap">
              <div class="infordesc">资讯分类：</div>
              <el-cascader
                :props="propsclassify"
                :options="optionsclassify"
                v-model="selectedclassify"
                change-on-select>
          </el-cascader>
            </div>
            <div class="contentrange-wrap">
              <div class="infordesc">内容区间：</div>
              <el-input-number v-model="num1" :min="1" :max="num2"></el-input-number>&nbsp;~&nbsp;
              <el-input-number v-model="num2" :min="num1"></el-input-number>&nbsp;条
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
        isscroll:'2',
        beforeImg:'',
        rowspacing:'5',
        selectedclassify: [],
        num1:1,
        num2:5,
        
        getinfordesc:function(){
          var self = this;
          self.$http.get(window.host + "/aroomv3/news/newsCategory.html",
          {},{emulateJSON: true}).then(function(response) {
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
      let moduleData = self.$parent.datahtml
    // ----------------------- LOGO ----------------------------
      moduleData['toallGroup']['online'].push({
        name: 'schoollogo',
        icon: 'imgicon icon-logo',
        text: 'LOGO'
      }) 

      moduleData['schoollogo'] = { 
        style: 'width:220px; height:220px',
        tool: {
          private: {
            text: '',
            class: ''
          },
          public: ['b','c','d','e']
        },
        createEvent: function (self, element ,me) {
            if (me.$('.schoollogo').length > 1) {
              self.$notify({
                title: '警告',
                message: '您已经添加过LOGO',
                type: 'warning'
              })
              element.remove()
          }else{
            self.$refs.information.createqr_logo(element)
          }
        },
        resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调
          let picimg = parent.find('img')
          let picBox = parent.find('.picBox')  
          if (picBox.hasClass('round')||picBox.hasClass('square')) {
            if(self.inp_h < self.inp_w) {
              picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
            } else {
              picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
            }
          } else {
            picimg.css('width', self.inp_w)
          }
          resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        },
        attributeChange: function (self, type, element, val) { // 属性变化事件         
          if (type.indexOf('boxShadow') > -1) {
            element.css('boxShadow', 'none')
            let picBox = element.find('.picBox')
            switch (type) {
              case 'boxShadow':
                if (!val) {
                  picBox.css('boxShadow', 'none')
                } else {
                  self.inp_weight_x = 1
                  self.inp_weight_y = 1
                  self.inp_blur = 1
                  picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)
                }
                break
              case 'boxShadowX':
                picBox.css('boxShadow', val + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)              
                break
              case 'boxShadowY':
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + val + 'px ' + self.inp_blur + 'px ' + self.bw_color)
                break
              case 'boxShadowBlur':
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + val + 'px ' + self.bw_color)
                break
              case 'boxShadowColor':
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + val)
                break
            }
          }
        },
        beforeSelecting: function (self, element, me) { // 选中元素的回调，回调参数:self指向主实例, element当前要操作的模块, me指向tool.js
          clearTimeout(self.beforeTime)        
          self.beforeTime = setTimeout(function() {
            let picBox = element.find('.picBox')          
            if (picBox.css('boxShadow') == 'none') {
              self.check_shadow = false
              self.inp_weight_x = ''
              self.inp_weight_y = ''
              self.inp_blur = ''
              self.bw_color = '#ccc'
            } else {
              let shadowArr = picBox.css('boxShadow').split(' ')
              self.check_shadow = true
              self.inp_weight_x = shadowArr[3].split('p')[0]
              self.inp_weight_y = shadowArr[4].split('p')[0]
              self.inp_blur = shadowArr[5].split('p')[0]
              self.bw_color = shadowArr[0] + shadowArr[1] + shadowArr[2]
            }          
          },0)
        },
        html: '<div class="schoollogo picture module addmodule"  datatext="网校LOGO"><a class="picBox"><img src="" /></a></div>'
      }    
    // ----------------------- 二维码 ----------------------------
      moduleData['toallGroup']['online'].push({
        name: 'schoolqr',
        icon: 'imgicon icon-QRcode',
        text: '二维码'
      }) 

      moduleData['schoolqr'] = { 
        style: 'width:212px; height:212px',
        tool: {
          private: {
            text: '',
            class: ''
          },
          public: ['b','c','d']
        },
        createEvent: function (self, element) {
          self.$refs.information.createqr_logo(element)
        },
        resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调
          let picimg = parent.find('img')
          let picBox = parent.find('.picBox')  
          if (picBox.hasClass('round')||picBox.hasClass('square')) {
            if(self.inp_h < self.inp_w) {
              picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
            } else {
              picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
            }
          } else {
            picimg.css('width', self.inp_w)
          }
          resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        },
        attributeChange: function (self, type, element, val) { // 属性变化事件          
          if (type.indexOf('boxShadow') > -1) {
            element.css('boxShadow', 'none')
            let picBox = element.find('.picBox')
            switch (type) {
              case 'boxShadow':
                if (!val) {
                  picBox.css('boxShadow', 'none')
                } else {
                  self.inp_weight_x = 1
                  self.inp_weight_y = 1
                  self.inp_blur = 1
                  picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)
                }
                break
              case 'boxShadowX':
                picBox.css('boxShadow', val + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)              
                break
              case 'boxShadowY':
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + val + 'px ' + self.inp_blur + 'px ' + self.bw_color)
                break
              case 'boxShadowBlur':
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + val + 'px ' + self.bw_color)
                break
              case 'boxShadowColor':
                picBox.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + val)
                break
            }
          }
        },
        beforeSelecting: function (self, element, me) { // 选中元素的回调，回调参数:self指向主实例, element当前要操作的模块, me指向tool.js
          clearTimeout(self.beforeTime)        
          self.beforeTime = setTimeout(function() {
            let picBox = element.find('.picBox')          
            if (picBox.css('boxShadow') == 'none') {
              self.check_shadow = false
              self.inp_weight_x = ''
              self.inp_weight_y = ''
              self.inp_blur = ''
              self.bw_color = '#ccc'
            } else {
              let shadowArr = picBox.css('boxShadow').split(' ')
              self.check_shadow = true
              self.inp_weight_x = shadowArr[3].split('p')[0]
              self.inp_weight_y = shadowArr[4].split('p')[0]
              self.inp_blur = shadowArr[5].split('p')[0]
              self.bw_color = shadowArr[0] + shadowArr[1] + shadowArr[2]
            }          
          },0)
        },
        html: '<div class="schoolqr picture module addmodule"  datatext="二维码"><a class="picBox"><img class="schoolqrimg" src="" /></a></div>'
      }
    // ----------------------- 网校介绍 ----------------------------
      moduleData['toallGroup']['online'].push({
        name: 'introduce',
        icon: 'imgicon icon-introduce',
        text: '网校介绍'
      }) 

      moduleData['introduce'] = { 
        style: 'width:580px; height:145px',
        tool: {
          private: {
            text: '',
            class: ''
          },
          public: []
        },
        createEvent: function (self, element) {
          self.$refs.information.createintroduce(element)
        },
        html: '<div class="introduce module addmodule" datatext="网校介绍"><a class="picBox"></a></div>'
      }
    // ----------------------- 资讯 ----------------------------
      moduleData['toallGroup']['online'].push({
        name: 'information',
        icon: 'imgicon icon-information',
        text: '资讯'
      })   

      moduleData['information'] = { 
        style: 'width:1200px;',
        tool: {
          private: {
            text: '编辑资讯',
            class: 'st-information'
          },
          public: []
        },
        resize: ['w','e'], // 拉伸方向: 默认为空,自由拉伸
        resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调          
          // let inforCon = parent.find('.inforCon')
          // let infor_wrap = parent.find('.infor-wrap')
          // let infor_desc = parent.find('.infor-desc')
          // let inforheight = parseInt(parent.css('height'))
          // let infor_wrap_width = self.inp_w - 60 <= 490?490:self.inp_w - 60 
          // let infor_desc_width = self.inp_w - 60 - 210 <= 280?280:self.inp_w - 60 - 210
          
          // resizeBox.css({'width': self.inp_w + 'px','height': inforheight + 'px'}) // 资讯拉伸规则         
          // inforCon.css({'width': self.inp_w + 'px'})        
          // infor_wrap.css({'width': infor_wrap_width + 'px'})          
          // infor_desc.css({'width': infor_desc_width + 'px'}) //资讯拉伸规则

            var inforheight = parseInt(parent.css('height'))
            var $li = parent.find('.infor-li-scroll')
            var maxinfoWidth = 0;
            var inforlen = $li.length
            for(let i=0;i<inforlen;i++){
              maxinfoWidth += (parseFloat($li.eq(i).width()) + 10);
            }
            maxinfoWidth = Math.ceil(maxinfoWidth)
            self.inp_w = parseInt(parent.css('width'))
            if(parent.find(".infor-wrap-pic").length > 0){
              self.inp_w = self.inp_w<=550?550:self.inp_w;
            }else if(parent.find(".infor-wrap-txt").length > 0){
              self.inp_w = self.inp_w<=150?150:self.inp_w;
            }else if(parent.find(".infor-wrap-scroll").length > 0){
              self.inp_w = self.inp_w<=150?150:self.inp_w;
              self.inp_w = self.inp_w>=parseInt(maxinfoWidth/2)?parseInt(maxinfoWidth/2):self.inp_w;
            }
            parent.css({'width': self.inp_w + 'px','height': inforheight + 'px'})
            resizeBox.css({'width': self.inp_w + 'px','height': inforheight + 'px'})
            parent.find(".infor-txt-p").css('width',(parent.find(".infor-txt-pic").width() - 210) + 'px')
            parent.find(".infor-titlea").css('width',(parent.find(".infor-cont-txt").width() - 30) + 'px')
               
        }, 
        attributeChange: function (self, type, element) {
          if (type == 'fontSize') {
            if(element.find('.infor-li-scroll').length > 0){
              var $li = element.find('.infor-li-scroll');
              var ulWidth = 0;
              for(var i=0;i<$li.length;i++){
                 ulWidth += (parseFloat($li.eq(i).width()) + 10);
              }
              ulWidth = Math.ceil(ulWidth)
              element.find('.infor-ul-scroll').css('width',ulWidth + 'px')
            }
          }
        },       
        createEvent: function (self, element, me) {
          self.$refs.information.show(self,element)
        },
        html: '<div class="information module addmodule" datatext="资讯"><div class="inforCon"></div></div>'
      } 
    // ----------------------- 地图 ----------------------------
      moduleData['toallGroup']['online'].push({
        name: 'schoolmap',
        icon: 'imgicon icon-map',
        text: '地图'
      }) 

      moduleData['schoolmap'] = { 
        style: 'width:935px; height:325px',
        tool: {
          private: {
            text: '',
            class: ''
          },
          public: []
        },
        resizeMouseUp: function (self, parent) { // 拉伸结束的回调
          if(parent.find("#schoolmap").hasClass("schoolmap_box")){
            parent.find("#schoolmap").remove();
            var schoolmap = '<div class="schoolmap_box" id="schoolmap"></div>';
            parent.append(schoolmap);
            self.$refs.information.createmap()        
            resizeBox.hide();
          }
        },
        createEvent: function (self, element, me) {
          if (me.$('.schoolmap').length > 1) {
              self.$notify({
                title: '警告',
                message: '您已经添加过地图',
                type: 'warning'
              })
              element.remove()
          }else{
            self.$refs.information.createmap()             
          }
        },
        html: '<div class="schoolmap module addmodule" datatext="地图"><div class="schoolmap_box" id="schoolmap"></div></div>'
      }
    },
    methods:{
      	//用于主页调用当前模板函数，弹出弹框并加载数据
      	show:function(that,element){
            var self = this;
            self.that = that
            self.element = element 
            self.dialogInformation = true;
            if (!element.length) {
              self.currentEle_info = $('.on_module')
          } else {
              self.currentEle_info = element
          }  
          self.openInformation();
        },
        //窗口打开函数
        openInformation:function(){
          var self = this;
          //初始化先注释
//        $(".img-wrap").css("border-color","#FFFFFF");
//        $($(".img-wrap")[0]).css("border-color","#557CE1");
//        $('.checked_infor').hide();
//        $($('.checked_infor')[0]).show();
//        self.infortype = 1;
//      	self.selectedclassify = [];
//        self.num1 = 1;
//        self.num2 = 5;
//        self.beforeImg = "";
//        self.isscroll = "2";
          //加载资讯分类
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
              self.that.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
              self.element.remove()        
              self.that.tool.carryLayerEvent(self.that, parent) // 更新图层
          }
          done();
        },
        cancelInformation:function(){
          var self = this;
          if(self.currentEle_info.find(".inforCon").children().length < 1){
            let parent = self.element.parent()
              self.that.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
              self.element.remove()        
              self.that.tool.carryLayerEvent(self.that, parent) // 更新图层
          }
          self.dialogInformation = false;
        },
        confirmInformation:function(){
          var self = this;
          let i = self.selectedclassify.length - 1;
          if(i<0){
            self.$notify({
            title: '提示',
            message: '请选择资讯分类！',
            type: 'warning',
            offset: 40,
            duration: 2000
          });
            return false;
          }
          self.currentEle_info.css("width",1200);
          self.currentEle_info.find('.resizeBox').css("width",1200);
          self.currentEle_info.attr('begin', self.num1)
          self.currentEle_info.attr('last', self.num2)
          self.currentEle_info.attr('navcode', self.selectedclassify[i])
          self.currentEle_info.attr('infortype', self.infortype)
          self.currentEle_info.attr('isscroll', self.isscroll)
          self.currentEle_info.attr('beforeImg', self.beforeImg)
          self.currentEle_info.attr('rowspacing', self.rowspacing)
          self.currentEle_info.find(".inforCon").empty();
          
          self.$http.post(window.host + "/aroomv3/news/getnewslists.html",
          {
          begin:self.num1,
          last:self.num2,
          navcode:self.selectedclassify[i],
        }, {emulateJSON: true}).then(function(response) {
          var datas = response.data;
          if(datas.code == 0){
            if(self.num1 <= datas.data.count){
              var inforhtml = "";
              if(self.infortype == 1){
                for(var i in datas.data.newslist){
                  datas.data.newslist[i].dateline = self.getLocalTime(datas.data.newslist[i].dateline);
                  var titlespace = datas.data.newslist[i].note.replace(/ /g,'&#32;');
                  inforhtml += '<div class="infor-wrap-pic">'
                  inforhtml +=  '<div class="infor-cont-pic">'
                  inforhtml +=    '<a class="infor-title-pic" href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank" title='+datas.data.newslist[i].subject+'>'+datas.data.newslist[i].subject+'</a>'
                  if(datas.data.newslist[i].thumb != ""){
                    inforhtml +=    '<div class="infor-txt-pic">'
                    inforhtml +=      '<a class="infor-img-a" href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank"><img src="'+datas.data.newslist[i].thumb+'" /></a>'    
                    inforhtml +=      '<div class="infor-txt-p">' 
                    inforhtml +=        '<p class="infor-conc" title='+titlespace+'>'+datas.data.newslist[i].note+'</p>'
                    inforhtml +=        '<p class="infor-time">发表于：'+datas.data.newslist[i].dateline+'  阅读<span style="color: #FFAF28">'+datas.data.newslist[i].viewnum+'</span>次</p>'
                    inforhtml +=      '</div>'
                    inforhtml +=    '</div>'
                  }else{
                    inforhtml +=    '<div class="infor-txt-nopic">'
                    inforhtml +=      '<div class="infor-txt-noimg">' 
                    inforhtml +=        '<p class="infor-conc-noimg" title='+titlespace+'>'+datas.data.newslist[i].note+'</p>'
                    inforhtml +=        '<p class="infor-time-noimg">发表于：'+datas.data.newslist[i].dateline+'  阅读<span style="color: #FFAF28">'+datas.data.newslist[i].viewnum+'</span>次</p>'
                    inforhtml +=      '</div>'
                    inforhtml +=    '</div>'
                  }
                  inforhtml +=  '</div>'
                  inforhtml += '</div>'
                }
                var allheight = datas.data.newslist.length * 200; //因为图文资讯模块固定高度每个为200px
                self.currentEle_info.ready(function() {
                      self.currentEle_info.css('height', allheight+ 'px')
                      self.currentEle_info.find('.resizeBox').css('height',allheight + 'px')
                })
              }else{
                if(self.isscroll == "1"){
                  inforhtml += '<div class="infor-wrap-scroll">'
                  inforhtml += '<ul class="infor-ul-scroll">'
                  for(var i in datas.data.newslist){
                  	var titlespace = datas.data.newslist[i].subject.replace(/ /g,'&#32;');
                    inforhtml += '<li class="infor-li-scroll" title='+titlespace+'>'
                    inforhtml +=    (self.beforeImg == '' ? '' : '<img class="infor-icon-scroll" src="' + self.beforeImg + '">')
                    inforhtml +=  '<a href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank">'+datas.data.newslist[i].subject+'</a>'
                    inforhtml += '</li>'
                  }
                  for(var i in datas.data.newslist){
                  	var titlespace = datas.data.newslist[i].subject.replace(/ /g,'&#32;');
                    inforhtml += '<li class="infor-li-scroll" title='+titlespace+'>'
                    inforhtml +=    (self.beforeImg == '' ? '' : '<img class="infor-icon-scroll" src="' + self.beforeImg + '">')
                    inforhtml +=  '<a href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank">'+datas.data.newslist[i].subject+'</a>'
                    inforhtml += '</li>'
                  }
                  inforhtml += '</ul></div>'
                  self.currentEle_info.ready(function() {
                        self.currentEle_info.css('height', 40 + 'px')
                        self.currentEle_info.find('.resizeBox').css('height',40 + 'px')
                        var $li = self.currentEle_info.find('.infor-li-scroll');
                        var ulWidth = 0;
                        for(var i=0;i<$li.length;i++){
                          ulWidth += parseFloat( $($li[i]).width() );
                        }
                        ulWidth = Math.ceil( ulWidth + ($li.length * 10) );
                        self.currentEle_info.find('.infor-ul-scroll').css('width',ulWidth + 'px')
                        
                        var boxwidth = parseInt(ulWidth/2);
                        boxwidth = boxwidth>=1200?1200:boxwidth;
                        self.currentEle_info.css('width', boxwidth + 'px')
                        self.currentEle_info.attr('ulWidth', ulWidth)
                        self.currentEle_info.find('.resizeBox').css('width', boxwidth + 'px')
                  })
                }else{
                  for(var i in datas.data.newslist){
                  	var titlespace = datas.data.newslist[i].subject.replace(/ /g,'&#32;');
                    inforhtml += '<div class="infor-wrap-txt">'
                    inforhtml +=  '<div class="infor-cont-txt">'
                    inforhtml +=    (self.beforeImg == '' ? '' : '<img style="width:12px;height:12px;" class="infor-icon" src="' + self.beforeImg + '">')
                    inforhtml +=    '<a class="infor-titlea" href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank">'
                    inforhtml +=      '<p class="infor-title-txt" title='+titlespace+'>'+datas.data.newslist[i].subject+'</p>'
                    inforhtml +=    '</a>'
                    inforhtml +=  '</div>'
                    inforhtml += '</div>'
                  }
                  self.currentEle_info.ready(function() {
              			var fontHeight = parseInt(self.currentEle_info.find('.infor-wrap-txt').css('fontSize'));
              			var allheight = datas.data.newslist.length * (fontHeight + self.rowspacing);
              			
                    self.currentEle_info.css('height', allheight+ 'px')
                    self.currentEle_info.find('.resizeBox').css('height',allheight + 'px')
                    
                    self.currentEle_info.find('.infor-wrap-txt').css({
                    	'height':fontHeight + "px",
                    	'lineHeight':fontHeight + "px",
                    	'margin-bottom': self.rowspacing + "px"
                    });
                    self.currentEle_info.find('.infor-icon').css({
                    	'width':fontHeight + "px",
                    	'height':fontHeight + "px",
                    	'lineHeight':fontHeight + "px"
                    });
                  })
                }
              }
              self.currentEle_info.find(".inforCon").html(inforhtml);
              self.dialogInformation = false;
            }else{
              self.$notify({
                title: '提示',
                message: '资讯条数总共只有'+datas.data.count+'条。',
                type: 'warning',
                offset: 40,
                duration: 3000
              });
            }
          }
        }, function(response) {
          console.log(response)
        });
        },
        imagesEvent: function(seat){
          self = this
          self.$parent.$refs.myimages.show('footer', self, function (self, data, imgSize) { 
              self[seat] = data
          })
        },
        deteleEvent: function (seat) {
            let self = this
            self[seat] = ''
        },
        createmap:function(html){
          let self = this
          var lng = parseFloat(window.roominfo.lng),
              lat = parseFloat(window.roominfo.lat),
              map = new BMap.Map("schoolmap"),
              point = new BMap.Point(lng, lat),
              marker = new BMap.Marker(point),
              top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL});

          map.centerAndZoom(point, 12);  //设置中心点坐标
          map.addOverlay(marker);
          map.addControl(top_right_navigation);
          map.disableDragging();

          var sContent = "<h4 style='margin:0 0 5px 0;padding:3px 0;font-size:15px;color:#DD6A22;'>荣安中心</h4>"
          +"<p style='font-size:13px;'>浙江省杭州市江干区城星路188号</p>"
          var infoWindow = new BMap.InfoWindow(sContent);
          var pointinfo = new BMap.Point(lng, lat+0.01);
          map.openInfoWindow(infoWindow,pointinfo); //开启信息窗口
        },
        createqr_logo:function(html){
          let self = this
          if(html.hasClass("schoolqr")){           
            let wechatimg = window.roominfo.wechatimg || 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/qcode.jpg'
            html.find("img").attr("src", wechatimg)
          }else{
            let cface = window.roominfo.cface || 'http://static.ebanhui.com/ebh/tpl/2012/images/face/2.jpg'
            html.find("img").attr("src", cface)
          }
        },
        createintroduce:function(html){
          let self = this
          html.find(".picBox").html(window.roominfo.summary)
        }
    }
  }
</script>

<style type="text/css">
  /*.information .resize{
      display: none;
  }*/
  .el-dialog--myinformation .el-dialog{
    width: 420px;
  }
  .information .el-dialog__header{
      border-bottom: 1px solid #CECECE;
      height: 30px;
  }
  .style-wrap{
    width: 100%;
    height: 116px;
  }
  .scroll-wrap{
    width: 100%;
      height: 55px;
  } 
  .scroll-wrap .infordesc{
    padding: 0;
      height: 55px;
      line-height: 55px;
  }
  .scroll-wrap .el-radio{
    line-height: 55px;
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
      width: 20px;
      height: 20px;
  }
  .rows-wrap{
  	width: 100%;
    height: 40px;
    margin-top: 10px;
  }
  .rows-wrap .el-input-number{
  	width: 120px;
  }
  .rows-wrap .rows-tips{
  	font-size: 14px;
  	color: #999;
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