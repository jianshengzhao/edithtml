var datahtml = {
  toallGroup: { // 左侧菜单配置
    basic: [
      {
        name: 'rectangle',
        icon: 'imgicon icon-rectangle',
        text: '矩形'
      },
      {
        name: 'radius',
        icon: 'imgicon icon-radius',
        text: '圆形'
       },
      {
        name: 'editor',
        icon: 'imgicon icon-editor',
        text: '富文本'
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
      }
    ],
    online: [],
    todo: [],
    expect: []
  },
  supendTools: { // 悬浮工具栏 样式class集合
    a: 'st-prospect', // 前景特效
    b: 'st-effects', // 悬浮特效
    c: 'st-shape', // 图片形状
    d: 'st-animate', // 动画效果
    e: 'st-link' // 链接
  },
  // 模块配置项
  rectangle: {
    style: 'width: 200px; height: 50px',
    tool: {
      private: '', // 私有工具
      public: ['a', 'b', 'c', 'd', 'e'] // 公有工具
    },
    html: '<div class="rectangle module" datatext="矩形"></div>'
  },
  radius: {
    style: 'width:100px; height:100px',
    tool: {
      private: '',
      public: ['a', 'b', 'c', 'd', 'e']
    },
    html: '<div class="radius module"  datatext="圆形"></div>'
  },
  editor: {
    style: 'width:400px; height:200px',
    tool: {
      private: '编辑文本',
      public: ['a', 'b', 'c', 'e']
    },
    html: '<div class="editor module"  datatext="富文本"><div class="editorCon"></div></div>'
  },
  picture: {
    style: 'width:200px; height:120px',
    tool: {
      private: '编辑图片',
      public: ['a', 'b', 'c', 'd', 'e']
    },
    html: '<div class="picture module"  datatext="图片"><a class="picBox"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"></a></div>'
  },
  button: {
    style: 'width:80px; height:30px',
    tool: {
      private: '设置样式',
      public: ['e']
    },
    html: '<div class="button module"  datatext="按钮"><a target="_blank">按钮</a></div>'
  },
  carousel: {
    style: 'width:1200px; height:320px',
    html: '<div class="carousel module" datatext="轮播图"><div class="promptBox">轮播图设置</div><div class="screenBox"><div class="img_ul"><div class="img_li"><img src="http://static.ebanhui.com/ebh/tpl/newschoolindex/images/slide_banner1.jpg"></div></div><div class="barbox"><li></li><li></li><li></li></div></div></div>'
  }
}
exports.datahtml = datahtml
