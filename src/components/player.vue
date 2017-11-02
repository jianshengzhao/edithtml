<template>
  <div id="player">
    <el-dialog
      title="播放器"
      :visible.sync="dialogPlayer"
      size="player"
      @close="beforeCloseEvent">
      <el-row style="margin-bottom: 60px;">
        <el-col :span="4" class="right" >选择样式：</el-col>
        <el-col :span="18">
          <el-radio-group v-model="selectStyle">
            <el-radio-button label="single">
              <img src="../assets/newdialog/one.jpg">
              <span class="stylename">单个视频</span>
              <div class="pitchIcon">✔</div>
            </el-radio-button>
            <el-radio-button label="multiple">
              <img src="../assets/newdialog/more.jpg">
              <span class="stylename">多个视频</span>
              <div class="pitchIcon">✔</div>
            </el-radio-button>
          </el-radio-group>

         <!--  <el-select v-model="selectStyle" placeholder="请选择样式" >
            <el-option
              v-for="item in playerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="right">播放方式：</el-col>
        <el-col :span="18">          
          <el-radio class="radio" v-model="playerWay" label="0">点击播放</el-radio>
          <el-radio class="radio" v-model="playerWay" label="1">直接播放</el-radio>
        </el-col>       
      </el-row>
      <el-row v-if="selectStyle!==''" style="margin-bottom: 10px;">
        <el-col style="text-indent: 13px;">添加视频：<span style="color: #999;">（最多添加10个视频）</span></el-col>
      </el-row>
      <el-row v-if="selectStyle!==''">
        <div class="videoList">
          <div class="vo-li" v-for="(item, index) in playerData" v-if="selectStyle == 'single'? index > 0 ? false : true : true">
            <img :src="item.pic">
            <div class="update" @click="updatePlayerEvent(index)">修改</div>
            <div class="cwTlt">{{item.title}}</div>
            <div class="cwDesc">{{item.desc}}</div>           
            <div class="delete" @click="deletePlayerEvent(index)">删除</div>
          </div>
          <div class="add-vo-li" v-if="selectStyle == 'single'? playerData.length > 0 ? false : true : playerData.length > 9 ? false: true" @click="addPlayerEvent">
            <span class="addfont">+</span>
            <span class="addtext">添加视频</span>
          </div>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogPlayer = false">取 消</el-button>
        <el-button type="primary" @click="dialogPlayerEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'player',
  data () {
    return {
      selectStyle: 'single',
      playerOptions: [
        {
          label: '单个视频',
          value: 'single'
        },
        {
          label: '多个视频',
          value: 'multiple'
        }
      ],
      playerWay: '0',      
      dialogPlayer: false,
      playerData: []
    }
  },
  created: function () {   
  },
  methods: { 
    show: function (that, element, me) { // 初始化调用弹出框
      let self = this
      self.that = that
      self.element = element
      self.me = me
      self.dialogPlayer = true      
      self.playerData = []
      let playerData = self.element.attr('playerData')
      if(playerData) {
        self.selectStyle = ''
        let jsonPlayer = $.parseJSON(playerData)
        self.selectStyle = jsonPlayer.selectStyle
        self.playerWay = jsonPlayer.playerWay
        self.playerData = jsonPlayer.playerData
      }
    },
    addPlayerEvent: function () { // 添加视频
      let self = this
      self.that.$refs.hrefdialogp.show('coursecw|player', self, function (self, data) {       
        self.playerData.push({
          title: data.cwname,
          desc: data.summary,
          thumb:data.thumb,
          size: data.cwsize,
          pic: data.logo,
          cwid: data.cwid,
          styleNum: data.viewnum
        })
      }) 
    },
    updatePlayerEvent: function (index) { // 修改视频
      let self = this
      self.that.$refs.hrefdialogp.show('coursecw|player', self, function (self, data) {       
        self.playerData.splice(index,1,{
          title: data.cwname,
          desc: data.summary,
          thumb:data.thumb,
          size: data.cwsize,
          pic: data.logo,
          cwid: data.cwid,
          styleNum: data.viewnum
        })
      })       
    },
    deletePlayerEvent: function (index) { // 删除视频
      let self = this
      self.playerData.splice(index,1)
    },   
    dialogPlayerEvent: function () { // 确定
      let self = this
      if (self.playerData.length < 1) {
        self.$notify({
          title: '警告',
          message: '您还未添加视频',
          type: 'warning'
        })
        return false
      }      
      self.dialogPlayer = false   
      self.element.show()   
      let rightMenu = self.element.find('.rightMenu')
      let html = ""

      if (self.selectStyle == "single") {
        rightMenu.hide()
        self.playerData.splice(1, self.playerData.length-1)
      } else {
        for (let i = 0, len = self.playerData.length; i < len; i++) {
          let item = self.playerData[i]
          html += '<li><img src="'+ item.pic +'"><div class="title">'+ item.title +'</div><div class="studyNum">'+item.styleNum+'次学习</div></li>'
        }        
        rightMenu.show()
        rightMenu.html(html)
        rightMenu.find('li').eq(0).addClass('on')
      } 

      let cover = self.element.find('.editPlayer').find('img')
      cover.attr('src', self.playerData[0].pic)

      let obj = {
        selectStyle: self.selectStyle, 
        playerWay: self.playerWay,      
        playerData: self.playerData
      }
      let str = window.JSON.stringify(obj)
      self.element.attr('playerData', str)
    },
    beforeCloseEvent: function () { // 关闭弹框前的回调     
      let self = this      
      if (self.playerData.length < 1) {
        let parent = self.element.parent()
        self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
        self.element.remove()        
        self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
      }
    }
  }
}
</script>
<style>
  .el-dialog--player {
    width: 500px;
  }
  #player .el-row {
    margin-bottom: 20px;
  }
  #player .el-col {
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
  }
  #player .el-col span{
    color: #999;
  }
  #player .el-input-number{
    margin-right: 5px;
  }
  #player .right {
    text-align: right;
  }
  #player .el-dialog__body{
    padding: 20px 30px 10px;
  }
  #player .addColor{
    color: #169BD5;
  }
  #player .videoList {
    width: 430px;
    border: 1px solid #E4E4E4;
    padding: 0 10px 10px;
    box-sizing: border-box;
    max-height: 354px;
    overflow-y: scroll;
  }
  #player .videoList .add-vo-li {
    margin-top: 10px;
    width: 121px;
    height: 76px;
    border: 1px solid #E4E4E4;
    text-align: center;
    cursor: pointer;
  }
  .addfont {
    display: block;
    margin: 10px auto 0;
    font-size: 24px;
  }
  .addtext {
    display: block;
    margin: 0 auto;
  }
  #player .videoList .vo-li {
    margin-top: 10px;   
    overflow: hidden;
  }
  .vo-li img{
    float: left;
    width: 121px;
    height: 76px;
  }
  .vo-li .cwTlt{
    float: left;
    width: 230px;
    height: 24px;
    line-height: 24px;
    padding-left: 8px;
    font-size: 16px;
    color:#333;
    font-weight: 600;
    overflow: hidden;
  }
  .vo-li .cwDesc{
    float: left;
    width: 230px;
    height: 50px;
    line-height: 18px;
    font-size: 12px;
    padding-left: 8px;
    overflow: hidden;
  }
  .vo-li .update{
    float: right;
    width: 30px;
    margin-right: 5px;
    color: #169BD5;
    cursor: pointer;
  }
   .vo-li .delete{
    float: right;
    width: 30px;
    margin-right: 5px;
    color: #FF0000;
    cursor: pointer;
  }
  #player .el-dialog__header{
    border-bottom: 1px solid #CECECE;
    height: 30px;
  }
  #player .el-radio-button__inner{
    position: relative;
    display: block;
    width: 90px;
    height: 60px;
    padding: 0;
    margin-right:10px;
    border-radius: 0;
    border: 0;
    box-shadow: none; 
    border: 1px solid #999999;  
    box-sizing: content-box;   
  }
  #player .is-active .el-radio-button__inner {
    border: 1px solid #20a0ff;
  }
  #player .is-active .stylename{
    color: #20a0ff;
  }
  #player .el-radio-button__inner img{
    display: block;   
    width: 90px;
    height: 60px;
  }
  #player .el-radio-button__inner .stylename{
    position: absolute;
    left: 24px;
    bottom: -20px;
  }
</style>
