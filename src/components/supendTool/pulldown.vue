<template>
  <div class="pulldown">
    <el-dialog
      title="菜单"
      :visible.sync="dialogpulldown"
      class="el-dialog--pulldown">
      <el-row>
        <el-col style="text-align: right;margin-bottom: 10px">
          <el-button type="primary" @click="dialogmenusettings = true">菜单设置</el-button>
          <el-button type="primary" @click="showdialogaddpulldown(1)">添加一级菜单</el-button>
        </el-col>
        <el-col class="table_control">
          <el-col class="table_control_th">
            <el-col :span="6">菜单名称</el-col>
            <el-col :span="11">链接</el-col>
            <el-col :span="7">操作</el-col>
          </el-col>
          <el-col class="table_control_td" style="text-align: center" v-if="!pulldowndata.length">
            暂无菜单
          </el-col>
          <el-col class="table_control_td" v-for="(item, index) in pulldowndata" :key="item.name">

            <el-col class="table_control_td_one">
              <el-col :span="6"><p :title="item.name" style="display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{item.name}}</p></el-col>
              <el-col :span="11">
                <div>
                  <div style="float: left;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;max-width: 310px;">
                    <span v-if="!item.href.mainclass && !item.href.sonclass">&nbsp;</span>
                    <span>{{item.href.mainclass}}</span>
                    <span  :title="item.href.sonclass" style="color: #999999;text-indent: 5px">{{item.href.sonclass}}</span>
                  </div>
                  <div style="float: right">
                    <el-button type="text" @click="dialoghref(1,index)" v-if="!item.isurl && !item.children.length" size="small">添加链接</el-button>
                    <el-button type="text" @click="dialoghref(1,index)" v-if="item.isurl && !item.children.length" size="small">编辑链接</el-button>
                    <el-button style="color: red" @click="resethref(1,index)" v-if="!item.children.length" type="text" size="small">清除</el-button>
                  </div>
              </div>
              </el-col>
              <el-col :span="7">
                <el-button type="text" v-if="!item.isurl" size="small" @click="showdialogaddpulldown(2,item.name,index)">添加二级菜单</el-button>
                <el-button type="text" @click="showdialogaddpulldown(3,item.name,index)" size="small">编辑</el-button>
                <el-button type="text" v-if="index != 0" @click="upRecord(1,index)" size="small">上移</el-button>
                <el-button type="text" v-if="index +1 < pulldowndata.length" @click="downRecord(1,index)" size="small">下移</el-button>
                <el-button style="color: red" @click="delpulldown(0,index)" type="text" size="small">删除</el-button>
              </el-col>
            </el-col>
            <el-col class="table_control_td_two" v-for="(items, indexs) in item.children" :key="items.name">
              <el-col :span="6"><p :title="items.name" style="display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">  ----  {{items.name}}</p></el-col>
              <el-col :span="11">
                <div>
                  <div style="float: left;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;max-width: 310px;">
                    <span v-if="!items.href.mainclass && !items.href.sonclass">&nbsp;</span>
                    <span >{{items.href.mainclass}}</span>
                    <span :title="items.href.sonclass" style="color: #999999;text-indent: 5px">{{items.href.sonclass}}</span>
                  </div>
                  <div style="float: right">
                    <el-button type="text" @click="dialoghref(2,index,indexs)" v-if="!items.isurl" size="small">添加链接</el-button>
                    <el-button type="text" @click="dialoghref(2,index,indexs)" v-if="items.isurl" size="small">编辑链接</el-button>
                    <el-button style="color: red" @click="resethref(2,index,indexs)" type="text" size="small">清除</el-button>
                  </div>
                </div>
              </el-col>
              <el-col :span="7">
                <el-button type="text" @click="showdialogaddpulldown(4,items.name,index,indexs)" size="small">编辑</el-button>
                <el-button type="text" v-if="indexs != 0" @click="upRecord(0,index,indexs)" size="small">上移</el-button>
                <el-button type="text" v-if="indexs +1 < item.children.length" @click="downRecord(0,index,indexs)" size="small">下移</el-button>
                <el-button style="color: red" @click="delpulldown(1,index,indexs)" type="text" size="small">删除</el-button>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogpulldown = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="dialogtitle"
      :visible.sync="dialogaddpulldown"
      class="el-dialog--addpulldown">
      <el-row>
        <el-col :span="6">
          <p style="text-align: center;line-height: 40px;font-size: 16px">菜单名称</p>
        </el-col>
        <el-col :span="18">
          <el-input :maxlength="20" type="text" v-model="menuname"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogaddpulldown = false">取 消</el-button>
        <el-button @click="addpulldown" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="菜单设置"
      :visible.sync="dialogmenusettings"
      class="el-dialog--menusettings">
      <el-row>
        <el-radio-group v-model="radio" size="medium">
          <el-radio-button label="1" >基础设置</el-radio-button>
          <el-radio-button label="2">一级菜单</el-radio-button>
          <el-radio-button label="3">二级菜单</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-form  ref="form"  :label-position="labelPosition" label-width="100px" :model="form">
        <el-col v-if="radio == '1'">
            <el-form-item label="展开方式:">
              <el-radio-group v-model="form.Basicstype">
                <el-radio label="bottom">向下</el-radio>
                <el-radio label="right">向右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="宽度设置:">
              <el-radio-group v-model="form.Basicswidthtype">
                <el-radio label="1">自适应</el-radio>
                <el-radio label="2">手动设置</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col  v-if="radio == '2'">
            <el-form-item label="宽度：">
              <el-input-number v-model="form.classAwidth" size="mini" :controls=false :min="100" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="背景色：">
              <el-color-picker v-model="form.classAbackgroundcolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="边框色：">
              <el-color-picker v-model="form.classAbodercolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="背景hover：">
              <el-color-picker v-model="form.classAhovercolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="单行高度：">
              <el-input-number  v-model="form.classAlineheight" size="mini" :controls=false :min="10" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="显示方式：" >
              <el-radio-group v-model="form.classAshowtype">
                <el-radio label="left">靠左</el-radio>
                <el-radio label="center">居中</el-radio>
                <el-radio label="right">靠右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分割线：">
              <el-radio-group  v-model="form.classAcutoffrule">
                <el-radio label="show">显示</el-radio>
                <el-radio label="hide">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select style="width: 100px;" v-model="form.classAfontFamily"  placeholder="设置字体" size="mini">
                <el-option
                  v-for="item in optionsFontFamily"
                  :key="item.name"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
              <div style="display: inline-block;height: 17px;">
                <span style="float: left;line-height: 24px;" @click="setfont('classAb')" :class="form.classAb == '1'?'tip p bold on': 'tip p bold'">B</span>
                <span style="float: left;line-height: 24px;" @click="setfont('classAi')" :class="form.classAi == '1'?'tip p bold style on':'tip p bold style'">I</span>
                <span style="float: left;line-height: 24px;" @click="setfont('classAu')" :class="form.classAu == '1'?'tip p bold underline on':'tip p bold underline'">U</span>
              </div>
            </el-form-item>
            <el-form-item label="字号：">
              <el-input-number  v-model="form.classAsize" size="mini" :controls=false :min="10" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="字色：">
              <el-color-picker v-model="form.classAfontcolor"></el-color-picker>
            </el-form-item>
        </el-col>
        <el-col  v-if="radio == '3'">
            <el-form-item label="宽度：">
              <el-input-number  v-model="form.classBwidth" size="mini" :controls=false :min="100" :max="1000"></el-input-number>
            </el-form-item>
            <el-form-item label="背景色：">
              <el-color-picker v-model="form.classBbackgroundcolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="背景hover：">
              <el-color-picker v-model="form.classBhovercolor"></el-color-picker>
            </el-form-item>
            <el-form-item label="单行高度：">
              <el-input-number  v-model="form.classBlineheight" size="mini" :controls=false :min="10" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="显示方式：" >
              <el-radio-group v-model="form.classBshowtype">
                <el-radio label="left">靠左</el-radio>
                <el-radio label="center">居中</el-radio>
                <el-radio label="right">靠右</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="分割线：">
              <el-radio-group v-model="form.classBcutoffrule">
                <el-radio label="show">显示</el-radio>
                <el-radio label="hide">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select style="width: 100px;"  v-model="form.classBfontFamily" placeholder="设置字体" size="mini">
                <el-option
                  v-for="item in optionsFontFamily"
                  :key="item.name"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
              <div style="display: inline-block;height: 17px;">
                <span style="float: left;line-height: 24px;" @click="setfont('classBb')" :class="form.classBb == '1'?'tip p bold on': 'tip p bold'">B</span>
                <span style="float: left;line-height: 24px;" @click="setfont('classBi')" :class="form.classBi == '1'?'tip p bold style on':'tip p bold style'">I</span>
                <span style="float: left;line-height: 24px;" @click="setfont('classBu')" :class="form.classBu == '1'?'tip p bold underline on':'tip p bold underline'">U</span>
              </div>
            </el-form-item>
            <el-form-item label="字号：">
              <el-input-number v-model="form.classBsize" size="mini" :controls=false></el-input-number>
            </el-form-item>
            <el-form-item label="字色：">
              <el-color-picker v-model="form.classBfontcolor"></el-color-picker>
            </el-form-item>
        </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button @click="editpulldownstyle" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'pulldown',
  components: {
  },
  data () {
    return {
      dialogpulldown: false,
      dialogmenusettings:false,
      dialogaddpulldown: false,
      labelPosition: 'right',
      form:{
          Basicstype:'bottom',
          Basicswidthtype:'1',
          classAwidth:250,
          classAbackgroundcolor:'#ffffff',
          classAbodercolor:'#ffffff',
          classAhovercolor:'#ffffff',
          classAlineheight:25,
          classAshowtype:'left',
          classAcutoffrule:'show',
          classAfontFamily :'微软雅黑',
          classAsize:16,
          classAfontcolor:'#000000',
          classAb:'0',
          classAi:'0',
          classAu:'0',
          classBwidth:250,
          classBbackgroundcolor:'#ffffff',
          classBhovercolor:'#ffffff',
          classBlineheight:25,
          classBshowtype:'left',
          classBcutoffrule:'show',
          classBfontFamily :'微软雅黑',
          classBsize:14,
          classBfontcolor:'#000000',
          classBb:'0',
          classBi:'0',
          classBu:'0'
      },
      formdefault:{
        Basicstype:'bottom',
        Basicswidthtype:'1',
        classAwidth:250,
        classAbackgroundcolor:'#ffffff',
        classAbodercolor:'#ffffff',
        classAhovercolor:'#ffffff',
        classAlineheight:25,
        classAshowtype:'left',
        classAcutoffrule:'show',
        classAfontFamily :'微软雅黑',
        classAsize:16,
        classAfontcolor:'#000000',
        classAb:'0',
        classAi:'0',
        classAu:'0',
        classBwidth:250,
        classBbackgroundcolor:'#ffffff',
        classBhovercolor:'#ffffff',
        classBlineheight:25,
        classBshowtype:'left',
        classBcutoffrule:'show',
        classBfontFamily :'微软雅黑',
        classBsize:14,
        classBfontcolor:'#000000',
        classBb:'0',
        classBi:'0',
        classBu:'0'
      },
      pulldowndata : [],
      radio:'1',
      menuname:'',
      isadd:1,
      index:'',
      index1:'',
      dialogtitle:'添加一级菜单',
      optionsFontFamily: [
        { label:'宋体',name:'songti',val:'宋体,SimSun'},
        { label:'楷体',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
        { label:'微软雅黑',name:'yahei',val:'微软雅黑'},
        { label:'黑体',name:'heiti',val:'黑体, SimHei'},
        { label:'隶书',name:'lishu',val:'隶书, SimLi'},
        { label:'andale mono',name:'andaleMono',val:'andale mono'},
        { label:'arial',name:'arial',val:'arial, helvetica,sans-serif'},
        { label:'arial black',name:'arialBlack',val:'arial black,avant garde'},
        { label:'comic sans ms',name:'comicSansMs',val:'comic sans ms'},
        { label:'impact',name:'impact',val:'impact,chicago'},
        { label:'times new roman',name:'timesNewRoman',val:'times new roman'}
      ],
      pulldowninit:function () {
        let self = this
        let menu_one_a = $('.menu_one_a')
        let menu_two_a = $('.menu_two_a')
        let h
        menu_two_a.each(function () {
          $(this).off('mouseenter')
          $(this).off('mouseleave')
          let bbg  =  $(this).parents('.pulldown_position').attr('bbg')
          let bhover  =  $(this).parents('.pulldown_position').attr('bhover')
          $(this).on('mouseenter',function () {
            $(this).css('backgroundColor',bhover)
          })
          $(this).on('mouseleave',function () {
            $(this).css('backgroundColor',bbg)
          })
        })

        menu_one_a.each(function () {
          let menu_box = $(this).parent('.menu_box')
          h = '-' + (menu_box.parents('.pulldown_position').height() + 2) + 'px'
          menu_box.parents('.pulldown_position').css('bottom',h)
          $(this).off('click')
          $(this).off('mouseenter')
          $(this).off('mouseleave')
          let abg  =  $(this).parents('.pulldown_position').attr('abg')
          let ahover  =  $(this).parents('.pulldown_position').attr('ahover')
          $(this).on('mouseenter',function () {
            $(this).css('backgroundColor',ahover)
          })
          $(this).on('mouseleave',function () {
            $(this).css('backgroundColor',abg)
          })
          $(this).on('click',function(){
            if(menu_box.find('.menu_two_box').length){

              if(menu_box.hasClass('on')){
                menu_box.removeClass('on')
                menu_box.find('.down_icon').removeClass('down_icon').addClass('up_icon')
              }else{
                menu_box.addClass('on')
                menu_box.find('.up_icon').removeClass('up_icon').addClass('down_icon')
              }
              h = '-' + (menu_box.parents('.pulldown_position').height() + 2) + 'px'
              menu_box.parents('.pulldown_position').css('bottom',h)
              if (menu_box.attr('showtype') == 'right'){
                var w =  Math.ceil(menu_box.find('.menu_two_box').outerWidth())
                menu_box.find('.menu_two_box').css('right','-'+w+'px')
                menu_box.siblings().removeClass('on')
              }
            }
          })
        })
      },
      initpulldowncss:function () {
        let self = this
        $('.on_module .pulldown_position').attr({
          abg : self.form.classAbackgroundcolor  || '#ffffff',
          ahover : self.form.classAhovercolor  || '#ffffff',
          bbg : self.form.classBbackgroundcolor  || '#ffffff',
          bhover : self.form.classBhovercolor  || '#ffffff',
          classbcutoffrule:self.form.classBcutoffrule,
          classacutoffrule:self.form.classAcutoffrule
        })
        $('.on_module .pulldown_position').find('.on').removeClass('on')
        $('.on_module .pulldown_position .menu_box').attr('showtype',self.form.Basicstype)
        if (self.form.Basicstype == 'bottom'){
          $('.on_module .pulldown_position .menu_box i').attr('class','up_icon')
        }else{
          $('.on_module .pulldown_position .menu_box i').attr('class','right_icon')
        }
        $('.on_module .menu_one_a').css({
          'width':'','height':self.form.classAlineheight,
          'lineHeight':self.form.classAlineheight+'px',
          'backgroundColor':self.form.classAbackgroundcolor  || '#ffffff',

        })
        $('.on_module .menu_one_a a').css({
          'fontFamily':self.form.classAfontFamily,
          'fontSize':self.form.classAsize,
          'color':self.form.classAfontcolor,
          'textAlign':self.form.classAshowtype
        })
        $('.on_module .pulldown_position').css({
          'borderColor':self.form.classAbodercolor,
        })

        if (self.form.classAb == '1'){
          $('.on_module .menu_one_a').css('fontWeight','bold')
        }else{
          $('.on_module .menu_one_a').css('fontWeight','normal')
        }
        if (self.form.classAi == '1'){
          $('.on_module .menu_one_a').css('fontStyle','oblique')
        }else{
          $('.on_module .menu_one_a').css('fontStyle','normal')
        }
        if (self.form.classAu == '1'){
          $('.on_module .menu_one_a').css('textDecoration','underline')
        }else{
          $('.on_module .menu_one_a').css('textDecoration','none')
        }
        $('.on_module .menu_one_a').on('mouseenter',function () {
          $(this).css('backgroundColor',self.form.classAhovercolor  || '#ffffff')
        })
        $('.on_module .menu_one_a').on('mouseleave',function () {
          $(this).css('backgroundColor',self.form.classAbackgroundcolor  || '#ffffff')
        })

        $('.on_module .menu_two_a').css({
          'width':'','height':self.form.classBlineheight,
          'lineHeight':self.form.classBlineheight+'px',
          'backgroundColor':self.form.classBbackgroundcolor  || '#ffffff',
          /*'borderColor':self.form.classAbodercolor,*/
          'textAlign':self.form.classBshowtype
        })
        $('.on_module .menu_two_a a').css({
          'fontFamily':self.form.classBfontFamily,
          'fontSize':self.form.classBsize,
          'color':self.form.classBfontcolor,
        })
        if (self.form.classBb == '1'){
          $('.on_module .menu_two_a').css('fontWeight','bold')
        }else{
          $('.on_module .menu_two_a').css('fontWeight','normal')
        }
        if (self.form.classBi == '1'){
          $('.on_module .menu_two_a').css('fontStyle','oblique')
        }else{
          $('.on_module .menu_two_a').css('fontStyle','normal')
        }
        if (self.form.classBu == '1'){
          $('.on_module .menu_two_a').css('textDecoration','underline')
        }else{
          $('.on_module .menu_two_a').css('textDecoration','none')
        }
        $('.on_module .menu_two_a').on('mouseenter',function () {
          $(this).css('backgroundColor',self.form.classBhovercolor  || '#ffffff')
        })
        $('.on_module .menu_two_a').on('mouseleave',function () {
          $(this).css('backgroundColor',self.form.classBbackgroundcolor  || '#ffffff')
        })
        if (self.form.Basicswidthtype == '2'){
          if(self.form.Basicstype == 'bottom'){
            $('.on_module .menu_one_a').css({'width':Math.max(self.form.classAwidth,self.form.classBwidth)})
            $('.on_module .menu_two_a').css({'width':Math.max(self.form.classAwidth,self.form.classBwidth)})
          }else{
            $('.on_module .menu_one_a').css({'width':self.form.classAwidth})
            $('.on_module .menu_two_a').css({'width':self.form.classBwidth})
          }

        }
        if (self.form.Basicstype == 'right'){
          $('.on_module .menu_two_box').css({
            'borderColor':self.form.classAbodercolor,
          })
        }
        let h ='-' +($('.on_module .pulldown_position').height() + 2)+'px';
        $('.on_module .pulldown_position').css('bottom',h)

        let strs = JSON.stringify(self.form)
        $('.on_module .pulldown_position').attr('strform', strs)
        self.pulldowninit()
        self.dialogmenusettings = false
      }
    }
  },
  created: function () {
    let self = this
  },
  methods: {
    setfont(font){
      let self = this
      self.form[font] = self.form[font] == '1'?'0':'1'
    },
    editpulldownstyle:function () {
      let self = this
      self.initpulldowncss()
    },
    resethref(type,index,index1){
      let self = this
      if (type == 1){
        self.pulldowndata[index].isurl = 0
        self.pulldowndata[index].href = {
          mainclass:'',
          sonclass :'',
          url : ''
        }
      }else{
        self.pulldowndata[index].children[index1].isurl = 0
        self.pulldowndata[index].children[index1].href = {
          mainclass:'',
          sonclass :'',
          url : ''
        }
      }
    },
    showdialogaddpulldown:function (type,name,index,index1) {
      let self = this
      switch (type){
        case 1:
          self.dialogtitle = '添加一级菜单'
          self.menuname = ''
          break
        case 2:
          self.dialogtitle = '添加二级菜单'
          self.menuname = ''
          break
        case 3:
          self.dialogtitle = '编辑菜单名称'
          self.menuname = name
          break
        case 4:
          self.dialogtitle = '编辑菜单名称'
          self.menuname = name
          break
      }
      self.isadd = type
      self.index = index
      self.index1 = index1
      self.dialogaddpulldown = true
    },
    addpulldown:function () {
      let self = this
      if (!self.menuname){
        self.$notify({
          title: '警告',
          message: '菜单名称不能为空',
          type: 'warning'
        })
        return false
      }
      switch (self.isadd){
        case 1:
          self.pulldowndata.push({
            name : self.menuname,
            isurl:0,
            href:{
              mainclass:'',
              sonclass :'',
              url : ''
            },
            children:[
            ]
          })
          break
        case 2:
          self.pulldowndata[self.index].children.push({
            name : self.menuname,
            isurl:0,
            href:{
              mainclass:'',
              sonclass :'',
              url : ''
            }
          })
          break
        case 3:
          self.pulldowndata[self.index].name = self.menuname
          break
        case 4:
          self.pulldowndata[self.index].children[self.index1].name = self.menuname
          break
      }
      self.dialogaddpulldown = false
    },
    delpulldown:function (item,index,index1) {
      let self = this
      self.$confirm('确定删除?', '提示', {
        closeOnClickModal:false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(item == 0){
          self.pulldowndata.splice(index,1);
        }else{
          self.pulldowndata[index].children.splice(index1,1);
        }
        self.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        });

      }).catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upRecord(arr,index,index1) { // 上移
      var index11 = index;
      var index2 = index-1;
      var index3 = index1 || 0;
      var index4 = index1 -1 || 0;
      if(arr == 1){
        this.pulldowndata[index11] = this.pulldowndata.splice(index2, 1, this.pulldowndata[index11])[0];
      }else{
        this.pulldowndata[index11].children[index3] = this.pulldowndata[index11].children.splice(index4, 1, this.pulldowndata[index11].children[index3])[0];
      }
    },
    downRecord(arr,index,index1) {// 下移
      var index11 = index;
      var index2 = index+1;
      var index3 = index1 || 0;
      var index4 = index1 +1 || 0;
      if(arr == 1){
        this.pulldowndata[index11] = this.pulldowndata.splice(index2, 1, this.pulldowndata[index11])[0];
      }else{
        this.pulldowndata[index11].children[index3] = this.pulldowndata[index11].children.splice(index4, 1, this.pulldowndata[index11].children[index3])[0];
      }
    },
    show: function (that, element, me) {
      let self = this
      self.that = that
      self.me = me
      self.pulldown = element
      let pulldownData = self.pulldown.find('.pulldown_position').attr('pulldownData')
      let strform = self.pulldown.find('.pulldown_position').attr('strform')
      if (pulldownData){
        let jsonpulldownData = $.parseJSON(pulldownData)
        self.pulldowndata = jsonpulldownData
      }else{
        self.pulldowndata = []
      }
      if (strform){
        let jsonstrform = $.parseJSON(strform)
        self.form = jsonstrform
        self.formdefault = jsonstrform
      }else{
        self.form = {
          Basicstype:'bottom',
            Basicswidthtype:'1',
          classAwidth:250,
          classAbackgroundcolor:'#ffffff',
          classAbodercolor:'#ffffff',
          classAhovercolor:'#ffffff',
          classAlineheight:25,
          classAshowtype:'left',
          classAcutoffrule:'show',
          classAfontFamily :'微软雅黑',
          classAsize:16,
          classAfontcolor:'#000000',
          classAb:'0',
          classAi:'0',
          classAu:'0',
          classBwidth:250,
          classBbackgroundcolor:'#ffffff',
          classBhovercolor:'#ffffff',
          classBlineheight:25,
          classBshowtype:'left',
          classBcutoffrule:'show',
          classBfontFamily :'微软雅黑',
          classBsize:14,
          classBfontcolor:'#000000',
          classBb:'0',
          classBi:'0',
          classBu:'0'
        }
        self.formdefault = {
          Basicstype:'bottom',
          Basicswidthtype:'1',
          classAwidth:250,
          classAbackgroundcolor:'#ffffff',
          classAbodercolor:'#ffffff',
          classAhovercolor:'#ffffff',
          classAlineheight:25,
          classAshowtype:'left',
          classAcutoffrule:'show',
          classAfontFamily :'微软雅黑',
          classAsize:16,
          classAfontcolor:'#000000',
          classAb:'0',
          classAi:'0',
          classAu:'0',
          classBwidth:250,
          classBbackgroundcolor:'#ffffff',
          classBhovercolor:'#ffffff',
          classBlineheight:25,
          classBshowtype:'left',
          classBcutoffrule:'show',
          classBfontFamily :'微软雅黑',
          classBsize:14,
          classBfontcolor:'#000000',
          classBb:'0',
          classBi:'0',
          classBu:'0'
        }
      }
      self.dialogpulldown = true
    },
    dialoghref:function (type,index,index1) {
      let self = this
      let href = {}
      let url = ''
      let mainclass = ''
      let sonclass = ''
      let auditionid = ''
      let origin = window.location.origin
      self.that.$refs.hrefdialogp.show('pulldown',self.that,function (element, data,linkType) {
        switch (linkType) {
          case 'online':
              href = {
                linkType:linkType,
                mainclass:'外部链接',
                sonclass :'',
                url : data.href
              }
            break
          case 'news':
            if (data.active == 1){
              sonclass = data.news.label
            }else if (data.active == 2){
              sonclass = data.news.label +'/'+ data.news.label1
            }else if (data.active == 3){
              sonclass = data.news.label +'/'+ data.news.label1 + '/'+data.newsTitle
            }
            href = {
              linkType:linkType,
              mainclass:'资讯',
              sonclass :sonclass,
              newschoolactive: data.newschoolactive || '',
              url : data.url
            }
            break
          case 'onlineschool':
            switch (data.oneinlineschool) {
              case 'summary':
                sonclass = '网校简介'
                url = '/introduce.html'
                break
              case 'course':
                sonclass = '选课中心'
                url = '/platform.html'
                break
              case 'contact':
                sonclass = '联系我们'
                url = '/contacts.html'
                break
              case 'register':
                sonclass = '注册'
                url = 'registerEvent'
                break
              case 'password':
                sonclass = '获取密码'
                url = '/forget.html'
                break
              case 'username':
                sonclass = '获取用户名'
                url = 'getUserNameEvent'
                break
              case 'login':
                sonclass = '登录'
                url = 'loginEvent'
                break
              case 'login1':
                sonclass = '登录'
                url = 'loginEvent'
                break
              case 'QQ':
                sonclass = 'QQ登录'
                url = 'http://www.ebh.net/otherlogin/qq.html?returnurl=' + origin
                break
              case 'weibo':
                sonclass = '微博登录'
                url = 'http://www.ebh.net/otherlogin/sina.html?returnurl=' + origin
                break
              case 'WeChat':
                sonclass = '微信登录'
                url = 'http://www.ebh.net/otherlogin/wx.html?returnurl=' + origin
                break
              case 'index':
                sonclass = '首页'
                url = 'http://'+ window.roominfo.domain
                break
            }
            href = {
              linkType:linkType,
              oneinlineschool:data.oneinlineschool,
              mainclass:'网校',
              sonclass :sonclass,
              newschoolactive: data.newschoolactive || '',
              url : url
            }
            break
          case 'teacher':
            href = {
              linkType:linkType,
              mainclass:'教师',
              sonclass :data.realname,
              url : '/master/'+data.teauid+'.html'
            }
            break
          case 'course':
            switch (data.course){
              case 1:
                  mainclass = '课程分类'
                  url = '/platform.html'
                  sonclass = data.name
                break
              case 2:
                mainclass = '课程主类'
                url = '/platform-1-0-0.html?pid='+ data.pid
                sonclass = data.name +'/'+ data.pname
                break
              case 3:
                mainclass = '课程子类'
                if(data.sid == 0){
                  url = '/platform-1-0-0.html?pid='+ data.pid
                }else{
                  url = '/platform-1-0-0.html?pid='+ data.pid + '&sid=' + data.sid
                }
                sonclass = data.name +'/'+ data.pname +'/'+data.sname
                break
              case 4:
                mainclass = '课程'
                url = '/courseinfo/' + data.itemid + '.html'
                sonclass = data.name +'/'+ data.pname +'/'+data.sname + '/'+data.foldername
                break
              case 5:
                if (data.cwidtype == '2'){
                  if(data.islive == '1'){
                    url = '/course/' + data.cwid + '.html?flag=1'
                  }else{
                    url = '/course/' + data.cwid + '.html'
                  }
                  auditionid = data.cwid
                }else{
                  if(data.cwpay == '1'){
                    url = '/ibuy.html?cwid='+data.cwid
                  }else{
                    url = '/courseinfo/' + data.itemid + '.html'
                  }
                }
                mainclass = '课件'
                sonclass = data.name +'/'+ data.pname +'/'+data.sname + '/'+data.foldername +'/'+data.cwname
                break
            }
            href = {
              linkType:linkType,
              mainclass:mainclass,
              sonclass :sonclass,
              url : url,
              auditionid: auditionid
            }
            break
        }
        if (type == 1){
          self.pulldowndata[index].isurl = 1
          self.pulldowndata[index].href = href
        }else{
          self.pulldowndata[index].children[index1].isurl = 1
          self.pulldowndata[index].children[index1].href = href
        }
      })
    },
    handleClick:function () {
      let self = this
      let pulldowndata = self.pulldowndata
      let pulldownhtnl = ''
      let origin = window.location.origin
      if (pulldowndata.length){
        for (let i=0;i<pulldowndata.length;i++){
          let linkType = pulldowndata[i].href.linkType
          let linkobj = pulldowndata[i].href
          pulldownhtnl += '<div class="menu_box" showtype="'+self.form.Basicstype+'">'
            if (pulldowndata[i].isurl){
              if (pulldowndata[i].href.url == 'getUserNameEvent' || pulldowndata[i].href.url == 'registerEvent' || pulldowndata[i].href.url == 'loginEvent'){
                pulldownhtnl += '<div class="menu_one_a"><a class="'+pulldowndata[i].href.url+'">'+pulldowndata[i].name+'</a></div>'
              }else{
                if (pulldowndata[i].href.newschoolactive == '2'){
                  pulldownhtnl += '<div class="menu_one_a"><a target="_blank" href="'+pulldowndata[i].href.url+'">'+pulldowndata[i].name+'</a></div>'
                }else{
                  if (pulldowndata[i].href.auditionid){
                    pulldownhtnl += '<div class="menu_one_a"><a auditionid="'+pulldowndata[i].href.auditionid+'" href="'+pulldowndata[i].href.url+'">'+pulldowndata[i].name+'</a></div>'
                  }else{
                    pulldownhtnl += '<div class="menu_one_a"><a href="'+pulldowndata[i].href.url+'">'+pulldowndata[i].name+'</a></div>'
                  }
                }
              }
            }else{
              if (pulldowndata[i].children.length){
                pulldownhtnl += '<div class="menu_one_a"><a>'+pulldowndata[i].name+'</a><i class="right_icon"></i></div><div class="menu_two_box">'
                  for (var j=0;j<pulldowndata[i].children.length;j++){
                    let children = pulldowndata[i].children[j]
                    if (children.isurl){
                      if (children.href.url == 'getUserNameEvent' || children.href.url == 'registerEvent' || children.href.url == 'loginEvent'){
                        pulldownhtnl += '<div class="menu_two_a"><a class="'+children.href.url+'">'+children.name+'</a></div>'
                      }else{
                        if (children.href.newschoolactive == '2'){
                          pulldownhtnl += '<div class="menu_two_a"><a target="_blank" href="'+children.href.url+'">'+children.name+'</a></div>'
                        }else{
                          if (children.href.auditionid){
                            pulldownhtnl += '<div class="menu_two_a"><a auditionid="'+children.href.auditionid+'" href="'+children.href.url+'">'+children.name+'</a></div>'
                          }else{
                            pulldownhtnl += '<div class="menu_two_a"><a href="'+children.href.url+'">'+children.name+'</a></div>'
                          }
                        }
                      }
                    }else{
                      pulldownhtnl += '<div class="menu_two_a"><a>'+children.name+'</a></div>'
                    }
                  }
                pulldownhtnl +=  '</div>'
              }else{
                pulldownhtnl += '<div class="menu_one_a"><a>'+pulldowndata[i].name+'</a></div>'
              }
            }
          pulldownhtnl += '</div>'
        }
        let html = '<div class="pulldown_position" Abg="'+(self.form.classAbackgroundcolor || '#ffffff')+'" Ahover="'+(self.form.classAhovercolor  || '#ffffff')+'" Bbg="'+(self.form.classBbackgroundcolor  || '#ffffff')+'" Bhover="'+(self.form.classBhovercolor  || '#ffffff')+'"  classBcutoffrule="'+self.form.classBcutoffrule+'" classAcutoffrule="'+self.form.classAcutoffrule+'">'+pulldownhtnl+'</div>'
        $('.on_module .pulldown_position').remove()
        $('.on_module').append(html)
        let str = JSON.stringify(pulldowndata)
        $('.on_module .pulldown_position').attr('pulldownData', str)
        self.initpulldowncss()
      }else{
        $('.on_module .pulldown_position').remove()
      }
      self.dialogpulldown = false
    },
    resetForm() {
      let self = this
      self.form = self.formdefault
      self.dialogmenusettings = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .editbutton{
    display: none;
  }
  .cell:hover .editbutton{
    display: block;
  }
  .el-dialog--pulldown .el-dialog{
    width: 1000px;
  }
  .el-dialog--pulldown *{
    font-family: 'Microsoft YaHei';
  }
  .el-dialog--addpulldown .el-dialog,.el-dialog--menusettings .el-dialog{
    width: 420px;
  }
  .el-dialog--pulldown .el-dialog__body{
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
  }
  .el-dialog--pulldown .el-table .cell, .el-dialog--pulldown .el-table th>div{
    padding-left: 10px;
    padding-right: 10px;
  }
  .el-dialog--pulldown .table_control{
    width: 960px;
    border: 1px solid #ccc;
  }
  .el-dialog--pulldown .table_control .table_control_th,.el-dialog--pulldown .table_control .table_control_td{
    line-height: 40px;
  }
  .el-dialog--pulldown .table_control .table_control_th .el-col,.el-dialog--pulldown .table_control .table_control_td .el-col{
    padding: 0px 8px;
  }
  .el-dialog--pulldown .table_control .table_control_td .table_control_td_one,.el-dialog--pulldown .table_control .table_control_td .table_control_td_two{
    padding: 0;
    border-top: 1px solid #ccc;
  }
  .el-dialog--pulldown .table_control .table_control_th{
    background: #EEF1F6;
  }
  .el-dialog--pulldown .table_control .table_control_th .el-col{
    color: #333333;
    font-weight: bold;
    font-size: 14px;
  }
  .el-dialog--pulldown .table_control .table_control_td{
    color: #333333;
  }
  .el-dialog--pulldown .table_control .table_control_td *{
    font-size: 14px;
  }
  .el-dialog--pulldown .table_control .table_control_td .el-col-12 button{
    float: left;
    margin-top: 3px;
  }
  .el-dialog--menusettings .el-form-item{
    margin-bottom: 0;
  }
</style>
