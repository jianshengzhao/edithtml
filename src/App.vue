<template>
  <div id="app">
    <!-- top main tool -->
    <div class="top" unselectable="on" onselectstart="return false;">
      <div class="t_logo"></div>
      <div class="t_left">
        <div class="tl_li" @click="settingEvent">
          <i class="iconfont icon-state " title="设置"></i>
          <span>页面设置</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-save" title="保存"></i>
          <span>保存</span>
        </div>
        <div class="tl_li" @click="previewEvent" title="预览">
          <i class="iconfont icon-preview"></i>
          <span>预览</span>
        </div>
        <div class="tl_li" title="量尺">
          <i class="iconfont icon-scale"></i>
          <span>量尺</span>
        </div>
        <div class="tl_li tl_li_on gridli" @click="gridHangle" title="格线">
          <i class="iconfont icon-gridlines"></i>
          <span>格线</span>
        </div>
        <div class="tl_li tl_mod tl_li_Disable" title="对齐">
          <i class="iconfont icon-align-left"></i>
          <div class="doll"></div>
          <!-- <span>对齐</span> -->
          <ul class="toolbar">
            <li @click="topAlignEvent"><i class="iconfont icon-align-up"></i>上对齐</li>
            <li @click="bottomAlignEvent"><i class="iconfont icon-align-down"></i>下对齐</li>
            <li @click="leftAlignEvent"><i class="iconfont icon-align-left"></i>左对齐</li>
            <li @click="rightAlignEvent"><i class="iconfont icon-align-right"></i>右对齐</li>
            <li @click="centerAlignEvent"><i class="iconfont icon-align-center"></i>水平居中</li>
            <li @click="middleAlignEvent"><i class="iconfont icon-align-middle"></i>垂直居中</li>
          </ul>
        </div>
        <div class="tl_li tl_mod tl_li_Disable" title="图层">
          <i class="iconfont icon-layer"></i>
          <div class="doll"></div>
          <!-- <span>图层</span> -->
          <ul class="toolbar">
            <li @click="topFloorEvent"><i class="iconfont icon-layer-top"></i>置于顶层</li>
            <li @click="bottomFloorEvent"><i class="iconfont icon-layer-bottom"></i>置于底层</li>
            <li @click="upFloorEvent"><i class="iconfont icon-layer-up"></i>上移一层</li>
            <li @click="downFloorEvent"><i class="iconfont icon-layer-down"></i>下移一层</li>
          </ul>
        </div>
        <div class="tl_li tl_mod tl_li_Disable" title="操作">
          <i class="iconfont icon-copy"></i>
          <div class="doll"></div>
          <!-- <span>操作</span> -->
          <ul class="toolbar" >
            <li @click="shearEvent" ><i class="iconfont icon-shear"></i>剪切</li>
            <li @click="copyEvent" ><i class="iconfont icon-copy"></i>复制</li>
            <li @click="pasteEvent" :class="clipboard?'':'tl_li_Disable'"><i class="iconfont icon-paste"></i>粘贴</li>
            <li @click="deleteEvent" ><i class="iconfont icon-delete"></i>删除</li>
          </ul>
        </div>
      </div>
      <div class="t_right">
        <div class="tl_li">
          <i class="iconfont icon-exits"></i>
          <span>退出</span>
        </div>
      </div> 
    </div>
    <!-- attribute tool -->
    <div class="tool">
      <div class="toolBox">
        <div class="property" >
          <label for="">Z :</label>
          <el-input v-model="inp_z" type='number' :disabled='disabled' min='0' max='99' @change='changeInpZ' ></el-input>
        </div>
        <div class="property" >
          <label for="">X :</label>
          <el-input v-model="inp_x" type='number' :disabled='disabled' min='0' @change='changeInpX' ></el-input>
        </div>
        <div class="property">
          <label for="">Y :</label>
          <el-input v-model="inp_y" type='number' :disabled='disabled' min='0' @change='changeInpY' ></el-input>
        </div>
        <div class="property">
          <label for="">宽 :</label>
          <el-input v-model="inp_w" type='number' :disabled='disabled' min='0' @change='changeInpW'></el-input>
        </div>
        <div class="property">
          <label for="">高 :</label>
          <el-input v-model="inp_h" type='number' :disabled='disabled' min='0' @change='changeInpH'></el-input>
        </div>
        <div class="property">
          <label for="">文字 :</label>
          <el-input v-model="inp_size" type='number' :disabled='disabled' min='12' @change='changeInpSize'></el-input>
        </div>
        <div class="property">
          <label for="">行高 :</label>
          <el-input v-model="inp_line" type='number' :disabled='disabled' min='12' @change='changeInpLine'></el-input>
        </div>
        <div class="property">
          <label for="">字色 :</label>
          <el-color-picker v-model="color_font" :disabled='disabled' @change='changeColorFont'></el-color-picker>
        </div>
        <div class="property">
          <label for="">背景 :</label>
          <el-color-picker v-model="color_bg" :disabled='disabled' @change='changeColorBg'></el-color-picker>
        </div>
      </div>
    </div>
    <!-- assembly library -->
    <div class="library">
      <nav class="lib_nav">
        <ol>
          <li class="on"><i class="iconfont icon-cube"></i><span>组件</span></li>
        </ol>
      </nav>
      <div class="lib_box">
        <div class="header">基本组件 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol">
          <div class="lib_li" dataHtml="rectangle">
            <i class="icon-widget-rectangle"></i>
            <span>矩形</span>
          </div>
          <div class="lib_li" dataHtml="radius">
            <i class="icon-widget-circle"></i>
            <span>圆形</span>
          </div>
          <div class="lib_li" dataHtml="text">
            <i class="icon-widget-text"></i>
            <span>文字</span>
          </div>        
          <div class="lib_li" dataHtml="editor">
            <i class="icon-widget-textarea"></i>
            <span>富文本</span>
          </div>
          <div class="lib_li" dataHtml="editor">
            <i class="icon-widget-img"></i>
            <span>图片</span>
          </div>
          <div class="lib_li" dataHtml="editor">
            <i class="icon-widget-btn"></i>
            <span>按钮</span>
          </div>
          <div class="lib_li" dataHtml="editor">
            <i class="icon-widget-horizontal-line"></i>
            <span>线条</span>
          </div>
          <div class="lib_li" dataHtml="editor">
            <i class="icon-widget-vertical-line"></i>
            <span>线条</span>
          </div>
        </div>
        <div class="header">网校组件 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol">
          <div class="lib_li" dataHtml="pageHeader">
            <i class="icon-widget-input"></i>
            <span>页头</span>
          </div>
          <div class="lib_li" dataHtml="navigation">
            <i class="icon-widget-search-input"></i>
            <span>导航搜索</span>
          </div>
        </div>
        <div class="header">正在做。。。 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol">
          <div class="lib_li" dataHtml="carousel">
            <i class="icon-widget-sticker"></i>
            <span>轮播图</span>
          </div>
          <div class="lib_li" dataHtml="WeChat">
            <i class="icon-widget-sticker"></i>
            <span>微信公众号</span>
          </div>
          <div class="lib_li" dataHtml="schoolProfile">
           <i class="icon-widget-sticker"></i>
            <span>网校介绍</span>
          </div>
          <div class="lib_li" dataHtml="hotLabel">
            <i class="icon-widget-icon-label"></i>
            <span>热门标签</span>
          </div>       
          <div class="lib_li" dataHtml="news">
            <i class="icon-widget-sticker"></i>
            <span>新闻资讯</span>
          </div> 
          <div class="lib_li" dataHtml="enlist">
            <i class="icon-widget-sticker"></i>
            <span>最新报名</span>
          </div> 
          <div class="lib_li" datahtml='dynamics'>
            <i class="icon-widget-sticker"></i>
            <span>学员动态</span>
          </div>
          <div class="lib_li" >
            <i class="icon-widget-sticker"></i>
            <span>免费试听</span>
          </div>
          <div class="lib_li" >
            <i class="icon-widget-sticker"></i>
            <span>学员评价</span>
          </div>
          <div class="lib_li" >
            <i class="icon-widget-sticker"></i>
            <span>名师团队</span>
          </div>
          <div class="lib_li" >
            <i class="icon-widget-sticker"></i>
            <span>网校应用</span>
          </div>
        </div>
        <div class="header">尽请期待。。。</div>
      </div>
      <div class="shrink">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
    <!-- editBox -->
    <div class="editBox" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">
      <div class="space" >
        <div class="scrollcanvas"></div>
        <div class="canvas grid" >
          <div class="c_top">
            <div class="hoverbar" ondragstart="return false">拖动调节公共页头选区高度</div>
          </div>
          <div class="c_body"></div>
          <div class="c_foot">
            <div class="hoverbar" ondragstart="return false">拖动调节公共页尾选区高度</div>
          </div>
        </div>
        <div class="row-t line"></div>
        <div class="row-b line"></div> 
        <div class="col-l line"></div>
        <div class="col-r line"></div>
      </div>
      <!-- copyBox  选中的组件容器盒子-->
      <div class="copyBox">
        <div class="copyCon">
        </div>
      </div>
      <!-- 自定义右键菜单 -->
      <ul class="contextmenu">
        <li @click="upFloorEvent" v-if="rightButton"><i class="iconfont icon-layer-up"></i>上移一层</li>
        <li @click="downFloorEvent" v-if="rightButton"><i class="iconfont icon-layer-down"></i>下移一层</li>
        <div class="divider" v-if="rightButton"></div>       
        <li v-if="rightButton"><i class="iconfont icon-align-left"></i>对齐
          <i class="el-icon-caret-bottom"></i>
          <ol>
            <li @click="topAlignEvent" v-if="rightButton"><i class="iconfont icon-align-up"></i>上对齐</li>
            <li @click="bottomAlignEvent" v-if="rightButton"><i class="iconfont icon-align-down"></i>下对齐</li>
            <li @click="leftAlignEvent" v-if="rightButton"><i class="iconfont icon-align-left"></i>左对齐</li>
            <li @click="rightAlignEvent" v-if="rightButton"><i class="iconfont icon-align-right"></i>右对齐</li>
            <li @click="centerAlignEvent" v-if="rightButton"><i class="iconfont icon-align-center"></i>水平居中</li>
            <li @click="middleAlignEvent" v-if="rightButton"><i class="iconfont icon-align-middle"></i>垂直居中</li>
          </ol>
        </li>
        <div class="divider" v-if="rightButton"></div>
        <li @click="shearEvent" v-if="rightButton"><i class="iconfont icon-shear"></i>剪切</li>
        <li @click="copyEvent" v-if="rightButton"><i class="iconfont icon-copy"></i>复制</li>
        <li @click="pasteEvent" :class="clipboard?'':'tl_li_Disable'"><i class="iconfont icon-paste"></i>粘贴</li>
        <li @click="deleteEvent" v-if="rightButton"><i class="iconfont icon-delete"></i>删除</li>
      </ul>
    </div>
    <!-- dialog弹框 -->
    <el-dialog
      title="页面设置"
      :visible.sync="dialogPageSetting"
      size="tiny" class="dialogSetting">
      <el-row>
        <el-col :span="4" class="tit">前景</el-col>
        <el-col :span="4">
          <el-color-picker v-model="prospectColorVal" ></el-color-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">背景</el-col>
        <el-col :span="4">
          <el-color-picker v-model="bgColorVal"></el-color-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">分辨率</el-col>
        <el-col :span="8">
          <el-input v-model="inp_width" placeholder="宽" type="number"></el-input>
        </el-col>        
        <el-col :span="8">
          <el-input v-model="inp_height" placeholder="高" type="number"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogPageSetting = false">取 消</el-button>
        <el-button type="primary" @click="dialogPageSettingEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑文本"
      :visible.sync="dialogText"
      size="tiny">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogText = false">取 消</el-button>
        <el-button type="primary" @click="dialogTextEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="富文本"
      :visible.sync="dialogEditor"
      size="small" class="ueditor">
      <div ref="ueditor" class='editorC'></div>    
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogEditor = false">取 消</el-button>
        <el-button type="primary" @click="dialogEditorEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改页头 (图片尺寸：1200*140 )"
      :visible.sync="dialogPageHeader"
      size="small" class="diaheader">
      <el-upload
        class="pageHeader-uploader"
        name="upfile"
        action="/uploadv2/image.html"
        :show-file-list="false"
        :on-success="handlePageHeaderSuccess"
        :before-upload="beforePictureUpload">
        <img v-if="imageUrl" :src="imageUrl" class="pageHeaderImg">
        <i v-else class="el-icon-plus pageHeader-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogPageHeader = false">取 消</el-button>
        <el-button type="primary" @click="dialogPageHeaderEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="carouselTit"
      :visible.sync="dialogCarousel"
      size="carousel" >
      <el-tabs v-model="activeName" >
        <el-tab-pane label="图片选择" name="first">
          <div class="scrollBox">
            <div class="selectBox">
              <div class="diaimg_li" v-for="(item, index) in carouselData">
                <img :src="item.imgurl">
                <div class="handleList">
                  <el-row>
                    <el-col :span="3">
                      <span @click="carouselShiftUpEvent(index)" class="spanTit" v-if="index!=0">上移</span>
                      <span v-else class="spanTit ban">上移</span>
                    </el-col>                    
                    <el-col :span="3">
                      <span @click="carouselShiftDownEvent(index)" class="spanTit" v-if="index!=carouselData.length-1">下移</span>
                      <span v-else class="spanTit ban">下移</span>
                    </el-col>
                    <el-col :span="3"><span @click="carouselDeleteEvent(index)" class="spanTit">删除</span></el-col>
                    <el-col :span="15">
                      <span class="spanTit spanUrl">跳转链接
                        <input type="text" placeholder="请输入链接 ( 默认为空,点击图片不跳转 )" :value="item.clickurl" @change="carouselChangeEvent(index)">
                      </span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="diaimg_li" v-if="carouselData.length < 9">
                <el-upload
                  class="carousel-uploader"
                  name="upfile"
                  action="/uploadv2/image.html"
                  :show-file-list="false"
                  :on-success="handleCarouselSuccess"
                  :before-upload="beforePictureUpload">                  
                  <i class="el-icon-plus"></i>
                </el-upload>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="轮播设置" name="second">
          <div class="scrollBox">
            <el-row>
              <el-col :span="4">展示时长</el-col>
              <el-col :span="8"><el-input-number v-model="showTime" :min="5" :max="20"></el-input-number></el-col>
              <el-col :span="4">切换时长</el-col>
              <el-col :span="8"><el-input-number v-model="transitionTime" :min="0" :max="2" :step="0.2"></el-input-number></el-col>
            </el-row>
            <el-row>
              <el-col :span="4">显示宽度</el-col>
              <el-col :span="8"><el-input-number v-model="showWidth" :min="1" :max="2600"></el-input-number></el-col>
              <el-col :span="4">切换方式</el-col>
              <el-col :span="8">
              <el-select v-model="changeStyle" placeholder="请选择">
                <el-option
                  v-for="item in animStyle"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            </el-row>
          </div><!-- todo:长宽 -->
        </el-tab-pane>
      </el-tabs>    
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogCarousel = false">取 消</el-button>
        <el-button type="primary" @click="dialogCarouselEvent">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialog弹框 -->
  </div>
