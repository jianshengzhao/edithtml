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
        <div class="tl_li">
          <i class="iconfont icon-textalignjustify"></i>
          <span>对齐</span>
          <ul class="toolbar">          
            <li><i class="iconfont icon-dingduiqi"></i>上对齐</li>
            <li><i class="iconfont icon-diduiqi"></i>下对齐</li>
            <li><i class="iconfont icon-zuoduiqi"></i>左对齐</li>
            <li><i class="iconfont icon-youduiqi"></i>右对齐</li>
            <li><i class="iconfont icon-juzhongduiqi"></i>水平居中</li>
            <li><i class="iconfont icon-v-top-copy"></i>垂直居中</li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-tuceng"></i>
          <span>图层</span>
          <ul class="toolbar">          
            <li><i class="iconfont icon-dingceng"></i>置于顶层</li>
            <li><i class="iconfont icon-diceng"></i>置于底层</li>
            <li><i class="iconfont icon-shangyiyiceng"></i>上移一层</li>
            <li><i class="iconfont icon-xiayiyiceng"></i>下移一层</li>
          </ul>
        </div>
        <div class="tl_li">
          <i class="iconfont icon-handle"></i>
          <span>操作</span>
          <ul class="toolbar">          
            <li><i class="iconfont icon-jianqie"></i>剪切</li>
            <li><i class="iconfont icon-fuzhi"></i>复制</li>
            <li><i class="iconfont icon-zhantie"></i>粘贴</li>
            <li><i class="iconfont icon-shanchu"></i>删除</li>
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
        <div class="property">
          <label for="">x:</label>
          <el-input v-model="inp_x" type='number' min='0' ></el-input>
        </div>
        <div class="property">
          <label for="">y:</label>
          <el-input v-model="inp_y" type='number' min='0' ></el-input>
        </div>
        <div class="property">
          <label for="">宽:</label>
          <el-input v-model="inp_w" type='number' min='0' ></el-input>
        </div>
        <div class="property">
          <label for="">高:</label>
          <el-input v-model="inp_h" type='number' min='0' ></el-input>
        </div>
        <div class="property">
          <label for="">文字:</label>
          <el-input v-model="inp_size" type='number' min='12' ></el-input>
        </div>
        <div class="property">
          <label for="">字色:</label>
          <el-color-picker v-model="color_font"></el-color-picker>
        </div>
        <div class="property">
          <label for="">背景:</label>
          <el-color-picker v-model="color_bg"></el-color-picker>
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
      <div class="copyBox">
        <div class="copyCon">
          <div class='text module'>asdadadsadad</div>
        </div>
      </div>
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
        inp_x: '',
        inp_y: '',
        inp_w: '',
        inp_h: '',
        inp_size: '',
        color_font: '#333',
        color_bg: '#fff',
        tool: { /* 工具箱事件 */
          pos: function (x, y) {
            this.x = x
            this.y = y
          },
          bindMouseEvent: function () { // 鼠标事件集合
            let canvas = $('.canvas')
            let cTop = $('.c_top')
            let cBody = $('.c_body')
            let cFoot = $('.c_foot')
            let editBox = $('.editBox')
            let copyBox = $('.copyBox')
            let copyCon = $('.copyCon')
            let h // 容器高度
            let hs // 计算得到的高度
            let x // 鼠标X轴
            let y // 鼠标Y轴
            let topRangeY = parseInt(cTop.css('height')) + 181 // top选区范围
            let bodyRangeY = parseInt(cBody.css('height')) + topRangeY // body选区范围
            let rowT = $('.row-t')
            let rowB = $('.row-b')
            let colL = $('.col-l')
            let colR = $('.col-r')
            let line = $('.line')
            let scrollHeight = $('.space')[0].scrollHeight
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
            $('.lib_li').mousedown(function () { // 模块鼠标拖动事件
              x = 181
              y = event.pageY
              let sTop = parseInt($('.space').scrollTop()) // 当前滚动条高度
              copyBox.show()
              copyBox.css({'top': y, 'left': x})
              line.show()
              let w = parseInt(copyBox.css('width'))
              let h = parseInt(copyBox.css('height'))
              editBox.mousemove(function (e) {
                x = e.pageX
                y = e.pageY
                copyBox.css({'top': y, 'left': x})
                rowT.css('top', y + sTop - 81)
                rowB.css('top', y + sTop - 81 + h)
                colL.css('left', x - 181)
                colR.css('left', x - 181 + w)
              })
              editMouseup()
            })
            function canvasMouseup () { // canvas解绑鼠标移动事件
              canvas.mouseup(function () {
                canvas.unbind('mousemove')
                $('.hoverbar').removeClass('on_hoverbar')
              })
            }
            function editMouseup () { // editBox解除模块拖动事件,并添加模块到canvas上
              editBox.mouseup(function (e) {
                editBox.unbind('mousemove mouseup')
                let box
                let x = event.pageX - 281
                let y
                let sTop = parseInt($('.space').scrollTop())
                if (event.pageY < topRangeY) {
                  box = cTop
                  y = event.pageY - 181
                } else if (event.pageY < bodyRangeY) {
                  box = cBody
                  y = event.pageY - topRangeY
                } else {
                  box = cFoot
                  y = event.pageY - bodyRangeY
                }
                copyBox.hide()
                line.hide()
                box.append(copyCon.html())
                let bChild = box.children()
                bChild.eq(bChild.length - 1).css({'top': y + sTop, 'left': x})
              })
            }
          },
          bindClickEvent: function (self) {
            let canvas = $('.canvas')
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

            canvas.click(function (e) {
              let ele = $(e.target)
              // var x
              // var y
              var sTop = parseInt($('.space').scrollTop())
              if (!ele.hasClass('resize')) {
                $('.module').removeClass('on_module')
                $('.resize').remove()
                if (ele.hasClass('module')) {
                  ele.addClass('on_module')
                  ele.append(resize)
                  line.show()
                  selectedEvents(ele, sTop)
                  // x = e.pageX
                  // y = e.pageY
                  ele.parent().mousemove(function (e) {
                    console.log(e.pageY)
                    // todo:鼠标移动绑定事件
                  })
                } else {
                  missSeletedEbents()
                }
              }
            })
            function selectedEvents (ele, sTop) {
              self.inp_x = parseInt(ele.css('left'))
              self.inp_y = parseInt(ele.css('top'))
              self.inp_w = parseInt(ele.css('width'))
              self.inp_h = parseInt(ele.css('height'))
              self.inp_size = parseInt(ele.css('fontSize'))
              self.color_font = ele.css('color')
              self.color_bg = ele.css('backgroundColor')
              rowT.css('top', self.inp_y + sTop + 100)
              rowB.css('top', self.inp_y + sTop + 100 + self.inp_h)
              colL.css('left', self.inp_x + 100)
              colR.css('left', self.inp_x + 100 + self.inp_w)
            }
            function missSeletedEbents () {
              line.hide()
              $('.resize').remove()
              self.inp_x = ''
              self.inp_y = ''
              self.inp_w = ''
              self.inp_h = ''
              self.inp_size = ''
              self.color_font = '#333'
              self.color_bg = '#fff'
            }
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
        self.tool.bindMouseEvent()
        self.tool.bindClickEvent(self)
      })
    },
    methods: {
      bgColorShow: function () {
        var self = this
        if (!self.bgcoloer) {
          self.bgcoloer = true
        } else {
          self.bgcoloer = false
        }
      },
      changeBgColor: function () {
        var self = this
        self.bgcoloer = false
        let canvas = $('.canvas')
        canvas.css('backgroundColor', self.bgColorVal)
      },
      widthRangeConstraint: function () {
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
      heightRangeConstraint: function () {
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
      gridHangle: function (e) {
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
    width: 660px;
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
    outline:1px solid #46a8fb;
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
</style>
