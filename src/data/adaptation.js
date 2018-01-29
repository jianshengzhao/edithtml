// ----------------- 工具栏 -----------------------------------------
  exports.resizeToolBar = function (self, me) { // top工具栏排版  
    me.$(window).resize(function() {

    })
  }
  exports.toolSliderEvent = function (self, me) { // top Slider 事件
    let thumb = me.$('.scroll-thumb')
    let sliderbar = me.$('.sliderbar')
    thumb.on('mousedown', function (e) {
      let x = e.pageX
      let opacity = self.inp_opacity
      sliderbar.mousemove(function (e) {
        let movex = e.pageX - x
        let opacityVal = opacity + movex 
        if (opacityVal > 100) {
          opacityVal = 100
        } else if (opacityVal < 0) {
          opacityVal = 0
        }
        me.carryModuleOperationEvent(self, 'opacity', opacityVal)
        self.inp_opacity = opacityVal     
      })
      sliderbar.mouseup(function (e) {
        sliderbar.unbind('mousemove mouseup')
      })
    })
  }
// ----------------- 模块菜单 ---------------------------------------
  exports.renderMenu = function (self, me) {  // 渲染模块菜单
    let group = self.datahtml.toallGroup
    let bhtm = ''
    let ohtm = ''
    let thtm = ''
    for (let i = 0, len = group.basic.length; i < len; i++) {
      let item = group.basic[i]
      bhtm += '<div class="lib_li" dataHtml="' + item.name + '"><i class="' + item.icon + '"></i><span>' + item.text + '</span></div>'
    }
    for (let i = 0, len = group.online.length; i < len; i++) {
      let item = group.online[i]
      ohtm += '<div class="lib_li" dataHtml="' + item.name + '"><i class="' + item.icon + '"></i><span>' + item.text + '</span></div>'
    }
    for (let i = 0, len = group.todo.length; i < len; i++) {
      let item = group.todo[i]
      thtm += '<div class="lib_li" dataHtml="' + item.name + '"><i class="' + item.icon + '"></i><span>' + item.text + '</span></div>'
    }
    me.basicBox.html(bhtm)
    me.onlineBox.html(ohtm)
    me.todoBox.html(thtm)
  }
// ----------------- 参考虚线 ---------------------------------------
  exports.computeLineHeight = function (me) { // 计算竖向参考线高度    
    let scrollHeight = me.space[0].scrollHeight
    me.colL.css('height', scrollHeight)
    me.colR.css('height', scrollHeight)   
  }

  exports.computeLinePosition = function (self, me, show) {  // 计算参考线位置函数   
    me.rowT.css('top', self.inp_y + self.postop + me.warp)
    me.rowB.css('top', self.inp_y + self.postop + self.inp_h + me.warp - 1)
    me.colL.css('left', self.inp_x + self.posleft)
    me.colR.css('left', self.inp_x + self.posleft + self.inp_w - 1)
    if (!show) {
      me.line.show()
    }
  }

  exports.computeOutsideLine = function (self, e, me) {  // 画布之外的参考线 
    let sTop = parseInt(me.space.scrollTop()) // 当前滚动条高度
    let sLeft = parseInt(me.space.scrollLeft())
    let w = parseInt(me.copyBox.css('width'))
    let h = parseInt(me.copyBox.css('height'))
    me.rowT.css('top', e.pageY + sTop - self.paddingtop)
    me.rowB.css('top', e.pageY + sTop - self.paddingtop + h)
    me.colL.css('left', 0 + sLeft)
    me.colR.css('left', w + sLeft)
    me.line.show()
    me.editBox.mousemove(function (e) {
      sTop = parseInt(me.space.scrollTop())
      me.rowT.css('top', e.pageY + sTop - self.paddingtop)
      me.rowB.css('top', e.pageY + sTop - self.paddingtop + h)
      me.colL.css('left', e.pageX + sLeft - self.paddingleft)
      me.colR.css('left', e.pageX + sLeft - self.paddingleft + w)
    })
  }
