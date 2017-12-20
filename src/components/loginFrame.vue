<template>
  <div id="loginFrame">
   
  </div>
</template>

<script>

import $ from 'jquery'
export default {
  name: 'loginFrame',
  components: {
  },
  data () {
    return {      
    }
  },
  created: function () {   
    let self = this
    let moduleData = self.$parent.datahtml
  // ------------- loginbox ----------------------
    moduleData['toallGroup']['basic'].push({      
      name: 'loginbox',
      icon: 'imgicon icon-login',
      text: '登录框'      
    })
   
    moduleData['loginbox'] = { 
      style: '',
      tool: {
        private: {
          text: '编辑文本',
          class: 'st-logintext'
        },
        public: []
      },    
      createEvent: function (self, element, me) { // 模块创建事件 
        if (me.$('.loginbox').length > 1) {
          self.$notify({
            title: '警告',
            message: '您已经添加过登录框',
            type: 'warning'
          })
          element.remove()
        } else {
          let box = element.parent()
          let loginHtml = '<div class="loginbox password module addmodule"  datatext="密码"><input name="password" id="password" type="password" maxlength="20" class="txtpass" placeholder="请输入密码"></div><div class="loginbox loginbutton module addmodule"  datatext="登录按钮"><input id="signbtnsubmit" class="signbtn" value="立即登录" name="Submit" type="submit"></div>'
          box.append(loginHtml)
          let x = parseInt(element.css('left'))
          let y = parseInt(element.css('top'))
          let AddElement = box.children('.addmodule')
          for (let i = 1,len = AddElement.length; i < len; i++) {
            let yg = y + i * 60
            let item = AddElement.eq(i)
            item.css({'top': yg, 'left': x})            
            me.carryAddElementStorageEvent(self, box, item, yg, x)                        
          }          
        }      
      },
      html: '<div class="loginbox username module addmodule"  datatext="账号"><input name="username" id="username" class="txtarea" placeholder="请输入用户名/手机号/邮箱"></div>'
    } 
  // -------------  ---------------
    moduleData['toallGroup']['basic'].push({      
      name: 'LoginRegister',
      icon: 'imgicon icon-login',
      text: '注册|登录'      
    })
   
    moduleData['LoginRegister'] = {
      style: 'width:132px; height:40px',
      tool: {
        private: {
          text: '',
          class: ''
        },
        public: []
      },
      createEvent: function (self, element, me) {
        if (me.$('.LoginRegister').length > 1) {
          self.$notify({
            title: '警告',
            message: '登录|注册已添加',
            type: 'warning'
          })
          element.remove()
        }
      },
      html: '<div class="LoginRegister module addmodule" datatext="注册/登录"><div id="LoginRegister"> <a class="registerEvent">注册</a>  |  <a class="loginEvent">登录</a> </div></div>'
    }
  },
  methods: {
    show: function () {
    }
  }
}
</script>
<style >
  
</style>
