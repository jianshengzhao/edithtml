<template>
  <div id="layers">  
    <div class="tabs-ul">
      <div class="tabs-li curr-li">页头</div>
      <div class="tabs-li">主体</div>
      <div class="tabs-li">页尾</div>
    </div>   
    <div class="lib_ol elementHead">
      <div class="ele_li" v-for="(item, index) in elementHead" :dataIndex="index">
        <span>{{item.text}}</span>
        <span :dataIndex="index" class="deleteLayer" title="删除">×</span>
      </div>
    </div>
    <div class="lib_ol elementMain">
      <div class="ele_li" v-for="(item, index) in elementMain" :dataIndex="index">
        <span>{{item.text}}</span>
        <span :dataIndex="index" class="deleteLayer" title="删除">×</span>
      </div>
    </div> 
    <div class="lib_ol elementTail">
      <div class="ele_li" v-for="(item, index) in elementTail" :dataIndex="index">
        <span>{{item.text}}</span>
        <span :dataIndex="index" class="deleteLayer" title="删除">×</span>
      </div>
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
      let tabsLl = $('.tabs-ul').find('.tabs-li')
      let libOl = $('#layers').find('.lib_ol')
      let elementHead = $('.elementHead')
      let elementMain = $('.elementMain')
      let elementTail = $('.elementTail')
      tabsLl.on('click', function () { // 收缩header栏
        let $this = me.$(this)
        $('.curr-li').removeClass('curr-li')
        $this.addClass('curr-li')
        libOl.hide()
        switch($this.text()) {
          case '页头':
            elementHead.show()            
          break;
          case '主体':
            elementMain.show()           
          break;
          case '页尾':
            elementTail.show()           
          break;
        }       
      })
      me.rShrink.on('click', function () { // 隐藏右边栏
        if (me.rShrink.hasClass('shrinkout')) {
          me.rShrink.removeClass('shrinkout')
          me.layer.addClass('layerHide')
          if (me.lShrink.hasClass('shrinkout')) {
            me.editBox.css('paddingRight', '5px')
            me.$('.waiter').css('right', '5px')
          } else {
            me.editBox.css('paddingRight', '100px')
            me.$('.waiter').css('right', '100px')
          }
        } else {
          me.rShrink.addClass('shrinkout')
          me.layer.removeClass('layerHide')
          if (me.lShrink.hasClass('shrinkout')) {
            me.editBox.css('paddingRight', '150px')
            me.$('.waiter').css('right', '150px')
          } else {
            me.editBox.css('paddingRight', '245px')
            me.$('.waiter').css('right', '245px')
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
    background-color: #f6f7f7;
  }
  #layers .lib_ol{
    display: none;
  }
   #layers .elementHead{
    display: block;
   }
  .layer .lib_ol .ele_li:nth-child(1){
    border-top:0;
  }
  .layer .lib_ol{
    text-indent: 12px;
  }
  .tabs-ul{
    width: 100%;
    height: 28px;
    line-height: 28px;
  }
  .tabs-ul .tabs-li{
    float: left;
    width: 33.3%;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d5d5d5;
  }
  .tabs-ul .tabs-li.curr-li{
    background-color: #f6f7f7;
    border-right: 1px solid #d5d5d5;
    border-bottom: 0px;
  }
  .tabs-ul .curr-li.tabs-li:nth-child(2){
    border-left: 1px solid #d5d5d5;
  }
  .tabs-ul .curr-li.tabs-li:nth-child(3){
    border-left: 1px solid #d5d5d5;
    border-right: 0px;
  }
  .layer .lib_ol .ele_li{
    cursor: pointer;
    height: 24px;
    line-height: 24px;
    background-color: #f6f7f7;
    border-bottom: 1px solid #e4e4e4;
  }
  .layer .lib_ol .ele_li:hover{
    background-color: #eee;
  }   
  .layer .lib_ol {
    border: 0;
  }
</style>