</template>

<script>
  function guidGenerator () {
    let S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }
  import $ from 'jquery'
  import '@/assets/iconfont/demo.css'
  // import '@/assets/iconfont/iconfont.css'
  import '@/assets/iconfont/maodaofont.css'
  import datahtml from '@/data/datahtml.js'
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)
  export default { // todo: 本地操作保存
    name: 'app',
    data: function () {
      return {
      // -------------test---------
        dialogText: false,
        dialogEditor: false,
        dialogPageHeader: false,
        dialogPageSetting: false,
        dialogCarousel: false,
        imageUrl: '',
        textarea: '',
        activeName: 'first',
        carouselData: [{
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg',
          clickurl: 'https://www.baidu.com1'
        }, {
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg',
          clickurl: 'https://www.baidu.com2'
        }, {
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg',
          clickurl: 'https://www.baidu.com3'
        }, {
          imgurl: 'http://static.ebanhui.com/ebh/tpl/newschoolindex/images/enterprise_banner_3.jpg',
          clickurl: 'https://www.baidu.com4'
        }],
        showTime: 5,
        transitionTime: 0.6,
        showWidth: 1200,
        carouselTit: '轮播图 ( 图片尺寸 1200 * 320 )',
        animStyle: [{
          value: false,
          label: '滚动'
        }, {
          value: true,
          label: '渐显'
        }],
        changeStyle: false,
      // -----------工具栏-----------------
        prospectColorVal: '#f5f5f5',
        bgColorVal: '#8493af',
        inp_width: 1200,
        inp_height: 1600,
        disabled: true,
        rightButton: false,
        inp_z: '',
        inp_x: '',
        inp_y: '',
        inp_w: '',
        inp_h: '',
        inp_size: '',
        inp_line: '',
        color_font: '#333',
        color_bg: '#fff',
        moduleElement: '', // 选中的模块全局引用
        moduleParentElementHeight: '',
        clipboard: '',
        original: '',
        config: {
          stretchLimit: true, // 是否开启module拉伸限制
          moveLimit: true // 是否开启module移动限制
        },
        paddingtop: 62, // top栏高度
        paddingleft: 181, // left栏高度
        postop: 50, // editbox  top值
        posleft: 50, // editbox  left值
      // ---------------------------------------
        editorConfig: {
          zIndex: 3000,
          toolbars: [[
            'undo', 'redo', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', 'forecolor', 'backcolor', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'simpleupload', 'emotion', 'spechars', '|', 'selectall', 'removeformat'
          ]]
        },
        tool: { /* 工具箱事件 */
        // --------------- complete ----------------
          linePosition: function (editBox, copyBox, self) {
            let rowT = $('.row-t')
            let rowB = $('.row-b')
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')
            let space = $('.space')
            let sTop = parseInt(space.scrollTop()) // 当前滚动条高度
            let sLeft = parseInt(space.scrollLeft())
            let w = parseInt(copyBox.css('width'))
            let h = parseInt(copyBox.css('height'))
            rowT.css('top', event.pageY + sTop - self.paddingtop)
            rowB.css('top', event.pageY + sTop - self.paddingtop + h)
            colL.css('left', 0 + sLeft)
            colR.css('left', w + sLeft)
            line.show()
            editBox.mousemove(function (e) {
              sTop = parseInt(space.scrollTop())
              rowT.css('top', e.pageY + sTop - self.paddingtop)
              rowB.css('top', e.pageY + sTop - self.paddingtop + h)
              colL.css('left', e.pageX + sLeft - self.paddingleft)
              colR.css('left', e.pageX + sLeft - self.paddingleft + w)
            })
          },
          initialize: function (self, ele) { // 选中模块的执行的操作
            let rowT = $('.row-t')
            let rowB = $('.row-b')
            let colL = $('.col-l')
            let colR = $('.col-r')
            let resize = '<div class="resize nw"></div>' +
                         '<div class="resize sw"></div>' +
                         '<div class="resize ne"></div>' +
                         '<div class="resize se"></div>' +
                         '<div class="resize e"></div>' +
                         '<div class="resize n"></div>' +
                         '<div class="resize w"></div>' +
                         '<div class="resize s"></div>'
            self.moduleElement = ele
            self.moduleParentElementHeight = parseInt(ele.parent().css('height'))
            $('.module').removeClass('on_module')
            $('.resize').remove()
            ele.addClass('on_module')
            ele.append(resize)
            self.inp_z = parseInt(ele.css('zIndex')) || 0
            self.inp_x = parseInt(ele.css('left'))
            self.inp_y = parseInt(ele.css('top'))
            self.inp_w = parseInt(ele.css('width'))
            self.inp_h = parseInt(ele.css('height'))
            self.inp_size = parseInt(ele.css('fontSize'))
            self.inp_line = parseInt(ele.css('lineHeight'))
            self.color_font = ele.css('color')
            self.color_bg = ele.css('backgroundColor')
            rowT.css('top', self.inp_y + self.postop)
            rowB.css('top', self.inp_y + self.postop + self.inp_h)
            colL.css('left', self.inp_x + self.posleft)
            colR.css('left', self.inp_x + self.posleft + self.inp_w)
            self.disabled = false
            $('.tl_mod').removeClass('tl_li_Disable')
          },
          missSeletedEvents: function (self) { // 初始化
            $('.line').hide()
            $('.resize').remove()
            $('.module').removeClass('on_module')
            $('.module').parent().unbind('mousemove')
            $('.module').unbind('mouseup')
            self.inp_z = ''
            self.inp_x = ''
            self.inp_y = ''
            self.inp_w = ''
            self.inp_h = ''
            self.inp_size = ''
            self.inp_line = ''
            self.color_font = '#333'
            self.color_bg = '#fff'
            self.disabled = true
            $('.tl_mod').addClass('tl_li_Disable')
          },
          bindLibraryMenu: function (self) {
            $('.header').on('click', function () {
              let e = $(this).next()
              let len = e.children().length
              let num = len / 2 + len % 2
              let h = 66 * num
              if (e.css('height') === '0px') {
                e.css('height', h + 'px')
              } else {
                e.css('height', h + 'px')
                setTimeout(function () {
                  e.css('height', '0px')
                }, 0)
              }
            })
            let shrink = $('.shrink')
            let library = $('.library')
            let editBox = $('.editBox')
            shrink.on('click', function () {
              if (shrink.hasClass('shrinkout')) {
                shrink.removeClass('shrinkout')
                library.removeClass('basic')
                editBox.css('paddingLeft', '')
                self.paddingleft = 181
              } else {
                shrink.addClass('shrinkout')
                library.addClass('basic')
                editBox.css('paddingLeft', '62px')
                self.paddingleft = 62
              }
            })
          },
          bindMouseEvent: function (self) { // top,foot大小调整事件，添加模块到画布的鼠标事件
            var toolself = this
            let canvas = $('.canvas')
            let cTop = $('.c_top')
            let cBody = $('.c_body')
            let cFoot = $('.c_foot')
            let editBox = $('.editBox')
            let copyBox = $('.copyBox')
            let copyCon = $('.copyCon')
            let h // 容器高度
            let hs // 计算得到的高度
            let y // 鼠标Y轴
            let topRangeY = parseInt(cTop.css('height')) + self.paddingtop + self.postop // top选区范围
            let bodyRangeY = parseInt(cBody.css('height')) + topRangeY // body选区范围
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')
            let scrollHeight = $('.space')[0].scrollHeight
            colL.css('height', scrollHeight)
            colR.css('height', scrollHeight)
            $('.c_top').on('mousedown', '.hoverbar', function () { // top容器调整
              y = event.pageY
              h = parseInt(cTop.css('height'))
              $('.c_top .hoverbar').addClass('on_hoverbar')
              canvas.mousemove(function () {
                hs = h + (event.pageY - y)
                cTop.css('height', hs)
                canvas.css('paddingTop', hs)
                topRangeY = hs + self.paddingtop + self.postop
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
              })
              canvasMouseup()
            })
            $('.c_foot').on('mousedown', '.hoverbar', function () { // foot容器调整
              y = event.pageY
              h = parseInt(cFoot.css('height'))
              $('.c_foot .hoverbar').addClass('on_hoverbar')
              canvas.mousemove(function () {
                hs = h + (y - event.pageY)
                cFoot.css('height', hs)
                canvas.css('paddingBottom', hs)
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
              })
              canvasMouseup()
            })
            $('.lib_li').mousedown(function (e) { // 左边模块库鼠标拖动事件 todo:
              let modType = $(this).attr('dataHtml')
              let dataCon = datahtml.datahtml[modType]
              copyBox.attr('style', dataCon.style)
              copyCon.html(dataCon.html)
              copyBox.show().css({'top': event.pageY, 'left': self.paddingleft})
              editBox.unbind('mouseup')
              editBox.mousemove(function (e) {
                copyBox.css({'top': e.pageY, 'left': e.pageX})
              })
              toolself.linePosition(editBox, copyBox, self)
              editMouseup()
              return false
            })
            function canvasMouseup () { // canvas解绑鼠标移动事件
              canvas.mouseup(function () {
                canvas.unbind('mousemove mouseup')
                $('.hoverbar').removeClass('on_hoverbar')
              })
            }
            function editMouseup () { // editBox解除模块拖动事件,并添加模块到canvas上
              editBox.mouseup(function (e) {
                editBox.unbind('mousemove mouseup')
                let box
                let x
                let y
                let sTop = parseInt($('.space').scrollTop())
                let sLeft = parseInt($('.space').scrollLeft())
                x = event.pageX - self.paddingleft - self.posleft + sLeft
                topRangeY = parseInt(cTop.css('height')) + self.paddingtop + self.postop
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
                if (event.pageY + sTop < topRangeY) {
                  box = cTop
                  y = event.pageY + sTop - self.paddingtop - self.postop
                } else if (event.pageY + sTop < bodyRangeY) {
                  box = cBody
                  y = event.pageY + sTop - topRangeY
                } else {
                  box = cFoot
                  y = event.pageY + sTop - bodyRangeY
                }
                if (self.config.moveLimit) {
                  if (x < 0) {
                    x = 0
                  }
                  let boxLeft = self.inp_width - parseInt(copyBox.css('width'))
                  if (x > boxLeft) {
                    x = boxLeft
                  }
                  if (y < 0) {
                    y = 0
                  }
                  let boxTop = parseInt(box.css('height')) - parseInt(copyBox.css('height'))
                  if (y > boxTop) {
                    y = boxTop
                  }
                }
                copyBox.hide()
                line.hide()
                box.append(copyCon.html())
                let bChild = box.children('.module')
                bChild.eq(bChild.length - 1).css({'top': y, 'left': x})
              })
            }
          },
          bindClickEvent: function (self) { // 画布内选中模块一系列操作事件
            let toolself = this
            let editBox = $('.editBox')
            let rowT = $('.row-t')
            let rowB = $('.row-b')
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')
            editBox.on('click', '.module', function (e) { // 选中模块
              let ele = $(this)
              toolself.initialize(self, ele)
              return false
            })
            editBox.on('mousedown', '.on_module', function (e) { // 选中模块移动位置
              let x
              let y
              let xs
              let ys
              let warp // 校正参考线
              let areaB
              let areaR = self.inp_width
              let ele = $(this)
              let sTop = parseInt($('.space').scrollTop())
              line.show()
              x = e.pageX
              y = e.pageY
              xs = self.inp_x
              ys = self.inp_y
              switch (ele.parent().attr('class')) {
                case 'c_top':
                  warp = 0
                  areaB = $('.c_top').css('height')
                  break
                case 'c_body':
                  warp = parseInt($('.c_top').css('height'))
                  areaB = $('.c_body').css('height')
                  break
                case 'c_foot':
                  warp = parseInt($('.c_top').css('height')) + parseInt($('.c_body').css('height'))
                  areaB = $('.c_foot').css('height')
                  break
              }
              changeMoveEvents(xs, ys, x, y, sTop, warp)
              editBox.mousemove(function (e) {
                let left = xs + e.pageX - x
                let top = ys + e.pageY - y
                if (self.config.moveLimit) {
                  if (left < 0) {
                    left = 0
                  }
                  if (left > (areaR - self.inp_w)) {
                    left = areaR - self.inp_w
                  }
                  if (top < 0) {
                    top = 0
                  }
                  if (top > (parseInt(areaB) - self.inp_h)) {
                    top = parseInt(areaB) - self.inp_h
                  }
                }
                self.inp_x = left
                self.inp_y = top
                ele.css('left', left)
                ele.css('top', top)
                changeMoveEvents(xs, ys, x, y, sTop, warp)
                return false
              })
              changeMoveMouseup(ele, ele.parent())
              return false
            })
            $(document).unbind('keydown')
            $(document).keydown(function (e) { // 键盘方向键微调移动模块事件
              let module = $('.on_module')
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
                  let moveXY = parseInt(module.css(key[1])) + key[2]
                  if (self.config.moveLimit && moveXY < 0) {
                    moveXY = 0
                  }
                  let maxMoveXY = key[1] === 'top' ? parseInt(module.parent().css('height')) - self.inp_h : self.inp_width - self.inp_w
                  if (self.config.moveLimit && moveXY > maxMoveXY) {
                    moveXY = maxMoveXY
                  }
                  self[key[3]] = moveXY
                  module.css(key[1], moveXY)
                  return false
                }
                if (e.key === 'Delete') {
                  module.remove()
                }
              }
            })
            editBox.click(function (e) { // 失去焦点取消选中
              // 失去焦点取消选中
              toolself.missSeletedEvents(self)
            })
            function changeMoveEvents (xs, ys, x, y, sTop, warp) { // 计算参考线位置
              rowT.css('top', self.inp_y + warp + self.postop)
              rowB.css('top', self.inp_y + warp + self.postop + self.inp_h)
              colL.css('left', self.inp_x + self.posleft)
              colR.css('left', self.inp_x + self.posleft + self.inp_w)
            }
            function changeMoveMouseup (ele, parent) { // on_module解绑鼠标移动事件
              editBox.mouseup(function () {
                editBox.unbind('mousemove mouseup')
                line.hide()
                return false
              })
            }
            editBox.on('mousedown', '.resize', function () { // 选中小圆点按钮拉伸容器
              let $this = $(this)
              let x = event.pageX
              let y = event.pageY
              let xs = self.inp_x
              let ys = self.inp_y
              let ws = self.inp_w
              let hs = self.inp_h
              let rowT = $('.row-t')
              let rowB = $('.row-b')
              let colL = $('.col-l')
              let colR = $('.col-r')
              let line = $('.line')
              let warp // 校正参考线
              let areaB
              let areaR = parseInt(self.inp_width)
              switch ($this.parent().parent().attr('class')) {
                case 'c_top':
                  warp = 0
                  areaB = parseInt($('.c_top').css('height'))
                  break
                case 'c_body':
                  warp = parseInt($('.c_top').css('height'))
                  areaB = parseInt($('.c_body').css('height'))
                  break
                case 'c_foot':
                  warp = parseInt($('.c_top').css('height')) + parseInt($('.c_body').css('height'))
                  areaB = parseInt($('.c_foot').css('height'))
                  break
              }
              line.show()
              rowT.css('top', self.inp_y + self.postop + warp)
              rowB.css('top', self.inp_y + self.postop + self.inp_h + warp)
              colL.css('left', self.inp_x + self.posleft)
              colR.css('left', self.inp_x + self.posleft + self.inp_w)
              let part
              switch ($this.attr('class')) {
                case 'resize e':
                  part = function () {
                    let xx = self.inp_x + self.posleft + ws + event.pageX - x
                    self.inp_w = ws + event.pageX - x
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
                    $this.parent().css('width', self.inp_w)
                    colR.css('left', xx)
                  }
                  break
                case 'resize s':
                  part = function () {
                    let yy = ys + self.postop + warp + hs + event.pageY - y
                    self.inp_h = hs + event.pageY - y
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
                    $this.parent().css('height', self.inp_h)
                    rowB.css('top', yy)
                  }
                  break
                case 'resize w':
                  part = function () {
                    let xx = xs - x + event.pageX + self.posleft
                    self.inp_x = xs - x + event.pageX
                    self.inp_w = ws + x - event.pageX
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
                    $this.parent().css({'width': self.inp_w, 'left': self.inp_x})
                    colL.css('left', xx)
                  }
                  break
                case 'resize n':
                  part = function () {
                    let yy = ys - y + event.pageY + warp + self.postop
                    self.inp_y = ys - y + event.pageY
                    self.inp_h = hs + y - event.pageY
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
                    $this.parent().css({'height': self.inp_h, 'top': self.inp_y})
                    rowT.css('top', yy)
                  }
                  break
                case 'resize ne':
                  part = function () {
                    let yy = ys - y + event.pageY + warp + self.postop
                    let xx = self.inp_x + self.posleft + ws + event.pageX - x
                    self.inp_y = ys - y + event.pageY
                    self.inp_w = ws + event.pageX - x
                    self.inp_h = hs + y - event.pageY
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
                    $this.parent().css({'height': self.inp_h, 'width': self.inp_w, 'top': self.inp_y})
                    rowT.css('top', yy)
                    colR.css('left', xx)
                  }
                  break
                case 'resize nw':
                  part = function () {
                    let yy = ys - y + event.pageY + warp + self.postop
                    let xx = xs - x + event.pageX + self.posleft
                    self.inp_y = ys - y + event.pageY
                    self.inp_x = xs - x + event.pageX
                    self.inp_h = hs + y - event.pageY
                    self.inp_w = ws + x - event.pageX
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
                    $this.parent().css({'height': self.inp_h, 'top': self.inp_y, 'width': self.inp_w, 'left': self.inp_x})
                    rowT.css('top', yy)
                    colL.css('left', xx)
                  }
                  break
                case 'resize se':
                  part = function () {
                    let yy = self.inp_y + self.postop + warp + hs + event.pageY - y
                    let xx = self.inp_x + self.posleft + ws + event.pageX - x
                    self.inp_w = ws + event.pageX - x
                    self.inp_h = hs + event.pageY - y
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
                    $this.parent().css({'width': self.inp_w, 'height': self.inp_h})
                    rowB.css('top', yy)
                    colR.css('left', xx)
                  }
                  break
                case 'resize sw':
                  part = function () {
                    let yy = self.inp_y + self.postop + hs + event.pageY - y + warp
                    let xx = xs - x + event.pageX + self.posleft
                    self.inp_x = xs - x + event.pageX
                    self.inp_h = hs + event.pageY - y
                    self.inp_w = ws + x - event.pageX
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
                    $this.parent().css({'width': self.inp_w, 'height': self.inp_h, 'left': self.inp_x})
                    rowB.css('top', yy)
                    colL.css('left', xx)
                  }
                  break
              }
              // todo: 拉伸某容器固定显示内容
              editBox.mousemove(function (e) {
                part()
                return false
              })
              editBox.mouseup(function (e) {
                editBox.unbind('mousemove mouseup')
                line.hide()
              })
              return false
            })
          },
          bindRightClickEvent: function (self) { // 右键唤出菜单功能
            let toolself = this
            let canvas = $('.canvas')
            let contextmenu = $('.contextmenu')
            contextmenu.hide()
            canvas.bind('contextmenu', function () {
              return false
            })
            contextmenu.bind('contextmenu click', function () {
              return false
            })
            canvas.mousedown(function (e) {
              contextmenu.hide()
              if (e.which === 3) {
                let module
                if ($(e.target).hasClass('module')) {
                  module = $(e.target)
                } else {
                  module = $(e.target).parents('.module')
                }
                if (module.length > 0) {
                  if (!module.hasClass('on_module')) {
                    toolself.initialize(self, module)
                    module.addClass('on_module')
                  }
                  self.rightButton = true
                } else {
                  self.rightButton = false
                }
                contextmenu.css({'top': e.pageY, left: e.pageX})
                contextmenu.show()
                return false
              }
            })
          },
        // ------------------- todo: ------------------
          bindDblclickEvent: function (self) { // 模块双击操作事件 todo:
            let editBox = $('.editBox')
            let w
            editBox.on('dblclick', '.on_module', function (e) {
              let onthis = self.moduleElement
              let type = onthis.attr('class').split(' ')[0]
              switch (type) {
                case 'text':
                  self.dialogText = true
                  self.textarea = onthis.text()
                  break
                case 'editor':
                  self.dialogEditor = true
                  w = parseInt(onthis.css('width'))
                  let html = onthis.html()
                  self.$nextTick(function () {
                    self.$refs.ueditor.id = self.ueditorid
                    $('.ueditor .el-dialog').css('width', w + 40)
                    $('.ueditor .edui-editor,.ueditor .edui-editor-iframeholder').css('width', w)
                    self.editor = window.UE.getEditor(self.ueditorid, self.editorConfig)
                    self.editor.ready(function () {
                      self.editor.setContent(html)
                    })
                  })
                  break
                case 'pageHeader':
                  self.dialogPageHeader = true
                  w = parseInt(onthis.css('width'))
                  let imgsrc = self.moduleElement.find('img').attr('src')
                  self.$nextTick(function () {
                    $('.diaheader .el-dialog').css('width', w + 40)
                    self.imageUrl = imgsrc
                  })
                  break
                case 'WeChat':
                  break
                case 'carousel':
                  self.dialogCarousel = true
                  let carouselData = $('.on_module').attr('carouselData')
                  let hs = parseInt($('.screenBox').css('height'))
                  let ws = parseInt($('.screenBox').css('width'))
                  self.carouselTit = '轮播图 ( 图片尺寸 ' + self.showWidth + ' * ' + hs + ')'
                  self.showWidth = ws
                  if (carouselData) {
                    let data = $.parseJSON(carouselData)
                    self.showWidth = data.showWidth
                    self.carouselData = data.carouselData
                    self.showTime = data.showTime
                    self.transitionTime = data.transitionTime
                    self.changeStyle = data.changeStyle
                  }
                  break
                default:
                  console.log('module')
                  break
              }
            })
          }
        }
      }
    },
    created: function () {
      var self = this
      self.ueditorid = guidGenerator()
      self.$nextTick(function () {
        let canvas = $('.canvas')
        self.inp_width = parseInt(canvas.css('width'))
        self.inp_height = parseInt(canvas.css('height'))
        self.tool.bindLibraryMenu(self)
        self.tool.bindMouseEvent(self)
        self.tool.bindClickEvent(self)
        self.tool.bindDblclickEvent(self)
        self.tool.bindRightClickEvent(self)
        let scrollcanvas = $('.scrollcanvas')
        scrollcanvas.css('minWidth', parseInt(self.inp_width) + 100 + 'px')
        if (!window.saveParams) return false
        let params = window.saveParams
        let pp = params.page
        self.prospectColorVal = pp.pg
        self.bgColorVal = pp.bg
        self.inp_width = pp.width
        self.inp_height = pp.height
        scrollcanvas.css('minWidth', parseInt(self.inp_width) + 100 + 'px')
        let space = $('.space')
        space.css('backgroundColor', self.bgColorVal)
        canvas.css('backgroundColor', self.prospectColorVal)
        canvas.css('width', self.inp_width)
        canvas.css('height', self.inp_height)
        let head = $('.c_top')
        let middle = $('.c_body')
        let foot = $('.c_foot')
        head.css('height', pp.top)
        middle.css('height', pp.body)
        foot.css('height', pp.foot)
        canvas.css({'paddingTop': pp.top, 'paddingBottom': pp.foot})
        let module = params.module
        // let html = ''
        // for (let i = 0, len = module.top.length; i < len; i++) {
        //   let item = module.top[i]
        //   html += '<div class="module ' + item.class + '" style="' + item.style + '"><div>asdasdadad</div>asdadadsadad</div></div>'
        // }
        head.html(module.top)
        // html = ''
        // for (let i = 0, len = module.body.length; i < len; i++) {
        //   let item = module.body[i]
        //   html += '<div class="module ' + item.class + '" style="' + item.style + '"><div>asdasdadad</div>asdadadsadad</div></div>'
        // }
        middle.html(module.body)
        // html = ''
        // for (let i = 0, len = module.foot.length; i < len; i++) {
        //   let item = module.foot[i]
        //   html += '<div class="module ' + item.class + '" style="' + item.style + '"><div>asdasdadad</div>asdadadsadad</div></div>'
        // }
        foot.html(module.foot)
      })
    },
    methods: {
    //   ---------------- complete --------------------
      gridHangle: function (e) { // 格线开关
        let $gridli = $('.gridli')
        let bloo = $gridli.hasClass('tl_li_on')
        let canvas = $('.canvas')
        if (bloo) {
          $gridli.removeClass('tl_li_on')
          canvas.removeClass('grid')
        } else {
          $gridli.addClass('tl_li_on')
          canvas.addClass('grid')
        }
      },
      changeInpZ: function (val) { // z-index 定位
        var self = this
        if (val < 0) {
          val = 0
          self.inp_z = 0
        }
        if (val > 99) {
          val = 99
          self.inp_z = 99
        }
        self.moduleElement.css('zIndex', val)
      },
      changeInpX: function (val) { // left 定位
        var self = this
        if (val < 0 && self.config.moveLimit) {
          val = 0
          self.inp_x = 0
        }
        let x = self.inp_width - self.inp_w
        if (val > x && self.config.moveLimit) {
          val = x
          self.inp_x = x
        }
        self.moduleElement.css('left', val + 'px')
      },
      changeInpY: function (val) { // right 定位
        var self = this
        if (val < 0 && self.config.moveLimit) {
          val = 0
          self.inp_y = 0
        }
        let y = self.moduleParentElementHeight - self.inp_h
        if (val > y && self.config.moveLimit) {
          val = y
          self.inp_y = y
        }
        self.moduleElement.css('top', val + 'px')
      },
      changeInpW: function (val) { // width 宽度
        var self = this
        if (val < 0 && self.config.stretchLimit) {
          val = 0
          self.inp_w = 0
        }
        let w = self.inp_width - self.inp_x
        if (val > w && self.config.stretchLimit) {
          val = w
          self.inp_w = w
        }
        self.moduleElement.css('width', val + 'px')
      },
      changeInpH: function (val) { // height 高度
        var self = this
        if (val < 0 && self.config.stretchLimit) {
          val = 0
          self.inp_h = 0
        }
        let h = self.moduleParentElementHeight - self.inp_y
        if (val > h && self.config.stretchLimit) {
          val = h
          self.inp_h = h
        }
        self.moduleElement.css('height', val + 'px')
      },
      changeInpSize: function (val) { // font-size 字体大小
        var self = this
        self.moduleElement.css('fontSize', val + 'px')
      },
      changeInpLine: function (val) { // line-height 行高
        var self = this
        self.moduleElement.css('lineHeight', val + 'px')
      },
      changeColorFont: function (val) { // font-color 字体颜色
        if ($('.on_module').length > 0) {
          var self = this
          self.moduleElement.css('color', val)
        }
      },
      changeColorBg: function (val) { // background-color 背景颜色
        if ($('.on_module').length > 0) {
          var self = this
          if (val === null) {
            val = 'transparent'
          }
          self.moduleElement.css('backgroundColor', val)
        }
      },
      topAlignEvent: function () { // top 上对齐
        let self = this
        self.moduleElement.css('top', '0px')
        self.inp_y = 0
      },
      bottomAlignEvent: function () { // top 下对齐
        let self = this
        let x = self.moduleParentElementHeight - parseInt(self.moduleElement.css('height'))
        self.moduleElement.css('top', x)
        self.inp_y = x
      },
      leftAlignEvent: function () { // left 左对齐
        let self = this
        self.moduleElement.css('left', '0px')
        self.inp_x = 0
      },
      rightAlignEvent: function () { // left 右对齐
        let self = this
        let x = self.inp_width - parseInt(self.moduleElement.css('width'))
        self.moduleElement.css('left', x)
        self.inp_x = x
      },
      centerAlignEvent: function () { // left 水平居中
        let self = this
        let x = (self.inp_width - parseInt(self.moduleElement.css('width'))) / 2
        self.moduleElement.css('left', x)
        self.inp_x = x
      },
      middleAlignEvent: function () { // top 垂直居中
        let self = this
        let x = (self.moduleParentElementHeight - parseInt(self.moduleElement.css('height'))) / 2
        self.inp_y = x
        self.moduleElement.css('top', x)
      },
      topFloorEvent: function () { // 图层置顶
        let self = this
        let z = 99
        self.moduleElement.css('zIndex', z)
        self.inp_z = z
      },
      bottomFloorEvent: function () { // 图层置底
        let self = this
        let z = 0
        self.moduleElement.css('zIndex', z)
        self.inp_z = z
      },
      upFloorEvent: function () { // 图层上移一层
        let self = this
        let z = self.inp_z + 1
        if (z > 99) {
          z = 99
        }
        self.moduleElement.css('zIndex', z)
        self.inp_z = z
      },
      downFloorEvent: function () { // 图层下移一层
        let self = this
        let z = self.inp_z - 1
        if (z < 0) {
          z = 0
        }
        self.moduleElement.css('zIndex', z)
        self.inp_z = z
      },
      shearEvent: function () { // 剪切
        if ($('.on_module').length > 0) {
          let self = this
          self.clipboard = self.moduleElement[0].outerHTML
          self.original = self.moduleElement.parent()
          self.moduleElement.remove()
          $('.contextmenu').hide()
        }
      },
      copyEvent: function () { // 复制
        if ($('.on_module').length > 0) {
          let self = this
          self.clipboard = self.moduleElement[0].outerHTML
          self.original = self.moduleElement.parent()
        }
        $('.contextmenu').hide()
      },
      pasteEvent: function () { // 粘贴
        let self = this
        if (self.clipboard) {
          let sTop = parseInt($('.space').scrollTop())
          let contextmenu = $('.contextmenu')
          let y = parseInt(contextmenu.css('top'))
          let x = parseInt(contextmenu.css('left'))
          switch (self.original.attr('class')) {
            case 'c_top':
              y = y - 181 + sTop
              x = x - 281
              break
            case 'c_body':
              y = y - 181 + sTop - parseInt($('.c_top').css('height'))
              x = x - 281
              break
            case 'c_foot':
              y = y - 181 + sTop - parseInt($('.c_top').css('height')) - parseInt($('.c_body').css('height'))
              x = x - 281
              break
          }
          self.original.append(self.clipboard)
          self.tool.missSeletedEvents(self)
          let bChild = self.original.children()
          if (self.config.moveLimit) {
            if (y < 0) {
              y = 0
            }
            let boxTop = parseInt(self.original.css('height')) - parseInt(bChild.eq(bChild.length - 1).css('height'))
            if (y > boxTop) {
              y = boxTop
            }
          }
          bChild.eq(bChild.length - 1).css({'top': y, 'left': x})
        }
        $('.contextmenu').hide()
      },
      deleteEvent: function () { // 删除
        if ($('.on_module').length > 0) {
          let self = this
          self.moduleElement.remove()
          $('.contextmenu').hide()
        }
      },
      previewEvent: function () { // 预览
        let self = this
        self.tool.missSeletedEvents(self)
        self.$router.push('preview')
        let params = {}
        // let topModule = $('.c_top').find('.module')
        // let bodyModule = $('.c_body').find('.module')
        // let footModule = $('.c_foot').find('.module')
        let topArray = $('.c_top').html()
        let bodyArray = $('.c_body').html()
        let footArray = $('.c_foot').html()
        // for (let i = 0, len = topModule.length; i < len; i++) {
        //   let item = topModule.eq(i)
        //   let itemobj = {
        //     class: $.trim(item.attr('class').replace('module', '')),
        //     style: item.attr('style')
        //   }
        //   topArray.push(itemobj)
        // }
        // for (let i = 0, len = bodyModule.length; i < len; i++) {
        //   let item = bodyModule.eq(i)
        //   let itemobj = {
        //     class: $.trim(item.attr('class').replace('module', '')),
        //     style: item.attr('style')
        //   }
        //   bodyArray.push(itemobj)
        // }
        // for (let i = 0, len = footModule.length; i < len; i++) {
        //   let item = footModule.eq(i)
        //   let itemobj = {
        //     class: $.trim(item.attr('class').replace('module', '')),
        //     style: item.attr('style')
        //   }
        //   footArray.push(itemobj)
        // }
        params = {
          page: {
            pg: self.prospectColorVal,
            bg: self.bgColorVal,
            width: self.inp_width,
            height: self.inp_height,
            top: $('.c_top').css('height'),
            body: $('.c_body').css('height'),
            foot: $('.c_foot').css('height')
          },
          module: {
            top: topArray,
            body: bodyArray,
            foot: footArray
          }
        }
        window.saveParams = params
      },
      dialogTextEvent: function () { // 编辑文本窗口
        let self = this
        self.moduleElement.text(self.textarea)
        self.dialogText = false
      },
      dialogEditorEvent: function () { // 富文本窗口
        let self = this
        let content = self.editor.getContent()
        let h = $('.ueditor .edui-editor-iframeholder').css('height')
        self.dialogEditor = false
        self.moduleElement.css('height', h)
        self.moduleElement.html(content)
      },
      beforePictureUpload: function (file) {
        let self = this
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          self.$notify({
            title: '警告',
            message: '上传的页头只能是jpg、png或gif格式。',
            type: 'warning',
            offset: 50,
            duration: 4000
          })
          return false
        }
      },
      handlePageHeaderSuccess: function (res, file) {
        let self = this
        let code = res.code
        if (code === 0) {
          self.imageUrl = res.data.showurl
        } else {
          self.$notify({
            title: '警告',
            message: '上传图片失败',
            type: 'warning',
            offset: 50,
            duration: 4000
          })
        }
      },
      dialogPageHeaderEvent: function () {
        let self = this
        self.dialogPageHeader = false
        self.moduleElement.find('img').attr('src', self.imageUrl)
      },
    //   ---------------- todo: -----------------------
      settingEvent: function () { // 页面设置
        let self = this
        self.dialogPageSetting = true
      },
      dialogPageSettingEvent: function () { // 页面设置弹框保存
        var self = this
        let space = $('.space')
        let canvas = $('.canvas')
        space.css('backgroundColor', self.bgColorVal)
        canvas.css('backgroundColor', self.prospectColorVal)
        canvas.css('width', self.inp_width)
        canvas.css('height', self.inp_height)
        self.dialogPageSetting = false
      },
      carouselShiftUpEvent: function (index) { // 上移
        let self = this
        let item = self.carouselData.splice(index, 1)
        self.carouselData.splice(index - 1, 0, item[0])
      },
      carouselShiftDownEvent: function (index) { // 下移
        let self = this
        let item = self.carouselData.splice(index, 1)
        self.carouselData.splice(index + 1, 0, item[0])
      },
      carouselDeleteEvent: function (index) { // 删除
        let self = this
        self.carouselData.splice(index, 1)
      },
      carouselChangeEvent: function (index) { // 设置跳转链接
        let self = this
        let val = $('.spanUrl input').eq(index).val()
        self.carouselData[index].clickurl = val
      },
      handleCarouselSuccess: function (res) { // 添加图片成功
        let self = this
        let code = res.code
        let data = res.data
        if (code === 0) {
          self.carouselData.push({imgurl: data.showurl, clickurl: ''})
        } else {
          self.$notify({
            title: '警告',
            message: '上传图片失败',
            type: 'warning',
            offset: 50,
            duration: 4000
          })
        }
      },
      dialogCarouselEvent: function () { // 轮播图配置数据
        let self = this
        let obj = {
          changeStyle: self.changeStyle,
          showWidth: self.showWidth,
          showTime: self.showTime,
          transitionTime: self.transitionTime,
          carouselData: self.carouselData
        }
        let str = JSON.stringify(obj)
        $('.img_li').css('width', self.showWidth + 'px')
        $('.screenBox').css('width', self.showWidth + 'px')
        self.dialogCarousel = false
        $('.on_module').attr('carouselData', str)
      }
    }
  }
