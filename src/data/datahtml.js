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
        text: '圆角'
      },
      {
        name: 'text',
        icon: 'imgicon icon-text',
        text: '文字'
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
      },
      {
        name: 'hline',
        icon: 'imgicon icon-hline',
        text: '横线'
      },
      {
        name: 'sline',
        icon: 'imgicon icon-sline',
        text: '竖线'
      }
    ],
    online: [
      {
        name: 'pageHeader',
        icon: 'imgicon icon-pageHeader',
        text: '页头'
      },
      {
        name: 'navigation',
        icon: 'imgicon icon-navigation',
        text: '导航栏'
      },
      {
        name: 'carousel',
        icon: 'imgicon icon-carousel',
        text: '轮播图'
      },
      {
        name: 'addcoursetype',
        icon: 'imgicon icon-addcoursetype',
        text: '课程分类'
      },
      {
        name: 'audition',
        icon: 'imgicon icon-audition',
        text: '免费试听'
      },
      {
        name: 'news',
        icon: 'imgicon icon-news',
        text: '新闻资讯'
      },
      {
        name: 'course',
        icon: 'imgicon icon-course',
        text: '课程'
      },
      {
        name: 'login',
        icon: 'imgicon icon-login',
        text: '用户登录'
      },
      {
        name: 'thirdlogin',
        icon: 'imgicon icon-thirdlogin',
        text: '第三方登录'
      },
      {
        name: 'userregistration',
        icon: 'imgicon icon-userregistration',
        text: '用户注册'
      },
      {
        name: 'forgotpassword',
        icon: 'imgicon icon-forgotpassword',
        text: '忘记密码'
      },
      {
        name: 'sethomepage',
        icon: 'imgicon icon-sethomepage',
        text: '设为主页'
      },
      {
        name: 'collection',
        icon: 'imgicon icon-collection',
        text: '收藏'
      },
      {
        name: 'theteacherteam',
        icon: 'imgicon icon-theteacherteam',
        text: '名师团队'
      },
      {
        name: 'contactway',
        icon: 'imgicon icon-contactway',
        text: '联系方式'
      },
      {
        name: 'schoolProfile',
        icon: 'imgicon icon-schoolProfile',
        text: '网校介绍'
      }
    ],
    todo: [
      {
        name: 'WeChat',
        icon: 'mb icon-wechat',
        text: '微信公众号'
      },
      {
        name: 'hotLabel',
        icon: 'icon-widget-icon-label',
        text: '热门标签'
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
    html: '<div class="text module"  datatext="文字"><div class="promptBox">修改文字</div><a>啦啦啦我是文字模块</a></div>'
  },
  editor: {
    style: 'width:400px; height:400px',
    html: '<div class="editor module"  datatext="富文本"><div class="promptBox">编辑富文本</div><div class="editorCon"></div></div>'
  },
  picture: {
    style: 'width:200px; height:120px',
    html: '<div class="picture module"  datatext="图片"><div class="promptBox">修改图片</div><a class="picBox"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"></a></div>'
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
    html: '<div class="navigation module" datatext="导航栏"><div class="promptBox">导航栏设置</div><div class="navaBox"><a href="/index.html">主页</a><a href="/introduce.html">网校简介</a><a href="/news.html">新闻资讯</a><a href="/contact.html">联系我们</a><a href="/navcm/1.html">全校新闻</a><a href="/publish.html">网校发布</a><a href="/shop.html">在线商城</a></div><div class="login_box wrap_login"><a class="reg reginpage" id="nav-reginpage" href="javascript:;">注册</a><a class="log" id="nav-login" href="javascript:;">登录</a></div><div class="search_box"><input name="txtname" class="inp_search" id="search" placeholder="搜索关键字" type="text"><input class="btn-search" value="" type="button"></div></div>'
  },
  audition: {
    style: 'width:190px; height:120px',
    html: '<div class="audition module"  datatext="免费试听"><div class="promptBox">免费试听设置</div><a target="_blank"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><div class="audiTit">免费试听课件</div></a></div>'
  },
  course: {
    style: 'width:260px; height:220px',
    html: '<div class="course module" datatext="课程"><div class="promptBox">课程设置</div><div class="imgbox"><div class="listBox"><a class="animateBox">课程</a><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><div class="openState openState_djbmbg1"></div></div></div><div class="courseTit">课程名称</div><div class="speak">讲师</div><div class="popularity">6999</div><div class="number">199</div></div>'
  },
  WeChat: {
    style: 'width:305px; height:330px',
    html: '<div class="WeChat module" datatext="微信公众号"><div class="mod-title">微信公众号</div><div class="QRcode"><img id="qrcode" src="http://img.ebanhui.com/aroomv3/2017/04/05/14913725413033.jpg" ></div></div>'
  },
  schoolProfile: {
    style: 'width:900px; height:330px',
    html: '<div class="schoolProfile module" datatext="新闻资讯"><div class="mod-title">新闻资讯</div><div class="profile"><img id="badge" src="http://static.ebanhui.com/ebh/tpl/2012/images/face/2.jpg" >~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非 ~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非 ~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复复分发分反反复复反反复复反反复复反反复复反反复复反反复复反反复复分非 ~！@#￥%……&*（）——+反反复复反反复复反反复复反反复复反反复复反反复复反反复...</div></div>'
  },
  hotLabel: {
    style: 'width:305px; height:330px',
    html: '<div class="hotLabel module" datatext="新闻资讯"><div class="mod-title">新闻资讯</div><div class="hotLabelList"><div class="hl_li">新闻资讯</div><div class="hl_li">新闻资讯</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div><div class="hl_li">123123</div></div></div>'
  },
  news: {
    style: 'width:1200px; height:330px',
    html: '<div class="news module" datatext="新闻资讯"><div class="promptBox">新闻资讯设置</div><div class="mod-title">新闻资讯</div><div class="newsList"><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg" /></div><div class="news_li_right"><h3><span class="news_title">新闻资讯</span><span class="times">2017-8-22</span></h3><p class="news_cont">新闻资讯新闻资讯新闻资讯新闻资讯</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg" /></div><div class="news_li_right"><h3><span class="news_title">新闻资讯</span><span class="times">2017-8-22</span></h3><p class="news_cont">新闻资讯新闻资讯新闻资讯新闻资讯</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg" /></div><div class="news_li_right"><h3><span class="news_title">新闻资讯</span><span class="times">2017-8-22</span></h3><p class="news_cont">新闻资讯新闻资讯新闻资讯新闻资讯</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg" /></div><div class="news_li_right"><h3><span class="news_title">新闻资讯</span><span class="times">2017-8-22</span></h3><p class="news_cont">新闻资讯新闻资讯新闻资讯新闻资讯</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg" /></div><div class="news_li_right"><h3><span class="news_title">新闻资讯</span><span class="times">2017-8-22</span></h3><p class="news_cont">新闻资讯新闻资讯新闻资讯新闻资讯</p></div></div><div class="news_li"><div class="news_li_left"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg" /></div><div class="news_li_right"><h3><span class="news_title">新闻资讯</span><span class="times">2017-8-22</span></h3><p class="news_cont">新闻资讯新闻资讯新闻资讯新闻资讯</p></div></div></div></div>'
  },
  enlist: {
    style: 'width:305px; height:330px',
    html: '<div class="enlist module" datatext="最新报名"><div class="mod-title">最新报名</div><div class="enlistList"><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div></div></div>'
  },
  dynamics: {
    style: 'width:305px; height:330px',
    html: '<div class="dynamics module" datatext="网校应用"><div class="mod-title">学员动态</div><div class="dynamicsList"><div class="dynamics_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div><div class="enlist_li"><img src="http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_243_144.jpg"><p>asdadadsa</p><div class="openservice">asada<a>开通</a></div></div></div></div>'
  },
  carousel: {
    style: 'width:1200px; height:320px',
    html: '<div class="carousel module" datatext="轮播图"><div class="promptBox">轮播图设置</div><div class="screenBox"><div class="img_ul"><div class="img_li"><img src="http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg"></div></div><div class="barbox"><li></li><li></li><li></li></div></div></div>'
  },
  addcoursetype: {
    style: 'width: 200px; height: 217px',
    html: '<div class="addcoursetype module" datatext="课程分类"><div class="promptBox">分类设置</div><div class="courseclassification"><div class="nav"><ul id="coursenav_ul" class="theme_4"><li class="first_li"><p class="allcourse">全部课程</p><ul class="second_mune_ul"><li><h3 class="nav-first"><a class="first-link" href="/platform-1-0-0.html?pid=2143" title="大黄专属视频课程服务包">大黄专属视频课程服</a></h3><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><a class="link-nav-hot" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a><div class="first_li_three_mune"><h2 class="nav-second"><a class="second-link" href="/platform-1-0-0.html?pid=2143" title="大黄专属视频课程服务包">大黄专属视频课程服务包</a></h2><a class="nav-third_line" href="/platform-1-0-0.html?pid=2143&amp;sid=3766" title="M3U8切片视频">M3U8切片视频</a></div></li><li><h3 class="nav-first"><a class="first-link" href="/platform-1-0-0.html?pid=995" title="本校免费课程艾丝凡">本校免费课程艾丝凡</a></h3></li><li class="morey"><div class="fosnte"><a href="/platform.html">更多</a></div></li></ul></li></ul></div></div></div>'
  },
  login: {
    style: 'width: 285px; height: 210px',
    html: '<div class="login module" datatext="用户登录"><div class="promptBox">登录框设置</div><div class="denser"><input type="hidden" name="loginsubmit" value="1"><div class="chorejrxtxtarea"><span class="chorejrx"></span><input name="username" id="username" class="txtarea" placeholder="请输入用户名/手机号/邮箱"></div><div class="chorejrxtxtpass"><input name="password" id="password" type="password" maxlength="20" class="txtpass" placeholder="请输入密码"><a href="javascript:void(0)" id="passwordeye" class="invisible bgImg"></a></div><input id="signbtnsubmit" class="signbtn" value="立即登录" name="Submit" type="submit"></div></div>'
  },
  thirdlogin: {
    style: 'width: 248px; height: 30px',
    html: '<div class="thirdlogin module" datatext="第三方登录"><div class="promptBox">第三方登录设置</div><div class="aerire"><span class="fl">用其他账号登录：</span><a class="md-qq" href="http://www.ebh.net/otherlogin/qq.html?returnurl=http%3A%2F%2Fss.ebh.net"></a><a class="md-sina" href="http://www.ebh.net/otherlogin/sina.html?returnurl=http%3A%2F%2Fss.ebh.net"></a><a class="md-weixin" href="http://www.ebh.net/otherlogin/wx.html?returnurl=http%3A%2F%2Fss.ebh.net"></a></div></div>'
  },
  userregistration: {
    style: 'width: 52px; height: 20px',
    html: '<div class="userregistration module" datatext="用户注册"><a href="/forget.html">用户注册</a></div>'
  },
  forgotpassword: {
    style: 'width: 52px; height: 20px',
    html: '<div class="forgotpassword  module" datatext="忘记密码"><a href="/forget.html">忘记密码</a></div>'
  },
  sethomepage: {
    style: 'width: 52px; height: 20px',
    html: '<div class="sethomepage  module" datatext="设为主页"><a href="/forget.html">设为主页</a></div>'
  },
  collection: {
    style: 'width: 52px; height: 20px',
    html: '<div class="collection module" datatext="收藏"><a href="/forget.html">收藏</a></div>'
  },
  theteacherteam: {
    style: 'width: 247px; height: 228px',
    html: '<div class="theteacherteam module" datatext="名师团队"><div class="addtheteateam"><div class="addtea-icon"></div></div></div>'
  },
  contactway: {
    style: 'width: 340px; height: 122px',
    html: '<div class="contactway module" datatext="联系方式"><div class="contactwaycont"><div class="address">联系地址：杭州市</div><div class="address hotline">电话：15267131310</div><div class="address home">邮箱：6488479@qq.com</div></div></div>'
  }
}
exports.datahtml = datahtml
