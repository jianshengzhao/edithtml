<template>
  <div class="courseurl">
    <el-dialog
      title="设置链接"
      :visible.sync="dialogcourseurl"
      :close-on-click-modal="false"
      size="hrefs">
      <el-tabs type="border-card">
        <el-tab-pane label="用户管理"><div>用户管理</div></el-tab-pane>
        <el-tab-pane label="配置管理"><div>121</div>配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button>重 置</el-button>
        <el-button type="primary" @click="dialogEvent" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'courseurl',
    data: function () {
      return {
        dialogcourseurl: false
      }
    },
    created: function() {
    },
    methods:{
      show: function () {
        let self = this
        self.dialogcourseurl = true
      },
      dialogEvent:function () {
        
      }
    }
  }
</script>
<style>
  .courseurl{
    height: 100%;
    width: 100%;
  }
  .courseurl *{
    font-size: 14px;
  }
  .courseurl .el-dialog--hrefs{
    width: 1000px;
   
  }
  .hrefdialog .el-dialog--hrefs .el-dialog__body{
    padding: 5px 0px; 
  }
 .hrefdialog .tabs-vertical{
    background-color: #fff;
    /* box-shadow: 0 0 22px #E2E2E2 inset, 2px 2px 3px #E8E8E8; */
    border: 1px solid #CECECE;
    border-right:none;
    border-left:none;
    margin: 20px auto 10px;
    border-radius: 2px;
    height: 552px;
    color: #333333;
 }
 .hrefdialog .tabs-vertical .mbx{
    width: 100%;
    height: 41px;
    border-bottom: 1px solid #CECECE;
    text-align: left;
    line-height: 41px;
    padding-left: 15px;
    display:block;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
    box-sizing:border-box;
  }
  .hrefdialog .tabs-vertical .mbx a{
    cursor: pointer;
    display: inline-block;
    max-width: 160px;
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;    
    float: left;

  }
  .hrefdialog .tabs-vertical .mbx a:hover{
    text-decoration: none;
    color: #20a0ff;
  }
  .hrefdialog .tabs-vertical .coursembx a{
    max-width: 160px;
  } 
  .hrefdialog .tabs-vertical .mbx span{
    display: inline-block;
    float: left;
  }

  .hrefdialog .tabs-vertical .newscont,.hrefdialog .tabs-vertical .inlineschoolcont,.hrefdialog .tabs-vertical .teacont,.hrefdialog .tabs-vertical .coursecont,.hrefdialog .tabs-vertical .hrefcont{
    padding: 20px 15px;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio,.hrefdialog .tabs-vertical .coursecont .courseradio{
    width: 20%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
   .hrefdialog .tabs-vertical .newscont .newsradio a,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio a,.hrefdialog .tabs-vertical .coursecont .courseradio a{
    width:110px;
    height:65px;
    text-align:center;
    overflow:hidden;
    display: inline-block;
    background:#F2F2F2;
    margin-left: 20px;
    cursor: pointer;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio input ,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio input,.hrefdialog .tabs-vertical .coursecont .courseradio input{
    position: absolute;
    top: 36%;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio a span ,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio  a span,.hrefdialog .tabs-vertical .coursecont .courseradio a span{
    display:inline-block;
    vertical-align:middle;
  }
  .hrefdialog .threeselnews,.hrefdialog .twoselnews{
    display: none;
  }
  .hrefdialog .threeselnews .el-radio-group .el-radio{
    margin-left: 0px;
    width: 880px;
    height: 48px;
    line-height: 48px;
    border-bottom:1px solid #d9d9d9;
    text-indent: 5px
  }
  .hrefdialog .threeselnews .el-radio-group .el-radio:last-child{
    border-bottom: none ;
  }
  .hrefdialog .threeselnews .el-radio-group .el-radio .el-radio__input{
    display: inline-flex;
    float: left;
    margin-top: 15px;
    margin-left: 10px;
  }
  .hrefdialog .vc-font2 .vc-fix{display:inline-block;width:0;height:100%;line-height:100%;vertical-align:middle;visibility: hidden;}
  .hrefdialog .teacherlist{
    width: 16.5%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog .teacherlist input{
    position: absolute;
    top: 36%;
  }
  .hrefdialog .teacherlist a{
    width: 100px;
    height: 100px;
    text-align: center;
    overflow: hidden;
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
  }
  .hrefdialog .teacherlist a img{
    width: 60px;
    height: 60px;
    border-radius: 50%
  }
  .hrefdialog .teacherlist a h3{
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .hrefdialog .courselist{
    width: 20%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog  .courselist input{
    position: absolute;
    left: 20px;
    top: 28%;
  }
  .hrefdialog  .courselist a{
    width: 120px;
    height: 100px;
    text-align: center;
    overflow: hidden;
    display: inline-block;
    margin-left: 40px;
    cursor: pointer;
    /* border:1px solid #fff; */
  }
  .hrefdialog  .courselist a:hover{
    text-decoration: none;
  }
  .hrefdialog  .courselist a img{
    width: 110px;
    height: 65px;
  }
  .hrefdialog  .courselist a h3{
    display:inline-block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;  
  }
  .hrefdialog .courselist a h3{
    max-width: 120px;
  }
  .hrefdialog  .courselist a h3.coursetitle{
    max-width: 84px;
  }
  
  
/* The tabs */

.hrefdialog .tabs-vertical ul.tabsul{
    float: left;
    list-style: none;
    text-align: left;
    margin: 0;
    padding-left: 0;
    height: 100%;
    border-right: 1px solid #CECECE;
}

.hrefdialog .tabs-vertical ul.tabsul li{
    /* margin-right: -1px; */
    border-bottom: 1px solid #CECECE;
}

.hrefdialog .tabs-vertical ul.tabsul li a{
    display: block;
    text-decoration: none;
    color: #656a6d;
    border: 1px solid transparent;
    border-right: 0;
    border-left: 0;
    width: 88px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}

.hrefdialog .tabs-vertical ul.tabsul li a.tab-active {
   background-color: #f3f3f3;
   /*  border-color: #dddddd;
   background-color: #ffffff;
   box-shadow: 0px 2px 0px #EFEFEF; */
}

.hrefdialog .tabs-vertical ul.tabsul li:first-child a{
    border-top: 0;
}

/* The content */

.hrefdialog .tabs-vertical .tabs-content-placeholder{
    overflow: hidden;
    font-weight: normal;
    background-color: #fff;
    /* margin: 0 auto; */
    /* box-shadow: -3px 0 0px #F3F3F3; */
    height: 100%
}

.hrefdialog .tabs-vertical .tabs-content-placeholder div.tab-content{   
    display: none;
}
.hrefdialog .tabs-vertical .tabs-content-placeholder div.tab-content-href{
  padding: 30px 25px;
  box-sizing: border-box;
}
.hrefdialog .tabs-vertical .tabs-content-placeholder div.tab-content-active{
    display: block;
    height: 100%;
}

.hrefdialog .tabs-vertical .tabs-content-placeholder div p{
    color: #565a5c;
    line-height: 1.5;
    text-align: left;
    margin: 5px 0 20px;
}

.hrefdialog .tabs-vertical .tabs-content-placeholder div img{
    max-width: 100%;
    margin-top:5px; 
}
.hrefdialog .el-dialog__body{
  padding: 5px 10px
}
.hrefdialog .vc-font2:hover{
  border:1px solid red;
  box-sizing: border-box;
}
.hrefdialog .teacherlist .vc-font2{
  padding-top: 5px;
  box-sizing: border-box;
  height: 100px;
}
</style>