<template>
  <div id="course">
    <el-dialog
      :title="title"
      :visible.sync="dialogCourse"
      size="course" 
      @close="beforeCloseEvent">
      <el-row>
        <el-col :span="4" class="right">单行显示：</el-col>
        <el-col :span="18">
          <el-input-number size="small" v-model="col_num" :min="1" :max="2"></el-input-number>个
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="right">行数：</el-col>
        <el-col :span="18">
          <el-input-number size="small" v-model="row_num" :min="1" :max="10"></el-input-number>行
        </el-col>       
      </el-row>
      <el-row v-if="type != 'teacher'">
        <el-col :span="4" class="right">附加信息：</el-col>
        <el-col :span="4">          
          <el-checkbox v-model="checkedTeacher" >讲师</el-checkbox>
        </el-col>
        <el-col :span="4" v-if="type == 'course'">
          <el-checkbox v-model="checkedTime">学时</el-checkbox>
        </el-col>
        <el-col :span="4">
          <el-checkbox v-model="checkedPopul">人气</el-checkbox>
        </el-col>
        <el-col :span="4" v-if="type == 'course'">
          <el-checkbox v-model="checkedPrice">价格</el-checkbox>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogCourse = false">取 消</el-button>
        <el-button type="primary" @click="dialogCourseEvent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'course',
  data () {
    return {
      title:'',
      col_num:2,
      row_num:2,
      type:'',
      dialogCourse: false,
      checkedTeacher: true,
      checkedTime:true,
      checkedPopul:true,
      checkedPrice:true
    }
  },
  created: function () {
    let self = this
    let moduleData = self.$parent.moduleData
    // 注入左侧图标
    moduleData['toallGroup']['online'].push({
      name: 'course',
      icon: 'imgicon icon-course',
      text: '课程'
    })

    moduleData['toallGroup']['online'].push({
      name: 'audition',
      icon: 'imgicon icon-audition',
      text: '试听'
    })

    moduleData['toallGroup']['online'].push({
      name: 'teacher',
      icon: 'imgicon icon-teacher',
      text: '教师'
    })
    // 配置模块参数   
    moduleData['course'] = {
      style: 'width:4.4rem; height:4rem',
      tool: {
        private: {
          text: '编辑课程',
          class: 'st-course'
        }, 
        public: []
      },
      createEvent: function (self, element, me) {      
        self.$refs.course.show(self, element, me, 'course')      
      },
      html: '<div class="course module addmodule" datatext="课程"><div class="editAdd"><div class="add-icon"></div></div></div>'
    }
    moduleData['audition'] = {
      style: 'width:4.4rem; height:3.6rem',
      tool: {
        private: {
          text: '编辑试听',
          class: 'st-audition'
        }, 
        public: []
      },
      createEvent: function (self, element, me) {      
        self.$refs.course.show(self, element, me, 'audition')      
      },
      html: '<div class="audition module addmodule"  datatext="免费试听"><div class="editAdd"><div class="add-icon"></div></div></div>'
    }
    moduleData['teacher'] = {
      style: 'width:4.4rem; height:5.73rem',
      tool: {
        private: {
          text: '编辑教师',
          class: 'st-teacher'
        }, 
        public: []
      },
      createEvent: function (self, element, me) {      
        self.$refs.course.show(self, element, me, 'teacher')      
      },
      html: '<div class="teacher module addmodule"  datatext="教师"><div class="editAdd"><div class="add-icon"></div></div></div>'
    }
  },
  methods: {     
    dialogCourseEvent: function () {
      let self = this
      self.dialogCourse = false
      let parentBox = self.element.parent()
      let x = 15
      let y = parseInt(self.element.css('top'))    
      let copyNum = self.row_num * self.col_num
      let copyhtml = '' 
      let w
      let h
      let ml
      let mt 
      let htmFun 
      let revealData = {}
      let revealStr = ''
      switch (self.type) {
        case 'course':
          w = 165
          h = 151          
          ml = 15
          mt = 10
          revealData = {
            checkedTeacher: true,
            checkedTime: true,
            checkedPopul: true,
            checkedPrice: true
          }
          if (!self.checkedTeacher) {
            revealData.checkedTeacher = false
          }
          if (!self.checkedTime) {
            revealData.checkedTime = false
          }
          if (!self.checkedPopul) {
            revealData.checkedPopul = false
          }
          if (!self.checkedPrice) {
            revealData.checkedPrice = false
          }
          revealStr = window.JSON.stringify(revealData)
          self.element.attr('dataarray', revealStr)
          htmFun = function (x,y) {
            let html = '<div class="course module addmodule" datatext="课程" dataarray="' + revealStr + '" style="left:' + (x / 37.5) + 'rem;top:' + (y / 37.5) + 'rem"><div class="editAdd"><div class="add-icon"></div></div></div>'
            return html
          }
          break
        case 'audition':
          w = 165
          h = 135          
          ml = 15
          mt = 10
           revealData = {
            checkedTeacher: true,
            checkedPopul: true
          }
          if (!self.checkedTeacher) {
            revealData.checkedTeacher = false
          }
          if (!self.checkedPopul) {
            revealData.checkedPopul = false
          }
          revealStr = window.JSON.stringify(revealData)
          self.element.attr('dataarray', revealStr)
          htmFun = function (x,y) {
            let html = '<div class="audition module addmodule"  datatext="免费试听"  dataarray="' + revealStr + '" style="left:' + (x / 37.5) + 'rem;top:' + (y / 37.5) + 'rem"><div class="editAdd"><div class="add-icon"></div></div></div>'
            return html
          }
          break
        case 'teacher':
          w = 165
          h = 215          
          ml = 15
          mt = 10
          htmFun = function (x,y) {
            let html = '<div class="teacher module addmodule"  datatext="教师" style="left:' + (x / 37.5) + 'rem;top:' + (y / 37.5) + 'rem;"><div class="editAdd"><div class="add-icon"></div></div></div>'
            return html
          }
          break          
      } 
      for (let i = 1; i < copyNum; i++) {
        let xi = x + (w + ml) * (i % self.col_num)
        let yi = y + (h + mt) * parseInt(i / self.col_num)
        copyhtml += htmFun(xi, yi)
      }
      parentBox.append(copyhtml)      
      let copyElement = parentBox.children('.addmodule')
      for (let i = 1; i < copyNum; i++) {
        let xi = x + (w + ml) * (i % self.col_num)
        let yi = y + (h + mt) * parseInt(i / self.col_num)
        let AddElement = copyElement.eq(i - 1)
        self.me.carryAddElementStorageEvent(self.that, parentBox, AddElement, yi, xi, 0)
      }    
      $('.addmodule').removeClass('addmodule')      
      self.element.css('left', '0.4rem').show()
      self.addstate = true
      self.that.tool.tool.carryLayerEvent(self.that, parentBox) // 更新图层
    },
    show: function (that, element, me, type) {
      let self = this
      self.that = that
      self.element = element
      self.element.hide()
      self.me = me
      self.addstate = false
      switch (type) {
        case 'course':
          self.title = '课程'
          self.col_num = 2
          self.row_num = 2
          self.checkedTeacher = true
          self.checkedTime = true
          self.checkedPopul = true
          self.checkedPrice = true
          break
        case 'audition':
          self.title = '试听'
          self.col_num = 2
          self.row_num = 2
          self.checkedTeacher = true
          self.checkedPopul = true
          break
        case 'teacher':
          self.title = '教师'
          self.col_num = 2
          self.row_num = 2
          break
      }
      self.type = type
      self.dialogCourse = true
    },
    beforeCloseEvent: function () {
      let self = this      
      if (!self.addstate) {
        let parent = self.element.parent()
        self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, 'delete') // 更新选区
        self.element.remove()        
        self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
      }
    }
  }
}
</script>
<style>
  .el-dialog--course {
    width: 500px;
  }
  #course .el-row {
    margin-bottom: 20px;
  }
  #course .el-col {
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
  } 
  #course .el-input-number{
    margin-right: 5px;
  }
  #course .right {
    text-align: right;
  }
  #course .el-dialog__header{
    border-bottom: 1px solid #CECECE;
    height: 30px;
  }
  #course .el-dialog__body{
    padding: 20px 30px 10px;
  }
  .course .resize, .audition .resize, .teacher .resize{
    display: none;
  }
 /* .course .w,.course .e{
    display: block;
  }*/
</style>
