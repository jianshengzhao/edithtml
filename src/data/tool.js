var tool = {
  init: function (self, $) { // 函数初始化
    let me = this
    me.$ = $
    me.doc = me.$(document)
    me.mod = me.$('.tl_mod')
    me.brmod = me.$('.br-mod')
    me.top = me.$('.c_top')
    me.body = me.$('.c_body')
    me.foot = me.$('.c_foot')
    me.rowT = me.$('.row-t')
    me.rowB = me.$('.row-b')
    me.colL = me.$('.col-l')
    me.colR = me.$('.col-r')
    me.line = me.$('.line')
    me.editBox = me.$('.editBox')
    me.space = me.$('.space')
    me.canvas = me.$('.canvas')
    me.contextmenu = me.$('.contextmenu')
    me.contextmenu.hide()
    me.library = me.$('.library')
    me.lHeader = me.library.find('.header')
    me.lShrink = me.$('.libshrink')
    me.editBox = me.$('.editBox')
    me.copyBox = me.$('.copyBox')
    me.copyCon = me.$('.copyCon')
    me.topRangeY = parseInt(me.top.css('height')) + self.paddingtop + self.postop // top选区范围
    me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY // body选区范围
    me.layer = me.$('.layer')
    me.rShrink = me.layer.find('.shrink')
    me.rHeader = me.layer.find('.header')
    me.elementHead = me.$('.elementHead')
    me.elementMain = me.$('.elementMain')
    me.elementTail = me.$('.elementTail')
    me.basicBox = me.$('.basicBox')
    me.onlineBox = me.$('.onlineBox')
    me.todoBox = me.$('.todoBox')
    me.carryMenuEvent(self)
    me.carryLineHeightEvent()
    me.libBox = me.$('.lib_box')
    me.libLi = me.libBox.find('.lib_li')
    me.bindEvent(self)
  },
  carryLineHeightEvent: function () { // 计算竖向参考线高度
    let me = this
    let scrollHeight = me.space[0].scrollHeight
    me.colL.css('height', scrollHeight)
    me.colR.css('height', scrollHeight)
  },
  carryOutsideLineEvent: function (self, e) { // 画布之外的参考线
    let me = this
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
  },
  carryLineEvent: function (self, show) { // 计算参考线函数
    let me = this
    me.rowT.css('top', self.inp_y + self.postop + me.warp)
    me.rowB.css('top', self.inp_y + self.postop + self.inp_h + me.warp - 1)
    me.colL.css('left', self.inp_x + self.posleft)
    me.colR.css('left', self.inp_x + self.posleft + self.inp_w - 1)
    if (!show) {
      me.line.show()
    }
  }, 
  carrySignEvent: function (self, element) { // 标记模块并属性初始化
    let me = this
    let w = element.css('width')
    let h = element.css('height')
    let b = element.css('borderWidth')
    let cName = element.attr('class').split(' ')[0]
    let thtml = ''
    let tool = self.datahtml[cName].tool
    let toolClass = self.datahtml['supendTools']
    if (tool.private !=='') {
      thtml += '<li class="st-text">' + tool.private + '</li>'
    }
    for (let i = 0, len = tool.public.length; i < len; i ++) {
      thtml += '<li class="' + toolClass[tool.public[i]] + '"></li>'
    }    
    let resizeBox = '<div class="supendTools">' + thtml + '</div>' +
                    '<div class="resizeBox" style="width:' + w + ';height:' + h + ';top: -' + b + ';left:-' + b + '">' +
                      '<div class="resize nw"></div>' +
                      '<div class="resize sw"></div>' +
                      '<div class="resize ne"></div>' +
                      '<div class="resize se"></div>' +
                      '<div class="resize e"></div>' +
                      '<div class="resize n"></div>' +
                      '<div class="resize w"></div>' +
                      '<div class="resize s"></div>' +
                    '</div>'
    me.$('.on_module').removeClass('on_module')
    me.$('.resizeBox').remove()
    me.$('.supendTools').remove()
    element.addClass('on_module')
    element.append(resizeBox)
    self.moduleElement = element
    self.moduleParentElementHeight = parseInt(element.parent().css('height'))
    self.inp_z = parseInt(element.css('zIndex')) || 0
    self.inp_x = parseInt(element.css('left'))
    self.inp_y = parseInt(element.css('top'))
    self.inp_w = parseInt(element.css('width'))
    self.inp_h = parseInt(element.css('height'))
    self.inp_size = parseInt(element.css('fontSize'))
    self.inp_line = parseInt(element.css('lineHeight'))
    self.color_font = element.css('color')
    self.color_bg = element.css('backgroundColor')
    self.br_width = element.css('borderWidth')
    self.br_style = element.css('borderStyle')
    self.br_color = element.css('borderColor')
    self.disabled = false
    me.mod.removeClass('tl_li_Disable')
    me.brmod.removeClass('br-disable')   
    switch (self.moduleElement.parent().attr('class')) {
      case 'c_top':
        me.warp = 0
        break
      case 'c_body':
        me.warp = parseInt(me.top.css('height'))
        break
      case 'c_foot':
        me.warp = parseInt(me.top.css('height')) + parseInt(me.body.css('height'))
        break
    } 
  },
  cleanSignEvent: function (self) { // 标记模块并属性还原默认值
    let me = this
    me.$('.resizeBox').remove()
    me.$('.supendTools').remove()
    me.$('.on_module').removeClass('on_module')
    me.$('.module').parent().unbind('mousemove') // 待定
    // me.$('.module').unbind('mouseup')
    me.$('.touch_module').removeClass('touch_module')
    self.moduleElement = false
    self.inp_z = ''
    self.inp_x = ''
    self.inp_y = ''
    self.inp_w = ''
    self.inp_h = ''
    self.inp_size = ''
    self.inp_line = ''
    self.color_font = '#333'
    self.color_bg = '#fff'
    self.br_color = ''
    self.disabled = true
    me.mod.addClass('tl_li_Disable')
    me.brmod.addClass('br-disable') 
  },
  carryMenuEvent: function (self) { // 渲染模块菜单
    let me = this
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
  },
  carryLayerEvent: function (self, parent) { // 更新元素图层
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
  },
  bindEvent: function (self) { // 绑定选中模块绑定事件事件
    let me = this
  // ------------- 操作模块事件 ----------------
    me.editBox.on('mousedown', '.resize', function (e) { // 选中小圆点按钮拉伸容器事件
      let $this = me.$(this)
      let resizeBox = me.$('.resizeBox')
      let parent = self.moduleElement
      let x = e.pageX
      let y = e.pageY
      let xs = self.inp_x
      let ys = self.inp_y
      let ws = self.inp_w
      let hs = self.inp_h
      let warp = me.warp
      let areaB = self.moduleParentElementHeight
      let areaR = parseInt(self.inp_width)
     // me.carryLineEvent(self)
      let part
      switch ($this.attr('class')) {
        case 'resize e':
          part = function (e) {
            let xx = self.inp_x + self.posleft + ws + e.pageX - x
            self.inp_w = ws + e.pageX - x
            if (self.config.stretchLimit) {
              if (xx > areaR + self.posleft) {
                xx = areaR + self.posleft
                self.inp_w = areaR - xs
              }
            }
            if (xx < xs + self.posleft) {
              xx = xs + self.posleft
              self.inp_w = 0
            }
            parent.css('width', self.inp_w)
          }
          break
        case 'resize s':
          part = function (e) {
            let yy = ys + self.postop + warp + hs + e.pageY - y
            self.inp_h = hs + e.pageY - y
            if (self.config.stretchLimit) {
              if ((self.inp_h + self.inp_y) > areaB) {
                yy = areaB + warp + self.postop
                self.inp_h = areaB - self.inp_y
              }
            }
            if (yy < ys + self.postop + warp) {
              yy = ys + self.postop + warp
              self.inp_h = 0
            }
            parent.css('height', self.inp_h)
          }
          break
        case 'resize w':
          part = function (e) {
            let xx = xs - x + e.pageX + self.posleft
            self.inp_x = xs - x + e.pageX
            self.inp_w = ws + x - e.pageX
            if (self.config.stretchLimit) {
              if (xx < self.posleft) {
                xx = self.posleft
                self.inp_w = ws + xs
                self.inp_x = 0
              }
            }
            if (xx > (xs + ws + self.posleft)) {
              xx = xs + ws + self.posleft
              self.inp_w = 0
              self.inp_x = xs + ws
            }
            parent.css({'width': self.inp_w, 'left': self.inp_x})
          }
          break
        case 'resize n':
          part = function (e) {
            let yy = ys - y + e.pageY + warp + self.postop
            self.inp_y = ys - y + e.pageY
            self.inp_h = hs + y - e.pageY
            if (self.config.stretchLimit) {
              if (yy < self.postop + warp) {
                yy = self.postop + warp
                self.inp_y = 0
                self.inp_h = hs + ys
              }
            }
            if (yy > ys + hs + self.postop + warp) {
              yy = ys + hs + self.postop + warp
              self.inp_y = ys + hs
              self.inp_h = 0
            }
            parent.css({'height': self.inp_h, 'top': self.inp_y})
          }
          break
        case 'resize ne':
          part = function (e) {
            let yy = ys - y + e.pageY + warp + self.postop
            let xx = self.inp_x + self.posleft + ws + e.pageX - x
            self.inp_y = ys - y + e.pageY
            self.inp_w = ws + e.pageX - x
            self.inp_h = hs + y - e.pageY
            if (self.config.stretchLimit) {
              if (yy < self.postop + warp) {
                yy = self.postop + warp
                self.inp_y = 0
                self.inp_h = hs + ys
              }
              if (xx > areaR + self.posleft) {
                xx = areaR + self.posleft
                self.inp_w = areaR - self.inp_x
              }
            }
            if (xx < xs + self.posleft) {
              xx = xs + self.posleft
              self.inp_w = 0
            }
            if (yy > ys + hs + self.postop + warp) {
              yy = ys + hs + self.postop + warp
              self.inp_y = ys + hs
              self.inp_h = 0
            }
            parent.css({'height': self.inp_h, 'width': self.inp_w, 'top': self.inp_y})
          }
          break
        case 'resize nw':
          part = function (e) {
            let yy = ys - y + e.pageY + warp + self.postop
            let xx = xs - x + e.pageX + self.posleft
            self.inp_y = ys - y + e.pageY
            self.inp_x = xs - x + e.pageX
            self.inp_h = hs + y - e.pageY
            self.inp_w = ws + x - e.pageX
            if (self.config.stretchLimit) {
              if (yy < self.postop + warp) {
                yy = self.postop + warp
                self.inp_y = 0
                self.inp_h = hs + ys
              }
              if (xx < self.posleft) {
                xx = self.posleft
                self.inp_w = ws + xs
                self.inp_x = 0
              }
            }
            if (yy > ys + hs + self.postop + warp) {
              yy = ys + hs + self.postop + warp
              self.inp_y = ys + hs
              self.inp_h = 0
            }
            if (xx > (xs + ws + self.posleft)) {
              xx = xs + ws + self.posleft
              self.inp_w = 0
              self.inp_x = xs + ws
            }
            parent.css({'height': self.inp_h, 'top': self.inp_y, 'width': self.inp_w, 'left': self.inp_x})
          }
          break
        case 'resize se':
          part = function (e) {
            let yy = self.inp_y + self.postop + warp + hs + e.pageY - y
            let xx = self.inp_x + self.posleft + ws + e.pageX - x
            self.inp_w = ws + e.pageX - x
            self.inp_h = hs + e.pageY - y
            if (self.config.stretchLimit) {
              if ((self.inp_h + self.inp_y) > areaB) {
                yy = areaB + warp + self.postop
                self.inp_h = areaB - self.inp_y
              }
              if (xx > areaR + self.posleft) {
                xx = areaR + self.posleft
                self.inp_w = areaR - self.inp_x
              }
            }
            if (yy < ys + self.postop + warp) {
              yy = ys + self.postop + warp
              self.inp_h = 0
            }
            if (xx < self.inp_x + self.posleft) {
              xx = self.inp_x + self.posleft
              self.inp_w = 0
            }
            parent.css({'width': self.inp_w, 'height': self.inp_h})
          }
          break
        case 'resize sw':
          part = function (e) {
            let yy = self.inp_y + self.postop + hs + e.pageY - y + warp
            let xx = xs - x + e.pageX + self.posleft
            self.inp_x = xs - x + e.pageX
            self.inp_h = hs + e.pageY - y
            self.inp_w = ws + x - e.pageX
            if (self.config.stretchLimit) {
              if ((self.inp_h + self.inp_y) > areaB) {
                yy = areaB + warp + self.postop
                self.inp_h = areaB - ys
              }
              if (xx < self.posleft) {
                xx = self.posleft
                self.inp_w = ws + xs
                self.inp_x = 0
              }
            }
            if (yy < ys + self.postop + warp) {
              yy = ys + self.postop + warp
              self.inp_h = 0
            }
            if (xx > (xs + ws + self.posleft)) {
              xx = xs + ws + self.posleft
              self.inp_w = 0
              self.inp_x = xs + ws
            }
            parent.css({'width': self.inp_w, 'height': self.inp_h, 'left': self.inp_x})
          }
          break
      }
      // todo: 拉伸某容器固定显示内容
      me.editBox.mousemove(function (e) {
        part(e)
        resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        // me.carryLineEvent(self)
        return false
      })
      me.editBox.mouseup(function (e) {
        me.editBox.unbind('mousemove mouseup')
        me.line.hide()
      })
      return false
    })

    me.editBox.on('click', '.st-link', function (e) {
      self.$refs.hrefdialogp.show()
    })
    
    me.editBox.on('click', '.module', function (e) { // 点击选中模块事件
      let $this = me.$(this)
      me.carrySignEvent(self, $this)
      return false
    })

    me.editBox.on('mousedown', '.on_module', function (e) { // 选中模块移动事件
      let x = e.pageX
      let y = e.pageY
      let xs = self.inp_x
      let ys = self.inp_y
      let areaB = self.moduleParentElementHeight
      let areaR = self.inp_width
      let $this = me.$(this)
      let sTop = parseInt(me.space.scrollTop())
      // me.carryLineEvent(self)
      me.editBox.mousemove(function (e) {
        let left = xs + e.pageX - x
        let top = ys + e.pageY - y
        if (self.config.moveLimit) {
          if (left < 0) {
            left = 0
          }
          if (left > (areaR - self.inp_w)) {
            left = areaR - self.inp_w
          }
          if (top < 0) {
            top = 0
          }
          if (top > (parseInt(areaB) - self.inp_h)) {
            top = parseInt(areaB) - self.inp_h
          }
        }
        self.inp_x = left
        self.inp_y = top
        $this.css('left', left)
        $this.css('top', top)
        // me.carryLineEvent(self, true)
        return false
      })
      me.editBox.mouseup(function () {
        me.editBox.unbind('mousemove mouseup')
        me.line.hide()
        me.$('.touch_module').removeClass('touch_module')
        me.carryLayerEvent(self, $this.parent())
        return false
      })
    })

    me.editBox.on('click', function (e) { // 点击模块之外时，还原默认值

      me.cleanSignEvent(self)      
    })
  // ------------- 键盘按下事件 ----------------
    me.doc.unbind('keydown')
    me.doc.keydown(function (e) { // 键盘方向键微调移动模块事件
      if (!self.moduleElement) return false
      let module = self.moduleElement 
      let len = module.length
      let keyObj = {
        'ArrowUp': [true, 'top', -1, 'inp_y'],
        'ArrowDown': [true, 'top', 1, 'inp_y'],
        'ArrowLeft': [true, 'left', -1, 'inp_x'],
        'ArrowRight': [true, 'left', 1, 'inp_x']
      }
      if (len > 0) {
        let key = keyObj[e.key]
        if (key) {
          e.preventDefault()
          let moveXY = parseInt(module.css(key[1])) + key[2]
          if (self.config.moveLimit && moveXY < 0) {
            moveXY = 0
          }
          let maxMoveXY = key[1] === 'top' ? parseInt(module.parent().css('height')) - self.inp_h : self.inp_width - self.inp_w
          if (self.config.moveLimit && moveXY > maxMoveXY) {
            moveXY = maxMoveXY
          }
          self[key[3]] = moveXY
          module.css(key[1], moveXY)
          self.tool.getAlignmentElement(self) // todo:
          if (new Date() - self.preHandleTime > 1000) {
            self.preHandleTime = new Date()
            me.carryLayerEvent(self, module.parent())
          }
          return false
        }
        if (e.key === 'Delete') {
          let original = module.parent()
          module.remove()
          me.carryLayerEvent(self, original)
        }
      }             
    })
  // ------------- 右键菜单栏 ------------------
    me.canvas.bind('contextmenu', function () { // 清除canvas原有的contextmenu事件

      return false
    })
    me.contextmenu.bind('contextmenu click', function () { // 清除contextmenu原有的contextmenu click事件

      return false
    })
    me.canvas.mousedown(function (e) { // 右键唤出菜单
      me.contextmenu.hide()
      if (e.which === 3) {
        let module
        if (me.$(e.target).hasClass('module')) {
          module = me.$(e.target)
        } else {
          module = me.$(e.target).parents('.module')
        }
        if (module.length > 0) {
          if (!module.hasClass('on_module')) {
            me.carrySignEvent(self, module)
            module.addClass('on_module')
          }
          self.rightButton = true
        } else {
          self.rightButton = false
        }
        me.contextmenu.css({'top': e.pageY, left: e.pageX})
        me.contextmenu.show()
        return false
      }
    })
  // ------------- 页头页尾调整 ----------------
    me.top.on('mousedown', '.hoverbar', function (e) { // top容器调整
      let y = e.pageY
      let h = parseInt(me.top.css('height'))
      me.canvas.mousemove(function (e) {
        let hs = h + (e.pageY - y)
        me.top.css('height', hs)
        me.canvas.css('paddingTop', hs)
        me.topRangeY = hs + self.paddingtop + self.postop
        me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY
      })
      me.canvas.mouseup(function () {
        me.canvas.unbind('mousemove mouseup')
      })
    })

    me.foot.on('mousedown', '.hoverbar', function (e) { // foot容器调整
      let y = e.pageY
      let h = parseInt(me.foot.css('height'))
      me.canvas.mousemove(function (e) {
        hs = h + (y - e.pageY)
        me.foot.css('height', hs)
        me.canvas.css('paddingBottom', hs)
        me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY
      })
      me.canvas.mouseup(function () {
        me.canvas.unbind('mousemove mouseup')
      })
    })
  // ------------- 左边模块库 ------------------
    me.libLi.mousedown(function (e) { // 左边模块库鼠标拖动事件 todo:
      me.lShrink.hide()
      let modType = me.$(this).attr('dataHtml')
      let dataCon = self.datahtml[modType]
      me.copyBox.attr('style', dataCon.style)
      me.copyCon.html(dataCon.html)
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
      me.editBox.mouseup(function (e) {
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
        let sTop = parseInt(me.space.scrollTop()) // 滚动条距顶部高度
        let sLeft = parseInt(me.space.scrollLeft()) // 滚动条距右边
        x = e.pageX - self.paddingleft - self.posleft + sLeft
        me.topRangeY = parseInt(me.top.css('height')) + self.paddingtop + self.postop
        me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY
        if (e.pageY + sTop < me.topRangeY) {
          box = me.top
          y = e.pageY + sTop - self.paddingtop - self.postop
        } else if (e.pageY + sTop < me.bodyRangeY) {
          box = me.body
          y = e.pageY + sTop - me.topRangeY
        } else {
          box = me.foot
          y = e.pageY + sTop - me.bodyRangeY
        }
        if (self.config.moveLimit) {
          if (x < 0) {
            x = 0
          }
          let boxLeft = self.inp_width - parseInt(me.copyBox.css('width'))
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
        box.append(me.copyCon.html())
        let bChild = box.children('.module')
        bChild.eq(bChild.length - 1).css({'top': y, 'left': x})
        me.carryLayerEvent(self, box)
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
      } else {
        $next.css('height', h + 'px')
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
        self.paddingleft = 133
        me.lShrink.css('left','133px')
      } else {
        me.lShrink.addClass('shrinkout')
        me.library.addClass('basic')
        me.editBox.css('marginLeft', '5px')
        me.lShrink.css('left','5px')
        self.paddingleft = 5
      }
    })
  // ------------- 右侧图层栏 ------------------
    me.rHeader.on('click', function () { // 收缩header栏
      let $next = me.$(this).next()
      let len = $next.children().length
      let h = 25 * len
      if ($next.css('height') === '1px') {
        $next.css('height', h + 'px')
      } else {
        $next.css('height', h + 'px')
        setTimeout(function () {
          $next.css('height', '0px')
        }, 0)
      }
    })
    me.rShrink.on('click', function () { // 隐藏右边栏
      if (me.rShrink.hasClass('shrinkout')) {
        me.rShrink.removeClass('shrinkout')
        me.layer.addClass('layerHide')
        me.editBox.css('paddingRight', '133px')
      } else {
        me.rShrink.addClass('shrinkout')
        me.layer.removeClass('layerHide')
        me.editBox.css('paddingRight', '314px')
      }
    })
    me.elementHead.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementHead[index].ele
      me.carrySignEvent(self, ele)
    })
    me.elementMain.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementMain[index].ele
      me.carrySignEvent(self, ele)
    })
    me.elementTail.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementTail[index].ele
      me.carrySignEvent(self, ele)
    })
  // ------------- 模块双击设置 ----------------
    me.editBox.on('dblclick', '.on_module', function (e) { // 模块双击操作
      let onthis = self.moduleElement
      let type = onthis.attr('class').split(' ')[0]
      self.tool.switchModuleEvent(type, onthis, self)
    })
    me.editBox.on('click', '.promptBox', function (e) { // 设置按钮事件
      let onthis = me.$(this).parent()
      let type = onthis.attr('class').split(' ')[0]
      self.tool.switchModuleEvent(type, onthis, self)
    })
  }
}

exports.tool = tool