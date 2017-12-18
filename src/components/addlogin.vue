<template>
  <div class="addlogin">
    <el-dialog
      title="编辑标签"
      :visible.sync="dialogaddlogin"
      size="addlogin">
      <el-row>
        <el-col>
          <span class="label">选择样式：</span>
        </el-col>
        <el-col>
          <div @click="selecttype('one')" :class="type == 'one'  && active == 1?'type_btn type_btn1 type_active':'type_btn type_btn1'">
            <div class="type_img">
              <div class="check"></div>
            </div>
            <p>样式一</p>
          </div>
          <div @click="selecttype('two')" :class="type == 'two' && active == 2?'type_btn type_btn2 type_active':'type_btn type_btn2'">
            <div class="type_img">
              <div class="check"></div>
            </div>
            <p>样式二</p>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogaddlogin = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'addlogin',
  components: {
  },
  data () {
    return {
      dialogaddlogin: false,
      type : 'one',
      active : 1,
    }
  },
  created: function () {
    let self = this
  },
  methods: {
    show: function (that, box, me,y,x) {
      let self = this
      self.that = that
      self.box = box
      self.me = me
      self.y = y
      self.x = x
      let type1on = $('.editBox div.username').is(':hidden') || $('.editBox div.password').is(':hidden') || $('.editBox div.loginbutton').is(':hidden')
      let type2on = $('.editBox div.LoginRegister').is(':hidden')
      if (type1on && type2on){
        self.active = 3
      }else if (!type1on && !type2on){
        self.active = 1
        self.type = 'one'
      } else if (type2on &&  !type1on){
        self.active = 2
        self.type = 'two'
      }else if(type1on && !type2on){
        self.active = 1
        self.type = 'one'
      }
      console.log(self.type)
      self.dialogaddlogin = true
    },
    selecttype: function (val) {
      let self = this
      self.type = val
    },
    handleClick() {
      let self = this
      self.dialogaddlogin = false
      $('.addmodule').removeClass('addmodule')
      self.element.show()

    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-dialog--addlogin{
    width: 420px;
  }
  .el-dialog--addlogin .el-col-24{
    margin-bottom: 10px;
  }
  .el-dialog--addlogin .label{
    font-size: 14px;
    color: #48576a;
    line-height: 28px;

  }
  .el-dialog--addlogin .type_btn{
    width: 130px;
    height: 105px;
    text-align: center;
    float: left;
    cursor: pointer;
  }
  .el-dialog--addlogin .type_btn1{
    margin:0 40px;
  }
  .el-dialog--addlogin .type_btn p{
    line-height: 28px;
  }
  .el-dialog--addlogin .type_btn .type_img{
    border: 1px solid #333333;
    width: 100%;
    height: 76px;
    line-height: 76px;
    position: relative;
  }
  .el-dialog--addlogin .type_btn1 .type_img{
    background: url(../assets/img/logintype1.jpg) no-repeat center;
  }
  .el-dialog--addlogin .type_btn2 .type_img{
    background: url(../assets/img/logintype2.jpg) no-repeat center;
  }
  .el-dialog--addlogin .type_btn:hover .type_img{
    border:1px solid #20A0FF;
  }
  .el-dialog--addlogin .type_active .type_img{
    border:1px solid #20A0FF;
  }
  .el-dialog--addlogin .type_btn1 .type_img span{
    margin: 0px 5px;
  }
  .el-dialog--addlogin .type_btn1 .type_img span.active{
    color:#20A0FF ;
  }
  .el-dialog--addlogin .type_btn2 .type_img span{
    margin: 0px 5px;
    padding: 2px 5px;
  }
  .el-dialog--addlogin .type_btn2 .type_img span.active{
    margin: 0px 5px;
    background: #20A0FF;
    color: #ffffff;
  }
  .el-dialog--addlogin .type_btn .type_img .check{
    position: absolute;
    bottom: 0px;
    right: 0px;
    width: 17px;
    height: 13px;
    background: url("http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png") no-repeat;
    display: none;
  }
  .el-dialog--addlogin .type_active .type_img .check{
    display: block;
  }
</style>
