var tool = {
  init: function (self, $) { // 函数初始化
    let me = this
    me.$ = $
    me.doc = me.$(document)
    me.mod = me.$('.tl_mod')
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
    me.libLi = me.$('.lib_li')
    me.editBox = me.$('.editBox')
    me.copyBox = me.$('.copyBox')
    me.copyCon = me.$('.copyCon')
    me.topRangeY = parseInt(me.top.css('height')) + self.paddingtop + self.postop // top选区范围
    me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY // body选区范围
    me.bindEvent(self)
  },
  carryLineEvent: function (self, show) { // 计算参考线函数
    let me = this
    me.rowT.css('top', self.inp_y + self.postop + me.warp)
    me.rowB.css('top', self.inp_y + self.postop + self.inp_h + me.warp)
    me.colL.css('left', self.inp_x + self.posleft)
    me.colR.css('left', self.inp_x + self.posleft + self.inp_w)
    if (!show) {
      me.line.show()
    }
  }, 
  carrySignEvent: function (self, element){ // 标记模块并属性初始化
    let me = this
    let resize = '<div class="resize nw"></div><div class="resize sw"></div><div class="resize ne"></div><div class="resize se"></div>' +
                  '<div class="resize e"></div><div class="resize n"></div><div class="resize w"></div><div class="resize s"></div>'
    me.$('.on_module').removeClass('on_module')
    me.$('.resize').remove()
    element.addClass('on_module')
    element.append(resize)
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
    self.disabled = false
    me.mod.removeClass('tl_li_Disable')
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
    me.$('.resize').remove()
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
    self.disabled = true
    me.mod.addClass('tl_li_Disable')
  },
  bindEvent: function (self) { // 绑定选中模块绑定事件事件
    let me = this

    me.editBox.on('mousedown', '.resize', function (e) { // 选中小圆点按钮拉伸容器事件
      let $this = me.$(this)
      let parent = $this.parent()
      let x = e.pageX
      let y = e.pageY
      let xs = self.inp_x
      let ys = self.inp_y
      let ws = self.inp_w
      let hs = self.inp_h
      let warp = me.warp
      let areaB = self.moduleParentElementHeight
      let areaR = parseInt(self.inp_width)
      me.carryLineEvent(self)
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
        me.carryLineEvent(self)
        return false
      })
      me.editBox.mouseup(function (e) {
        me.editBox.unbind('mousemove mouseup')
        me.line.hide()
      })
      return false
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
      me.carryLineEvent(self)
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
        me.carryLineEvent(self, true)
        return false
      })
      me.editBox.mouseup(function () {
        me.editBox.unbind('mousemove mouseup')
        me.line.hide()
        me.$('.touch_module').removeClass('touch_module')
        self.tool.getLayerElement(self, $this.parent())
        return false
      })
    })

    me.editBox.on('click', function (e) { // 点击模块之外时，还原默认值

      me.cleanSignEvent(self)      
    })

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
      e.preventDefault()
      if (len > 0) {
        let key = keyObj[e.key]
        if (key) {
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
            self.tool.getLayerElement(self, module.parent())
          }
          return false
        }
        if (e.key === 'Delete') {
          let original = module.parent()
          module.remove()
          self.tool.getLayerElement(self, original)
        }
      }             
    })

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

    me.libLi.mousedown(function (e) { // 左边模块库鼠标拖动事件 todo:
      let modType = me.$(this).attr('dataHtml')
      let dataCon = self.datahtml[modType]
      me.copyBox.attr('style', dataCon.style)
      me.copyCon.html(dataCon.html)
      me.copyBox.show().css({'top': e.pageY, 'left': self.paddingleft})
      me.editBox.unbind('mouseup')
      me.editBox.mousemove(function (e) {
        me.copyBox.css({'top': e.pageY, 'left': e.pageX})
      })
      self.tool.linePosition(me.editBox, me.copyBox, self, e)
      me.editBox.mouseup(function (e) {
        me.editBox.unbind('mousemove mouseup')
        let box
        let x
        let y
        let sTop = parseInt(me.space.scrollTop())
        let sLeft = parseInt(me.space.scrollLeft())
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
        me.copyBox.hide()
        me.line.hide()
        box.append(me.copyCon.html())
        let bChild = box.children('.module')
        bChild.eq(bChild.length - 1).css({'top': y, 'left': x})
        self.tool.getLayerElement(self, box)
      })
      return false
    })
  }
}

exports.tool = tool