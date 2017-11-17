var configHtml = {
  config:{
    stretchLimit: false, // 是否开启module拉伸限制
    moveLimit: false, // 是否开启module移动限制
    paddingtop: 35, // top栏高度
    paddingleft: 133, // left栏高度
    postop: 80, // editbox  top值
    posleft: 1000, // editbox  left值
    fuzzyVal: 6,// 模糊度
    choiceCon: true // 多选模块： ture 模糊选择，false为全部选中
  },
  toallGroup: { // 左侧菜单配置
    basic: [
      {
        name: 'rectangle',
        icon: 'imgicon icon-rectangle',
        text: '矩形'
      },
      {
        name: 'radius',
        icon: 'imgicon icon-round',
        text: '圆形'
       },
      {
        name: 'editor',
        icon: 'imgicon icon-text',
        text: '文本'
      },
      {
        name: 'picture',
        icon: 'imgicon icon-picture',
        text: '图片'
      },
      {
        name: 'button',
        icon: 'imgicon icon-button',
        text: '按钮'
      },
      {
        name: 'hline',
        icon: 'imgicon icon-level_Line',
        text: '横线'
      },
      {
        name: 'sline',
        icon: 'imgicon icon-vertical_Line',
        text: '竖线'
      },
      {
        name: 'taxonomy',
        icon: 'imgicon icon-classify',
        text: '分类'
      },
      {
        name: 'loginbox',
        icon: 'imgicon icon-login',
        text: '登录框'
      },      
      {
        name: 'waiter',
        icon: 'imgicon icon-waiter',
        text: '客服'
      }
    ],
    online: [
      {
        name: 'carousel',
        icon: 'imgicon icon-carousel',
        text: '轮播'
      },
      {
        name: 'advert',
        icon: 'imgicon icon-advert',
        text: '悬浮广告'
      },      
      {
        name: 'teacher',
        icon: 'imgicon icon-teacher',
        text: '教师'
      },     
      {
        name: 'audition',
        icon: 'imgicon icon-audition',
        text: '试听'
      },      
      {
        name: 'course',
        icon: 'imgicon icon-course',
        text: '课程'
      },
      {
        name: 'information',
        icon: 'imgicon icon-information',
        text: '资讯'
      },
      {
        name: 'addcoursetype',
        icon: 'imgicon icon-addcoursetype',
        text: '课程导航'
      },
      {
        name: 'player',
        icon: 'imgicon icon-player',
        text: '播放器'
      },
      {
        name: 'schoollogo',
        icon: 'imgicon icon-logo',
        text: 'LOGO'
      },
      {
        name: 'schoolmap',
        icon: 'imgicon icon-map',
        text: '地图'
      },
      {
        name: 'schoolqr',
        icon: 'imgicon icon-QRcode',
        text: '二维码'
      },
      // {
      //   name: 'weather',
      //   icon: 'imgicon icon-weather',
      //   text: '天气'
      // },
      {
        name: 'introduce',
        icon: 'imgicon icon-introduce',
        text: '网校介绍'
      }
    ],
    todo: [],
    expect: []
  },
  supendTools: { // 悬浮工具栏 样式class集合
    a: ['st-prospect','前景特效'], // 前景特效
    b: ['st-effects','悬浮特效'], // 悬浮特效
    c: ['st-shape', '图片形状'],// 图片形状
    d: ['st-animate', '动画效果'],// 动画效果
    e: ['st-link', '链接'],// 链接
  },
  // 模块配置项
  rectangle: {
    style: 'width: 200px; height: 50px',
    tool: {
      private: {
        text: '',
        class: ''
      }, // 私有工具
      public: [ 'd', 'e'] // 公有工具
    },
    html: '<div class="rectangle module addmodule" datatext="矩形"><a></a></div>'
  },
  radius: {
    style: 'width:100px; height:100px',
    tool: {
      private: {
        text: '',
        class: ''
      },
      public: [ 'd', 'e']
    },
    html: '<div class="radius module addmodule"  datatext="圆形"><a></a></div>'
  },
  editor: {
    style: 'width:400px; height:200px',
    tool: {
      private: {
        text: '编辑文本',
        class: 'st-text'
      },
      public: ['e']
    },
    html: '<div class="editor module addmodule"  datatext="富文本"><a><div class="editorCon"></div></a></div>'
  },
  picture: {
    style: 'width:243px; height:144px',
    tool: {
      private: {
        text: '编辑图片',
        class: 'st-picture'
      },
      public: ['b', 'c', 'd', 'e']
    },
    html: '<div class="picture module addmodule"  datatext="图片"><a class="picBox"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"></a></div>'
  },
  button: {
    style: 'width:80px; height:30px',
    tool: {
      private: {
        text: '设置样式',
        class: 'st-style'
      }, 
      public: ['e']
    },
    html: '<div class="button module addmodule"  datatext="按钮"><a target="_blank">按钮</a></div>'
  },
  carousel: {
    style: 'width:1200px; height:320px',
    tool: {
      private: {
        text: '编辑轮播',
        class: 'st-carousel'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.carousel.show(self, element)
    },
    html: '<div class="carousel module addmodule" datatext="轮播图"><div class="screenBox"><div class="img_ul"><div class="img_li"><img src="http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner1.jpg"></div></div><div class="barbox"><li></li><li></li><li></li></div></div></div>'
  },
  advert: {
    style: 'width:300px; height:150px',
    tool: {
      private: {
        text: '编辑广告',
        class: 'st-advert'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.advert.show(self, element)
    },
    html: '<div class="advert module addmodule"  datatext="悬浮广告"><div class="advCon"></div></div>'
  },
  information: {
    style: 'width:1200px;',
    tool: {
      private: {
        text: '编辑资讯',
        class: 'st-information'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.information.show(self,element)
    },
    html: '<div class="information module addmodule" datatext="资讯"><div class="inforCon"></div></div>'
  },
  waiter: {
    style: 'width:50px; height:50px',
    tool: {
      private: {
        text: '编辑客服',
        class: 'st-waiter'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {          
      self.$refs.waiter.show(self, element)
      if (me.$('.waiter').length < 3) {
        me.editBox.append('<div class="waiter "><div class="kf-head"></div><div class="kf-top"></div></div>')
        me.$('.waiter').on('click', function() {
          self.$refs.waiter.show(self, element)
        })
      } else {
        element.remove()
      }     
    },
    html: '<div class="waiter module addmodule" style="display:none;" datatext="客服"><div class="kf-head"></div><div class="kf-top"></div></div>'
  },
  course: {
    style: 'width:260px; height:220px',
    tool: {
      private: {
        text: '编辑课程',
        class: 'st-course'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.course.show(self, element, me, 'course')      
    },
    html: '<div class="course module addmodule" datatext="课程"><div class="editAdd"><div class="add-icon"></div></div></div>'
  },
  audition: {
    style: 'width:190px; height:120px',
    tool: {
      private: {
        text: '编辑试听',
        class: 'st-audition'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.course.show(self, element, me, 'audition')      
    },
    html: '<div class="audition module addmodule"  datatext="免费试听"><div class="editAdd"><div class="add-icon"></div></div></div>'
  },
  teacher: {
    style: 'width: 247px; height: 228px',
    tool: {
      private: {
        text: '编辑教师',
        class: 'st-teacher'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.course.show(self, element, me, 'teacher')      
    },
    html: '<div class="teacher module addmodule"  datatext="教师"><div class="editAdd"><div class="add-icon"></div></div></div>'
  },
  player: {
    style: 'width:940px; height:562px',
    tool: {
      private: {
        text: '编辑视频',
        class: 'st-player'
      }, 
      public: []
    },
    createEvent: function (self, element, me) { 
      if (me.$('.player').length > 1) {
        self.$notify({
          title: '警告',
          message: '您已经添加过播放器',
          type: 'warning'
        }) 
        element.remove()
      } else {
        self.$refs.player.show(self, element, me)
      }     
    },
    html: '<div class="player module addmodule" datatext="播放器"><div class="editPlayer"><img class="cover"></div><div class="rightMenu"></div></div>'
  },
  hline: {
    style: 'width:200px; height:1px',
    tool: {
      private: {
        text: '',
        class: ''
      }, 
      public: []
    },
    html: '<div class="hline module addmodule"  datatext="横线"><div class="click-hline"></div></div>'
  },
  sline: {
    style: 'width:1px; height:200px',
    tool: {
      private: {
        text: '',
        class: ''
      }, 
      public: []
    },
    html: '<div class="sline module addmodule"  datatext="竖线"><div class="click-sline"></div></div>'
  },
  taxonomy: {
    style: 'width:1200px;',
    tool: {
      private: {
        text: '',
        class: ''
      }, 
      public: []
    },
    createEvent: function (self, element, me) { // 入参: self指向主文件上下文, element生成的元素集合。// 生成模块时所触发的事件
      self.getcoursecategorys(element)
    },
    html: '<div class="taxonomy module addmodule" datatext="分类"><div class="click-taxonomy"></div><div class="taxonomycont"><ul class="fl allson"></ul><ul class="fl allsondouble"></ul><div style="clear: both;"></div></div></div>'
  },
  loginbox:{
    style: '',
    tool: {
      private: {
        text: '编辑文本',
        class: 'st-logintext'
      }, 
      public: []
    },
    createEvent: function (self, element, me) {      
      if (me.$('.loginbox').length > 3) {
        self.$notify({
          title: '警告',
          message: '您已经添加过登录框',
          type: 'warning'
        })
        element.remove()
      }
    },
    html: '<div class="loginbox username module addmodule"  datatext="账号"><input name="username" id="username" class="txtarea" placeholder="请输入用户名/手机号/邮箱"></div><div class="loginbox password module addmodule"  datatext="密码"><input name="password" id="password" type="password" maxlength="20" class="txtpass" placeholder="请输入密码"></div><div class="loginbox loginbutton module addmodule"  datatext="登录按钮"><input id="signbtnsubmit" class="signbtn" value="立即登录" name="Submit" type="submit"></div>',
    moduleMargin: 60 // 一次性添加多个模块才配置的模块间距
  },
  schoollogo: {
    style: 'width:220px; height:220px',
    tool: {
      private: {
        text: '',
        class: ''
      },
      public: ['b','c','d','e']
    },
    createEvent: function (self, element ,me) {
      	if (me.$('.schoollogo').length > 1) {
	        self.$notify({
	          title: '警告',
	          message: '您已经添加过LOGO',
	          type: 'warning'
	        })
	        element.remove()
	    }else{
      		self.createqr_logo(element)
	    }
    },
    html: '<div class="schoollogo picture module addmodule"  datatext="网校LOGO"><a class="picBox"><img src="" /></a></div>'
  },
  schoolmap: {
    style: 'width:935px; height:325px',
    tool: {
      private: {
        text: '',
        class: ''
      },
      public: []
    },
    createEvent: function (self, element, me) {   
    	if (me.$('.schoolmap').length > 1) {
	        self.$notify({
	          title: '警告',
	          message: '您已经添加过地图',
	          type: 'warning'
	        })
	        element.remove()
	    }else{
      		self.createmap(element)
	    }
    },
    html: '<div class="schoolmap module addmodule" datatext="地图"><div class="schoolmap_box" id="schoolmap"></div></div>'
  },
  schoolqr: {
    style: 'width:212px; height:212px',
    tool: {
      private: {
        text: '',
        class: ''
      },
      public: ['b','c','d']
    },
    createEvent: function (self, element) {
      self.createqr_logo(element)
    },
    html: '<div class="schoolqr picture module addmodule"  datatext="二维码"><a class="picBox"><img class="schoolqrimg" src="" /></a></div>'
  },
  introduce: {
    style: 'width:580px; height:145px',
    tool: {
      private: {
        text: '',
        class: ''
      },
      public: []
    },
    createEvent: function (self, element) {
      self.createintroduce(element)
    },
    html: '<div class="introduce module addmodule" datatext="网校介绍"><a class="picBox"></a></div>'
  },
  weather: {
    style: 'width:260px; height:140px',
    tool: {
      private: {
        text: '编辑天气',
        class: 'st-weather'
      },
      public: []
    },
    createEvent: function (self, element, me) {      
      self.$refs.weather.show(self,element)
    },
    html: '<div class="weather module addmodule" datatext="天气"><div class="weatherCon"></div></div>'
  },
  addcoursetype: {
    style: 'width: 200px; height: 90px',
    tool: {
      private: {
        text: '编辑导航',
        class: 'st-addcoursetype'
      },
      public: []
    },
    createEvent: function (self, element, me) {
      if (me.$('.addcoursetype').length > 1) {
          self.$notify({
            title: '警告',
            message: '您已经添加过课程分类',
            type: 'warning'
          })
          element.remove()
      }else{
        //self.$refs.addcoursetype.create(element)
      }
    },
    html: '<div class="addcoursetype module addmodule" datatext="课程分类"><div class="courseclassification"><div class="nav"><ul id="coursenav_ul" class="theme_4"><li class="first_li"><p class="allcourse">全部课程</p><ul class="second_mune_ul"><li class="morey"><div class="fosnte"><a href="/platform.html">更多</a></div></li></ul></li></ul></div></div></div>'
  }
  
}
exports.config = configHtml
