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
    me.wtop = me.$('.top')
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
    me.carrytoolbarEvent(self)
    me.carryMenuEvent(self)
    me.carryLineHeightEvent()
    me.libBox = me.$('.lib_box')
    me.libLi = me.libBox.find('.lib_li')
    me.bindEvent(self)
  },
  guidGenerator: function () { // 获得随机数
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },
  carrytoolbarEvent: function (self) { // top工具栏排版
    let me = this      
    if(parseInt(me.wtop.css('height')) > 36){
      me.library.css('paddingTop', '68px')
      me.layer.css('paddingTop', '68px')
      me.editBox.css('paddingTop', '68px')
      self.paddingtop = 68;
    }
    me.$(window).resize(function() {
      if (parseInt(me.wtop.css('height')) > 36) {
        me.library.css('paddingTop', '68px')
        me.layer.css('paddingTop', '68px')        
        me.editBox.css('paddingTop', '68px')
        self.paddingtop = 68;
      } else {
        me.library.css('paddingTop', '35px')
        me.layer.css('paddingTop', '35px')        
        me.editBox.css('paddingTop', '35px')
        self.paddingtop = 35;
      }
    })
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
    let b = parseInt(element.css('border-left-width')) < 1 ? element.css('border-top-width') : element.css('border-left-width')
    // console.log(element)
    let cName = element.attr('class').split(' ')[0]
    // console.log(cName)
    let thtml = ''
    let tool = self.datahtml[cName].tool
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
    if(cName == "information"){
    	var resizeBox = thtml + '<div class="resizeBox" style="width:' + w + ';height:' + h + ';top: -' + b + ';left:-' + b + '">' +
                              '<div class="resize e"></div>' +
                              '<div class="resize w"></div>' +
                            '</div>'
    }else{
    	var resizeBox = thtml + '<div class="resizeBox" style="width:' + w + ';height:' + h + ';top: -' + b + ';left:-' + b + '">' +
                              '<div class="resize nw"></div>' +
                              '<div class="resize sw"></div>' +
                              '<div class="resize ne"></div>' +
                              '<div class="resize se"></div>' +
                              '<div class="resize e"></div>' +
                              '<div class="resize n"></div>' +
                              '<div class="resize w"></div>' +
                              '<div class="resize s"></div>' +
                            '</div>'
    }
    me.$('.on_module').removeClass('on_module')
    me.$('.resizeBox').remove()
    me.$('.supendTools').remove()
    element.addClass('on_module')
    element.append(resizeBox)
    // if (element.hasClass('picture')){ // 禁止图片拉伸
    //   element.find('.resize').hide()
    // }

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
    me.carryUpdateElementStorageEvent(self, element.parent(), element)
  },
  cleanSignEvent: function (self) { // 标记模块并属性还原默认值 注：禁止了图片拉伸
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
  carryAddElementStorageEvent: function (self, parent, AddElement, y, x, marginT) { // 区域存储(多选)
    let me = this
    let cname = parent.attr('class')
    for(let i = 0, len = AddElement.length; i < len; i++) {
      let regionY =  parseInt((y + i * marginT)/300) * 300  // 以y轴300px为区间分段存储 
      let id = me.guidGenerator()
      let addEle = AddElement.eq(i)
      let x1 = parseInt(addEle.css('width')) + x
      let y1 = parseInt(addEle.css('height')) + y
      let br = parseInt(addEle.css('border-left-width')) < 1 ? parseInt(addEle.css('border-top-width')) : parseInt(addEle.css('border-left-width'))
      addEle.attr('id', id)
      let regionYO
      if (!self.elementStorage[cname][regionY]) {
        regionYO = self.elementStorage[cname][regionY] = {}
      } else {
        regionYO = self.elementStorage[cname][regionY]
      }    
      regionYO[id] = {
        xt: x,
        yt: y,
        xb: x1,
        yb: y1,
        br: br,
        ele: addEle
      }
    }    
    // console.log(self.elementStorage)
  },
  carryUpdateElementStorageEvent: function (self, parent, elements, deleteEle) { // 更新区域存储(多选)
    let me = this
    let cname = parent.attr('class')
    let regionY
    let regionYO
    let parentO = self.elementStorage[cname]
    for (let i = 0, len = elements.length; i < len; i++) {
      let item = elements.eq(i)
      let id = item.attr('id')      
      let iTop = parseInt(item.css('top'))
      regionY = parseInt(iTop / 300) * 300
      if (deleteEle) {
        delete parentO[regionY][id]
        return false
      }      
      let iLeft = parseInt(item.css('left'))
      let ibottom = parseInt(item.css('height')) + iTop
      let iright = parseInt(item.css('width')) + iLeft
      let ibor = parseInt(item.css('border-left-width')) < 1? parseInt(item.css('border-top-width')) : parseInt(item.css('border-left-width'))
      
      if (!parentO[regionY]) {
        regionYO = parentO[regionY] = {}
      } else {
        regionYO = parentO[regionY]
      }
      for(let j in parentO) { // 清除因为移动而产生跨区的重复的元素
        let jtem = parentO[j]
        if (jtem[id]) {
          delete jtem[id]
        }
      }
      regionYO[id] = { // 更新存储的数据
        xt: iLeft,
        yt: iTop,
        xb: iright,
        yb: ibottom,
        br: ibor,
        ele: item
      }   
    }
    // console.log(self.elementStorage[cname])
  },
  carryRegionChoiceEvent: function (self, e) { // 区域选中事件(多选)
    let me = this
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
    me.$('.' + parent).append('<div class="getRegion"></div>')
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

    let gx
    let gy
    let gw
    let gh
    let sy
    let ey
    let elements = self.elementStorage[parent]
    me.editBox.on('mouseup', function (e) {
      me.editBox.unbind('mousemove mouseup')
      gx = parseInt(getregion.css('left')) // 获得选区X坐标
      gy = parseInt(getregion.css('top')) // 获得选区Y坐标
      gw = parseInt(getregion.css('width')) // 获得选区宽
      gh = parseInt(getregion.css('height')) // 获得选区高      
      sy = parseInt(gy/300) * 300
      ey = parseInt((gy + gh) /300) * 300
      let obj = {}
      for(let i in elements){        
        if (i >= sy && i <= ey) {
          me.$.extend(obj, elements[i]);
        }
      }
      
      for (let i in obj) { // 判断是否在选区内
        let item = obj[i]
        if (self.choiceCon) { // 判断选择条件 (算法有bug)

          if (item.xt >= gx && item.xt <= (gx + gw)&& item.yt >= gy && item.yt <= (gy + gh) || item.xb >= gx && item.xb <= (gx + gw) && item.yt >= gy && item.yt <= (gy + gh)||item.xt >= gx && item.xt <= (gx + gw)&& item.yb >= gy && item.yb <= (gy + gh) || item.xb >= gx && item.xb <= (gx + gw) && item.yb >= gy && item.yb <= (gy + gh)){
            item.ele.addClass('on_module').append('<div class="multiBox" style="width:' + (item.xb - item.xt)+ 'px;height:' + (item.yb - item.yt) + 'px;top: -' + item.br + 'px;left:-' + item.br + 'px"></div>')
          }

        }else {
          if (item.xt >= gx && item.xb <= (gx + gw) && item.yt >= gy && item.yb <= (gy + gh)) {
            item.ele.addClass('on_module').append('<div class="multiBox" style="width:' + (item.xb - item.xt)+ 'px;height:' + (item.yb - item.yt) + 'px;top: -' + item.br + 'px;left:-' + item.br + 'px"></div>')
          }
        }
      }
      getregion.remove()
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
    })     
  },
  carryRegionChoiceSignEvent: function (self, element, elementX) { // 标记模块并属性初始化 (多选模块)
    let me = this
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
    me.mod.removeClass('tl_li_Disable')
    me.brmod.removeClass('br-disable')  
  },
  carryModuleOperationEvent: function (self, type, val) { // 属性栏模块操作事件集合 注：禁止了图片拉伸
    let me = this
    let onModules = me.$(".on_module")
    let $this
    let part
    let left
    let top
    if (type!== 'paste') {
      self.original = self.moduleElement.parent()
    }
    switch (type) {
    // -------------- css属性 -----------------
      case 'zIndex':
        if (val < 0) {
          val = 0
          self.inp_z = 0
        }
        if (val > 99) {
          val = 99
          self.inp_z = 99
        }
        part = function (ele) {
          ele.css('zIndex', val)
        }        
        break
      case 'left':
        if (val < 0 && self.config.moveLimit) {
          val = 0
          self.inp_x = 0
        }
        let maxX
        let moveX = val
        if (onModules.length > 1){
          maxX = parseInt(onModules.parent().css('width')) - (parseInt(self.moduleElementR.css('left')) + parseInt(self.moduleElementR.css('width')) - parseInt(self.moduleElementX.css('left')))
        } else {          
          maxX = parseInt(onModules.parent().css('width')) - self.inp_w
        }        
        if (val > maxX && self.config.moveLimit) {
          val = maxX
        }
        if (onModules.length > 1){
          moveX = val - parseInt(self.moduleElementX.css('left')) 
        } else { 
          moveX = val - parseInt(self.moduleElement.css('left'))
        }
        self.inp_x = val
        part = function (ele) {          
          let nowX = moveX + parseInt(ele.css('left'))
          ele.css('left', nowX + 'px')
        }
        break
      case 'top':
        if (val < 0 ) { // && self.config.moveLimit
          val = 0
          self.inp_y = 0
        }
        let maxY
        let moveY = val
        if (onModules.length > 1){
          maxY = parseInt(onModules.parent().css('height')) - (parseInt(self.moduleElementB.css('top')) + parseInt(self.moduleElementB.css('height')) - parseInt(self.moduleElementY.css('top')))
        } else {          
          maxY = parseInt(onModules.parent().css('height')) - self.inp_h
        }        
        if (val > maxY) {
          val = maxY
        }
        if (onModules.length > 1){
          moveY = val - parseInt(self.moduleElementY.css('top')) 
        } else { 
          moveY = val - parseInt(self.moduleElement.css('top'))
        }
        self.inp_y = val
        part = function (ele) {          
          let nowY = moveY + parseInt(ele.css('top'))
          ele.css('top', nowY + 'px')
        }
        break
      case 'width':
        if (val < 0 && self.config.stretchLimit) {
          val = 0
          self.inp_w = 0
        }
        part = function (ele) {
          let tw = self.inp_width - parseInt(ele.css('left')) 
          if (!ele.hasClass('picture') && !ele.hasClass('sline')) { // 禁止图片拉伸
            if (val > tw && self.config.stretchLimit) {
              ele.css('width', tw + 'px')
              ele.find('.multiBox').css('width',tw + 'px')
              ele.find('.resizeBox').css('width',tw + 'px')
            } else {
              ele.css('width', val + 'px')
              ele.find('.multiBox').css('width',val + 'px')
              ele.find('.resizeBox').css('width',val + 'px')
            } 
          }
        }         
        break
      case 'height':
        if (val < 0 && self.config.stretchLimit) {
          val = 0
          self.inp_h = 0
        }
        part = function (ele) {
          let th = self.moduleParentElementHeight - parseInt(ele.css('top'))
          if (!ele.hasClass('picture') && !ele.hasClass('hline')) {
            if (val > th && self.config.stretchLimit) {
              ele.css('height', th + 'px')
              ele.find('.multiBox').css('height',th + 'px')
              ele.find('.resizeBox').css('height',th + 'px')
            } else {
              ele.css('height', val + 'px')
              ele.find('.multiBox').css('height',val + 'px')
              ele.find('.resizeBox').css('height',val + 'px')
            }
          }
        }
        break
      case 'fontSize':
        part = function (ele) {
          ele.css('fontSize', val + 'px')
          if(parseInt(ele.css('lineHeight')) < val) {
            ele.css('lineHeight', val + 'px')
          }
        } 
        break
      case 'lineHeight':
        part = function (ele) {
          ele.css('lineHeight', val + 'px')          
        } 
        break
      case 'color':
        part = function (ele) {
          ele.css('color', val)         
        }
        break
      case 'backgroundColor':
        part = function (ele) {
          if (val === null) {
            ele.css('backgroundColor', 'transparent')
          } else {
            ele.css('backgroundColor', val)
          }          
        }
        break
      case 'borderWidth':      
        part = function (ele) {
          ele.css('borderWidth', val)
          let w = parseInt(ele.css('width'))
          let h = parseInt(ele.css('height'))
          if (ele.hasClass('sline')){
            ele.find('.multiBox').css({width: w + 'px',height: h + 'px',top: '0px', left: '-' + val + 'px'})
            ele.find('.resizeBox').css({width: w + 'px',height: h + 'px',top: '0px', left: '-' + val + 'px'})
          } else if (ele.hasClass('hline')){
            ele.find('.multiBox').css({width: w + 'px',height: h + 'px',top: '-' + val + 'px', left: '0px'})
            ele.find('.resizeBox').css({width: w + 'px',height: h + 'px',top: '-' + val + 'px', left: '0px'})
          } else {
            ele.find('.multiBox').css({width: w + 'px',height: h + 'px',top: '-' + val + 'px', left: '-' + val + 'px'})
            ele.find('.resizeBox').css({width: w + 'px',height: h + 'px',top: '-' + val + 'px', left: '-' + val + 'px'})
          }          
        }
        break
      case 'borderStyle':
        part = function (ele) {          
          ele.css('borderStyle', val)
        }
        break
      case 'borderColor':
        part = function (ele) {
          ele.css('borderColor', val)
        }
        break
      case 'opacity':
        part = function (ele) {
          ele.css('opacity', val/100)
        }
        break
      case 'boxShadow':     
        if (!val) {
          part = function (ele) {
            ele.css('boxShadow', 'none')
          }
        } else {
          part = function (ele) {
            self.inp_weight_x = 1
            self.inp_weight_y = 1
            self.inp_blur = 1
            ele.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)
          }
        }
        break
      case 'boxShadowX':
        part = function (ele) {
          ele.css('boxShadow', val + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + self.bw_color)
        }
        break
      case 'boxShadowY':
        part = function (ele) {
          ele.css('boxShadow', self.inp_weight_x + 'px ' + val + 'px ' + self.inp_blur + 'px ' + self.bw_color)
        }
        break
      case 'boxShadowBlur':
        part = function (ele) {
          ele.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + val + 'px ' + self.bw_color)
        }
        break
      case 'boxShadowColor':
        part = function (ele) {
          ele.css('boxShadow', self.inp_weight_x + 'px ' + self.inp_weight_y + 'px ' + self.inp_blur + 'px ' + val)
        }
        break
    // ------------- 快捷工具 -----------------
      case 'topAlign':
        if (onModules.length > 1) {
          let topY = parseInt(self.moduleElementY.css('top'))
          part = function (ele) {
            ele.css('top',topY)
          }
        } else {
          part = function (ele) {
            ele.css('top', '0px')
            self.inp_y = 0
          }
        }
        break
      case 'bottomAlign':
        if (onModules.length > 1) {
          self.inp_y = parseInt(self.moduleElementB.css('top'))
          let bottomY = self.inp_y + parseInt(self.moduleElementB.css('height'))
          part = function (ele) {
            ele.css('top', bottomY - parseInt(ele.css('height')))
          }
        } else {
          part = function (ele) {
            let bottom = self.moduleParentElementHeight - parseInt(ele.css('height'))
            ele.css('top', bottom)
            self.inp_y = bottom
          }
        }
        break
      case 'leftAlign':
        if (onModules.length > 1) {
          let leftX = parseInt(self.moduleElementX.css('left'))
          part = function (ele) {
            ele.css('left', leftX)
          }
        } else {
          part = function (ele) {
            ele.css('left', '0px')
            self.inp_x = 0
          }
        }
        break
      case 'rightAlign':
        if (onModules.length > 1) {
          self.inp_x = parseInt(self.moduleElementR.css('left'))
          let rightX = self.inp_x + parseInt(self.moduleElementB.css('width'))
          part = function (ele) {
            ele.css('left', rightX - parseInt(ele.css('width')))
          }
        } else {
          part = function (ele) {
            let x = self.inp_width - parseInt(ele.css('width'))
            ele.css('left', x)
            self.inp_x = x
          }
        }
        break
      case 'centerAlign':
        if (onModules.length > 1) { 
          self.inp_x = (self.inp_width - parseInt(self.moduleElementY.css('width'))) / 2     
          part = function (ele) {
            let x = (self.inp_width - parseInt(ele.css('width'))) / 2
            ele.css('left', x)
          }
        } else {
          part = function (ele) {
            let x = (self.inp_width - parseInt(ele.css('width'))) / 2
            ele.css('left', x)
            self.inp_x = x
          }
        }
        break
      case 'middleAlign': // 垂直居中原则，(最上的模块top + 最下的模块top + 最下的模块height) / 2 为居中准线 
        if (onModules.length > 1) { 
          let midY = (parseInt(self.moduleElementY.css('top')) + parseInt(self.moduleElementB.css('top')) + parseInt(self.moduleElementB.css('height'))) / 2
          self.inp_y = midY - (parseInt(self.moduleElementY.css('height'))/2)
          part = function (ele) {
            let mid = midY - (parseInt(ele.css('height')) / 2)
            ele.css('top', mid)
          }
        } else {
          part = function (ele) {
            let mid = (self.moduleParentElementHeight - parseInt(ele.css('height'))) / 2
            ele.css('top', mid)
            self.inp_y = mid
          }
        }
        break
      case 'topFloor':
        let maxFloor = 99
        part = function (ele) {
          ele.css('zIndex', maxFloor)
          self.inp_z = maxFloor
        }
        break
      case 'bottomFloor':
        let minFloor = 0
        part = function (ele) {
          ele.css('zIndex', minFloor)
          self.inp_z = minFloor
        }
        break
      case 'upFloor':
        part = function (ele) {          
          let upZ = parseInt(ele.css('zIndex')) + 1         
          if (upZ > 99) {
            upZ = 99
          }
          self.inp_z = upZ
          ele.css('zIndex', upZ)
        }
        break
      case 'downFloor':
        part = function (ele) {
          let downZ = parseInt(ele.css('zIndex')) - 1
          if (downZ < 0) {
            downZ = 0
          }
          self.inp_z = downZ
          ele.css('zIndex', downZ)
        }
        break
      case 'shear':
        self.clipboard = ''        
        part = function (ele) {          
          ele.find('.multiBox').remove()
          ele.find('.resizeBox').remove()
          ele.find('.supendTools').remove()
          self.clipboard += ele[0].outerHTML
          ele.remove()
        }
        break
      case 'copy':
        self.clipboard = ''        
        part = function (ele) {  
          if (!ele.hasclass('player')) {
            ele.find('.multiBox').remove()
            ele.find('.resizeBox').remove()
            ele.find('.supendTools').remove()
            self.clipboard += ele[0].outerHTML
            ele.removeClass('on_module')
          } else {
            self.$notify({
              title: '警告',
              message: '播放器禁止复制',
              type: 'warning'
            });
          }
        }
        break
      case 'paste':
        if (self.clipboard) {
          me.$(".on_module").removeClass('on_module')
          let sTop = parseInt(me.space.scrollTop())
          let sLeft = parseInt(me.space.scrollLeft())           
          let menuY = parseInt(me.contextmenu.css('top')) - me.space.scrollTop() + self.paddingtop
          let menuX = parseInt(me.contextmenu.css('left')) - me.space.scrollLeft()         
          switch (self.original.attr('class')) {
            case 'c_top':
              menuY = menuY - (self.paddingtop + self.postop) + sTop
              menuX = menuX - self.posleft + sLeft
              break
            case 'c_body':
              menuY = menuY - (self.paddingtop + self.postop) + sTop - parseInt(me.$('.c_top').css('height'))
              menuX = menuX - self.posleft + sLeft
              break
            case 'c_foot':
              menuY = menuY - (self.paddingtop + self.postop) + sTop - parseInt(me.$('.c_top').css('height')) - parseInt($('.c_body').css('height'))
              menuX = menuX - self.posleft + sLeft
              break
          }
          self.original.append(self.clipboard)
          onModules = me.$(".on_module")
          let getElementY = onModules.eq(0)
          let getElementX = onModules.eq(0)
          let getElementR = onModules.eq(0)
          let getElementB = onModules.eq(0)
          for(let i = 1, len = onModules.length; i < len; i ++) { // 选出特殊用途的元素
            let item = onModules.eq(i)
            let eleTop = parseInt(getElementY.css('top'))
            let itemTop = parseInt(item.css('top'))
            if (eleTop >= itemTop) { // 最上边的元素
              if (eleTop == itemTop) {
                if (parseInt(getElementY.css('left')) > parseInt(item.css('left'))) {
                  getElementY = item
                }
              } else {
                getElementY = item
              }          
            }
            let eleBottom = parseInt(getElementB.css('top'))
            if (itemTop >= eleBottom) { // 最下边的元素
              getElementB = item
            }
            let eleLeft = parseInt(getElementX.css('left'))
            let itemLeft = parseInt(item.css('left'))
            if (eleLeft >= itemLeft) { // 最左边的元素
              getElementX = item
            }
            let eleRight = parseInt(getElementR.css('left'))
            if (itemLeft >= eleRight) { // 最右边的元素
              getElementR = item
            }
          }            
          let shiftY = menuY - parseInt(getElementY.css('top'))
          let shiftX = menuX - parseInt(getElementX.css('left'))
          if (self.config.moveLimit) {
            let maxShiftY = parseInt(self.original.css('height')) - (parseInt(getElementB.css('top')) + parseInt(getElementB.css('height')))
            if (shiftY > maxShiftY) {
              shiftY = maxShiftY
            }
            let maxShiftX = self.inp_width - (parseInt(getElementR.css('left')) + parseInt(getElementB.css('width')))
            if (shiftX > maxShiftX) {
              shiftX = maxShiftX
            }
          }
          part = function (ele) {
            let eId = ele.attr('id')
            let eIds = me.$('[id$=' + eId + ']').length
            ele.attr('id',eIds + 'th' + eId)
            let eley = parseInt(ele.css('top')) + shiftY
            let elex = parseInt(ele.css('left')) + shiftX
            ele.css({'top': eley, 'left': elex})
          }
        }
        break
      case 'delete':
        part = function (ele) {        
          ele.remove()
        }
        me.cleanSignEvent(self)
        break
    }

    onModules.each(function () { // 更新多选元素集合
      $this = me.$(this) 
      part($this)
    })
    if (type == 'delete' || type == 'shear') {
      me.carryUpdateElementStorageEvent(self, self.original, onModules, 'delete')
    } else {
      me.carryUpdateElementStorageEvent(self, self.original, onModules)
    }
    me.carryLayerEvent(self, self.original)
    me.contextmenu.hide()
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
  carryFuzzyCalibrationEvent: function (self, parentClass, id, left, top, height, width, ele) { // 模糊校准
    let me = this
    me.$('.fuzzybox').remove()
    me.line.hide()
    let storage = self.elementStorage[parentClass]
    let obj = {}
    let yT = top
    let yB = top + height
    let xL = left
    let xR = left + width
    let sy = parseInt(yT/300) * 300
    let ey = parseInt((yB) /300) * 300
    let fv = self.fuzzyVal
    let fyzzyHtml = '<div class="fuzzybox"></div>'
    for (let i in storage) {
      if (i >= sy || i <= ey) {
        me.$.extend(obj, storage[i])
      }
    }    
    for (let i in obj) {     
      if (i != id) {
        let item = obj[i]    
        // if (item.xt == xL ||item.xb == xR || item.yt == yT || item.yb == yB) {
        //   item.ele.append('<div class="fuzzybox" style="width:' + (item.xb - item.xt) + 'px;height:' + (item.yb - item.yt) + 'px;left:-' + item.br + 'px;top:-' + item.br + 'px;"></div>')
        // }        
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
          me.carryLineEvent(self)
          me.carryUpdateElementStorageEvent(self, ele.parent(), ele)
          item.ele.append('<div class="fuzzybox" style="width:' + (item.xb - item.xt) + 'px;height:' + (item.yb - item.yt) + 'px;left:-' + item.br + 'px;top:-' + item.br + 'px;"></div>')
        }
      }      
    }
  },
  bindEvent: function (self) { // 绑定选中模块绑定事件事件
    let me = this
  // ------------- element 弹框拖拽 ------------
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
          // else if ((top + edH) > bH) {
          //   top = bH - edH
          // }

          if (left < edW/2) { 
            left = edW/2
          } else if ((left + edW/2) > bW) {
            left = bW - edW/2
          }

          elDialog.css({'left': left, 'top': top})       
        })

        me.doc.mouseup(function (e) {
          me.doc.unbind('mousemove mouseup')        
        })
      }
    })
  // ------------- 操作模块事件 ----------------
    me.editBox.on('mousedown', '.resize', function (e) { // 选中小圆点按钮拉伸容器事件
      let $this = me.$(this)
      let resizeBox = me.$('.resizeBox')
      let parent = me.$('.on_module')
      let imgbloo = parent.hasClass('picture')
      let picimg
      let picBox
      if(imgbloo) {
        picBox = parent.find('.picBox')
        picimg = parent.find('img')
        self.inp_w = parseInt(parent.css('width'))
        self.inp_h = parseInt(parent.css('height'))
      }
      
    	var inforCon = parent.find('.inforCon')
      var infor_wrap = parent.find('.infor-wrap')
      var infor_desc = parent.find('.infor-desc')
      var inforheight = parseInt(parent.css('height'))
      
      var weatherCon = parent.find('.weatherCon')      
      
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
      // todo: 拉伸某容器固定显示内容
      me.editBox.mousemove(function (e) {
        part(e)
        
        if(parent.hasClass('information')){
					resizeBox.css({'width': self.inp_w + 'px','height': inforheight + 'px'})
					//资讯拉伸规则
	        inforCon.css({'width': self.inp_w + 'px'})
	        var infor_wrap_width = self.inp_w - 60 <= 490?490:self.inp_w - 60
	        infor_wrap.css({'width': infor_wrap_width + 'px'})
	       	var infor_desc_width = self.inp_w - 60 - 210 <= 280?280:self.inp_w - 60 - 210
	        infor_desc.css({'width': infor_desc_width + 'px'})//资讯拉伸规则  
	      }else if(parent.hasClass('weather')){
	      	weatherCon.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
	      	resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
	      }else{
	      	resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
	      }
	      
        me.carryUpdateElementStorageEvent(self, parent.parent(), parent)
        if(imgbloo) {
          if (picBox.hasClass('round')||picBox.hasClass('square')) {
            if(self.inp_h < self.inp_w) {
              picBox.css({'width': self.inp_h + 'px','height': self.inp_h + 'px'})
            } else {
              picBox.css({'width': self.inp_w + 'px','height': self.inp_w + 'px'})
            }
          } else {
            if(imgbloo) {
              picimg.css('width', self.inp_w)
            }
          }
        }
        //模块特效
        // self.$refs.effect.init()
        return false
      })
      me.editBox.mouseup(function (e) {
        me.editBox.unbind('mousemove mouseup')
        me.line.hide()
        if(parent.find("#schoolmap").hasClass("schoolmap_box")){
        	parent.find("#schoolmap").remove();
        	var schoolmap = '<div class="schoolmap_box" id="schoolmap"></div>';
        	parent.append(schoolmap);
        	self.createmap();
        	resizeBox.hide();
        }
      })
      return false 
    })

    me.editBox.on('mousedown', '.supendTools', function (e) { // 模块工具栏
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
                          + '<a target="_blank" class="animateBox">'+ data.summary +'</a>'
                          + '<img src="'+ data.img +'">'
                          + '<a target="_blank" class="openState openState_djbmbg1"></a>'
                          + '</div>'
                          + '</div>'
                          + '<div class="courseTit">'+ data.foldername +'</div>'
                          + '<div class="speak">讲师</div>'
                          + '<div class="popularity">'+ data.viewnum+'</div>'
                          + '<div class="number">'+ data.studynum +'</div>'
            element.attr('datacoruse', data.itemid)
            element.find('.editAdd').html(courseHtm)
          })
          break
        case 'st-left st-audition':
          self.$refs.hrefdialogp.show('coursecw', me.$('.on_module'), function (element, data) {            
            let auditionHtm = '<a src="/course/' + data.cwid + '.html" target="_blank"><img src="'+ data.logo +'"><div class="audiTit">'+ data.cwname +'</div></a>'
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
      }
      return false
    })
    
    me.editBox.on('mousedown', '.module', function (e) { // 点击选中模块事件
      let $this = me.$(this)
      me.carrySignEvent(self, $this)
      return false
    })

    me.editBox.on('mousedown', '.on_module', function (e) { // 选中模块移动事件
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
      return false 
    })

    me.editBox.on('mousedown', function (e) { // 点击模块之外时，还原默认值     
      me.cleanSignEvent(self) // 清除属性栏的值
      me.carryRegionChoiceEvent(self, e)  // 添加选区绘制原点
    })
  // ------------- 多选事件 --------------------
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
  // ------------- 键盘按下事件 ----------------
    me.doc.unbind('keydown')
    me.doc.keydown(function (e) { // 键盘方向键微调移动模块事件
      let module = me.$('.on_module')
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
          let moveXY = parseInt(self[key[3]]) + key[2]
          me.carryModuleOperationEvent(self, key[1], moveXY)
          return false
        }
        if (e.key === 'Delete') {
          if (me.$(e.target).get(0).tagName == 'BODY') {
            let original = module.parent()
            module.remove()
            me.carryLayerEvent(self, original)
          }
        }
      }             
    })
  // ------------- 右键菜单栏 ------------------
    me.canvas.bind('contextmenu', function () { // 清除canvas原有的contextmenu事件
      return false
    })
    me.contextmenu.bind('contextmenu click mousedown', function () { // 清除contextmenu原有的contextmenu click事件
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
        me.contextmenu.css({'top': e.pageY - self.paddingtop + me.space.scrollTop() , left: e.pageX - self.paddingleft + me.space.scrollLeft()})
        me.contextmenu.show()
        return false
      }
      let target = me.$(e.target)
      if (!target.hasClass('resizeBox') && !target.hasClass('resize')) { // 已单选模块不能框选
      }      
    })
  // ------------- 页头页尾调整 ----------------
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
  // ------------- 左边模块库 ------------------
    me.libLi.mousedown(function (e) { // 左边模块库鼠标拖动事件 
      me.cleanSignEvent(self)
      me.lShrink.hide()
      let that = me.$(this)
      let modType = me.$(this).attr('dataHtml')
      let dataCon = self.datahtml[modType]
      
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
        box.append(dataCon.html)
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
  // ------------- 右侧图层栏 ------------------
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
    me.elementHead.on('click', '.ele_li', function (e) {
      let index = me.$(this).attr('dataIndex')
      let ele = self.elementHead[index].ele     
      me.carrySignEvent(self, ele)
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
      me.carrySignEvent(self, ele)
    })
    me.elementMain.on('click', '.deleteLayer', function (e) {      
      let index = me.$(this).attr('dataIndex') 
      if (self.elementHead[index].text == '客服') {
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
      me.carrySignEvent(self, ele)
    })
    me.elementTail.on('click', '.deleteLayer', function (e) {      
      let index = me.$(this).attr('dataIndex') 
      if (self.elementHead[index].text == '客服') {
        me.$('.waiter').remove()
      }           
      self.elementTail[index].ele.remove()
      self.elementTail.splice(index,1)
      return false
      // me.carrySignEvent(self, ele)
    })
  // ------------- 模块双击设置 ----------------
    let preTime = 0
    me.editBox.on('mousedown', '.resizeBox', function (e) { // 模块双击操作
      // let interval = (Date.parse(new Date()) - preTime) / 1000 
      // if (interval < 1) {
      //   let type = self.moduleElement.attr('class').split(' ')[0]       
      //   switch (type) {
      //     case 'course': 
      //       self.$refs.hrefdialogp.show('course', me.$('.on_module'), function (element, data) {
      //         let courseHtm = '<div class="imgbox">'
      //                       + '<div class="listBox">'
      //                       + '<a target="_blank" class="animateBox">课程</a>'
      //                       + '<img src="'+ data.img +'">'
      //                       + '<a target="_blank" class="openState openState_djbmbg1"></a>'
      //                       + '</div>'
      //                       + '</div>'
      //                       + '<div class="courseTit">'+ data.foldername +'</div>'
      //                       + '<div class="speak">讲师</div>'
      //                       + '<div class="popularity">'+ data.viewnum+'</div>'
      //                       + '<div class="number">'+ data.studynum +'</div>'
      //         element.attr('datacoruse', data.itemid)
      //         element.find('.editCourse').remove()
      //         element.append(courseHtm)
      //       })
      //       break
      //     case 'player': 
      //       self.$refs.player.show()
      //       break
      //     }
      //   return false
      // } else {
      //   preTime = Date.parse(new Date())
      // }     
    })  
  }
}

exports.tool = tool