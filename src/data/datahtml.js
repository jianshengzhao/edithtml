var datahtml = {
  toallGroup: { // 左侧菜单配置
    basic: [
      {
        name: 'rectangle',
        icon: 'icon-widget-rectangle',
        text: '矩形'
      },
      {
        name: 'radius',
        icon: 'icon-widget-circle',
        text: '圆角'
      },
      {
        name: 'text',
        icon: 'icon-widget-text',
        text: '文字'
      },
      {
        name: 'editor',
        icon: 'icon-widget-textarea',
        text: '富文本'
      },
      {
        name: 'picture',
        icon: 'icon-widget-img',
        text: '图片'
      },
      {
        name: 'button',
        icon: 'icon-widget-btn',
        text: '按钮'
      },
      {
        name: 'hline',
        icon: 'icon-widget-horizontal-line',
        text: '横线'
      },
      {
        name: 'sline',
        icon: 'icon-widget-vertical-line',
        text: '竖线'
      }
    ],
    online: [
      {
        name: 'pageHeader',
        icon: 'icon-widget-input',
        text: '页头'
      },
      {
        name: 'navigation',
        icon: 'icon-widget-search-input',
        text: '导航搜索'
      },
      {
        name: 'carousel',
        icon: 'imgicon icon-carousel',
        text: '轮播图'
      },
      {
        name: 'addcoursetype',
        icon: 'imgicon icon-classification',
        text: '课程分类'
      },
      {
        name: 'audition',
        icon: 'imgicon icon-audition',
        text: '免费试听'
      }
    ],
    todo: [
      {
        name: 'WeChat',
        icon: 'mb icon-wechat',
        text: '微信公众号'
      },
      {
        name: 'schoolProfile',
        icon: 'imgicon icon-introduce',
        text: '网校介绍'
      },
      {
        name: 'hotLabel',
        icon: 'icon-widget-icon-label',
        text: '热门标签'
      },
      {
        name: 'news',
        icon: 'icon-widget-sticker',
        text: '新闻资讯'
      },
      {
        name: 'enlist',
        icon: 'icon-widget-sticker',
        text: '最新报名'
      },
      {
        name: 'dynamics',
        icon: 'icon-widget-sticker',
        text: '学员动态'
      },
      {
        name: 'dynamics',
        icon: 'icon-widget-sticker',
        text: '学员评价'
      },
      {
        name: 'dynamics',
        icon: 'icon-widget-sticker',
        text: '名师团队'
      },
      {
        name: 'dynamics',
        icon: 'icon-widget-sticker',
        text: '网校应用'
      }
    ],
    expect: []
  },
  // 模块配置项
  rectangle: {
    style: 'width: 200px; height: 50px',
    html: '<div class="rectangle module" datatext="矩形"></div>'
  },
  radius: {
    style: 'width:100px; height:100px',
    html: '<div class="radius module"  datatext="圆角"></div>'
  },
  text: {
    style: 'width:200px; height:30px',
    html: '<div class="text module"  datatext="文字"><div class="promptBox">修改文字</div>啦啦啦我是文字模块</div>'
  },
  editor: {
    style: 'width:400px; height:400px',
    html: '<div class="editor module"  datatext="富文本"><div class="promptBox">修改</div></div>'
  },
  picture: {
    style: 'width:200px; height:120px',
    html: '<div class="picture module"  datatext="图片"><div class="promptBox">修改图片</div><div class="picBox"><img></div></div>'
  },
  button: {
    style: 'width:80px; height:30px',
    html: '<div class="button module"  datatext="按钮"><div class="promptBox">按钮设置</div><a target="_blank">按钮</a></div>'
  },
  hline: {
    style: 'width:200px; height:1px',
    html: '<div class="hline module"  datatext="横线"></div>'
  },
  sline: {
    style: 'width:1px; height:200px',
    html: '<div class="sline module"  datatext="竖线"></div>'
  },
  pageHeader: {
    style: 'width:1200px; height:140px',
    html: ' <div class="pageHeader module" datatext="页头"><div class="promptBox">页头设置</div><div class="imgbox"><img src="http://static.ebanhui.com/ebh/tpl/newschoolindex/images/module_header_logo.jpg"></div></div>'
  },
  navigation: {
    style: 'width:1200px; height:50px',
    html: '<div class="navigation module" datatext="导航栏"><div class="promptBox">导航栏设置</div><div class="navaBox"><a href="">主页</a><a href="">网校简介</a><a href="">新闻资讯</a><a href="">联系我们</a><a href="">全校新闻</a><a href="">网校发布</a><a href="">在线商城</a></div><div class="login_box"><a class="reg" href="">注册</a><a class="log" href="">登录</a></div><div class="search_box"><input name="txtname" class="inp_search" id="search" placeholder="搜索关键字" type="text"><input class="btn-search" value="" type="button"></div></div>'
  },
  audition: {
    style: 'width:190px; height:120px',
    html: '<div class="audition module"  datatext="免费试听"><div class="promptBox">免费试听设置</div><a dataHref="" target="_blank"><img><div class="audiTit">免费试听课件</div></a></div>'
  },
  WeChat: {
    style: 'width:305px; height:330px',
    html: '<div class="WeChat module" datatext="微信公众号"><div class="mod-title">微信公众号</div><div class="QRcode"><img id="qrcode" src="http://img.ebanhui.com/aroomv3/2017/04/05/14913725413033.jpg" ></div></div>'
  },
  schoolProfile: {
    style: 'width:900px; height:330px',
    html: '<div class="schoolProfile module" datatext="新闻资讯"><div class="mod-title">新闻资讯</div><div class="profile"><img id="badge" src="http://img.ebanhui.com/aroomv3/2017/07/04/14991557204386_220_220.jpg" >~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非 ~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非 ~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非 ~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复...</div></div>'
  },
  hotLabel: {
    style: 'width:305px; height:330px',
    html: '<div class="hotLabel module" datatext="新闻资讯"><div class="mod-title">新闻资讯</div><div class="hotLabelList"><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div></div></div>'
  },
  news: {
    style: 'width:1200px; height:330px',
    html: '<div class="news module" datatext="新闻资讯"><div class="promptBox">新闻资讯设置</div><div class="mod-title">新闻资讯</div><div class="newsList"><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg" /></div><div class="news_li_right"><h3><span class="news_title">1111111111111111111</span><span class="times">1994-11-16</span></h3><p class="news_cont">1111111111111111111111111111111111111111111111111111111111111111111111111111</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg" /></div><div class="news_li_right"><h3><span class="news_title">1111111111111111111</span><span class="times">1994-11-16</span></h3><p class="news_cont">1111111111111111111111111111111111111111111111111111111111111111111111111111</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg" /></div><div class="news_li_right"><h3><span class="news_title">1111111111111111111</span><span class="times">1994-11-16</span></h3><p class="news_cont">1111111111111111111111111111111111111111111111111111111111111111111111111111</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg" /></div><div class="news_li_right"><h3><span class="news_title">1111111111111111111</span><span class="times">1994-11-16</span></h3><p class="news_cont">1111111111111111111111111111111111111111111111111111111111111111111111111111</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg" /></div><div class="news_li_right"><h3><span class="news_title">1111111111111111111</span><span class="times">1994-11-16</span></h3><p class="news_cont">1111111111111111111111111111111111111111111111111111111111111111111111111111</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg" /></div><div class="news_li_right"><h3><span class="news_title">1111111111111111111</span><span class="times">1994-11-16</span></h3><p class="news_cont">1111111111111111111111111111111111111111111111111111111111111111111111111111</p></div></div></div></div>'
  },
  enlist: {
    style: 'width:305px; height:330px',
    html: '<div class="enlist module" datatext="最新报名"><div class="mod-title">最新报名</div><div class="enlistList"><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div></div></div>'
  },
  dynamics: {
    style: 'width:305px; height:330px',
    html: '<div class="dynamics module" datatext="网校应用"><div class="mod-title">学员动态</div><div class="dynamicsList"><div class="dynamics_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/m_man_50_50.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div></div></div>'
  },
  carousel: {
    style: 'width:1200px; height:320px',
    html: '<div class="carousel module" datatext="轮播图"><div class="promptBox">轮播图设置</div><div class="screenBox"><div class="img_ul"><div class="img_li"><img src="http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg"></div></div><div class="barbox"><li></li><li></li><li></li></div></div></div>'
  },
  addcoursetype: {
    style: 'width: 200px; height: 217px',
    html: '<div class="addcoursetype module" datatext="课程分类"><div class="promptBox">分类设置</div><div class="courseclassification"><div class="nav"><ul id="coursenav_ul" class="theme_4"><li class="first_li"><p class="allcourse">全部课程</p><ul class="second_mune_ul"><li><h3 class="nav-first"><a class="first-link" href="/platform-1-0-0.html?pid=2143" title="大黄专属视频课程服务包">大黄专属视频课程服</a></h3><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><div class="first_li_three_mune"><h2 class="nav-second"><a class="second-link" href="/platform-1-0-0.html?pid=2143" title="大黄专属视频课程服务包">大黄专属视频课程服务包</a></h2><a class="nav-third_line" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a></div></li><li><h3 class="nav-first"><a class="first-link" href="/platform-1-0-0.html?pid=995" title="本校免费课程艾丝凡">本校免费课程艾丝凡</a></h3></li><li class="morey"><div class="fosnte"><a href="/platform.html">更多</a></div></li></ul></li></ul></div></div></div>'
  }
}
exports.datahtml = datahtml