</script>

<style>
/*app*/
  #app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    cursor: default;
  }
/*top*/
  .top{
    padding-top: 4px;
    position: relative;
    height: 30px;
    min-width: 1024px;
    border-bottom: 1px solid #d9d9d9;
    z-index: 4;
    background-color: #fff;
  }
  .top>div{
    height: 28px;
  }
  .t_logo{
    float: left;
    width: 20px; 
  }
  .t_left{
    float: left;
    width: 600px;  
    height: 28px;
  }
  .tl_li{
    position: relative;
    padding: 2px 4px 0 2px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    height: 24px;
    margin: 2px ;
    cursor: pointer; 
    text-align: center; 
    border:1px solid #fff;  
    box-sizing: border-box;
  }
  .doll{
    position: absolute;
    top: 50%;
    right:-4px;
    margin-top: -2px;
    border: 3px solid transparent;
    border-bottom-color: #cacaca;
    border-left-color: #cacaca;
    transform:rotate(-45deg);
    -ms-transform:rotate(-45deg);
    -moz-transform:rotate(-45deg);
    -webkit-transform:rotate(-45deg);
    -o-transform:rotate(-45deg);
  }
  .tl_li_on{
    background: rgba(0, 0, 0, 0.04);
    border-color:rgba(0,0,0,.1);
  }
  .tl_li_Disable{
    cursor:not-allowed;
  }
  .top .tl_li_Disable span{
    color: #cacaca;
  }
  .top .tl_li_Disable i{
    color: #cacaca;
  }
  .tl_li i{
    float: left;
    font-size: 18px;
    line-height: 18px;
    color:#f55d54;
  }
  .tl_li>span{
    float: left;
    text-indent: 2px;    
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    color: #525e71;
    padding-left: 2px;
  }
  .tl_li:hover .toolbar{
    display: block;
  } 
  .tl_li_Disable:hover .toolbar{
    display: none;
  }
  .toolbar{
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    min-width: 112px;
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  }
  .toolbar li{
    padding: 10px;
    text-align:left;
    list-style-type: none;
    color: #525e71;
    text-indent:4px;
    letter-spacing: 2px;
  }
  .toolbar li:hover{
    background-color: #f5f5f7;
  }
  .toolbar li i{
    margin-top: -3px;
    margin-right:5px;
    float: left;
  }  
  .toolbar input::-webkit-inner-spin-button{
    display: none;
  }
  #app .t_right{
    position: relative;
    float: right;
    width: 60px;
    text-align: left;
  } 
  .toolbar .el-col{
    height: 36px;
    line-height: 36px;
  }
  .toolbar .el-input__inner{
    height: 30px;
    width: 80px;
    color: #555;
  }
  .dialogSetting .el-row{
    margin:15px 0;
  }
  .dialogSetting .el-col{
    margin-right: 15px;
    line-height: 36px;    
  }
  .dialogSetting .tit{
    text-align: right;
  }
