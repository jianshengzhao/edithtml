// ------------------------------- 元素临时存储 --------------------------------------  
  let getGuidGenerator = function () { // 获得随机数
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }

  exports.addStorage = function (self, parent, AddElement, y, x, me, son) { // 添加存储(多选)
    let cname = parent.attr('class')
    let id = getGuidGenerator()
    let addEle = AddElement
    let x1 = parseInt(addEle.css('width')) + x
    let y1 = parseInt(addEle.css('height')) + y
    let br = parseInt(addEle.css('border-left-width')) < 1 ? parseInt(addEle.css('border-top-width')) : parseInt(addEle.css('border-left-width'))
    addEle.attr('id', id)
    let regionYO = self.elementStorage[cname]
    regionYO[id] = {
      son: son,
      xt: x,
      yt: y,
      xb: x1,
      yb: y1,
      br: br,
      ele: addEle
    }
  }

  exports.updateStorage = function (self, parent, elements, deleteEle, me) { // 更新区域存储(多选)
    let cname = parent.attr('class') 
    if ('c_top c_body c_foot'.indexOf(cname) < 0) {    
      if (parent.parents('.c_top').length > 0) {
        cname = 'c_top'
      } else if (parent.parents('.c_body').length > 0) {
        cname = 'c_body'
      } else if (parent.parents('.c_foot').length > 0){
        cname = 'c_foot'
      } else {
        return false
      } 
    }
    let parentO = self.elementStorage[cname]
    let elementss = []
    for (let i = 0, len = elements.length; i < len; i++) {
      let item = elements.eq(i)
      elementss.push(item)
    }
    let elementsChild = elements.find('.module')
    for (let i = 0, len = elementsChild.length; i < len; i++) { // todolist:合并子集数组
      let item = elementsChild.eq(i)
      elementss.push(item)
    }

    for (let i = 0, len = elementss.length; i < len; i++) {
      let item = elementss[i]
      let id = item.attr('id')        
      if (deleteEle == 'delete') {
        delete parentO[id]
      } else {
        let son = false
        let iTop = parseInt(item.css('top'))   
        let iLeft = parseInt(item.css('left'))
        let parents = item.parents('.module')
        let pLen = parents.length
        if (pLen > 0) { // 如果为模块子元素计算元素相对位置
          for (let j = 0; j < pLen; j++) {
            let pitem = parents.eq(j)
            let pcname = pitem.attr('class').split(' ')[0]
            let containerOffset = self.datahtml[pcname].containerOffset
            iTop += parseInt(pitem.css('top')) + containerOffset.y
            iLeft += parseInt(pitem.css('left')) + containerOffset.x
          }
          son = true
        }
        let ibottom = parseInt(item.css('height')) + iTop
        let iright = parseInt(item.css('width')) + iLeft
        let ibor = parseInt(item.css('border-left-width')) < 1? parseInt(item.css('border-top-width')) : parseInt(item.css('border-left-width'))
        parentO[id] = { // 更新存储的数据
          son: son,
          xt: iLeft,
          yt: iTop,
          xb: iright,
          yb: ibottom,
          br: ibor,
          ele: item
        }
      }
    }
  }

