<template>
  <div class="addsearch">
    <el-dialog
      title="编辑搜索"
      :visible.sync="dialogaddsearch"
      size="addsearch">
      <el-row>
        <el-col>
          <span class="label">选择样式：</span>
        </el-col>
        <el-col>
          <div @click="selecttype('one')" :class="type == 'one'?'type_btn type_btn1 type_active':'type_btn type_btn1'">
            <div class="type_img">
              <div class="check"></div>
            </div>
            <p>样式一</p>
          </div>
          <div @click="selecttype('two')" :class="type == 'two'?'type_btn type_btn2 type_active':'type_btn type_btn2'">
            <div class="type_img">
              <div class="check"></div>
            </div>
            <p>样式二</p>
          </div>
          <div @click="selecttype('three')" :class="type == 'three'?'type_btn type_btn3 type_active':'type_btn type_btn3'">
            <div class="type_img">
              <div class="check"></div>
            </div>
            <p>样式三</p>
          </div>
        </el-col>
        <el-col>
          <el-col :span="5"><span class="label">搜索内容：</span></el-col>
          <el-col :span="19" style="line-height: 28px">
            <el-radio-group v-model="radio_content">
              <el-radio label="course">课程</el-radio>
              <el-radio label="news">资讯</el-radio>
            </el-radio-group>
          </el-col>
        </el-col>
        <el-col v-if="radio_content == 'news'">
          <el-col :span="5"><span style="line-height: 34px" class="label">选择资讯：</span></el-col>
          <el-col :span="19" style="line-height: 28px">
            <el-button v-if="!newson" @click="selectnews" type="text">选择</el-button>
            <span v-if="newson" class="newsname">{{newsobj.news.label}}</span>
            <el-button  v-if="newson" @click="editnews" type="text">修改</el-button>
          </el-col>
        </el-col>
        <el-col v-if="radio_content != 'news'"l>
          <el-col :span="5"><span style="line-height: 30px" class="label">默认文字：</span></el-col>
          <el-col :span="19">
            <el-input style="width: 150px;" :maxlength="10" v-model="input_placeholder" size="small"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogaddsearch = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'addsearch',
  components: {
  },
  data () {
    return {
      dialogaddsearch: false,
      type : 'one',
      radio_content :'course',
      input_placeholder :'搜索课程',
      newsobj : [],
      newson:0
    }
  },
  created: function () {
    let self = this    
    let moduleData = self.$parent.datahtml
    moduleData['toallGroup']['online'].push({
      name : 'addsearch',
      icon: 'imgicon icon-addsearch',
      text: '搜索框'
    })
    moduleData['addsearch'] = {
      style: 'width: 200px; height: 44px',
      tool: {
        private: {
          text: '编辑搜索',
          class: 'st-search'
        },
        public: []
      },
      createEvent: function (self, element, me) {
      },
      html:'<div class="addsearch module addmodule" type="one" datatext="搜索框"><div class="search"> <div class="serach-input"><input type="text" placeholder="搜索课程" value=""></div><div class="serach-but"><input type="button" value=""></div></div></div>'
    }
  },
  methods: {
    show: function (that, element, me) {
      let self = this
      self.that = that
      self.me = me
      self.tab = element
      let addsearchData = self.tab.attr('addsearchData')
      if (addsearchData){
        let jsonaddsearchData = $.parseJSON(addsearchData)
        self.type = jsonaddsearchData.type
        self.radio_content = jsonaddsearchData.radio_content
        self.input_placeholder = jsonaddsearchData.input_placeholder
        self.newsobj = jsonaddsearchData.newsobj
        self.newson = jsonaddsearchData.newson
      }else{
        self.type = 'one'
        self.radio_content = 'course'
        self.input_placeholder = '搜索课程'
        self.newsobj = []
        self.newson = 0
      }
      self.dialogaddsearch = true
    },
    selecttype:function (val) {
      let self = this
      self.type = val
    },
    selectnews:function (){
      let self = this
      self.that.$refs.hrefdialogp.show('addsearch',self.that,function () {
      })
    },
    editnews:function (){
      let self = this
      self.that.$refs.hrefdialogp.show('addsearch|edit',self.that,function () {
      })
    },
    handleClick(){
      let self = this
      let obj = {
        type : self.type,
        radio_content: self.radio_content,
        input_placeholder: self.input_placeholder,
        newsobj:self.newsobj,
        newson : self.newson
      }
      if (self.radio_content == 'course'){
        $('.addsearch').each(function () {
          $(this).find('input[type=button]').on('click',function () {
            let val = $(this).parents('.addsearch').find('input[type=text]').val()
            window.location.href="/platform.html?q="+val;
          })
        })
        $('.on_module input[type=text]').attr('placeholder',self.input_placeholder)

      }else{
        if (!obj.newsobj.news){
          self.$notify({
            title: '警告',
            message: '请先选择资讯分类',
            type: 'warning'
          })
          return false
        }
        $('.addsearch').each(function () {
          $(this).find('input[type=button]').on('click',function () {
            let val = $(this).parents('.addsearch').find('input[type=text]').val()
            window.location.href = self.newsobj.url+'?q='+val
          })
        })
        $('.on_module input[type=text]').attr('placeholder','搜索资讯')
      }
      let str = JSON.stringify(obj)
      $('.on_module').attr('type',self.type)
      $('.on_module').attr('addsearchData', str)
      self.dialogaddsearch = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-dialog--addsearch{
    width: 420px;
  }
  .el-dialog--addsearch .el-dialog__body{
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
  }
  .el-dialog--addsearch .el-col-24{
    margin-bottom: 10px;
  }
  .el-dialog--addsearch .label{
    font-size: 14px;
    color: #48576a;
    line-height: 28px;

  }
  .el-dialog--addsearch .type_btn{
    width: 110px;
    height: 85px;
    text-align: center;
    float: left;
    cursor: pointer;
  }
  .el-dialog--addsearch .type_btn1,.el-dialog--addsearch .type_btn2{
    margin-right:20px;
  }
  .el-dialog--addsearch .type_btn3{
    margin-right:0px;
  }
  .el-dialog--addsearch .type_btn p{
    line-height: 28px;
  }
  .el-dialog--addsearch .type_btn .type_img{
    border: 1px solid #333333;
    width: 100%;
    height: 63px;
    line-height: 63px;
    position: relative;
  }
  .el-dialog--addsearch .type_btn1 .type_img{
    background: url(./image/icon-search1.png) no-repeat center;
  }
  .el-dialog--addsearch .type_btn2 .type_img{
    background: url(./image/icon-search2.png) no-repeat center;
  }
  .el-dialog--addsearch .type_btn3 .type_img{
    background: url(./image/icon-search3.png) no-repeat center;
  }
  .el-dialog--addsearch .type_btn:hover .type_img{
    border:1px solid #20A0FF;
  }
  .el-dialog--addsearch .type_active .type_img{
    border:1px solid #20A0FF;
  }
  .el-dialog--addsearch .type_btn1 .type_img span{
    margin: 0px 5px;
  }
  .el-dialog--addsearch .type_btn1 .type_img span.active{
    color:#20A0FF ;
  }
  .el-dialog--addsearch .type_btn2 .type_img span{
    margin: 0px 5px;
    padding: 2px 5px;
  }
  .el-dialog--addsearch .type_btn2 .type_img span.active{
    margin: 0px 5px;
    background: #20A0FF;
    color: #ffffff;
  }
  .el-dialog--addsearch .type_btn .type_img .check{
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 17px;
    height: 13px;
    background: url("http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png") no-repeat;
    display: none;
  }
  .el-dialog--addsearch .type_active .type_img .check{
    display: block;
  }
</style>