/*tool*/
  .tool{
    padding-top: 2px;
    position: relative;
    min-width: 1024px;
    height: 24px;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    z-index: 3;
    text-align: center;
  }
  .toolBox{
    display: inline-block;
    height: 22px;
  }  
  .property{
    float: left;
    width: auto;
    height: 20px;
    line-height: 20px;
    text-align: left;
  }
  .property .el-input{
    display: inline-block;
    width: 60px;    
  }
  .property input{
    padding: 0;
    height: 20px;
    text-align: center;
    text-indent: 5px;
    border-radius: 0;
    border:0;
    border-bottom: 1px solid #d9d9d9;
    font-size: 12px;
  }
  .property .el-color-picker{
    float: right;
    margin-right:5px;
  }
  .property .el-color-picker__trigger{
    border:0;
    padding: 0 4px;
    height: 20px;
  }
  .property .el-color-picker__icon{
    display: none;
  }
  .property .is-disabled .el-input__inner{
    background-color: #fff;
  }
/*leftlibrary*/
  .library{
    position: absolute;
    left: 0;
    top: 0;
    padding-top:62px;
    width: 181px;
    height:100%;   
    border-right: 1px solid #d9d9d9;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 2;
    transition: all 400ms;
    -moz-transition: all 400ms; 
    -webkit-transition: all 400ms; 
    -o-transition: all 400ms;
  }
  .lib_nav{
    position: absolute;
    width: 40px;
    height: 100%;
    background-color: #f8f8f8;
    border-right:1px solid #d9d9d9;
    opacity: 1;
     transition: all 400ms;
    -moz-transition: all 400ms; 
    -webkit-transition: all 400ms; 
    -o-transition: all 400ms;
  }  
  .lib_nav ol{
    float: right;
    padding-top: 7px;
    width: 37px;
  }
  .lib_nav li{
    width: 37px;
    height: 64px;
    border-top-left-radius:2px; 
    border-bottom-left-radius:2px; 
    text-align: center;
    cursor: pointer;
  }
  .lib_nav li.on{
     background-color: #fff;
     border: 1px solid #d9d9d9;
     border-right: 0;
  }
  .lib_nav i{
    margin-top: 12px;
    font-size: 18px;
    color: #f55d54;
  }
  .lib_nav span{
    display: inline-block;
  }
  .lib_box{
    width: 100%;
    height: 100%;
    color: #7d8695;
    padding-left: 48px;
    overflow: hidden;
    overflow-y:auto;
    box-sizing: border-box;
  }
  .header{
    float: left;
    width: 132px;
    font-size: 12px;
    color: #7d8695;
    height: 30px;
    line-height: 30px;    
    cursor: pointer;
  }
  .header i{
    float: right;
    margin-right:10px;
    margin-top: 10px;
    font-size: 12px;
    color: #7d8695;
  }
  .lib_ol{
    width: 132px;
    overflow: hidden;
    border-bottom: 1px solid #d9d9d9;
    transition: height 400ms ease-in-out;
  }
  .lib_li{
    float: left;
    width: 62px;
    height: 66px;
    text-align: center;
    font-size: 28px;
    color: #525e71;  
  }
  .lib_li i{
    display: inline-block;
    line-height: 26px;
  }
  .lib_li span{
    display: block;
    width:100%;
    font-size: 12px;
  }
  .lib_li:hover{
    background-color: #f5f5f5;
    cursor:pointer;
  }
  .dataHtml{
    display: none;
  }
  .shrink{
    position: absolute;
    top:50%;
    right: -22px;
    width: 22px;
    height: 24px;
    background-color: #fff;
    border:1px solid #d9d9d9;
    border-left: 0;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    color: #f55d54;
    text-indent: 1px;
    line-height: 24px;
    cursor: pointer;   
  }
  .shrink i {
    transition: all 400ms;
    -moz-transition: all 400ms; 
    -webkit-transition: all 400ms; 
    -o-transition: all 400ms;
  }
  .shrinkout {
    text-indent: 4px;
  }
  .shrinkout i{
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg); 
    -o-transform: rotate(180deg); 
  }  
  .basic {
    width: 62px;
  }
  .basic .lib_nav {
    display: none;
    opacity: 0;
  }
  .basic .lib_box {
    padding: 0;
    width: 62px;
  }
  .basic .header, .basic .lib_ol {
    display: none;
    opacity: 0;
  }
  .basic .lib_ol:nth-child(2){
    display: block;
    width: 62px;
    height: auto!important;
    border: 0;
    opacity: 1;
  }
