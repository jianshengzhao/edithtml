
  exports.getSign = function (self, element, me) { // 标记模块并属性初始化
       
    let cName = element.attr('class').split(' ')[0]
    let eleConfig = self.datahtml[cName] 

    if (eleConfig.beforeSelecting) { // 选中元素节点时的回调函数
      eleConfig.beforeSelecting(self, element, me)
    }

    resizeBox(self, element, me, eleConfig) // 插入resizeBox 和 悬浮工具栏
  
    elementProperty(self, element, me) // 元素节点属性获取

    me.carryUpdateElementStorageEvent(self, element.parent(), element) // 更新临时存储
  }

  function resizeBox (self, element, me, eleConfig) {  // 插入resizeBox 和 悬浮工具栏
    let w = element.css('width')
    let h = element.css('height')
    let b = parseInt(element.css('border-left-width')) < 1 ? element.css('border-top-width') : element.css('border-left-width') 
    let thtml = ''
    let tool = eleConfig.tool
    let toolClass = self.datahtml['supendTools']

    if (tool.private.text !==''|| tool.public.length > 0) {
      thtml = '<div class="supendTools">'
      if (tool.private.text !=='') {
        thtml += '<li class="st-left ' + tool['private']['class'] + '">' + tool['private']['text'] + '</li>'
      }
      for (let i = 0, len = tool.public.length; i < len; i ++) {
        thtml += '<li class="' + toolClass[tool.public[i]][0] + '" title="' + toolClass[tool.public[i]][1] + '"></li>'
      }
      thtml += '</div>'
    }
    var resizeBox = ''    
    if (eleConfig.resize && eleConfig.resize.length > 0) {
      let resize = eleConfig.resize
      resizeBox += thtml + '<div class="resizeBox" style="width:' + w + ';height:' + h + ';top: -' + b + ';left:-' + b + '">'
      for (let i = 0, len = eleConfig.resize.length; i < len; i++) {
        let item = resize[i]
        resizeBox += '<div class="resize ' + item + '"></div>'
      }
      resizeBox += '</div>'
    } else {
      resizeBox += thtml
                + '<div class="resizeBox" style="width:' + w + ';height:' + h + ';top: -' + b + ';left:-' + b + '">'
                +   '<div class="resize nw"></div>'
                +   '<div class="resize sw"></div>'
                +   '<div class="resize ne"></div>'
                +   '<div class="resize se"></div>'
                +   '<div class="resize e"></div>'
                +   '<div class="resize n"></div>'
                +   '<div class="resize w"></div>'
                +   '<div class="resize s"></div>'
                + '</div>'
    }   
    me.$('.on_module').removeClass('on_module')
    me.$('.resizeBox').remove()
    me.$('.supendTools').remove()
    me.$('.multiBox').remove()
    element.addClass('on_module')
    element.append(resizeBox) 
  }

  function elementProperty (self, element, me) { // 元素节点属性获取
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
    self.br_width = parseInt(element.css('border-left-width')) || parseInt(element.css('border-top-width'))
    self.br_style = element.css('border-left-style')
    if(self.br_style =='none') {
      self.br_style = 'solid'
    }
    self.br_color = element.css('border-left-color')
    self.inp_opacity = parseInt(element.css('opacity') * 100)
    if (element.css('boxShadow') == 'none') {
      self.check_shadow = false
      self.inp_weight_x = ''
      self.inp_weight_y = ''
      self.inp_blur = ''
      self.bw_color = '#ccc'
    } else {
      let shadowArr = element.css('boxShadow').split(' ')
      self.check_shadow = true
      self.inp_weight_x = shadowArr[3].split('p')[0]
      self.inp_weight_y = shadowArr[4].split('p')[0]
      self.inp_blur = shadowArr[5].split('p')[0]
      self.bw_color = shadowArr[0] + shadowArr[1] + shadowArr[2]
    }
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
  }

  // -------------------- getSign ------------------------------  
  exports.cleanSign = function (self, me) { // 取消选中，清除默认值
    me.$('.resizeBox').remove()
    me.$('.supendTools').remove()
    let element = me.$('.on_module')    
    if (element.length) {
      let cName = element.attr('class').split(' ')[0]
      let eleConfig = self.datahtml[cName] 
      if (eleConfig.beforeSelecting) { // 选中元素节点时的回调函数
        eleConfig.cancelSelect(self, element, me)
        me.carryUpdateElementStorageEvent(self, element.parent(), element)
      }
    } 

    element.removeClass('on_module')
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
    self.color_font = '#fff'
    self.color_bg = '#fff'
    self.br_width = 0
    self.br_color = ''
    self.inp_opacity = ''
    self.disabled = true
    self.check_shadow = false
    self.inp_weight_x = '1'
    self.inp_weight_y = '1'
    self.inp_blur = '1'
    self.bw_color = '#ccc'
    me.mod.addClass('tl_li_Disable')
    me.brmod.addClass('br-disable')
    self.moduleElementY = false
    self.moduleElementX = false
  }
  // -------------------- bindEvent ----------------------------
  exports.bindResizeDrawingEvent =  function (self, me) {  // 选中小圆点按钮拉伸容器事件
    me.editBox.on('mousedown', '.resize', function (e) {
      let $this = me.$(this)
      let resizeBox = me.$('.resizeBox')
      let parent = me.$('.on_module')
      let cName = parent.attr('class').split(' ')[0]
      let eleConfig = self.datahtml[cName] 
      let x = e.pageX
      let y = e.pageY
      let xs = self.inp_x
      let ys = self.inp_y
      let ws = self.inp_w
      let hs = self.inp_h
      let warp = me.warp
      let areaB = self.moduleParentElementHeight
      let areaR = parseInt(self.inp_width)
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
            // if(ingbloo) {
            //   picimg.css('width', self.inp_w)
            // }
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
      me.editBox.mousemove(function (e) {
        part(e)               
        if (eleConfig.resizeMousemove) { // 拉伸时的回调       
          eleConfig.resizeMousemove(self, parent, resizeBox)
        } else {
          resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
        }     
        return false
      })
      me.editBox.mouseup(function (e) {
        me.editBox.unbind('mousemove mouseup')
        me.line.hide()
        me.carryUpdateElementStorageEvent(self, parent.parent(), parent)

        if (eleConfig.resizeMouseUp) { // 拉伸结束时的回调
          eleConfig.resizeMouseUp(self, parent, resizeBox)
        }        
      })
      return false
    }) 
  } 

  exports.bindSupendToolsEvent = function (self, me) { // 模块工具栏 :todolist
    me.editBox.on('mousedown', '.supendTools', function (e) {
      let el_dialog = me.$('.el-dialog')
      el_dialog.removeAttr('style').css('top', '15%')
      let classname = me.$(e.target).attr('class')
      switch (classname) {
        case 'st-left st-text':
          self.$refs.ueditor.show()
          break
        case 'st-left st-style':
          self.$refs.editbutton.show()
          break
        case 'st-link':
          self.$refs.hrefdialogp.show()
          break
        case 'st-left st-picture':
          self.$refs.myimages.show()
          break
        case 'st-animate':
          self.dialoganim()
          break
        case 'st-pulldown':
          self.$refs.pulldown.show(self, me.$('.on_module'), me)
          break
        case 'st-shape':
          self.$refs.shape.show()
          break
        case 'st-effects':
          self.$refs.suspend.show()
          break
        case 'st-prospect':
          self.$refs.effect.show()
          break
        case 'st-left st-logintext':
          self.dialogeditlogin()
          break
        case 'st-left st-carousel':
          self.$refs.carousel.show(self, me.$('.on_module'))
          break
        case 'st-left st-waiter':
          self.$refs.waiter.show(self, me.$('.on_module'))
          break
        case 'st-left st-advert':
          self.$refs.advert.show(self, me.$('.on_module'))
          break
        case 'st-left st-information':
          self.$refs.information.show(self, me.$('.on_module'), me)
          break
        case 'st-left st-weather':
          self.$refs.weather.show(self, me.$('.on_module'), me)
          break
        case 'st-left st-player':
          self.$refs.player.show(self, me.$('.on_module'), me)
          break
        case 'st-left st-course':
          self.$refs.hrefdialogp.show('course', me.$('.on_module'), function (element, data) {
            data.summary = data.summary || '--'
            data.foldername = data.foldername || '--'
            data.viewnum = data.viewnum || 0
            data.studynum = data.studynum || 0
            let courseHtm = '<div class="imgbox">'
                          + '<div class="listBox">'
                          + '<a target="_blank" class="animateBox" >'+ data.summary +'</a>'
                          + '<img src="'+ (data.cover || data.img) +'">'  //.replace('_247_147','')
                          + '<a target="_blank" class="openState openState_djbmbg1"></a>'
                          + '</div>'
                          + '</div>'
                          + '<div class="Titbox">'
                          + '<div class="courseTit">'+ data.foldername +'</div>'
                          + '<div class="speak">讲师</div>'
                          + '<div class="popularity">'+ data.viewnum+'</div>'
                          + '<div class="number">'+ data.studynum +'</div>'
                          + '</div>'
            element.attr('datacoruse', data.itemid)
            element.find('.editAdd').html(courseHtm)
          })
          break
        case 'st-left st-audition':
          self.$refs.hrefdialogp.show('coursecw', me.$('.on_module'), function (element, data) {
            let auditionHtm = '<a href ="/course/' + data.cwid + '.html" target="_blank"><img src="'+ (data.cover ||data.logo) +'"><div class="audiTit">'+ data.cwname +'</div></a>'
            element.attr('auditionid', data.cwid)
            element.find('.editAdd').html(auditionHtm)
          })
          break
        case 'st-left st-teacher':
          self.$refs.hrefdialogp.show('teacher', me.$('.on_module'), function (element, data) {
            data.profile = data.profile || '暂无简介'
            data.professionaltitle = data.professionaltitle || '暂无职称'
            let teacherHtm = '<div class="team_bk" tid="' + data.teauid + '"><a class="team_mask" href="/master/' + data.teauid + '.html" target="_blank">' + data.profile + '</a><a href="/master/' + data.teauid + '.html" target="_blank"><div class="team_hbj"><img src="' + data.face + '"><h3 class="team_h3">' + data.realname + '</h3><p class="team_p1">' + data.professionaltitle + '</p></div><p class="team_p2">' + data.profile + '</p></a></div>'
            element.find('.editAdd').html(teacherHtm)
          })
          break
        case 'st-left st-addcoursetype':
          self.$refs.addcoursetype.show(self, me.$('.on_module'), me)
          break
        case 'st-left st-tab':
          self.$refs.edittab.show(self, me.$('.on_module'), me)
          break
        case 'st-left st-search':
          self.$refs.addsearch.show(self, me.$('.on_module'), me)
          break
      }
      return false
    })
  }

  exports.bindModuleDblclickEvent = function (self, me) { // 模块双击事件 todolist:
    me.editBox.on('dblclick', '.resizeBox', function (e) {
      alert(0)
    })
  }

  exports.bindModuleAClickEvent = function (self, me) { // 去除a标签默认事件
    me.editBox.on('click', '.module a', function (e) {      
      e.preventDefault()
    })    
  }

  exports.bindOnModulesMousedownEvent = function (self, me) { // 选中模块拖拽事件
    me.editBox.on('click', '.module', function (e) { // 点击选中模块事件
      let $this = me.$(this)
      if(!$this.hasClass('on_module')) {
        me.carrySignEvent(self, $this)
        return false
      }
    })
    me.editBox.on('mousedown', '.on_module', function (e) {
      let x = e.pageX
      let y = e.pageY
      let xs = self.inp_x
      let ys = self.inp_y
      let parentClass = self.moduleElement.parent().attr('class')
      let id = self.moduleElement.attr('id')
      let height = self.inp_h
      let width = self.inp_w
      let supendTools = me.$('.supendTools')
      supendTools.hide()
      me.editBox.mousemove(function (e) {
        let left = xs + e.pageX - x
        let top = ys + e.pageY - y
        me.carryModuleOperationEvent(self, 'left', left)
        me.carryModuleOperationEvent(self, 'top', top)
        me.carryFuzzyCalibrationEvent(self, parentClass, id, left, top, height, width, self.moduleElement)
        return false
      })
      me.editBox.mouseup(function () {
        me.editBox.unbind('mousemove mouseup')
        me.$('.fuzzybox').remove()
        me.line.hide()
        supendTools.show()
        return false
      })
      // return false
    })
  }

  exports.bindEditBoxMousedownEvent = function (self, me) { // 点击模块之外时，还原默认值
    me.editBox.on('mousedown', function (e) { // 点击模块之外时，还原默认值
      self.mousePageX = e.pageX - self.paddingleft + me.space.scrollLeft() - parseInt(me.canvas.css('left'))
      self.mousePageY = e.pageY - self.paddingtop + me.space.scrollTop() - parseInt(me.canvas.css('top'))
      let target = me.$(e.target)
      if (!target.hasClass('resizeBox') && !target.hasClass('multiBox')) {
        me.cleanSignEvent(self) // 清除属性栏的值
        me.carryRegionChoiceEvent(self, e)  // 添加选区绘制原点
      }      
    })
  }

  exports.bindAddModuleMousedownEvent = function (self, me) { // 模块列表操作事件 // todolist: 模块增加魔块生成事件
    me.libLi.mousedown(function (e) {
      me.cleanSignEvent(self)
      me.lShrink.hide()
      let that = me.$(this)
      let modType = me.$(this).attr('dataHtml')
      let dataCon = self.datahtml[modType]
      let dlog = self.datahtml[modType].dlog || false
      if(that.hasClass("onlyone")){ //只能添加一个模块
        me.libLi.unbind('mousemove mouseup')
        return false;
      }

      me.copyBox.attr('style', dataCon.style)
      me.copyBox.show().css({'top': e.pageY, 'left': e.pageX - self.paddingleft})
      me.editBox.unbind('mouseup') // editBox解除mouseup事件

      me.editBox.mousemove(function (e) { // editBox鼠标移动事件        
        me.copyBox.css({'top': e.pageY + 1, 'left': e.pageX - self.paddingleft + 1})
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
      // adaptation.computeOutsideLine(self, e, me) // 辅助线
      me.editBox.mouseup(function (e) { // 鼠标松开事件        
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
        let boxcls
        let sTop = parseInt(me.space.scrollTop()) // 滚动条距顶部高度
        let sLeft = parseInt(me.space.scrollLeft()) // 滚动条距右边
        x = e.pageX - self.paddingleft - self.posleft + sLeft
        me.topRangeY = parseInt(me.top.css('height')) + self.paddingtop + self.postop
        me.bodyRangeY = parseInt(me.body.css('height')) + me.topRangeY
        if (e.pageY + sTop < me.topRangeY) {
          box = me.top
          boxcls = 'c_top'
          y = e.pageY + sTop - self.paddingtop - self.postop 
        } else if (e.pageY + sTop < me.bodyRangeY) {
          box = me.body
          boxcls = 'c_body'
          y = e.pageY + sTop - me.topRangeY         
        } else {
          box = me.foot
          boxcls = 'c_foot'
          y = e.pageY + sTop - me.bodyRangeY        
        }
        // 判断是否为容器       
        let target = me.$(e.target)
        let containers = target.parents('.module')
        for (let i = 0, len = containers.length; i < len; i++) {
          let item = containers.eq(i)
          let moduleName = item.attr('class').split(' ')[0]
          let itemData = self.datahtml[moduleName]
          if (itemData.container) {
            let ew = parseInt(me.copyBox.css('width'))
            let eh = parseInt(me.copyBox.css('height'))
            let suspendx = parseInt(item.css('left')) + itemData.containerOffsetTop.x
            let suspendy = parseInt(item.css('top')) + itemData.containerOffsetTop.y
            let suspendw = parseInt(item.css('width'))
            let suspendh = parseInt(item.css('height'))
            if (x >= suspendx  && y >= suspendy && suspendh > eh && suspendw> ew && (suspendy+suspendh)  >= (y+eh)){
              x = x - suspendx
              y = y - suspendy
              box = item.find(itemData.containerClass)              
              break
            }
          }          
        }       
        // 判断是否为容器
      // suspend模块只在top上
        if (modType == 'suspend'){
          y = 0
          box = me.top
        }

        if (modType == 'addtab' && (box.attr('class') == 'active cont' || box.attr('class') == 'cont active')){
          self.$notify({
            title: '警告',
            message: '标签页中不可插入标签页',
            type: 'warning'
          })
          return false
        }

        if (self.config.moveLimit) { // 是否限制绘制区域
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
        box.append(dataCon.html)
        // tab标签页内部元素移动问题
        if (box.attr('class') == 'active cont'){
          me.$('.tab .tab_content').attr('parent',boxcls)
        }else if (box.attr('class') == 'suspenddiv'){
          me.$('.suspend .suspenddiv').attr('parent','c_top')
        }
        let AddElement = box.children('.addmodule')
        let marginT = 0
        if (dataCon.moduleMargin) {
          marginT = dataCon.moduleMargin
        }
        for (let i = 0,len = AddElement.length; i < len; i++) {
          let yg = y + i * marginT
          AddElement.eq(i).css({'top': yg, 'left': x})
        }
        me.$('.addmodule').removeClass('addmodule')
        if (dataCon.createEvent) {
          dataCon.createEvent(self, AddElement, me)
        }
        me.carryAddElementStorageEvent(self, box, AddElement, y, x, marginT) // 区域存储
        me.adaptation.renderLayer(self, box) // 更新图层
      })
      return false
    })
  }

