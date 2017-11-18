<template>
  <div class="Canvas">
    <el-dialog
      title="模块特效"
      :visible.sync="dialogCanvas"
      size="Canvas">
      <el-row :gutter="40">
        <el-col :span="8"><div>1</div></el-col>
        <el-col :span="8"><div>2</div></el-col>
        <el-col :span="8"><div>3</div></el-col>
        <el-col :span="8"><div>4</div></el-col>
        <el-col :span="8"><div>5</div></el-col>
        <el-col :span="8"><div>6</div></el-col>
        <el-col :span="8"><div>7</div></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Canvas',
  data () {
    return {
     dialogCanvas:false
    }
  },
  created: function () {
    let self = this    
      
  },
  methods: { 
    show: function () {
      let self = this 
      self.dialogcanvas = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