/*editBox*/
  .editBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 62px 0 0 181px;
    box-sizing:border-box;    
    background-color: #8493af;
    z-index: 1;
    transition: all 400ms;
    -moz-transition: all 400ms; 
    -webkit-transition: all 400ms; 
    -o-transition: all 400ms;
  }
  .space{
    position: relative;
    width: 100%;
    height: 100%;
    overflow:auto;
  }
  .scrollcanvas {
    width: 100%;
    height: 1px;
  }
  .canvas{
    position:absolute;
    top: 50px;
    left: 50px;
    padding: 400px 0 200px 0;
    margin-bottom: 100px;
    width: 1200px;
    height: 1800px;
    background-color: #f5f5f5;
    background-size:10px 10px;
    /*border:1px solid #d9d9d9;*/
    box-sizing: border-box;
    /*overflow: hidden;*/
    cursor: default;
  } 
  .grid{
    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAABlBMVEUAAAAnNk6AHRRIAAAAAnRSTlMAsyT7Lw4AAAANSURBVAjXY2hgoCoAACfQAIGM5uSyAAAAAElFTkSuQmCC);    
  }
  .c_top{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 400px;
    border-bottom: 1px dashed #d9d9d9;
    box-sizing: border-box;
  }  
  .c_body{
   /* display: none;*/ /*关闭分区*/
    position: relative;
    height: 100%;
  }
  .c_foot{
    /*display: none;*/ /*关闭分区*/
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 200px;
    border-top: 1px dashed #d9d9d9;
    box-sizing: border-box;
  }  
  .hoverbar{
    display: none;
    position: absolute;
    left: 0;
    bottom: -30px;
    width: 100%;
    height:30px; 
    background-color: rgba(129, 199, 243, 0.4);
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    color: #333;
    cursor: ns-resize;  
    z-index: 99; 
  }
  .c_top:hover .hoverbar{
   display: block;
  }
  .c_foot:hover .hoverbar{
   display: block;
  }
  .on_hoverbar{
    border-top: 1px solid #75EFF4;
    border-bottom: 1px solid #75EFF4;
  }
  .c_foot .hoverbar{
    top:-30px;
  }
