<template>
  <div id="layers">
    <div class="header layerhead">页头 <i class="el-icon-caret-bottom"></i></div>
    <div class="lib_ol elementHead">
      <div class="ele_li" v-for="(item, index) in elementHead" :dataIndex="index"><span>{{item.text}}</span> <span :dataIndex="index" class="deleteLayer" title="删除">×</span></div>
    </div>
    <div class="header layerhead" >主体 <i class="el-icon-caret-bottom"></i></div>
    <div class="lib_ol elementMain">
      <div class="ele_li" v-for="(item, index) in elementMain" :dataIndex="index"><span>{{item.text}}</span> <span :dataIndex="index" class="deleteLayer" title="删除">×</span></div>
    </div>
    <div class="header layerhead">页尾 <i class="el-icon-caret-bottom"></i></div>
    <div class="lib_ol elementTail">
      <div class="ele_li" v-for="(item, index) in elementTail" :dataIndex="index"><span>{{item.text}}</span> <span :dataIndex="index" class="deleteLayer" title="删除">×</span></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'layers',
  props: {   
    // 默认颜色
    elementHead: {
      type: Array,
      default: []
    },
    // 禁用状态
    elementMain: {
      type: Array,
      default: []
    },
    // 禁用状态
    elementTail: {
      type: Array,
      default: []
    }
  },
  data () {
    return {}
  },
  created: function () {
    let self = this
    self.$nextTick(function () {      
      let me = self.$parent.tool
      me.rHeader.on('click', function () { // 收缩header栏
      let $next = me.$(this).next()
      let len = $next.children().length
      let h = 25 * len
      if ($next.css('height') === '1px') {
        $next.css('height', h + 'px')
        me.$(this).removeClass('closeiR')
      } else {
        $next.css('height', h + 'px')
        me.$(this).addClass('closeiR')
        setTimeout(function () {
          $next.css('height', '0px')
        }, 0)
      }
    })
    me.rShrink.on('click', function () { // 隐藏右边栏
      if (me.rShrink.hasClass('shrinkout')) {
        me.rShrink.removeClass('shrinkout')
        me.layer.addClass('layerHide')
        if (me.lShrink.hasClass('shrinkout')) {
          me.editBox.css('paddingRight', '0px')
        } else {
          me.editBox.css('paddingRight', '133px')
        }
      } else {
        me.rShrink.addClass('shrinkout')
        me.layer.removeClass('layerHide')
        if (me.lShrink.hasClass('shrinkout')) {
          me.editBox.css('paddingRight', '0px')
        } else {
          me.editBox.css('paddingRight', '308px')
        }
      }
    })
    me.elementHead.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementHead[index].ele
      me.$('.on_module').parent().css('outline', '0')
      me.carrySignEvent(self.$parent, ele)
    })
    me.elementHead.on('click', '.deleteLayer', function (e) {
      let index = me.$(this).attr('dataIndex')
      if (self.elementHead[index].text == '客服') {
        me.$('.waiter').remove()
      }
      self.elementHead[index].ele.remove()
      self.elementHead.splice(index,1)
      return false
      // me.carrySignEvent(self, ele) waiter
    })
    me.elementMain.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementMain[index].ele
      me.$('.on_module').parent().css('outline', '0')
      me.carrySignEvent(self.$parent, ele)
    })
    me.elementMain.on('click', '.deleteLayer', function (e) {
      let index = me.$(this).attr('dataIndex')
      if (self.elementMain[index].text == '客服') {
        me.$('.waiter').remove()
      }
      self.elementMain[index].ele.remove()
      self.elementMain.splice(index,1)
      return false
      // me.carrySignEvent(self, ele)
    })
    me.elementTail.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementTail[index].ele
      me.$('.on_module').parent().css('outline', '0')
      me.carrySignEvent(self.$parent, ele)
    })
    me.elementTail.on('click', '.deleteLayer', function (e) {
      let index = me.$(this).attr('dataIndex')
      if (self.elementTail[index].text == '客服') {
        me.$('.waiter').remove()
      }
      self.elementTail[index].ele.remove()
      self.elementTail.splice(index,1)
      return false
      // me.carrySignEvent(self, ele)
    })
    })      
  },
  methods: { 
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

   #layers{
    overflow-y:auto;
    overflow-x: hidden;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 532px;
   }
   .layer .lib_ol .ele_li:nth-child(1){
    border-top:0;
   }
</style>
