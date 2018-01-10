<template>
  <div class="pulldown">
    <el-dialog
      title="下拉框"
      :visible.sync="dialogpulldown"
      class="el-dialog--pulldown">
      <el-row>
        <el-col v-if="pulldowndata.length < 10" style="text-align: right;margin-bottom: 10px">
          <el-button @click="dialoghref" type="primary">添加链接</el-button>
        </el-col>
        <el-col>
          <el-table
            :data="pulldowndata"
            @cell-mouse-enter="enteredit"
            @cell-mouse-leave="leaveedit"
            style="width: 100%">
            <el-table-column
              label="启用"
              width="60">
              <template scope="scope">
                <el-checkbox v-model="scope.row.on"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              label="备注名"
              width="180">
              <template scope="scope">
                <el-row>
                  <el-col :span="20">
                    <span :title="scope.row.name" style="width: 140px;line-height: 34px;display:block;white-space:nowrap; overflow:hidden;text-overflow:ellipsis;" v-if="!scope.row.edit">&nbsp;{{scope.row.name}}</span>
                    <el-input :maxlength="10" style="width: 140px;"  v-if="scope.row.edit" v-model="scope.row.editname" size="small"></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button style="margin-left: 5px" @click="editname(scope.$index)" type="text" v-if="scope.row.hoveredit && !scope.row.edit">编辑</el-button>
                    <el-button style="margin-left: 5px" @click="quedname(scope.$index)" type="text" v-if="scope.row.hoverqued && scope.row.edit">确定</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column
              label="地址"
              width="200">
              <template scope="scope">
                <p>{{scope.row.mainclass}}</p>
                <p style="color: #999999">{{scope.row.sonclass}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template scope="scope">
                <el-button type="text" @click="pulldownedit(scope.$index)" >编辑</el-button>
                <el-button style="color: #ff0000" type="text" @click="pulldowndel(scope.$index)" >删除</el-button>
                <el-button v-if="scope.$index > 0" type="text" @click="pulldownup(scope.$index)" >上移</el-button>
                <el-button v-if="pulldowndata.length > scope.$index +1" type="text" @click="pulldowndown(scope.$index)" >下移</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogpulldown = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
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
      pulldowndata : []
    }
  },
  created: function () {
    let self = this
  },
  methods: {
    show: function (that, element, me) {
      let self = this
      self.that = that
      self.me = me
      self.pulldown = element
      let pulldownData = self.pulldown.find('.pulldown_position').attr('pulldownData')
      if (pulldownData){
        let jsonpulldownData = $.parseJSON(pulldownData)
        self.pulldowndata = jsonpulldownData
      }else{
        self.pulldowndata = []
      }
      self.dialogpulldown = true
    },
    dialoghref:function () {
      let self = this
      self.that.$refs.hrefdialogp.show('pulldown',self.that,function () {

      },'空')
    },
    enteredit:function (val) {
      let self = this
      if (val.edit){
        val.hoverqued = 1
        val.hoveredit = 0
      }else{
        val.hoveredit = 1
        val.hoverqued = 0
      }
    },
    leaveedit:function (val) {
      let self = this
      if (val.edit){
        val.hoverqued = 0
        val.hoveredit = 0
      }else{
        val.hoveredit = 0
        val.hoverqued = 0
      }
    },
    editname:function (index) {
      let self = this
      self.pulldowndata[index].editname = self.pulldowndata[index].name
      self.pulldowndata[index].edit = 1
    },
    quedname:function (index) {
      let self = this
      self.pulldowndata[index].name = self.pulldowndata[index].editname
      self.pulldowndata[index].edit = 0
    },
    pulldownup:function (index) {
      let self = this
      let index1 = index-1;
      self.pulldowndata[index] = self.pulldowndata.splice(index1, 1, self.pulldowndata[index])[0];
    },
    pulldowndown:function (index) {
      let self = this
      let index1 = index+1
      this.pulldowndata[index] = this.pulldowndata.splice(index1, 1, this.pulldowndata[index])[0];
    },
    pulldowndel:function (index) {
      let self = this
      self.pulldowndata.splice(index,1);
    },
    pulldownedit:function (index) {
      let self = this
      self.that.$refs.hrefdialogp.show('pulldown',self.that,function () {},index)
    },
    handleClick:function () {
      let self = this
      let pulldowndata = self.pulldowndata
      let pulldownhtnl = ''
      let origin = window.location.origin
      if (pulldowndata.length){
        for (let i=0;i<pulldowndata.length;i++){
          let linkType = pulldowndata[i].linkType
          let linkobj = pulldowndata[i].obj
          if (pulldowndata[i].on){
            switch (linkType){
              case 'online':
                pulldownhtnl += '<a href="'+ pulldowndata[i].url +'">'+pulldowndata[i].name+'</a>'
                break
              case 'news':
                if (linkobj.newschoolactive == '1'){
                  pulldownhtnl += '<a href="'+ pulldowndata[i].url +'">'+pulldowndata[i].name+'</a>'
                }else{
                  pulldownhtnl += '<a href="'+ pulldowndata[i].url +'">'+pulldowndata[i].name+'</a>'
                }
                break
              case 'course':
                if (pulldowndata[i].obj.cwidtype == '2'){
                  pulldownhtnl += '<a target="_blank" auditionid="'+ pulldowndata[i].obj.cwid+'" href="'+ pulldowndata[i].url +'">'+pulldowndata[i].name+'</a>'
                }else{
                  pulldownhtnl += '<a target="_blank" href="'+ pulldowndata[i].url +'">'+pulldowndata[i].name+'</a>'
                }
                break
              case 'teacher':
                pulldownhtnl += '<a target="_blank" href="'+ pulldowndata[i].url +'">'+pulldowndata[i].name+'</a>'
                break
              case 'onlineschool':
                switch (linkobj.oneinlineschool){
                  case 'summary':
                    if(linkobj.newschoolactive == '1'){
                      pulldownhtnl += '<a href="/introduce.html">'+pulldowndata[i].name+'</a>'
                    }else{
                      pulldownhtnl += '<a target="_blank" href="/introduce.html">'+pulldowndata[i].name+'</a>'
                    }
                    break
                  case 'course':
                    if(linkobj.newschoolactive == '1'){
                      pulldownhtnl += '<a href="/platform.html">'+pulldowndata[i].name+'</a>'
                    }else{
                      pulldownhtnl += '<a target="_blank" href="/platform.html">'+pulldowndata[i].name+'</a>'
                    }
                    break
                  case 'contact':
                    if(linkobj.newschoolactive == '1'){
                      pulldownhtnl += '<a href="/contacts.html">'+pulldowndata[i].name+'</a>'
                    }else{
                      pulldownhtnl += '<a target="_blank" href="/contacts.html">'+pulldowndata[i].name+'</a>'
                    }
                    break
                  case 'register':
                    pulldownhtnl += '<a class="registerEvent" >'+pulldowndata[i].name+'</a>'
                    break
                  case 'password':
                    pulldownhtnl += '<a href="/forget.html">'+pulldowndata[i].name+'</a>'
                    break
                  case 'username':
                    pulldownhtnl += '<a class="getUserNameEvent">'+pulldowndata[i].name+'</a>'
                    break
                  case 'login':
                    pulldownhtnl += '<a class="loginEvent">'+pulldowndata[i].name+'</a>'
                    break
                  case 'login1':
                    pulldownhtnl += '<a class="loginEvent">'+pulldowndata[i].name+'</a>'
                    break
                  case 'QQ':
                    pulldownhtnl += '<a href="http://www.ebh.net/otherlogin/qq.html?returnurl="'+ origin+'>'+pulldowndata[i].name+'</a>'
                    break
                  case 'weibo':
                    pulldownhtnl += '<a href="http://www.ebh.net/otherlogin/sina.html?returnurl="'+ origin+'>'+pulldowndata[i].name+'</a>'
                    break
                  case 'WeChat':
                    pulldownhtnl += '<a href="http://www.ebh.net/otherlogin/wx.html?returnurl="'+ origin+'>'+pulldowndata[i].name+'</a>'
                    break
                  case 'index':
                    if(linkobj.newschoolactive == '1'){
                      pulldownhtnl += '<a href="'+ pulldowndata[i].url+'">'+pulldowndata[i].name+'</a>'
                    }else{
                      pulldownhtnl += '<a target="_blank" href="'+ pulldowndata[i].url+'">'+pulldowndata[i].name+'</a>'
                    }
                    break
                }
                break
            }
          }
        }
        let html = '<div class="pulldown_position"><div class="triangle-up"></div><div class="pulldown_list">'+pulldownhtnl+'</div></div>'
        $('.on_module .pulldown_position').remove()
        //$('.on_module .up_downhover').remove()
        $('.on_module').append(html)
        let len = $('.on_module .pulldown_position .pulldown_list a').length
        let top = '-'+(len*28+2) + 'px'
        $('.on_module .pulldown_position').css('bottom',top)
        let str = JSON.stringify(pulldowndata)
        $('.on_module .pulldown_position').attr('pulldownData', str)
        //let icon_up_down = '<span class="up_downhover" style="margin-left: 2px"><i class="el-icon-arrow-up"></i><i class="el-icon-arrow-down"></i></span>'
        //$('.on_module a').eq(0).append(icon_up_down)
        //$('.on_module a .el-icon-arrow-up').hide()
        //self.me.up_downhover('.editBox .button')
      }else{
        $('.on_module .pulldown_position').remove()
        //$('.on_module .up_downhover').remove()
      }
      self.dialogpulldown = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-dialog--pulldown .el-dialog{
    width: 660px;
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
</style>
