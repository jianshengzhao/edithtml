
  // 渲染左侧组件视图
  exports.renderLibrary = function (self, me) {
    let group = self.moduleData.toallGroup
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

  // 绑定左侧组件视图绑定事件
  exports.bindEvents = function (self, me) {
    me.libLi.mousedown(function (e) { // 左侧组件视图鼠标拖动事件 
      me.cleanSignEvent(self)
      me.lShrink.hide()
      let that = me.$(this)
      let modType = me.$(this).attr('dataHtml')
      let dataCon = self.moduleData[modType]
      
      if(that.hasClass("onlyone")){ //只能添加一个模块
        me.libLi.unbind('mousemove mouseup')
        return false;
      }
      
      me.copyBox.attr('style', dataCon.style)
      me.copyBox.show().css({'top': e.pageY, 'left': e.pageX - self.paddingleft})
      me.editBox.unbind('mouseup') // editBox解除mouseup事件
        
      me.editBox.mousemove(function (e) { // editBox鼠标移动事件
        me.copyBox.css({'top': e.pageY, 'left': e.pageX - self.paddingleft})
      })

      me.libBox.mousemove(function (e) { // libLi鼠标移动事件
        me.copyBox.css({'top': e.pageY, 'left': e.pageX - self.paddingleft})
      })

      me.libBox.mouseup(function (e) { // libLi鼠标解除mouseup事件
        me.libLi.unbind(' mouseup')
        me.libBox.unbind('mousemove ')
        me.editBox.unbind('mousemove mouseup')
        me.copyBox.hide()
        me.lShrink.show()
      })
      // me.carryOutsideLineEvent(self, e) // 辅助线
      me.editBox.mouseup(function (e) { // 鼠标松开事件 // wap todo:
        me.lShrink.show()
        me.editBox.unbind('mousemove mouseup')
        me.libLi.unbind('mousemove mouseup')
        me.copyBox.hide()
        if (e.pageX < self.paddingleft) { // 判断是否在绘制区域以外的
          return false
        }
        let box
        let x
        let y
        let sTop = parseInt(me.canvas.scrollTop()) // 滚动条距顶部高度
        let canvasLeft = me.canvas[0].offsetLeft
        let canvasTop = me.canvas[0].offsetTop
        x = e.pageX - self.paddingleft - canvasLeft
        y = e.pageY + sTop - self.paddingtop - canvasTop
        box = me.top
        if (self.config.moveLimit) {
          if (x < 0) {
            x = 0
          }
          let boxLeft = 375 - parseInt(me.copyBox.css('width'))
          if (x > boxLeft) {
            x = boxLeft
          }
          if (y < 0) {
            y = 0
          }
          let boxTop = parseInt(box.css('height')) - parseInt(me.copyBox.css('height'))
          if (y > boxTop) {
            y = boxTop
          }
        }
        box.append(dataCon.html)
        let AddElement = box.children('.addmodule') 
        let marginT = 0
        if (dataCon.moduleMargin) {
          marginT = dataCon.moduleMargin
        } 
        for (let i = 0,len = AddElement.length; i < len; i++) {
          let yg = y + i * marginT
          AddElement.eq(i).css({'top': yg / 37.5 + 'rem', 'left': x / 37.5 + 'rem'})
        }
        me.$('.addmodule').removeClass('addmodule')
        if (dataCon.createEvent) {
          dataCon.createEvent(self, AddElement, me)
        } 
        me.carryAddElementStorageEvent(self, box, AddElement, y, x, marginT) // 区域存储
        me.carryLayerEvent(self, box) // 更新图层
      })
      return false
    }) 

    me.lHeader.on('click', function () {
      let $next = me.$(this).next()
      let len = $next.children().length
      let num = parseInt(len / 2) + len % 2
      let h = 66 * num      
      if ($next.css('height') === '0px') {
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
        me.editBox.css('paddingRight', '314px')
        self.paddingleft = 133
        me.lShrink.css('left','133px')
      } else {
        me.lShrink.addClass('shrinkout')
        me.library.addClass('basic')
        me.editBox.css('marginLeft', '5px')
        me.editBox.css('paddingRight', '186px')
        me.lShrink.css('left','5px')
        self.paddingleft = 5
      }
    })
  }