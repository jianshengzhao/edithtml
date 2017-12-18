<template>
  <div id="addcoursetype">
    <el-dialog
      title="课程导航"
      :visible.sync="dialogaddcoursetype"
      size="addcoursetype" >
      <el-row>
        <el-col>
          <el-form :rules="rules" ref="courseobj" :model="courseobj" label-width="110px">
            <el-form-item label="颜色：">
              <div class="togglePaletteOnly">
                <div @click="selectpaletter(1)" class="Paletter Paletter1"><div :class="courseobj.classs=='theme_1'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(2)" class="Paletter Paletter2"><div :class="courseobj.classs=='theme_2'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(3)" class="Paletter Paletter3"><div :class="courseobj.classs=='theme_3'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(4)" class="Paletter Paletter4"><div :class="courseobj.classs=='theme_4'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(5)" class="Paletter Paletter5"><div :class="courseobj.classs=='theme_5'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(6)" class="Paletter Paletter6"><div :class="courseobj.classs=='theme_6'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(7)" class="Paletter Paletter7"><div :class="courseobj.classs=='theme_7'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(8)" class="Paletter Paletter8"><div :class="courseobj.classs=='theme_8'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(9)" class="Paletter Paletter9"><div :class="courseobj.classs=='theme_9'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(10)" class="Paletter Paletter10"><div :class="courseobj.classs=='theme_10'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(11)" class="Paletter Paletter11"><div  :class="courseobj.classs=='theme_11'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(12)" class="Paletter Paletter12"><div :class="courseobj.classs=='theme_12'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(13)" class="Paletter Paletter13"><div :class="courseobj.classs=='theme_13'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(14)" class="Paletter Paletter14"><div :class="courseobj.classs=='theme_14'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(15)" class="Paletter Paletter15"><div :class="courseobj.classs=='theme_15'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
                <div @click="selectpaletter(16)" class="Paletter Paletter16"><div :class="courseobj.classs=='theme_16'?'Paletter-icon  active-icon':'Paletter-icon '"></div></div>
              </div>
            </el-form-item>
            <el-form-item label="展开方式：">
              <el-radio class="radio" v-model="courseobj.type" label="1">自动</el-radio>
              <el-radio class="radio" v-model="courseobj.type" label="2">手动</el-radio>
            </el-form-item>
            <el-form-item prop="zhuxnum" label="主选框高度：">
              <el-input-number v-model="courseobj.zhuxnum" :min="50" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item prop="zhulnum" label="主类框高度：">
              <el-input-number v-model="courseobj.zhulnum" :min="50" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="添加分类：">
              <el-col class="coursesort" v-for="(item,index) in courselist" :key="item.name">
                <el-col :span="16">
                  <span class="schoolname" :title="item.name">{{item.name}}</span>
                  <span :title="item.pname">{{item.pname}}</span>
                </el-col>
                <el-col class="editbuttons" style="text-align: right;" :span="8">
                  <el-button v-if="index > 0"  @click="upy(index)" type="text">上移</el-button>
                  <el-button v-if="index+1 < courselist.length"  @click="downy(index)" type="text">下移</el-button>
                  <el-button  @click="edit(index)" type="text">修改</el-button>
                  <el-button   style="color:red" @click="del(index)" type="text">删除</el-button>
                </el-col>
              </el-col>
              <el-button @click="create()" type="text">添加</el-button>
              <!-- <el-input-number v-model="courseobj.zhunum" :min="1" :max="15"></el-input-number> -->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogaddcoursetype = false">取 消</el-button>
        <el-button type="primary" @click="editcourselist">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'addcoursetype',
  data () {
    var validatenum = (rule, value, callback) => {
      if(!value) {
        return callback(new Error('数字不能为空'));
      } else {
        if(!(/^[0-9]*[1-9][0-9]*$/.test(value))) {
          callback(new Error('请输入整数'));
        } else {
            callback();
        }
      }
    };
    return {
      addcourse : '',
      dialogaddcoursetype: false,
      courseobj: {
        type: '1',
        zhuxnum: 50,
        zhulnum: 50,
        zhunum: 5,
        classs: 'theme_4'
      },
      courselist:[],
      rules: {
        zhuxnum: [{
          required: true,
          validator: validatenum,
          trigger: 'blur'
        }],
        zhulnum: [{
          required: true,
          validator: validatenum,
          trigger: 'blur'
        }]
      },
      getcourselist:function(pids){
        let self = this
        self.$http.get(window.host + "/room/design/getcategorymenu.html", {
          params: {
            pids: pids
          }
        }, {
          emulateJSON: true
        }).then(function(response) {
          var data = response.data.data;
            let html = ''
            for (let i = 0, len = data.length; i < len; i++) {
              let item = data[i]
              let secNav1 = ''
              let secNav = ''

              if (item.sorts) {  
                for (let j = 0, jen = item.sorts.length; j < jen; j++) {
                  let jtem = item.sorts[j]
                  secNav1 += '<a class="link-nav-hot" href="/platform-1-0-0.html?pid=' + item.pid + '&sid=' + jtem.sid + '" title="' + jtem.sname + '">' + jtem.sname + '</a>'
                  secNav += '<a class="nav-third_line" href="/platform-1-0-0.html?pid=' + item.pid + '&sid=' + jtem.sid + '" title="' + jtem.sname + '">' + jtem.sname + '</a>'
                }
              } else {
                secNav1 = '<a class="link-nav-hot" href="/platform-1-0-0.html?pid=' + item.pid + '" title="其它课程">其它课程</a>'
                secNav = '<a class="nav-third_line" href="/platform-1-0-0.html?pid=' + item.pid + '" title="其它课程">其它课程</a>'
              }
              html += '<li style="height:'+self.courseobj.zhulnum+'px;">' +
                   '<h3 class="nav-first">' +
                   '<a class="first-link" href="/platform-1-0-0.html?pid=' + item.pid + '" title="' + item.pname + '">' + item.pname + '</a></h3><div class="wrap-nav-hot" style="height:'+(self.courseobj.zhulnum - 30)+'px;">' +
                   secNav1 +
                   '</div><div class="first_li_three_mune">' +
                   '<h2 class="nav-second">' +
                   '<a class="second-link" href="/platform-1-0-0.html?pid=2143" title="' + item.pname + '">' + item.pname + '</a>' +
                   '</h2>' +
                   secNav +
                   '</div>' +
                   '</li>'
            }
            html += '<li class="morey" style="height: 65px;"><div class="fosnte"><a href="/platform.html">更多</a></div></li>'
            $('.addcoursetype').find('.second_mune_ul').html(html)
        }, function(response) {
            console.log(response)
        });
      },
      getcoursesort:function(){
        let self = this
        self.$http.get(window.host + "/aroomv3/course/coursesort.html", {
          params: {
            showbysort: 0
          }
        }, {
          emulateJSON: true
        }).then(function(response) {
          var data = response.data.data;
          let html = ''
          for (let i = 0, len = data.length < self.courseobj.zhunum ? data.length : self.courseobj.zhunum; i < len; i++) {
            let item = data[i]
            let secNav1 = ''
            let secNav = ''

            if (item.sorts) {  
              for (let j = 0, jen = item.sorts.length; j < jen; j++) {
                let jtem = item.sorts[j]
                secNav1 += '<a class="link-nav-hot" href="/platform-1-0-0.html?pid=' + item.pid + '&sid=' + jtem.sid + '" title="' + jtem.sname + '">' + jtem.sname + '</a>'
                secNav += '<a class="nav-third_line" href="/platform-1-0-0.html?pid=' + item.pid + '&sid=' + jtem.sid + '" title="' + jtem.sname + '">' + jtem.sname + '</a>'
              }
            } else {
              secNav1 = '<a class="link-nav-hot" href="/platform-1-0-0.html?pid=' + item.pid + '" title="其它课程">其它课程</a>'
              secNav = '<a class="nav-third_line" href="/platform-1-0-0.html?pid=' + item.pid + '" title="其它课程">其它课程</a>'
            }
            html += '<li style="height:'+self.courseobj.zhulnum+'px;">' +
                 '<h3 class="nav-first">' +
                 '<a class="first-link" href="/platform-1-0-0.html?pid=' + item.pid + '" title="' + item.pname + '">' + item.pname + '</a></h3>' +
                 secNav1 +
                 '<div class="first_li_three_mune">' +
                 '<h2 class="nav-second">' +
                 '<a class="second-link" href="/platform-1-0-0.html?pid=2143" title="' + item.pname + '">' + item.pname + '</a>' +
                 '</h2>' +
                 secNav +
                 '</div>' +
                 '</li>'
          }
          html += '<li class="morey" style="height: 65px;"><div class="fosnte"><a href="/platform.html">更多</a></div></li>'
          $('.addcoursetype').find('.second_mune_ul').html(html)
        }, function(response) {
          console.log(response)
        })
      }
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.datahtml
    // 注入左侧图标
    moduleData['toallGroup']['online'].push({
        name: 'addcoursetype',
        icon: 'imgicon icon-addcoursetype',
        text: '课程导航'
      })
    // 配置模块参数
    moduleData['addcoursetype'] = { 
      style: 'width: 200px; height: 90px',
      tool: {
        private: {
          text: '编辑导航',
          class: 'st-addcoursetype'
        },
        public: []
      },
      resize: ['nw', 'sw', 'ne', 'se', 'e', 'n', 'w', 's'], // 拉伸方向
      beforeSelecting: function (self, element, me) { // 选中元素要执行的特殊操作     
        let allcourse = parseInt(element.find('.allcourse').css('height'))
        let second_mune_ul = parseInt(element.find('.second_mune_ul').css('height'))
        element.css('height', allcourse + second_mune_ul)
        element.find('.resizeBox').css('height', allcourse + second_mune_ul)
        element.find('.second_mune_ul').show()        
      },
      cancelSelect: function (self, element, me) { // 取消选中回调函数
        let allcourse = parseInt(element.find('.allcourse').css('height'))
        var carouseldata = element.attr('carouseldata')
        if(carouseldata){
          var jsoncarouseldata = me.$.parseJSON(carouseldata)
          if(jsoncarouseldata.type == '2'){
            element.css('height', allcourse)
            element.find('.second_mune_ul').hide()
          }
        }
      },
      createEvent: function (self, element, me) {
        if (me.$('.addcoursetype').length > 1) {
            self.$notify({
              title: '警告',
              message: '您已经添加过课程分类',
              type: 'warning'
            })
            element.remove()
        }else{
          //self.$refs.addcoursetype.create(element)
        }
      },
      html: '<div class="addcoursetype module addmodule" datatext="课程分类"><div class="courseclassification"><div class="nav"><ul id="coursenav_ul" class="theme_4"><li class="first_li"><p class="allcourse">全部课程</p><ul class="second_mune_ul"><li class="morey"><div class="fosnte"><a href="/platform.html">更多</a></div></li></ul></li></ul></div></div></div>'
    }   
  },
  methods: {
    selectpaletter:function(val){
      let self = this
      self.courseobj.classs ='theme_'+val;
    },   
    show: function (that, element, me) {
      let self = this
      self.that = that
      self.me = me
      self.dialogaddcoursetype = true
      self.addcourse = element        
      let carouseldata = self.addcourse.attr('carouseldata')
      if(carouseldata){
        let jsoncarouseldata = $.parseJSON(carouseldata)
        self.courseobj = {
          type : jsoncarouseldata.type || '1',
          zhuxnum:jsoncarouseldata.zhuxnum ||  50,
          zhulnum:jsoncarouseldata.zhulnum || 50,
          zhunum:jsoncarouseldata.zhunum,
          pids : jsoncarouseldata.pids || [],
          classs:jsoncarouseldata.classs || 'theme_4'
        }
        self.courselist = jsoncarouseldata.courselist || [] 
      }else{
        self.courseobj = {
          type :'1',
          zhuxnum:50,
          zhulnum:50,
          zhunum:0,
          pids :  [],
          classs: 'theme_4'
        }
        self.courselist =  [] 
      }
    },
    create:function(){
      let self = this
      self.that.$refs.hrefdialogp.show('addcoursetype',self.that) 
    },
    upy:function(index){
      let self = this
      this.courselist[index] = this.courselist.splice(index-1, 1, this.courselist[index])[0];
    },
    downy:function(index){
      let self = this
      this.courselist[index] = this.courselist.splice(index+1, 1, this.courselist[index])[0];
    },
    del:function(index){
      let self = this
      this.courselist.splice(index, 1);
    },
    edit:function(index){
      let self = this
      self.that.$refs.hrefdialogp.show('addcoursetype|'+index+'',self.that)
    },
    editcourselist:function(){
      let self = this
      //self.getcoursesort()
      self.$refs.courseobj.validate((valid) => {
          if(valid) {
            let pids = [];
            
              /*this.$notify({
                title: '警告',
                message: '请添加课程分类',
                type: 'warning'
              })
              return false
            }else*/
            if(self.courselist.length){
              for(var i=0;i<self.courselist.length;i++){
                pids.push(self.courselist[i].pid)
              }
              self.getcourselist(pids);
            }
            let obj = {
              classs: self.courseobj.classs,
              zhuxnum: self.courseobj.zhuxnum,
              zhulnum:self.courseobj.zhulnum,
              zhunum :self.courselist.length,
              pids : pids,
              courselist : self.courselist,
              type : self.courseobj.type
            }
            $('.courseclassification .first_li').css('height', self.courseobj.zhuxnum + 'px')
            $('.courseclassification .first_li').css('line-height', self.courseobj.zhuxnum + 'px')
            $('.courseclassification .second_mune_ul').css('top', self.courseobj.zhuxnum + 'px')
            $('.courseclassification .second_mune_ul li').css('height', self.courseobj.zhulnum + 'px')
            $('.addcoursetype #coursenav_ul').attr('class', self.courseobj.classs)
            if(self.courseobj.type == '1'){
              $('.courseclassification .second_mune_ul').attr('class','second_mune_ul')
              let reseizh = self.courseobj.zhuxnum + (self.courselist.length *self.courseobj.zhulnum) + 40
              $('.addcoursetype .resizeBox').css('height',reseizh + 'px')
              $('.addcoursetype').css('height',reseizh + 'px')
            }else{
              $('.courseclassification .second_mune_ul').attr('class','second_mune_ul second_mune_ul_none')
              let reseizh = self.courseobj.zhuxnum + (self.courselist.length *self.courseobj.zhulnum) + 40
              $('.addcoursetype .resizeBox').css('height',reseizh + 'px')
              $('.addcoursetype').css('height',self.courseobj.zhuxnum + 'px')
            }
            let str = JSON.stringify(obj)
            $('.on_module').attr('carouselData', str)
            self.dialogaddcoursetype = false
            //self.getcoursesort()
          } else {
            return false;
          }
        });
    }
  }
}
</script>
<style>
  .el-dialog--addcoursetype {
    width: 600px;
  }
  #addcoursetype .el-dialog__header {
    border-bottom: 1px solid #CECECE;
    height: 30px;
  }
  .togglePaletteOnly .Paletter{
    width: 16px;
    height: 16px;
    float: left;
    background: #000;
    margin-right: 8px;
    margin-top: 10px;
    cursor: pointer;
  }
  .togglePaletteOnly .Paletter1{
    background: #9b28ae;
  }
  .togglePaletteOnly .Paletter2{
    background: #663db5;
  }
  .togglePaletteOnly .Paletter3{
    background: #4052b4;
  }
  .togglePaletteOnly .Paletter4{
    background: #1f96f2;
  }
  .togglePaletteOnly .Paletter5{
    background: #ff753f;
  }
  .togglePaletteOnly .Paletter6{
    background: #00bcd2;
  }
  .togglePaletteOnly .Paletter7{
    background: #fea000;
  }
  .togglePaletteOnly .Paletter8{
    background: #f2c300;
  }
  .togglePaletteOnly .Paletter9{
    background: #b7c500;
  }
  .togglePaletteOnly .Paletter10{
    background: #89c34a;
  }
  .togglePaletteOnly .Paletter11{
    background: #4daf51;
  }
  .togglePaletteOnly .Paletter12{
    background: #009687;
  }
  .togglePaletteOnly .Paletter13{
    background: #f47d00;
  }
  .togglePaletteOnly .Paletter14{
    background: #f34637;
  }
  .togglePaletteOnly .Paletter15{
    background: #e71e62;
  }
  .togglePaletteOnly .Paletter16{
    background: #c11759;
  }
  .togglePaletteOnly .Paletter .Paletter-icon{
    width: 16px;
    height: 16px;
  }
  .togglePaletteOnly .Paletter .active-icon{
    background: url(../assets/icon/xuanzhong.png) no-repeat;
    background-size: 16px;
  }
  .el-dialog--addcoursetype .schoolname{
    padding: 2px 4px;
    color: #000;
    font-weight: 600;
    border:1px solid #000;
  }
  .el-dialog--addcoursetype .coursesort{
    /* cursor: pointer; */
  }
  .el-dialog--addcoursetype .coursesort:hover .editbuttons{
    display: block;
  }
  .el-dialog--addcoursetype .coursesort .editbuttons{
    display: none;
  }
</style>
