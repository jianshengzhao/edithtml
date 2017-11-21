<template>
  <div id="footernav">   
    <el-dialog
      :title="title"
      :visible.sync="dialogFooterNav"
      size="course" 
      @close="beforeCloseEvent">
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogFooterNav = false">取 消</el-button>
        <el-button type="primary" @click="dialogFooterEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'footernav',
  data () {
    return {
      dialogFooterNav: false
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['online'].push({
      name: 'footernav',
      icon: 'imgicon icon-menubar',
      text: '底部导航'
    })
    // 配置模块参数   
    moduleData['footernav'] = {
      style: 'width:10rem; height:1.5rem',
      tool: {
        private: {
          text: '',
          class: ''
        }, 
        public: []
      },
      createEvent: function (self, element, me) {      
        self.$refs.footernav.show(self, element, me)      
      },
      html: '<div class="footernav module addmodule"  datatext="竖线"><div class="click-sline"></div></div>'
    }
  },
  methods: {
    show: function (self, element, me) {

    },
    dialogFooterEvent: function () {

    },
    beforeCloseEvent: function () {
      
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .footernav{
    left:50%!important;
    top: 696px!important;
    margin-left: -216px;
  }
  .spaceon .footernav{
    top: 729px!important;
  }
  .footernav .resize{
    display: none;
  }

</style>