// ----------------------------- 多选 ----------------------------------------------  

  exports.getRegionSign = function (self, element, elementX, me) { // 多选模块并属性初始化
    self.inp_z = parseInt(element.css('zIndex')) || ''
    self.inp_x = parseInt(elementX.css('left'))
    self.inp_y = parseInt(element.css('top'))
    self.inp_w = parseInt(element.css('width'))
    self.inp_h = parseInt(element.css('height'))
    self.inp_size = parseInt(element.css('fontSize'))
    self.inp_line = parseInt(element.css('lineHeight'))
    self.color_font = element.css('color')
    self.color_bg = element.css('backgroundColor')
    self.br_width = parseInt(element.css('border-left-width'))
    self.br_style = element.css('border-left-style')
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
    self.selectBloo = true
    element.parent().css('outline', '2px dashed rgba(64, 158, 255, 0.7)')
    me.mod.removeClass('tl_li_Disable')
    me.brmod.removeClass('br-disable')
  } 

  exports.fuzzyCalibration = function (self, parentClass, id, left, top, height, width, ele, me) { // 模糊校准
    me.$('.fuzzybox').remove()
    me.line.hide()
    let obj = self.elementStorage[parentClass]    
    let yT = top
    let yB = top + height
    let xL = left
    let xR = left + width    
    let fv = self.fuzzyVal
    let fyzzyHtml = '<div class="fuzzybox"></div>'
    for (let i in obj) {
      let item = obj[i] 
      if (i != id && !item.son) {             
        if (Math.abs(item.xt - xL) <= fv) {
          ele.css({'left': item.xt})
          self.inp_x = item.xt
        }
        if (Math.abs(item.xt - xR) <= fv) {
          let fLeftR = item.xt - width
          ele.css({'left': fLeftR})
          self.inp_x = fLeftR
        }
        if (Math.abs(item.xb - xR) <= fv) {
          let fLeft = item.xb - width
          ele.css({'left': fLeft})
          self.inp_x = fLeft
        }
        if (Math.abs(item.xb - xL) <= fv) {
          ele.css({'left': item.xb})
          self.inp_x = item.xb
        }
        if (Math.abs(item.yt - yT) <= fv) {
          ele.css({'top': item.yt})
          self.inp_y = item.yt
        }
        if (Math.abs(item.yt - yB) <= fv) {
          let fTopB = item.yt - height
          ele.css({'top': fTopB})
          self.inp_y = fTopB
        }
        if (Math.abs(item.yb - yB) <= fv) {
          let fTop = item.yb - height
          ele.css({'top': fTop})
          self.inp_y = fTop
        }
        if (Math.abs(item.yb - yT) <= fv) {
          ele.css({'top': item.yb})
          self.inp_y = item.yb
        }
        if (Math.abs(item.xt - xL) <= fv || Math.abs(item.xt - xR) <= fv || Math.abs(item.xb - xR) <= fv || Math.abs(item.xb - xL) <= fv || Math.abs(item.yt - yT) <= fv || Math.abs(item.yt - yB) <= fv || Math.abs(item.yb - yB) <= fv || Math.abs(item.yb - yT) <= fv) {
          me.adaptation.computeLinePosition(self, me)
          me.carryUpdateElementStorageEvent(self, ele.parent(), ele)
          item.ele.append('<div class="fuzzybox" style="width:' + (item.xb - item.xt) + 'px;height:' + (item.yb - item.yt) + 'px;left:-' + item.br + 'px;top:-' + item.br + 'px;"></div>')
        }
      }
    }
  }

  exports.drawingRegion = function (self, me, e) {  // 绘制选中区域 ps：优化拆分
    me.$('.getRegion').remove()
    me.$('.multiBox').remove()
    let spaceTop = me.space.scrollTop()
    let spaceLeft = me.space.scrollLeft()
    let startY = e.pageY // Y轴原点
    let startX = e.pageX // X轴原点
    let drawY = 0
    let drawX = 0
    let postY = e.pageY - self.paddingtop - self.postop + spaceTop
    let postX = e.pageX - self.paddingleft - self.posleft + spaceLeft
    let parent    
    if (e.pageY + spaceTop < me.topRangeY ) {
      parent = 'c_top'
    } else if (e.pageY + spaceTop < me.bodyRangeY) {
      postY = e.pageY + spaceTop - me.topRangeY
      parent = 'c_body'
    } else {
      postY = e.pageY + spaceTop - me.bodyRangeY
      parent = 'c_foot'
    }
    me.$('.' + parent).append('<div class="getRegion" ></div>')
    self.moduleParentElementHeight = parseInt(me.$('.' + parent).css('height'))
    let getregion = me.$('.getRegion')
    getregion.css({'top': postY, 'left': postX})
    me.editBox.on('mousemove', function (e) { // 绘制选区
      drawY = e.pageY - startY
      drawX = e.pageX - startX
      if (drawY > 0 && drawX > 0) { // 上下左右四种情况的操作
        getregion.css({'width': drawX,'height': drawY})
      } else if (drawY > 0 && drawX < 0) {
        getregion.css({'width': - drawX, 'height': drawY, 'left': postX + drawX})
      } else if (drawY < 0 && drawX > 0) {
        getregion.css({'width': drawX, 'height': - drawY, 'top': postY + drawY})
      } else {
        getregion.css({'width': - drawX, 'height': - drawY, 'left': postX + drawX, 'top': postY + drawY})
      }
    })
   
    me.editBox.on('mouseup', function (e) {
      me.editBox.unbind('mousemove mouseup')
      if (parseInt(getregion.css('width')) > 10){
        getRegionParam(parent, getregion, self, me)        
      }
    })
  }

  function getRegionParam (parent, getregion, self, me) { // 判断选中的元素
    let gx
    let gy
    let gw
    let gh   
    let obj = self.elementStorage[parent]
    gx = parseInt(getregion.css('left')) // 获得选区X坐标
    gy = parseInt(getregion.css('top')) // 获得选区Y坐标
    gw = parseInt(getregion.css('width')) // 获得选区宽
    gh = parseInt(getregion.css('height')) // 获得选区高     
    for (let i in obj) { // 判断是否在选区内
      let item = obj[i]
      if (self.choiceCon) { // 判断选择条件         
        if ((gx + gw > item.xt && item.xb > gx && gy + gh > item.yt && item.yb > gy)) {

          item.ele.addClass('on_module').append('<div class="multiBox" style="width:' + (item.xb - item.xt)+ 'px;height:' + (item.yb - item.yt) + 'px;top: -' + item.br + 'px;left:-' + item.br + 'px"></div>')
        }
      }else {
        if (item.xt >= gx && item.xb <= (gx + gw) && item.yt >= gy && item.yb <= (gy + gh)) {
          item.ele.addClass('on_module').append('<div class="multiBox" style="width:' + (item.xb - item.xt)+ 'px;height:' + (item.yb - item.yt) + 'px;top: -' + item.br + 'px;left:-' + item.br + 'px"></div>')
        }
      }
    }
    getregion.remove()
    let multiBox = me.$('.multiBox')
    let parentModule = me.$('.' + parent +'>.on_module')
    if (parentModule.length != multiBox.length) {
      if (parentModule.length == 1) { // 选中模块内的子元素模块       
        parentModule.children('.multiBox').remove()
        parentModule.removeClass('on_module')      
      } else {  // 清除的子元素模块的选中
        let childModule = parentModule.find('.on_module')       
        childModule.find('.multiBox').remove()
        childModule.removeClass('on_module')
      }
    }   
    screenElement(self, me)
  }

  function screenElement (self, me) { // 筛选特殊元素
    let onModule = me.$('.on_module')
    let getElementY = onModule.eq(0)
    let getElementX = onModule.eq(0)
    let getElementR = onModule.eq(0)
    let getElementB = onModule.eq(0)
    for(let i = 1,len = onModule.length; i < len; i ++) { // 选出特殊用途的元素
      let item = onModule.eq(i)
      let itemTop = parseInt(item.css('top'))
      let eleTop = parseInt(getElementY.css('top'))
      if (eleTop >= itemTop) { // 最上边的元素
        if (eleTop == itemTop) {
          if (parseInt(getElementY.css('left')) > parseInt(item.css('left'))) {
            getElementY = item
          }
        } else {
          getElementY = item
        }
      }

      let itemBottom = parseInt(item.css('top')) + parseInt(item.css('height'))
      let eleBottom = parseInt(getElementB.css('top')) + parseInt(getElementB.css('height'))
      if (itemBottom >= eleBottom) { // 最下边的元素
        getElementB = item
      }

      let itemLeft = parseInt(item.css('left'))
      let eleLeft = parseInt(getElementX.css('left'))
      if (eleLeft >= itemLeft) { // 最左边的元素
        getElementX = item
      }

      let itemRight = parseInt(item.css('left')) + parseInt(item.css('width'))
      let eleRight = parseInt(getElementR.css('left')) + parseInt(getElementR.css('width'))
      if (itemRight >= eleRight) { // 最右边的元素
        getElementR = item
      }
    }
    self.moduleElement = getElementY
    self.moduleElementY = getElementY
    self.moduleElementX = getElementX
    self.moduleElementR = getElementR
    self.moduleElementB = getElementB 
    if (onModule.length == 1){
      me.$('.multiBox').remove()
      me.carrySignEvent(self, getElementY)
    } else if(onModule.length > 1){     
      me.carryRegionChoiceSignEvent(self, getElementY, getElementX) 
    }
  }
  
  exports.screenElement = function (self, me) {
    screenElement(self, me)
  }
// ----------------- bindEvent ---------------------------------------
  exports.bindMultiBoxMousemoveEvent = function (self, me) { // 多选模块拖拽
    me.editBox.on('mousedown', '.multiBox', function (e) {
      let x = e.pageX
      let y = e.pageY
      let xs = self.inp_x
      let ys = self.inp_y
      me.editBox.mousemove(function (e) {
        let left = xs + e.pageX - x
        let top = ys + e.pageY - y
        me.carryModuleOperationEvent(self, 'left', left)
        me.carryModuleOperationEvent(self, 'top', top)
        return false
      })
      me.editBox.mouseup(function () {
        me.editBox.unbind('mousemove mouseup')
        // me.line.hide()
        // me.$('.touch_module').removeClass('touch_module')
        // me.carryLayerEvent(self, $this.parent())
        return false
      })
      return false
    })
  }

