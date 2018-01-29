  
  exports.bindKeydownEvent = function (self, me) { // 键盘按下事件》》快捷操作
    me.doc.unbind('keydown keyup')
    me.doc.keydown(function (e) { // 键盘方向键微调移动模块事件
      let module = me.$('.on_module')
      let len = module.length
      let keyObj = {
        '38': [true, 'top', -1, 'inp_y'],
        '40': [true, 'top', 1, 'inp_y'],
        '37': [true, 'left', -1, 'inp_x'],
        '39': [true, 'left', 1, 'inp_x']
      }
      if (len > 0) {
        let key = keyObj[e.keyCode]
        if (key) { // 方向键微调位置
          if (me.$(e.target)[0].nodeName != 'INPUT') {
            let moveXY = parseInt(self[key[3]]) + key[2]
            me.carryModuleOperationEvent(self, key[1], moveXY)
            e.preventDefault()
            return false
          }
        }
        if (e.keyCode == 46) { // 删除
          if (me.$(e.target).get(0).tagName == 'BODY' || me.$(e.target).parent().hasClass('loginbox')) {
            me.carryModuleOperationEvent(self, 'delete')
          }
        }        
      }
      me.ctrlKey = false
      if(e.ctrlKey){
        me.ctrlKey = true
        if (me.$(e.target)[0].nodeName != 'INPUT') {
          switch (e.keyCode) {
            case 67: //  ctrl + C 复制
              if (len > 0) {
                me.carryModuleOperationEvent(self, 'copy')
              }            
              break
            case 86: // ctrl + V 粘贴 
              if (self.clipboard) {
                me.carryModuleOperationEvent(self, 'paste', 'ctrl+V')
              }
              break
            case 65: // ctrl + A 全选  // todolist:全选去除子元素
              e.preventDefault();
              // me.cleanSignEvent(self) // 清除属性栏的值
              if (me.$('.c_top .hoverbar').is(":hidden") && me.$('.c_foot .hoverbar').is(":hidden") ){
                parent = 'c_body'
              }else if (!me.$('.c_top .hoverbar').is(":hidden") && me.$('.c_foot .hoverbar').is(":hidden") ){
                parent = 'c_top'
              }else if (me.$('.c_top .hoverbar').is(":hidden") && !me.$('.c_foot .hoverbar').is(":hidden")){
                parent = 'c_foot'
              }
              let eles = me.$('.' + parent + '>.module ')
              for (let i = 0, len = eles.length; i < len; i++) { // 判断是否在选区内
                let item = eles.eq(i)
                item.addClass('on_module').append('<div class="multiBox" style="width:' + (item.xb - item.xt)+ 'px;height:' + (item.yb - item.yt) + 'px;top: -' + item.br + 'px;left:-' + item.br + 'px"></div>')
              }
              me.storage.screenElement(self, me)          
              break
          }
        }
      } 
    })
    me.doc.keyup(function(e) {
      me.ctrlKey = false     
    })
  }

  exports.bindContextmenuEvent = function (self, me) { // 右键菜单栏
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
        if (me.$(e.target).hasClass('player') || me.$(e.target).parents('.module').hasClass('player')) {
          self.onlybloo = false
        } else {
          self.onlybloo = true
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
  }