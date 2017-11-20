<template>
  <div class="menubar">
    <el-dialog
      title="菜单"
      :visible.sync="dialogMenubar"
      size="menubar">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本设置" name="first">
          <el-row class="menu-head">
            <el-col >弹出方式：</el-col>
          </el-row>
          <el-row class="menu-show-style">
            <ul class="show-style-ul">
              <li class="on">
                <div class="imgbox">
                  <img src="">
                  <div class="animtip">✔</div>
                </div>               
                <span>左侧半屏</span>
              </li>
            </ul>                      
          </el-row>
          <el-row class="menu-head">
            <el-col :span="6">模块形状：</el-col>
            <el-col :span="6">
              <el-radio class="radio" v-model="radioshape" label="1">方形</el-radio>
            </el-col>
            <el-col :span="6">
              <el-radio class="radio" v-model="radioshape" label="2">圆形</el-radio>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="菜单管理" name="second">菜单管理</el-tab-pane>       
      </el-tabs>      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'menubar',
    data () {
      return { 
        dialogMenubar: false,
        activeName: 'first',
        radioshape: '1'
      }
    },
    created: function () {
      let self = this
      let moduleData = self.$parent.moduleData
      // 注入左侧图标
      moduleData['toallGroup']['online'].push({
        name: 'menubar',
        icon: 'imgicon icon-menubar',
        text: '菜单栏'
      })
      // 配置模块参数   
      moduleData['menubar'] = {
        style: 'width:50px; height:50px',
        tool: {
          private: {
            text: '编辑菜单',
            class: 'st-menubar'
          }, 
          public: []
        },
        createEvent: function (self, element, me) {          
          if (me.top.find('.menubar').length > 1) {
            self.$notify({
              title: '警告',
              message: '您已经添加过菜单栏',
              type: 'warning'
            }) 
            element.remove()
          }   
        },
        html: '<div class="menubar module addmodule"  datatext="菜单栏"><div class="menubar-icon"></div></div>'
      }
    },
    methods: {
      show: function () {
        let self = this 
        self.dialogMenubar = true
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* ------- 控制模块是否可以拉伸 ------- */
  .menubar .resize{
    display: none;
  }
/* ------- 菜单弹出框宽度 ------- */
  .el-dialog--menubar{
    width: 420px;
  }
/* ------- 弹框样式 ------- */
  .menu-head{
    margin-bottom: 5px;
  }
  .menu-head .el-col{
    height: 24px;
    line-height: 24px;
    font-size: 13px;
  }
  .show-style-ul li{
    float: left;
    width: 126.66px;
    height: 130px;
    margin-bottom: 10px;  
    cursor: pointer;  
  }
  .show-style-ul .imgbox{
    position: relative;
    width: 90px;
    height: 110px;
    border:1px solid #797979;
  }
  .show-style-ul .animtip{
    display: none;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background-color: #169BD5;
    color: #fff;
    text-align: center;
    line-height: 16px;
  }
  li.on .imgbox{
    border:1px solid #169BD5;
  }
  li.on .animtip {
    display: block;
  }
  .menu-show-style img{
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
  .menu-show-style span{
    display: block;
    width: 90px;
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
</style>