/*copyBox*/
  .copyBox{
    position: absolute;
    display: block;    
    width: 200px;
    height: 50px;
    background-color: rgba(245,245,245,0.8);
   /* border: 1px dotted #333;*/
  }
  .copyCon{
    display: none;
  }
  .line{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    border:0;
    border-style:dashed;
    border-color: red;
    display: none;
    z-index: 100;
  }
  .row-t{
    height: 0px;
    border-bottom-width: 1px;
  }
  .row-b{
    height: 0px;
    border-top-width: 1px;
  }
  .col-l{
    width: 0px;
    border-right-width: 1px;
  }
  .col-r{
    width: 0px;
    border-left-width: 1px;
  }
/*module*/
  .module:hover{
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);   
  }
  .on_module{
    border-color: #46a8fb;
    outline:1px solid #46a8fb;
    box-sizing: border-box;
    cursor: move;
  }
  .resize{
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color:#fff;
    border:1px solid #46a8fb;
    pointer-events: auto;
    z-index: 100;
  }
  .nw{
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }
  .w{
    top:50%;
    left: -12px;
    transform:translateY(-50%);
    -ms-transform:translateY(-50%);   /* IE 9 */
    -moz-transform:translateY(-50%);  /* Firefox */
    -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
    -o-transform:translateY(-50%);
    cursor: w-resize;
  }
  .sw{
    bottom: -10px;
    left:-10px;
    cursor: sw-resize;
  }
  .n{
    top: -12px;
    left: 50%;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%);   /* IE 9 */
    -moz-transform:translateX(-50%);  /* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
    cursor: n-resize;
  }
  .ne{
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }
  .e{
    top:50%;
    right:-12px;
    transform:translateY(-50%);
    -ms-transform:translateY(-50%);   /* IE 9 */
    -moz-transform:translateY(-50%);  /* Firefox */
    -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
    -o-transform:translateY(-50%);
    cursor: e-resize; 
  }
  .se{
    bottom: -10px;
    right:-10px;
    cursor: se-resize;
  }
  .s{
    bottom: -12px;
    left:50%;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%);   /* IE 9 */
    -moz-transform:translateX(-50%);  /* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
    cursor: s-resize;
  }
/*contextmenu*/
  .contextmenu{
    position: absolute;
    top:81px;
    left:181px;
    width: 130px;
    background-color: #fefefe;
    padding: 3px 0;
    text-align: left;
    text-indent: 16px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
    z-index: 101;
  }
  .contextmenu li{
    position: relative;
    padding:2px;
    height: 26px;
    line-height: 26px;
    color: #525e71;
    cursor: pointer;
  }
  .contextmenu li:hover{
    background-color: #E2E2E3;
  }
  .contextmenu li.tl_li_Disable{
    color: #cacaca;
    cursor: not-allowed;
  }
  .contextmenu li i {
    float: left;
    margin-top: 3px;
    margin-left: 8px;
    color: #f55d54;
    font-size: 18px;
    text-indent: 4px;
  }  
  .contextmenu li i.el-icon-caret-bottom{
    float: right;
    margin: 7px;
    font-size: 12px;
    color: #cacaca;
  } 
  .contextmenu li:hover i.el-icon-caret-bottom{
     transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg); 
    -o-transform: rotate(-90deg); 
    margin-right: 3px;
  }
   .contextmenu li ol{
    position:absolute;
    top:0;
    left:100%;
    display: none;
    width: 130px;
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  }
  .contextmenu li:hover ol{
    display: block;
  }
  .contextmenu li.tl_li_Disable i {
    color: #cacaca;
  }
  .contextmenu .divider{
    margin: 3px 0;
    border-bottom: 1px solid #e5e5e5;
  }
