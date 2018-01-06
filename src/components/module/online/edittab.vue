<template>
  <div class="edittab">
    <el-dialog
      title="编辑标签"
      :visible.sync="dialogedittab"
      class="el-dialog--edittab">
      <el-row>
        <el-col>
          <el-form ref="edittabform" label-width="85px">
            <el-form-item label="选择样式：">
              <div @click="selecttype('text')" :class="type == 'text'?'type_btn type_btn1 type_active':'type_btn type_btn1'">
                <div class="type_img">
                  <span class="active">标签一</span><span>标签二</span>
                  <div class="check"></div>
                </div>
                <p>样式一</p>
              </div>
              <div @click="selecttype('padd')" :class="type == 'padd'?'type_btn type_btn2 type_active':'type_btn type_btn2'">
                <div class="type_img">
                  <span  class="active">标签一</span><span>标签二</span>
                  <div class="check"></div>
                </div>
                <p>样式二</p>
              </div>
            </el-form-item>
            <el-form-item label="选择颜色：">
              <colorPicker class="propertycolor" v-model="color_font" :disabled='disabled' @change='changeColorFont'></colorPicker>
            </el-form-item>
            <el-form-item label="标签位置：">
              <el-radio-group v-model="radio_position">
                <el-radio label="left">左侧对齐</el-radio>
                <el-radio label="center">居中</el-radio>
                <el-radio label="right">右侧对齐</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="鼠标切换：">
              <el-radio-group v-model="radio_mouse">
                <el-radio label="click">鼠标点击</el-radio>
                <el-radio label="hover">鼠标悬停</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标签列表：">
              <el-row>
                <el-col v-for="(item,index) in labels" :key="item.name">
                  <el-col :span="9">
                    <el-input  :maxlength="10"  v-if="item.edit" size="small" v-model="item.name1"></el-input>
                    <span v-if="!item.edit">&nbsp;{{item.name}}</span>
                  </el-col>
                  <el-col :span="3" >&nbsp;&nbsp;<el-button v-if="item.edit" @click="labelskeep(index)" type="text">保存</el-button></el-col>
                  <el-col :span="12">
                    <el-button type="text" @click="labelsedit(index)">编辑</el-button>
                    <el-button v-if="labels.length > 1" style="color: #ff0000" @click="labelsremove(index)" type="text">删除</el-button>
                    <el-button v-if="index > 0" @click="labelsup(index)" type="text">上移</el-button>
                    <el-button v-if="labels.length > index +1" @click="labelsdown(index)" type="text">下移</el-button>
                  </el-col>
                </el-col>
                <el-col>
                  <el-button  @click="labelsadd" v-if="labels.length < 10" type="text">添加</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogedittab = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
