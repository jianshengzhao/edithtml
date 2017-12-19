  import tools from './tools' // 便捷工具、快捷键、右键菜单
  import adaptation from './adaptation' // 临时主操作界面集合js, 工具栏、左侧模块列表、右侧元素图层、参考虚线。ps:后期再细化
  import storage from './storage' // 元素存储、更新、多选、操作、模糊校准
  import module from './module' // 模块操作 todolist: 拉伸
  let tool = {
    tools: tools,
    adaptation: adaptation,
    storage: storage,
    module: module,
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
      adaptation.resizeToolBar(self, me)  
      adaptation.renderMenu(self, me)
      adaptation.computeLineHeight(me)
      me.libBox = me.$('.lib_box')
      me.libLi = me.libBox.find('.lib_li')
      me.copynum = 0
      me.bindEvent(self)
    },
    carryLineHeightEvent: function () { // 获取参考高度
      let me = this
      adaptation.computeLineHeight(me)
    },
    carrySignEvent: function (self, element) { // 标记模块并属性初始化
      let me = this
      module.getSign(self, element , me)
    },
    cleanSignEvent: function (self, element) { // 标记模块并属性还原默认值 注：禁止了图片拉伸
      let me = this
      module.cleanSign(self, me)     
    },
    carryLayerEvent: function (self, parent) { // 图层更新
      let me = this
      adaptation.renderLayer(self, parent)
    },
    carryAddElementStorageEvent: function (self, parent, AddElement, y, x, marginT) { // 区域存储(多选)   
      let me = this   
      storage.addStorage(self, parent, AddElement, y, x, marginT, this)
    },
    carryUpdateElementStorageEvent: function (self, parent, elements, deleteEle) { // 更新区域存储(多选)
      let me = this     
      storage.updateStorage(self, parent, elements, deleteEle)  
    },
    carryRegionChoiceEvent: function (self, e) { // 区域选中事件(多选)
      let me = this    
      storage.drawingRegion(self, me, e)
    },
    carryRegionChoiceSignEvent: function (self, element, elementX) { // 标记模块并属性初始化 (多选模块)
      let me = this
      storage.getRegionSign(self, element, elementX, me)      
    },
    carryFuzzyCalibrationEvent: function (self, parentClass, id, left, top, height, width, ele) { // 模糊校准
      let me = this     
      storage.fuzzyCalibration(self, parentClass, id, left, top, height, width, ele, me)
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
        case 'centerSpacing': // 水平等间距 PS:选择元素宽度超出1200px 禁止
          if (onModules.length > 1) {
            let midWs = 0
            let originalW = parseInt(self.original.css('width'))
            onModules.each(function () {
              let midW =  parseInt(me.$(this).css('width'))
              midWs += midW
            })
            if(midWs > originalW){
              self.$notify({
                title: '警告',
                message: '选中元素总宽度大于父级元素宽度、请重新选中',
                type: 'warning'
              });
              return false
            }
            part = function (ele,index) {
              let midLeft = (originalW - midWs)/ (onModules.length +1)
              let eleWs = 0;
              onModules.each(function (i,e) {
                if (index > i){
                  let midW =  parseInt(me.$(this).css('width'))
                  eleWs += midW
                }
              })
              ele.css('left', midLeft + index*midLeft + eleWs)
            }
          } else {
            self.$notify({
              title: '警告',
              message: '请选中多个元素再进行操作',
              type: 'warning'
            });
            return false
            part = function (ele) {
            }
          }
          break
        case 'middleSpacing': // 垂直等间距 PS:选择元素高度超出此元素父级
          if (onModules.length > 1) {
            let midHs = 0
            let originalH = parseInt(self.original.css('height'))
            onModules.each(function () {
              let midH =  parseInt(me.$(this).css('height'))
              midHs += midH
            })
            if(midHs > originalH){
              self.$notify({
                title: '警告',
                message: '选中元素总高度大于父级元素高度、请重新选中',
                type: 'warning'
              });
              return false
            }
            part = function (ele,index) {
              let midTop = (originalH - midHs)/ (onModules.length +1)
              let eleHs = 0;
              onModules.each(function (i,e) {
                if (index > i){
                  let midH =  parseInt(me.$(this).css('height'))
                  eleHs += midH
                }
              })
              ele.css('top', midTop + index*midTop + eleHs)
            }
          } else {
            self.$notify({
              title: '警告',
              message: '请选中多个元素再进行操作',
              type: 'warning'
            });
            return false
            part = function (ele) {
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
            if (!ele.hasClass('player')) {
              ele.find('.multiBox').remove()
              ele.find('.resizeBox').remove()
              ele.find('.supendTools').remove()
              self.clipboard += ele[0].outerHTML
              ele.remove()
            } else {
              self.$notify({
                title: '警告',
                message: '播放器禁止剪切',
                type: 'warning'
              });
            }
          }
          break
        case 'copy':
          self.clipboard = ''

          part = function (ele) {
            if (!ele.hasClass('player')) {
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
            let menuY
            let menuX
            if (val == 'ctrl+V') { // ctrl+V粘贴
              menuY = self.mousePageY
              menuX = self.mousePageX
              switch (self.original.attr('class')) {              
                case 'c_body':
                  menuY = menuY - parseInt(me.$('.c_top').css('height'))                 
                  break
                case 'c_foot':
                  menuY = menuY - parseInt(me.$('.c_top').css('height')) - parseInt($('.c_body').css('height'))             
                  break
              }
            } else {
              menuY = parseInt(me.contextmenu.css('top')) - me.space.scrollTop() + self.paddingtop
              menuX = parseInt(me.contextmenu.css('left')) - me.space.scrollLeft()
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
      onModules.each(function (i,e) { // 更新多选元素集合
        $this = me.$(this)
        part($this,i)
      })
      if (type == 'delete' || type == 'shear') {
        me.carryUpdateElementStorageEvent(self, self.original, onModules, 'delete')
      } else {
        me.carryUpdateElementStorageEvent(self, self.original, onModules)
      }
      adaptation.renderLayer(self, self.original)
      me.contextmenu.hide()
    },
    bindEvent: function (self) { // 绑定选中模块绑定事件事件
      let me = this
      adaptation.bindElDialogMousemoveEvent(me) // 弹框拖拽 
      adaptation.bindHoverbarMousemoveEvent(self, me) // 页头页尾调整
      adaptation.bindMenuEvent(self, me) // 模块菜单 收缩事件
      adaptation.bindLayerEvent(self, me) // 图层 收缩事件
      module.bindResizeDrawingEvent(self, me) // 模块圆点拉伸容器事件
      module.bindSupendToolsEvent(self, me) // 模块工具栏绑定事件
      module.bindModuleAClickEvent(self, me) // 去除a标签默认事件
      module.bindOnModulesMousedownEvent(self, me) // 选中模块拖拽事件
      module.bindEditBoxMousedownEvent(self, me)  // 点击模块之外时，还原默认值
      module.bindAddModuleMousedownEvent(self, me) // 模块列表操作事件,添加模块，拖动，取消
      module.bindModuleDblclickEvent(self, me) // 模块双击操作  
      storage.bindMultiBoxMousemoveEvent(self, me)  // 多选事件拖拽事件
      tools.bindKeydownEvent(self, me) // 键盘按下事件, 快捷工具    
      tools.bindContextmenuEvent(self, me) // 右键菜单栏 
    },
    tab:function (cls) { //tab标签页
      let me = this
      let obj = me.$(cls)

      obj.each(function () {
        let color = me.$(this).find('.tab_header').attr('color')
        let type =  me.$(this).find('.tab_header').attr('type')
        let ev =  me.$(this).find('.tab_header').attr('ev')
        if (color){
          if (type == 'padd'){
            me.$(this).find('.tab_header li.active').css('backgroundColor','#'+color)
          }else{
            me.$(this).find('.tab_header li.active').css('backgroundColor','')
            me.$(this).find('.tab_header li.active').css('color','#'+color)
          }
        }
        me.$(this).find('.tab_header li').unbind();
        me.$(this).find('.tab_header li').bind('click',function (e) {
          let color = me.$(this).parent().attr('color')
          let type =  me.$(this).parent().attr('type')
          let i = me.$(this).index();
          me.$(this).parent().find('li').removeClass('active')
          me.$(this).addClass('active')
          me.$(this).parent().siblings('.tab_content').find('li.cont').removeClass('active')
          me.$(this).parent().siblings('.tab_content').find('li.cont').eq(i).addClass('active')
          if (color){
            if (type == 'padd'){
              me.$(this).parent().find('li').css('color','#000000')
              me.$(this).parent().find('li').css('backgroundColor','')
              me.$(this).css('color','#ffffff')
              me.$(this).css('backgroundColor','#'+color)
            }else{
              me.$(this).parent().find('li.active').css('color','#'+color)
              me.$(this).parent().find('li').css('color','')
              me.$(this).css('color','#'+color)
            }

          }
        })
        if(ev == 'click'){
          me.$(this).find('.tab_header li').bind('click',function (e) {
            let color = me.$(this).parent().attr('color')
            let type =  me.$(this).parent().attr('type')
            var i = me.$(this).index();
            me.$(this).parent().find('li').removeClass('active')
            me.$(this).addClass('active')
            me.$(this).parent().siblings('.tab_content').find('li.cont').removeClass('active')
            me.$(this).parent().siblings('.tab_content').find('li.cont').eq(i).addClass('active')
            if (color){
              if (type == 'padd'){
                me.$(this).parent().find('li').css('color','#000000')
                me.$(this).parent().find('li').css('backgroundColor','')
                me.$(this).css('color','#ffffff')
                me.$(this).css('backgroundColor','#'+color)
              }else{
                me.$(this).parent().find('li.active').css('color','#'+color)
                me.$(this).parent().find('li').css('color','')
                me.$(this).css('color','#'+color)
              }
            }
          })

          me.$(this).find('.tab_header li').bind('mouseenter',function () {
            let color = me.$(this).parent().attr('color')
            let type =  me.$(this).parent().attr('type')
            if (color){
              if (type == 'padd'){
                me.$(this).css('backgroundColor','#' + color);
                me.$(this).css('color','#ffffff');
              }else{
                me.$(this).css('color','#' + color);
              }
            }
          })
          me.$(this).find('.tab_header li').bind('mouseleave',function () {
            let color = me.$(this).parent().attr('color')
            let type =  me.$(this).parent().attr('type')
            if (type == 'padd'){
              me.$(this).parent().find('li').css('backgroundColor','')
              me.$(this).parent().find('li').css('color','#000000')
              me.$(this).parent().find('li.active').css('backgroundColor','#'+color)
              me.$(this).parent().find('li.active').css('color','#ffffff')
            }else{
              me.$(this).css('color','');
              me.$(this).parent().find('li.active').css('color','#'+color)
            }
          })
        }else{
          me.$(this).find('.tab_header li').bind('mouseenter',function () {
            let color = me.$(this).parent().attr('color')
            let type =  me.$(this).parent().attr('type')
            var i = me.$(this).index();
            me.$(this).parent().find('li').removeClass('active')
            me.$(this).addClass('active')
            me.$(this).parent().siblings('.tab_content').find('li.cont').removeClass('active')
            me.$(this).parent().siblings('.tab_content').find('li.cont').eq(i).addClass('active')
            if (color){
              if (type == 'padd'){
                me.$(this).parent().find('li').css('backgroundColor','')
                me.$(this).parent().find('li').css('color','#000000')
                me.$(this).css('backgroundColor','#' + color);
                me.$(this).css('color','#ffffff');
              }else{
                me.$(this).parent().find('li').css('color','#000000')
                me.$(this).css('color','#' + color);
              }

            }
          })
        }

      })
    },
    up_downhover:function (cls) {
      let me = this
      let obj = me.$(cls)
      obj.each(function () {
        me.$(this).hover(function () {
          me.$(this).find('.el-icon-arrow-up').show()
          me.$(this).find('.el-icon-arrow-down').hide()
        },function () {
          me.$(this).find('.el-icon-arrow-up').hide()
          me.$(this).find('.el-icon-arrow-down').show()
        })
      }
      )
    },
    editBoxmouseup:function (self,type) {
      let me = this
    },
    suspendfixed:function (cls) {

    }
  }
export default tool

