  // 渲染右侧图层列表
  exports.renderLayer = function (self, parent) {
    let ele = parent.find('.module')
    let arr = []
    for (let i = 0, len = ele.length; i < len; i++) {
      let item = ele.eq(i)
      let text = item.attr('datatext')
      let obj = {
        x: parseInt(item.css('left')),
        y: parseInt(item.css('top')),
        x1: parseInt(item.css('left')) + parseInt(item.css('width')),
        y1: parseInt(item.css('top')) + parseInt(item.css('height')),
        ele: item,
        text: text
      }
      arr.push(obj)
    }
    switch (parent.attr('class')) {
      case 'c_top':
        self.elementHead = arr
        break
      case 'c_body':
        self.elementMain = arr
        break
      case 'c_foot':
        self.elementTail = arr
        break
    }
  }
  // 渲染右侧图层绑定事件
  exports.bindEvents = function (self, me) {
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
          me.editBox.css('paddingRight', '314px')
        }
      }
    })
    me.elementHead.on('click', '.ele_li', function (e) { // 选中模块
      let index = me.$(this).attr('dataIndex')
      let item = self.elementHead[index]
      let ele = item.ele 
      let scrTop = parseInt(ele.css('top')) - 200 < 0 ? 0 : parseInt(ele.css('top')) - 200
      me.canvas.animate({ scrollTop: scrTop }, 200)      
      if (me.ctrl) { // todo:
        me.$('.supendTools').remove()
        me.$('.resizeBox').remove()
        ele.addClass('on_module').append('<div class="multiBox" style="width:' + (item.xb - item.xt)+ 'px;height:' + (item.yb - item.yt) + 'px;top: -' + item.br + 'px;left:-' + item.br + 'px"></div>')
        me.carrySignMultiBoxEvent(self)  
      } else {
        me.carrySignEvent(self, ele)
      }
    })
    me.elementHead.on('click', '.deleteLayer', function (e) { // close 删除模块
      let index = me.$(this).attr('dataIndex') 
      if (self.elementHead[index].text == '客服') {
        me.$('.waiter').remove()
      }         
      self.elementHead[index].ele.remove()
      self.elementHead.splice(index,1)
      return false
      // me.carrySignEvent(self, ele) waiter 
    }) 
  }