import colorPicker from '@/components/colorPicker'
export default {
  name: 'edittab',
  components: {
    colorPicker
  },
  data () {
    return {
      dialogedittab: false,
      type : 'text',
      disabled : false,
      color_font : '#20A0FF',
      radio_position : 'left',
      radio_mouse :'click',
      labels : [
        { name : '标签1',
          name1 : '标签1',
          edit:0
        },
        { name : '标签2',
          name1 : '标签2',
          edit:0
        }
      ]
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.datahtml
    // 注入左侧图标
    moduleData['toallGroup']['online'].push({
      name : 'addtab',
      icon: 'imgicon icon-addtab',
      text: '标签页'
    })
    // 配置模块参数
    moduleData['addtab'] = { 
      style: 'width: 430px; height: 260px',
      tool: {
        private: {
          text: '编辑标签',
          class: 'st-tab'
        },
        public: []
      },
      container: true, // 是否为容器
      containerClass: '.tab_content .active', // 作为容器节点的class名称
      containerOffset: { // 实际容器与容器父模块的相对位置
        y: 28,
        x: 0
      }, 
      AddModuleRule: function (box) { // 添加模块的限制
        if (box.attr('class') == 'active cont' || box.attr('class') == 'cont active'){
          self.$notify({
            title: '警告',
            message: '标签页中不可插入标签页',
            type: 'warning'
          })
          return false
        } else {
          return true
        } 
      },
      // resize: undifend, // 拉伸方向: 默认为空,自由拉伸
      // resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调
      // },
      // beforeSelecting: function (self, element, me) { // 选中元素要执行的特殊操作 
      // },       
      createEvent: function (self, element, me) { // 模块创建事件        
      },
      html: '<div class="addtab module addmodule" datatext="标签页"><div class="tab"><ul class="tab_header" text="left" color="409eff" type="text" ev="click"><li class="active"><span>标签一</span></li><li><span>标签二</span></li></ul><ul class="tab_content"> <li class="active cont"></li> <li class="cont"></li></ul></div></div>'
    } 
  },
  methods: {
    show: function (that, element, me) {
      let self = this
      self.that = that
      self.me = me
      self.tab = element
      let tabData = self.tab.attr('tabData')
      if (tabData){
        let jsontabData = $.parseJSON(tabData)
        self.type = jsontabData.type
        self.color_font = jsontabData.color_font
        self.radio_position = jsontabData.radio_position
        self.radio_mouse = jsontabData.radio_mouse
        self.labels = jsontabData.labels

      }else{
        self.type = 'text'
        self.color_font = '#409eff'
        self.radio_position = 'left'
        self.radio_mouse = 'click'
        self.labels = [
          { name : '标签1',
            name1 : '标签1',
            edit:0
          },
          { name : '标签2',
            name1 : '标签2',
            edit:0
          }
        ]
      }
      self.dialogedittab = true
    },
    selecttype:function (val) {
      let self = this
      self.type = val
    },
    changeColorFont(val){
      let self = this
      self.color_font = val || '#409eff'
      if(!val){
        self.$notify({
          title: '警告',
          message: '请重新选择颜色 不可为透明',
          type: 'warning'
        });
      }
    },
    labelsup(index){
      let self = this
      let index1 = index-1;
      self.labels[index] = self.labels.splice(index1, 1, self.labels[index])[0];
    },
    labelsdown(index){
      let self = this
      let index1 = index+1
      this.labels[index] = this.labels.splice(index1, 1, this.labels[index])[0];
    },
    labelsremove(index){
      let self = this
      self.labels.splice(index,1);
    },
    labelsedit(index){
      let self = this
      self.labels[index].edit = 1
    },
    labelskeep(index){
      let self = this
      self.labels[index].name = self.labels[index].name1
      self.labels[index].edit = 0
    },
    labelsadd(){
      let self = this
      let name = '标签' +(self.labels.length+1)
      self.labels.push({
        name:name,
        name1:name,
        edit : 1
      })
    },
    handleClick(){
      let self = this
      let tab = $('.on_module .tab')
      tab.find('.tab_header').attr('text',self.radio_position)
      tab.find('.tab_header').attr('color',self.color_font.replace('#',''))
      tab.find('.tab_header').attr('type',self.type)
      tab.find('.tab_header').attr('ev',self.radio_mouse)
      let headlen = tab.find('.tab_header li').length
      let labels =   self.labels
      if (labels.length >= headlen){
        for (let i = 0;i<labels.length;i++){
          if (headlen > i){
            tab.find('.tab_header li span').eq(i).text(labels[i].name)
          }else{
            tab.find('.tab_header').append('<li><span>'+labels[i].name+'</span></li>')
            tab.find('.tab_content').append('<li class="cont"><div></div></li>')
          }
        }
      }else{
        let index = 0
        for (let i = 0;i<headlen;i++){
          if (i < labels.length){
            tab.find('.tab_header li span').eq(i).text(labels[i].name)
          }else{
            index ++
            tab.find('.tab_header li').eq(headlen-index).remove()
            tab.find('.tab_content li.cont').eq(headlen-index).remove()

          }
        }
      }
      let obj = {
        type : self.type,
        color_font: self.color_font,
        radio_position: self.radio_position,
        radio_mouse:self.radio_mouse,
        labels : self.labels
      }
      let str = JSON.stringify(obj)
      $('.on_module').attr('tabData', str)
      self.dialogedittab = false
      self.me.tab('.tab')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-dialog--edittab .el-dialog{
    width: 460px;
  }
  .el-dialog--edittab .el-dialog__body{
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1px solid #ccc;
  }
  .el-dialog--edittab .type_btn{
    width: 120px;
    height: 84px;
    text-align: center;
    float: left;
    cursor: pointer;
  }
  .el-dialog--edittab .type_btn1{
    margin-right: 10px;
  }
  .el-dialog--edittab .type_btn p{
    line-height: 28px;
  }
  .el-dialog--edittab .type_btn .type_img{
    border: 1px solid #333333;
    width: 100%;
    height: 56px;
    line-height: 56px;
    position: relative;
  }
  .el-dialog--edittab .type_btn:hover .type_img{
    border:1px solid #20A0FF;
  }
  .el-dialog--edittab .type_active .type_img{
    border:1px solid #20A0FF;
  }
  .el-dialog--edittab .type_btn1 .type_img span{
    margin: 0px 5px;
  }
  .el-dialog--edittab .type_btn1 .type_img span.active{
    color:#20A0FF ;
  }
  .el-dialog--edittab .type_btn2 .type_img span{
    margin: 0px 5px;
    padding: 2px 5px;
  }
  .el-dialog--edittab .type_btn2 .type_img span.active{
    margin: 0px 5px;
    background: #20A0FF;
    color: #ffffff;
  }
  .el-dialog--edittab .type_btn .type_img .check{
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 17px;
    height: 13px;
    background: url("http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png") no-repeat;
    display: none;
  }
  .el-dialog--edittab .type_active .type_img .check{
    display: block;
  }
  .el-dialog--edittab .propertycolor .colorBtn{
    width: 32px;
    height: 32px;
  }
  .el-dialog--edittab .propertycolor .box.open{
    z-index: 1;
  }
</style>
