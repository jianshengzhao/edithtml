<template>
  <div id="app">
    <!-- top main tool -->
    <div class="top">
      <div class="t_logo">logo</div>
      <div class="t_left">
        <div class="tl_li">
          <i class="iconfont icon-weibiaoti1"></i>
          <span>量尺</span>
        </div>
        <div class="tl_li tl_li_on gridli" @click="gridHangle">
          <i class="iconfont icon-xuxianxuankuang"></i>
          <span>格线</span>
        </div>
        <div class="tl_li tl_mod tl_li_Disable">
          <i class="iconfont icon-textalignjustify"></i>
          <span>对齐</span>
          <ul class="toolbar">
            <li @click="topAlignEvent"><i class="iconfont icon-dingduiqi"></i>上对齐</li>
            <li @click="bottomAlignEvent"><i class="iconfont icon-diduiqi"></i>下对齐</li>
            <li @click="leftAlignEvent"><i class="iconfont icon-zuoduiqi"></i>左对齐</li>
            <li @click="rightAlignEvent"><i class="iconfont icon-youduiqi"></i>右对齐</li>
            <li @click="centerAlignEvent"><i class="iconfont icon-juzhongduiqi"></i>水平居中</li>
            <li @click="middleAlignEvent"><i class="iconfont icon-v-top-copy"></i>垂直居中</li>
          </ul>
        </div>
        <div class="tl_li tl_mod tl_li_Disable">
          <i class="iconfont icon-tuceng"></i>
          <span>图层</span>
          <ul class="toolbar">
            <li @click="topFloorEvent"><i class="iconfont icon-dingceng"></i>置于顶层</li>
            <li @click="bottomFloorEvent"><i class="iconfont icon-diceng"></i>置于底层</li>
            <li @click="upFloorEvent"><i class="iconfont icon-shangyiyiceng"></i>上移一层</li>
            <li @click="downFloorEvent"><i class="iconfont icon-xiayiyiceng"></i>下移一层</li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-handle"></i>
          <span>操作</span>
          <ul class="toolbar">
            <li @click="shearEvent" class="tl_mod tl_li_Disable"><i class="iconfont icon-jianqie"></i>剪切</li>
            <li @click="copyEvent" class="tl_mod tl_li_Disable"><i class="iconfont icon-fuzhi"></i>复制</li>
            <li @click="pasteEvent"><i class="iconfont icon-zhantie"></i>粘贴</li>
            <li @click="deleteEvent" class="tl_mod tl_li_Disable"><i class="iconfont icon-shanchu"></i>删除</li>
          </ul>
        </div>     
      </div>
      <div class="t_right">
        <div class="tl_li">
          <i class="iconfont icon-fangda-copy"></i>
          <span>100%</span> 
          <ul class="toolbar">          
            <li><i class="iconfont icon-fangda-copy"></i>放大</li>
            <li><i class="iconfont icon-suoxiao"></i>缩小</li>
          </ul>
        </div>
        <div class="tl_li bgColor">
          <i class="iconfont icon-beijingyanse" @click="bgColorShow"></i>
          <span>背景</span>
          <ul class="toolbar" style="min-width: 76px;display: block;" v-if="bgcoloer">          
            <li ><el-color-picker v-model="bgColorVal" @change="changeBgColor" ></el-color-picker></li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-fenbianshuai"></i>
          <span>分辨率</span>
          <ul class="toolbar" >          
            <li style="width: 250px">
              <el-row>
                <el-col :span="6">分辨率:</el-col>
                <el-col :span="9">
                  <el-input v-model="inp_width" placeholder="宽" type="number" @change="widthRangeConstraint"></el-input>
                </el-col>
                <el-col :span="9">
                  <el-input v-model="inp_height" placeholder="高" type="number" @change="heightRangeConstraint"></el-input>
                </el-col>
              </el-row>
            </li>
          </ul>
        </div>        
        <div class="tl_li" style="margin-left:50px;">
          <i class="iconfont icon-baocun2"></i>
          <span>保存</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-yulan2"></i>
          <span>预览</span>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-tuichu"></i>
          <span>退出</span>
        </div>
      </div> 
    </div>
    <!-- attribute tool -->
    <div class="tool">
      <div class="toolBox">
        <div class="property" >
          <label for="">z:</label>
          <el-input v-model="inp_z" type='number' :disabled='disabled' min='0' @change='changeInpZ' ></el-input>
        </div>
        <div class="property" >
          <label for="">x:</label>
          <el-input v-model="inp_x" type='number' :disabled='disabled' min='0' @change='changeInpX' ></el-input>
        </div>
        <div class="property">
          <label for="">y:</label>
          <el-input v-model="inp_y" type='number' :disabled='disabled' min='0' @change='changeInpY' ></el-input>
        </div>
        <div class="property">
          <label for="">宽:</label>
          <el-input v-model="inp_w" type='number' :disabled='disabled' min='0' @change='changeInpW'></el-input>
        </div>
        <div class="property">
          <label for="">高:</label>
          <el-input v-model="inp_h" type='number' :disabled='disabled' min='0' @change='changeInpH'></el-input>
        </div>
        <div class="property">
          <label for="">文字:</label>
          <el-input v-model="inp_size" type='number' :disabled='disabled' min='12' @change='changeInpSize'></el-input>
        </div>
        <div class="property">
          <label for="">行高:</label>
          <el-input v-model="inp_line" type='number' :disabled='disabled' min='12' @change='changeInpLine'></el-input>
        </div>
        <div class="property">
          <label for="">字色:</label>
          <el-color-picker v-model="color_font" :disabled='disabled' @change='changeColorFont'></el-color-picker>
        </div>
        <div class="property">
          <label for="">背景:</label>
          <el-color-picker v-model="color_bg" :disabled='disabled' @change='changeColorBg'></el-color-picker>
        </div>
      </div>
    </div>
    <!-- assembly library -->
    <div class="library">
      <div class="lib_box">
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>        
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>        
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
        <div class="lib_li" >模块</div>
      </div>
    </div>
    <!-- editBox -->
    <div class="editBox">
      <div class="space">
        <div class="canvas grid" >
          <div class="c_top">
            <div class="hoverbar" ondragstart="return false"></div>
          </div>
          <div class="c_body"></div>
          <div class="c_foot">
            <div class="hoverbar" ondragstart="return false"></div>
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
          <div class='text module'>asdadadsadad</div>
        </div>
      </div>
      <!-- 自定义右键菜单 -->
      <ul class="contextmenu">
        <li>右键工具栏</li>
        <li>123</li>
        <div class="divider"></div>
        <li>123</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '@/assets/iconfont/demo.css'
  import '@/assets/iconfont/iconfont.css'
  import Vue from 'vue'
  import Element from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(Element)
  export default { // todo: 本地操作保存
    name: 'app',
    data: function () {
      return {
        bgcoloer: false,
        bgColorVal: '#fff',
        inp_width: 1200,
        inp_height: 1600,
        disabled: true,
        inp_z: '',
        inp_x: '',
        inp_y: '',
        inp_w: '',
        inp_h: '',
        inp_size: '',
        inp_line: '',
        color_font: '#333',
        color_bg: '#fff',
        moduleElement: '',
        moduleParentElementHeight: '',
        clipboard: '',
        original: '',
        config: {
          stretchLimit: true, // 是否开启module拉伸限制
          moveLimit: true // 是否开启module移动限制
        },
        tool: { /* 工具箱事件 */
          linePosition: function (editBox, copyBox) {
            let rowT = $('.row-t')
            let rowB = $('.row-b')
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')
            let sTop = parseInt($('.space').scrollTop()) // 当前滚动条高度
            let w = parseInt(copyBox.css('width'))
            let h = parseInt(copyBox.css('height'))
            rowT.css('top', event.pageY + sTop - 81)
            rowB.css('top', event.pageY + sTop - 81 + h)
            colL.css('left', 0)
            colR.css('left', w)
            line.show()
            editBox.mousemove(function (e) {
              rowT.css('top', e.pageY + sTop - 81)
              rowB.css('top', e.pageY + sTop - 81 + h)
              colL.css('left', e.pageX - 181)
              colR.css('left', e.pageX - 181 + w)
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
            let topRangeY = parseInt(cTop.css('height')) + 181 // top选区范围
            let bodyRangeY = parseInt(cBody.css('height')) + topRangeY // body选区范围
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')
            let scrollHeight = $('.space')[0].scrollHeight
            let editMouseupBloo = false
            colL.css('height', scrollHeight)
            colR.css('height', scrollHeight)
            $('.c_top .hoverbar').mousedown(function () { // top容器调整
              y = event.pageY
              h = parseInt(cTop.css('height'))
              $(this).addClass('on_hoverbar')
              canvas.mousemove(function () {
                hs = h + (event.pageY - y)
                cTop.css('height', hs)
                canvas.css('paddingTop', hs)
                topRangeY = hs + 181
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
              })
              canvasMouseup()
            })
            $('.c_foot .hoverbar').mousedown(function () { // foot容器调整
              y = event.pageY
              h = parseInt(cFoot.css('height'))
              $(this).addClass('on_hoverbar')
              canvas.mousemove(function () {
                hs = h + (y - event.pageY)
                cFoot.css('height', hs)
                canvas.css('paddingBottom', hs)
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
              })
              canvasMouseup()
            })
            $('.lib_li').mousedown(function () { // 左边模块库鼠标拖动事件
              copyBox.show().css({'top': event.pageY, 'left': 181})
              if (editMouseupBloo) {
                return
              }
              editMouseupBloo = true
              editBox.mousemove(function (e) {
                copyBox.css({'top': e.pageY, 'left': e.pageX})
              })
              toolself.linePosition(editBox, copyBox)
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
                editMouseupBloo = false
                editBox.unbind('mousemove mouseup')
                let box
                let x = event.pageX - 281
                let y
                let sTop = parseInt($('.space').scrollTop())
                if (event.pageY + sTop < topRangeY) {
                  box = cTop
                  y = event.pageY + sTop - 181
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
                let bChild = box.children()
                bChild.eq(bChild.length - 1).css({'top': y, 'left': x})
              })
            }
          },
          bindClickEvent: function (self) { // 画布内选中模块一系列操作事件
            let editBox = $('.editBox')
            let resize = '<div class="resize nw"></div>' +
                         '<div class="resize sw"></div>' +
                         '<div class="resize ne"></div>' +
                         '<div class="resize se"></div>' +
                         '<div class="resize e"></div>' +
                         '<div class="resize n"></div>' +
                         '<div class="resize w"></div>' +
                         '<div class="resize s"></div>'
            let rowT = $('.row-t')
            let rowB = $('.row-b')
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')

            editBox.on('click', '.module', function (e) { // 选中模块
              let ele = $(this)
              let sTop = parseInt($('.space').scrollTop())
              self.moduleElement = ele
              self.moduleParentElementHeight = parseInt(ele.parent().css('height'))
              $('.module').removeClass('on_module')
              $('.resize').remove()
              ele.addClass('on_module')
              ele.append(resize)
              selectedEvents(ele, sTop)
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
              }
            })
            editBox.click(function (e) { // 失去焦点取消选中
              // 失去焦点取消选中
              missSeletedEvents()
            })
            function selectedEvents (ele, sTop) { // 工具栏属性值赋值
              self.inp_z = parseInt(ele.css('zIndex')) || 0
              self.inp_x = parseInt(ele.css('left'))
              self.inp_y = parseInt(ele.css('top'))
              self.inp_w = parseInt(ele.css('width'))
              self.inp_h = parseInt(ele.css('height'))
              self.inp_size = parseInt(ele.css('fontSize'))
              self.inp_line = parseInt(ele.css('lineHeight'))
              self.color_font = ele.css('color')
              self.color_bg = ele.css('backgroundColor')
              rowT.css('top', self.inp_y + 100)
              rowB.css('top', self.inp_y + 100 + self.inp_h)
              colL.css('left', self.inp_x + 100)
              colR.css('left', self.inp_x + 100 + self.inp_w)
              self.disabled = false
              $('.tl_mod').removeClass('tl_li_Disable')
            }
            function missSeletedEvents () { // 初始化
              line.hide()
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
            }
            function changeMoveEvents (xs, ys, x, y, sTop, warp) { // 计算参考线位置
              rowT.css('top', self.inp_y + warp + 100)
              rowB.css('top', self.inp_y + warp + 100 + self.inp_h)
              colL.css('left', self.inp_x + 100)
              colR.css('left', self.inp_x + 100 + self.inp_w)
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
              rowT.css('top', self.inp_y + 100 + warp)
              rowB.css('top', self.inp_y + 100 + self.inp_h + warp)
              colL.css('left', self.inp_x + 100)
              colR.css('left', self.inp_x + 100 + self.inp_w)
              let part
              switch ($this.attr('class')) {
                case 'resize e':
                  part = function () {
                    let xx = self.inp_x + 100 + ws + event.pageX - x
                    self.inp_w = ws + event.pageX - x
                    if (self.config.stretchLimit) {
                      if (xx > areaR + 100) {
                        xx = areaR + 100
                        self.inp_w = areaR - xs
                      }
                    }
                    if (xx < xs + 100) {
                      xx = xs + 100
                      self.inp_w = 0
                    }
                    $this.parent().css('width', self.inp_w)
                    colR.css('left', xx)
                  }
                  break
                case 'resize s':
                  part = function () {
                    let yy = ys + 100 + warp + hs + event.pageY - y
                    self.inp_h = hs + event.pageY - y
                    if (self.config.stretchLimit) {
                      if ((self.inp_h + self.inp_y) > areaB) {
                        yy = areaB + warp + 100
                        self.inp_h = areaB - self.inp_y
                      }
                    }
                    if (yy < ys + 100 + warp) {
                      yy = ys + 100 + warp
                      self.inp_h = 0
                    }
                    $this.parent().css('height', self.inp_h)
                    rowB.css('top', yy)
                  }
                  break
                case 'resize w':
                  part = function () {
                    let xx = xs - x + event.pageX + 100
                    self.inp_x = xs - x + event.pageX
                    self.inp_w = ws + x - event.pageX
                    if (self.config.stretchLimit) {
                      if (xx < 100) {
                        xx = 100
                        self.inp_w = ws + xs
                        self.inp_x = 0
                      }
                    }
                    if (xx > (xs + ws + 100)) {
                      xx = xs + ws + 100
                      self.inp_w = 0
                      self.inp_x = xs + ws
                    }
                    $this.parent().css({'width': self.inp_w, 'left': self.inp_x})
                    colL.css('left', xx)
                  }
                  break
                case 'resize n':
                  part = function () {
                    let yy = ys - y + event.pageY + warp + 100
                    self.inp_y = ys - y + event.pageY
                    self.inp_h = hs + y - event.pageY
                    if (self.config.stretchLimit) {
                      if (yy < 100 + warp) {
                        yy = 100 + warp
                        self.inp_y = 0
                        self.inp_h = hs + ys
                      }
                    }
                    if (yy > ys + hs + 100 + warp) {
                      yy = ys + hs + 100 + warp
                      self.inp_y = ys + hs
                      self.inp_h = 0
                    }
                    $this.parent().css({'height': self.inp_h, 'top': self.inp_y})
                    rowT.css('top', yy)
                  }
                  break
                case 'resize ne':
                  part = function () {
                    let yy = ys - y + event.pageY + warp + 100
                    let xx = self.inp_x + 100 + ws + event.pageX - x
                    self.inp_y = ys - y + event.pageY
                    self.inp_w = ws + event.pageX - x
                    self.inp_h = hs + y - event.pageY
                    if (self.config.stretchLimit) {
                      if (yy < 100 + warp) {
                        yy = 100 + warp
                        self.inp_y = 0
                        self.inp_h = hs + ys
                      }
                      if (xx > areaR + 100) {
                        xx = areaR + 100
                        self.inp_w = areaR - self.inp_x
                      }
                    }
                    if (xx < xs + 100) {
                      xx = xs + 100
                      self.inp_w = 0
                    }
                    if (yy > ys + hs + 100 + warp) {
                      yy = ys + hs + 100 + warp
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
                    let yy = ys - y + event.pageY + warp + 100
                    let xx = xs - x + event.pageX + 100
                    self.inp_y = ys - y + event.pageY
                    self.inp_x = xs - x + event.pageX
                    self.inp_h = hs + y - event.pageY
                    self.inp_w = ws + x - event.pageX
                    if (self.config.stretchLimit) {
                      if (yy < 100 + warp) {
                        yy = 100 + warp
                        self.inp_y = 0
                        self.inp_h = hs + ys
                      }
                      if (xx < 100) {
                        xx = 100
                        self.inp_w = ws + xs
                        self.inp_x = 0
                      }
                    }
                    if (yy > ys + hs + 100 + warp) {
                      yy = ys + hs + 100 + warp
                      self.inp_y = ys + hs
                      self.inp_h = 0
                    }
                    if (xx > (xs + ws + 100)) {
                      xx = xs + ws + 100
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
                    let yy = self.inp_y + 100 + warp + hs + event.pageY - y
                    let xx = self.inp_x + 100 + ws + event.pageX - x
                    self.inp_w = ws + event.pageX - x
                    self.inp_h = hs + event.pageY - y
                    if (self.config.stretchLimit) {
                      if ((self.inp_h + self.inp_y) > areaB) {
                        yy = areaB + warp + 100
                        self.inp_h = areaB - self.inp_y
                      }
                      if (xx > areaR + 100) {
                        xx = areaR + 100
                        self.inp_w = areaR - self.inp_x
                      }
                    }
                    if (yy < ys + 100 + warp) {
                      yy = ys + 100 + warp
                      self.inp_h = 0
                    }
                    if (xx < self.inp_x + 100) {
                      xx = self.inp_x + 100
                      self.inp_w = 0
                    }
                    $this.parent().css({'width': self.inp_w, 'height': self.inp_h})
                    rowB.css('top', yy)
                    colR.css('left', xx)
                  }
                  break
                case 'resize sw':
                  part = function () {
                    let yy = self.inp_y + 100 + hs + event.pageY - y + warp
                    let xx = xs - x + event.pageX + 100
                    self.inp_x = xs - x + event.pageX
                    self.inp_h = hs + event.pageY - y
                    self.inp_w = ws + x - event.pageX
                    if (self.config.stretchLimit) {
                      if ((self.inp_h + self.inp_y) > areaB) {
                        yy = areaB + warp + 100
                        self.inp_h = areaB - ys
                      }
                      if (xx < 100) {
                        xx = 100
                        self.inp_w = ws + xs
                        self.inp_x = 0
                      }
                    }
                    if (yy < ys + 100 + warp) {
                      yy = ys + 100 + warp
                      self.inp_h = 0
                    }
                    if (xx > (xs + ws + 100)) {
                      xx = xs + ws + 100
                      self.inp_w = 0
                      self.inp_x = xs + ws
                    }
                    $this.parent().css({'width': self.inp_w, 'height': self.inp_h, 'left': self.inp_x})
                    rowB.css('top', yy)
                    colL.css('left', xx)
                  }
                  break
              }
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
          bindToolEvent: function (self) { // 工具栏操作事件
            console.log('todo:预览123')
          },
          bindRightClickEvent: function (self) { // 右键唤出菜单功能
            let canvas = $('.canvas')
            canvas.bind('contextmenu', function () {
              return false
            })
            canvas.mousedown(function (e) {
              if (e.which === 3) {
                console.log(e.target)
                return false
              }
            })
          }
        }
      }
    },
    created: function () {
      var self = this
      self.$nextTick(function () {
        let canvas = $('.canvas')
        self.inp_width = parseInt(canvas.css('width'))
        self.inp_height = parseInt(canvas.css('height'))
        self.tool.bindMouseEvent(self)
        self.tool.bindClickEvent(self)
        self.tool.bindToolEvent(self)
        self.tool.bindRightClickEvent(self)
      })
    },
    methods: {
      bgColorShow: function () { // 背景颜色调色板显示
        var self = this
        if (!self.bgcoloer) {
          self.bgcoloer = true
        } else {
          self.bgcoloer = false
        }
      },
      changeBgColor: function () { // 背景颜色变化
        var self = this
        self.bgcoloer = false
        let canvas = $('.canvas')
        canvas.css('backgroundColor', self.bgColorVal)
      },
      widthRangeConstraint: function () { // 页面宽度限制
        var self = this
        if (self.inp_width < 980) {
          // self.inp_width = 980
          this.$message({
            message: 'pc页面宽度不要低于980',
            type: 'warning'
          })
        } else {
          $('.canvas').css('width', self.inp_width)
        }
      },
      heightRangeConstraint: function () { // 页面高度限制
        var self = this
        if (self.inp_width < 980) {
          self.inp_width = 980
          this.$message({
            message: 'pc页面宽度最好不要低于980',
            type: 'warning'
          })
        } else {
          $('.canvas').css('height', self.inp_height)
        }
      },
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
        var self = this
        self.moduleElement.css('color', val)
      },
      changeColorBg: function (val) { // background-color 背景颜色
        var self = this
        self.moduleElement.css('backgroundColor', val)
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
      shearEvent: function () {
        if ($('.on_module').length > 0) {
          let self = this
          self.clipboard = self.moduleElement[0].outerHTML
          self.original = self.moduleElement.parent()
          self.moduleElement.remove()
        }
      },
      copyEvent: function () {
        if ($('.on_module').length > 0) {
          let self = this
          self.clipboard = self.moduleElement[0].outerHTML
          self.original = self.moduleElement.parent()
        }
      },
      pasteEvent: function () {
        let self = this
        if (self.clipboard) {
          self.original.append(self.clipboard)
        }
      },
      deleteEvent: function () {
        if ($('.on_module').length > 0) {
          let self = this
          self.moduleElement.remove()
        }
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
    text-align: center;
    height: 100%;
    cursor: default;
  }
  *{
    margin:0;
    padding:0;
    font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
  }
  html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  ::-webkit-scrollbar {
      width: 4px;
      height: 5px;
  }
  ::-webkit-scrollbar-track-piece
    {
        background-color: #fff;
        -webkit-border-radius: 6px;
    }
    ::-webkit-scrollbar-thumb:vertical
    {
        height: 4px;
        width: 3px;
        background-color: #c9c9c9;
        -webkit-border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:horizontal
    {
        width: 4px;
        background-color: #c9c9c9;
       /* -webkit-border-radius: 6px;*/
    }

  Pseudo ::scrollbar-corner element
  ::-webkit-scrollbar-corner {
      background-color: #c9c9c9;
  }
  Pseudo ::scrollbar-thumb element
  ::-webkit-scrollbar-thumb {
      background-color: #c9c9c9;
      border-radius: 4px;
  }
  Pseudo ::scrollbar-track element
  ::-webkit-scrollbar-track {
      background-color: #c9c9c9;
  }
/*top*/
  .top{
    position: relative;
    height: 45px;
    min-width: 1024px;
    border-bottom: 1px solid #d9d9d9;
    z-index: 4;
    background-color: #fff;
  }
  .top>div{
    height: 45px;
  }
  .t_logo{
    float: left;
    width: 180px;    
    line-height: 45px;
    font-size: 20px;
    color: #ccc;
  }
  .t_left{
    float: left;
    width: 300px;  
  }
  .tl_li{
    padding: 2px;
    border-radius: 2px;
    position: relative;
    display: inline-block;
    width: 36px;
    height: 34px;
    margin: 2px;
    cursor: pointer; 
    text-align: center; 
    border:1px solid #fff;  
  }
  .tl_li_on{
    background: rgba(0, 0, 0, 0.04);
    border-color:rgba(0,0,0,.1);
  }
  .tl_li_Disable{
    opacity: 0.6;
    cursor:not-allowed;
  }
  .tl_li i{
    font-size: 18px;
    line-height: 18px;
    color:#f55d54;
  }
  .tl_li>span{
    display: inline-block;
    width: 100%;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #525e71;
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
    min-width: 124px;
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  }
  .toolbar li{
    padding: 10px;
    text-align:left;
    list-style-type: none;
    color: #525e71;
  }
  .toolbar li:hover{
    background-color: #f5f5f7;
  }
  .toolbar li i{
    margin-right:5px;
  }  
  .toolbar input::-webkit-inner-spin-button{
    display: none;
  }
  .t_right{
    position: relative;
    float: right;
    width: 500px;
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
/*tool*/
  .tool{
    position: relative;
    min-width: 1024px;
    height: 34px;
    border-bottom: 1px solid #d9d9d9;
    background-color: #fff;
    z-index: 3;
  }
  .toolBox{
    margin: 0 auto;
    width: 820px;
    height: 34px;
  }  
  .property{
    float: left;
    width: 90px;
    height: 34px;
    line-height: 34px;
    text-align: left;
  }
  .property .el-input{
    display: inline-block;
    width: 60px;    
  }
  .property input{
    padding: 0;
    height: 26px;
    text-align: center;
    text-indent: 5px;
    border-radius: 0;
    border:0;
    border-bottom: 1px solid #d9d9d9;
  }
  .property .el-color-picker{
    float: right;
    margin-right:20px;
  }
  .property .el-color-picker__trigger{
    border:0;
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
    top: 0px;
    padding-top:80px;
    width: 181px;
    height:100%;   
    border-right: 1px solid #d9d9d9;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 2;
  }
  .lib_box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y:auto;
  }
  .lib_li{
    float: left;
    width: 58px;
    height: 60px;
    text-align: center;
    line-height: 60px;    
  }
  .lib_li:hover{
    background-color: #f5f5f5;
    cursor:pointer;
  }
/*editBox*/
  .editBox{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 80px 0 0 181px;
    box-sizing:border-box;    
    background-color: #f5f5f5;    
    z-index: 1;
  }
  .space{
    position: relative;
    width: 100%;
    height: 100%;
    overflow:auto;
  }
  .canvas{
    position:absolute;
    top: 100px;
    left: 100px;
    padding: 200px 0 100px 0;
    margin-bottom: 100px;
    width: 1200px;
    height: 1800px;
    background-color: #fff;
    background-size:10px 10px;
    border:1px solid #d9d9d9;
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
    height: 200px;
    border-bottom: 1px dashed #d9d9d9;
  }  
  .c_body{
    position: relative;
    height: 100%;
  }
  .c_foot{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    border-top: 1px dashed #d9d9d9;
  }
  .hoverbar{
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height:5px; 
    cursor: ns-resize;    
  }
  .hoverbar:hover{
    border-top: 1px solid #75EFF4;
    border-bottom: 1px solid #75EFF4;
  }
  .on_hoverbar{
    border-top: 1px solid #75EFF4;
    border-bottom: 1px solid #75EFF4;
  }
  .c_foot .hoverbar{
    top:-4px;
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
  .text{
    position: absolute;
    width: 200px;
    height: 50px;
    border: 1px solid #333;
    box-sizing: border-box;
    background-color: #F487FE;
    color: #fff;
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
  }
  .row-t{
    height: 1px;
    border-bottom-width: 1px;
  }
  .row-b{
    height: 1px;
    border-top-width: 1px;
  }
  .col-l{
    width: 1px;
    border-right-width: 1px;
  }
  .col-r{
    width: 1px;
    border-left-width: 1px;
  }
/*module*/
  .on_module{
    border-color: #46a8fb;
   /* outline:1px solid #46a8fb;*/
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
    z-index: 2;
  }
  .nw{
    top: -6px;
    left: -6px;
    cursor: nw-resize;
  }
  .w{
    top:50%;
    left: -6px;
    transform:translateY(-50%);
    -ms-transform:translateY(-50%);   /* IE 9 */
    -moz-transform:translateY(-50%);  /* Firefox */
    -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
    -o-transform:translateY(-50%);
    cursor: w-resize;
  }
  .sw{
    bottom: -6px;
    left:-6px;
    cursor: sw-resize;
  }
  .n{
    top: -6px;
    left: 50%;
    transform:translateX(-50%);
    -ms-transform:translateX(-50%);   /* IE 9 */
    -moz-transform:translateX(-50%);  /* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
    cursor: n-resize;
  }
  .ne{
    top: -6px;
    right: -6px;
    cursor: ne-resize;
  }
  .e{
    top:50%;
    right:-6px;
    transform:translateY(-50%);
    -ms-transform:translateY(-50%);   /* IE 9 */
    -moz-transform:translateY(-50%);  /* Firefox */
    -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
    -o-transform:translateY(-50%);
    cursor: e-resize; 
  }
  .se{
    bottom: -6px;
    right:-6px;
    cursor: se-resize;
  }
  .s{
    bottom: -6px;
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
    width: 180px;
    background-color: #fefefe;
    padding: 3px 0;
  }
  .contextmenu li{
    padding:2px;
    height: 26px;
    line-height: 26px;
    color: #525e71;
  }
  .contextmenu .divider{
    margin: 3px 0;
    border-bottom: 1px solid #e5e5e5;
  }

</style>