// ----------------- 元素图层 ---------------------------------------
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
// ----------------- bindEvent ---------------------------------------
  exports.bindElDialogMousemoveEvent = function (me) { // 悬浮框鼠标拖拽事件
    me.doc.on('mousedown', '.el-dialog', function (e) {
      if (me.$(e.target).hasClass('el-dialog__header') || me.$(e.target).hasClass('el-dialog__title')) {
        let body = me.$('body')
        let elDialog = me.$(this)
        let eX = e.pageX
        let eY = e.pageY
        let edX = parseInt(elDialog.css('left'))
        let edY = parseInt(elDialog.css('top'))
        let edW = parseInt(elDialog.css('width'))
        let edH = parseInt(elDialog.css('height'))
        let bW = parseInt(body.css('width'))
        let bH = parseInt(body.css('height'))

        me.doc.mousemove(function (e) {
          let left = edX - (eX - e.pageX)          
          let top = edY - (eY - e.pageY)
          if (top < 0) { // 最小值
            top = 0
          }
          // if (left < -edW/2) {
          //   left = -edW/2
          // } else if ((left + edW/2) > bW) {
          //   left = bW - edW/2
          // }

          elDialog.css({'left': left, 'top': top})
        })

        me.doc.mouseup(function (e) {
          me.doc.unbind('mousemove mouseup')
        })
      }
    })
  }

  exports.bindHoverbarMousemoveEvent = function (self, me) { // 页头页尾调整
    me.top.on('mousedown', '.hoverbar', function (e) { // top容器调整
      let y = e.pageY
      let h = parseInt(me.top.css('height'))
      let tar = me.$(e.target)
      tar.attr('style','display:block')
      me.cleanSignEvent(self)
      me.canvas.mousemove(function (e) {
        let hs = h + (e.pageY - y)
        me.top.css('height', hs)
        me.canvas.css('paddingTop', hs)
        me.topRangeY = hs + self.paddingtop + self.postop
        me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY
      })
      me.canvas.mouseup(function () {
        tar.removeAttr('style')
        me.canvas.unbind('mousemove mouseup')
      })
      return false
    })

    me.foot.on('mousedown', '.hoverbar', function (e) { // foot容器调整
      let y = e.pageY
      let h = parseInt(me.foot.css('height'))
      let tar = me.$(e.target)
      tar.attr('style','display:block')
      me.cleanSignEvent(self)
      me.canvas.mousemove(function (e) {
        let hs = h + (y - e.pageY)
        me.foot.css('height', hs)
        me.canvas.css('paddingBottom', hs)
        me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY
      })
      me.canvas.mouseup(function () {
        tar.removeAttr('style')
        me.canvas.unbind('mousemove mouseup')
      })
      return false
    })
  }

  exports.bindMenuEvent = function (self, me) { // 左侧列表收缩事件
    me.lHeader.on('click', function () {
      let $next = me.$(this).next()
      let len = $next.children().length
      let num = parseInt(len / 2) + len % 2
      let h = 55 * num
      // let lib_ol = me.$('.lib_ol ')      
      if (parseInt($next.css('height')) < 2) {
        // lib_ol.css('height', '0px')
        $next.css('height', h + 'px')
        me.$(this).removeClass('closei')
      } else {
        $next.css('height', h + 'px')
        me.$(this).addClass('closei')
        setTimeout(function () {
          $next.css('height', '0px')
        }, 0)
      }
    })

    me.lShrink.on('click', function () {
      if (me.lShrink.hasClass('shrinkout')) {
        me.lShrink.removeClass('shrinkout')
        me.library.removeClass('basic')
        me.editBox.css('marginLeft', '')
        if(me.rShrink.hasClass('shrinkout')) {
          me.editBox.css('paddingRight', '245px')
          me.$('.waiter').css('right', '245px')
        }else {
          me.editBox.css('paddingRight', '100px')
          me.$('.waiter').css('right', '100px')
        }
        self.paddingleft = 100
        me.lShrink.css('left','99px')
      } else {
        me.lShrink.addClass('shrinkout')
        me.library.addClass('basic')
        me.editBox.css('marginLeft', '5px')
        if(me.rShrink.hasClass('shrinkout')) {
           me.editBox.css('paddingRight', '150px')
           me.$('.waiter').css('right', '150px')
        }else {
          me.editBox.css('paddingRight', '5px')
          me.$('.waiter').css('right', '5px')
        }       
        me.lShrink.css('left','4px')
        self.paddingleft = 5
      }
    })
  }

  exports.bindFontFamily = function (self, me) { // 字体列表
    // me.layer.on('click', '.family', function (e) {
    //   if (me.familyBox.css('display') == 'none') {
    //     me.familyBox.show()
    //   }   
    // })
    // me.familyBox.on('mouseleave',function () {
    //   me.familyBox.hide()
    // })
  }
  