/*editor*/
  .editorC{
    margin: 0 auto;
    min-height: 400px 
  }
  .el-dialog__footer {
    padding: 10px 10px 15px;
  }
/*pageHeader-uploader*/
 .pageHeader-uploader .el-upload {
    width: 100%;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .pageHeader-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .pageHeader-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .pageHeaderImg {
    width: 100%;
    height: auto;
    display: block;
  }
/*carousel*/
  .el-dialog--carousel{
    width: 980px;
  }
  .scrollBox{
    height: 400px;
    overflow-y:auto;
    border-bottom: 1px solid #d1dbe5;
  }
  .selectBox{
  }
  .diaimg_li {
    position:relative;
    margin-bottom: 10px;
    width: 100%;
    height: 76px;
    border-bottom: 1px solid #e3e3e3;
  }
  .diaimg_li img{
    width: 240px;height: 66px;
  }
  .handleList{
    margin-top: 24px;
    width: 690px;
    float: right;
  }
  .handleList .el-col{
    text-align: center;
    cursor: pointer;
  }
  .handleList .el-col .spanTit{
    display: block;
    width: 100%;
    height: 100%;
    color: #20a0ff;
  }
  .handleList .el-col .ban{
    color: #ccc;
    cursor: not-allowed;
  }
  .spanUrl{
    text-align: left;
    text-indent: 10px;
  }
  .spanUrl input{
    text-indent: 10px;
    margin-left: 10px;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #9a9a9a;
    color: #999;
  }
  .carousel-uploader{
    height: 100%;
  }
  .carousel-uploader .el-upload--text{    
    display: block;
    margin:0 auto;
    transform:translateY(20px);
    -ms-transform:translateY(20px);   /* IE 9 */
    -moz-transform:translateY(20px);  /* Firefox */
    -webkit-transform:translateY(20px); /* Safari 和 Chrome */
    -o-transform:translateY(20px); 
  }
  .carousel-uploader .el-icon-plus{
    font-size: 24px;
    color: #e3e3e3;
  }
  .scrollBox .el-row{
    margin-bottom: 15px;
  }
  .scrollBox .el-col{
    height: 36px;
    line-height: 36px;
    text-align: center;
  }
  .editBox .screenBox .img_ul{
    left: 50%;
    transform: translateX(-50%);
    -ms-transform:translateX(-50%);  
    -moz-transform:translateX(-50%); 
    -webkit-transform:translateX(-50%);
    -o-transform:translateX(-50%);
  }
  .scrollBox .el-select{
    width: 180px;
  }
</style>
