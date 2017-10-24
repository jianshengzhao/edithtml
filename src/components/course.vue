<template>
  <div id="course">
    <el-dialog
      title="课程"
      :visible.sync="dialogCourse"
      size="course" >
      <el-row>
        <el-col :span="4" class="right">单行显示：</el-col>
        <el-col :span="18">
          <el-input-number size="small" v-model="col_num" :min="1" :max="8"></el-input-number>个<span>（建议最大值不超过4个）</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="right">行数：</el-col>
        <el-col :span="18">
          <el-input-number size="small" v-model="row_num" :min="1" :max="10"></el-input-number>行
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
      col_num:1,
      row_num:1,
      dialogCourse: false
    }
  },
  created: function () {
    // let self = this 
  },
  methods: {     
    dialogCourseEvent: function () {
      let self = this
      self.dialogCourse = false
      let parentBox = self.element.parent()
      let x = parseInt(self.element.css('left'))
      let y = parseInt(self.element.css('top'))    
      let copyNum = self.row_num * self.col_num
      let copyhtml = ''      
      for (let i = 1; i < copyNum; i++) {
        let xi = x + (260 + 30) * (i % self.col_num)
        let yi = y + (220 + 20) * parseInt(i / self.col_num)
        copyhtml += '<div class="course module addmodule" datatext="课程" style="top:' + yi + 'px;left:' + xi + 'px;"><div class="editCourse">+</div></div>'
      }
      parentBox.append(copyhtml)      
      let copyElement = parentBox.children('.addmodule')
      for (let i = 1; i < copyNum; i++) {
        let xi = x + (260 + 30) * (i % self.col_num)
        let yi = y + (220 + 20) * parseInt(i / self.col_num)
        let AddElement = copyElement.eq(i - 1)
        self.me.carryAddElementStorageEvent(self.that, parentBox, AddElement, yi, xi, 0)
      }
      $('.addmodule').removeClass('addmodule')
      // <div class="imgbox"><div class="listBox"><a target="_blank" class="animateBox">课程</a><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><a target="_blank" class="openState openState_djbmbg1"></a></div></div><div class="courseTit">课程名称</div><div class="speak">讲师</div><div class="popularity">6999</div><div class="number">199</div>
    },
    show: function (that, element, me) {
      let self = this
      self.that = that
      self.element = element
      self.me = me
      self.dialogCourse = true
      // me.carryAddElementStorageEvent(self, box, AddElement, y, x, marginT)
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
  #course .el-col span{
    color: #999;
  }
  #course .el-input-number{
    margin-right: 5px;
  }
  #course .right {
    text-align: right;
  }
  #course .el-dialog__body{
    padding: 20px 30px 10px;
  }
</style>
