var configHtml = {
  config:{
    stretchLimit: false, // 是否开启module拉伸限制
    moveLimit: false, // 是否开启module移动限制
    paddingtop: 36, // top栏高度
    paddingleft: 100, // left栏高度
    postop: 80, // editbox  top值
    posleft: 1000, // editbox  left值
    fuzzyVal: 6,// 模糊度
    choiceCon: true // 多选模块： ture 模糊选择，false为全部选中
  },
  toallGroup: { // 左侧菜单配置
    basic: [],
    online: [],
    todo: [],
    expect: []
  },
  supendTools: { // 悬浮工具栏 样式class集合
    a: ['st-prospect','前景特效'], // 前景特效
    b: ['st-effects','悬浮特效'], // 悬浮特效
    c: ['st-shape', '图片形状'],// 图片形状
    d: ['st-animate', '动画效果'],// 动画效果
    e: ['st-link', '链接'],// 链接
    f: ['st-pulldown', '下拉框'],// 下拉框
  }
}
exports.config = configHtml
