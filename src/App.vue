<template>
  <div id="app" unselectable="on" onselectstart="return false;">
  <!-- top main tool -->
    <div class="top" unselectable="on" onselectstart="return false;">
      <div class="t_left">
        <div class="tl_li" @click="settingEvent">
          <i class="iconfont mb icon-cog " title="设置"></i>
          <span>页面设置</span>
        </div>
        <div class="tl_li" @click="saveEvent">
          <i class="iconfont icon-save" title="保存"></i>
          <span>保存</span>
        </div>
      <!--   <div class="tl_li" @click="previewEvent" title="预览">
          <i class="iconfont icon-preview"></i>
          <span>预览</span>
        </div> -->
       <!--  <div class="tl_li" title="量尺">
          <i class="iconfont icon-scale"></i>
          <span>量尺</span>
        </div> -->
       <!--  <div class="tl_li tl_li_on gridli" @click="gridHangle" title="格线">
          <i class="iconfont icon-gridlines"></i>
          <span>格线</span>
        </div> -->
        <!-- <div class="tl_li tl_mod tl_li_Disable" >
          <i class="iconfont icon-align-left"></i>
          <div class="doll"></div>         
          <ul class="toolbar">
            <li @click="topAlignEvent"><i class="iconfont icon-align-up"></i>上对齐</li>
            <li @click="bottomAlignEvent"><i class="iconfont icon-align-down"></i>下对齐</li>
            <li @click="leftAlignEvent"><i class="iconfont icon-align-left"></i>左对齐</li>
            <li @click="rightAlignEvent"><i class="iconfont icon-align-right"></i>右对齐</li>
            <li @click="centerAlignEvent"><i class="iconfont icon-align-center"></i>水平居中</li>
            <li @click="middleAlignEvent"><i class="iconfont icon-align-middle"></i>垂直居中</li>
          </ul>
        </div>
        <div class="tl_li tl_mod tl_li_Disable" >
          <i class="iconfont icon-layer"></i>
          <div class="doll"></div>         
          <ul class="toolbar">
            <li @click="topFloorEvent"><i class="iconfont icon-layer-top"></i>置于顶层</li>
            <li @click="bottomFloorEvent"><i class="iconfont icon-layer-bottom"></i>置于底层</li>
            <li @click="upFloorEvent"><i class="iconfont icon-layer-up"></i>上移一层</li>
            <li @click="downFloorEvent"><i class="iconfont icon-layer-down"></i>下移一层</li>
          </ul>
        </div>
        <div class="tl_li tl_mod tl_li_Disable" >
          <i class="iconfont icon-copy"></i>
          <div class="doll"></div>        
          <ul class="toolbar" >
            <li @click="shearEvent" :class="onlybloo?'':'tl_li_Disable'"><i class="iconfont icon-shear"></i>剪切</li>
            <li @click="copyEvent" :class="onlybloo?'':'tl_li_Disable'"><i class="iconfont icon-copy"></i>复制</li>
            <li @click="pasteEvent" :class="clipboard?'':'tl_li_Disable'"><i class="iconfont icon-paste"></i>粘贴</li>
            <li @click="deleteEvent" ><i class="iconfont icon-delete"></i>删除</li>
          </ul>
        </div> -->
      </div>
      <!-- module attribute -->
     <!--  <div class="toolBox"> -->
        <div class="property " >
          <label for="" class="leftBorder">Z :</label>
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
      <!-- module font -->      
        <div class="property">
          <label for="" class="leftBorder">字号 :</label>
          <el-input v-model="inp_size" type='number' :disabled='disabled' min='12' @change='changeInpSize'></el-input>
        </div>
        <div class="property">
          <label for="">行高 :</label>
          <el-input v-model="inp_line" type='number' :disabled='disabled' min='12' @change='changeInpLine'></el-input>
        </div>
        <div class="property">
          <label for="">字色 :</label>
          <!-- <el-color-picker v-model="color_font" :disabled='disabled' @change='changeColorFont'></el-color-picker> -->
          <colorPicker class="propertycolor" v-model="color_font" :disabled='disabled' @change='changeColorFont'></colorPicker>
        </div>      
      <!-- module background -->     
        <div class="property">
          <label for="" class="leftBorder">背景 :</label>
          <colorPicker class="propertycolor" v-model="color_bg" :disabled='disabled' @change='changeColorBg'></colorPicker>
        </div>     
      <!-- module border -->      
        <div class="property">
          <label for="" class="leftBorder">边框 :</label>
          <div class="border br-mod br-disable">
            <i class="iconfont2 icon-dayin_biankuangshezhi"></i>
            <div class="doll" ></div>
            <ul class="toolbar">
              <el-radio-group v-model="br_width" @change='changeBorderWidth'>
              <li v-for="(item, index) in br_widths">
                <el-radio-button :key="item.value" :label="item.label">
                  <span v-if="item.value == 0" class="borderWidth">none</span>
                  <span v-else class="borderWidth" :style="'border-bottom-width:' + item.label + 'px;border-style: ' + br_style + ';border-color:#333;'">{{item.label}}</span>
                </el-radio-button>
              </li>
              </el-radio-group>
            </ul>
          </div>
          <div class="border br-mod br-disable" :style="br_width=='0'?'cursor:not-allowed':''">
            <i class="iconfont2 icon-biankuangyangshi" ></i>
            <div class="doll" ></div>
            <ul class="toolbar" v-if="br_width!='0'">
              <el-radio-group v-model="br_style" @change='changeBorderStyle'>
              <li v-for="(item, index) in br_styles">
                <el-radio-button :key="item.value" :label="item.label">
                  <span class="borderStyle" :style="'border-width:' + br_width + 'px;border-style: ' + item.label + ';border-color:#333;'"></span>
                </el-radio-button>
              </li>
              </el-radio-group>
            </ul>
          </div>
          <div class="border br-mod br-disable" >
            <i class="iconfont2 icon-biankuangyanse" ></i>
            <div class="doll" ></div>
            <colorPicker class="br_color" v-model="br_color" @change='changeBorderColor' :disabled="br_width==0">
            </colorPicker>
          </div>
        </div>      
      <!-- module opacity -->     
        <div class="property">
          <label for="" class="leftBorder">透明度 :</label>
          <el-input v-model="inp_opacity" type='number' :disabled='disabled' :step="1" :min='0' :max='100' @change='changeOpacity'></el-input>%
        </div>      
      <!-- module shadow -->
        <div class="property" style="margin-left:4px;">
          <label for="" class="leftBorder">阴影 :</label>
          <div class="border br-mod br-disable shadow">
            <i class="iconfont2 icon-yinying"></i>
            <div class="doll"></div>
            <ul class="toolbar">
              <el-checkbox v-model="check_shadow" @change='changeShadow'>阴影</el-checkbox>
              <div>
                <span>厚度：</span>
                <span>x：</span>
                <span>
                  <el-input v-model="inp_weight_x" type='number' :disabled='disabled' :step="1" :min='0' :max='10' @change='changHShadow'></el-input>
                </span>
                <span>y：</span>
                <span>
                  <el-input v-model="inp_weight_y" type='number' :disabled='disabled' :step="1" :min='0' :max='10' @change='changVShadow'></el-input>
                </span>
              </div>
              <div>
                <span>模糊度：</span>
                <span>
                  <el-input v-model="inp_blur" type='number' :disabled='disabled' :step="1" :min='0' :max='10' @change='changBlurShadow'></el-input>
                </span>
                <span>颜色：</span>
                <span class="colorShadow">
                  <colorPicker v-model="bw_color" @change='changColorShadow'></colorPicker>
                </span>
              </div>
            </ul>
          </div>
        </div>      
      <!-- </div> -->
      <!-- module exit -->     
      <div class="t_clean">       
        <div class="tl_li" @click="cleanScreenEvent">
          <i class="icon-clean">×</i>
          <span>清屏</span>
        </div>       
      </div> 
      <div class="t_right">
        <a href="/">
          <div class="tl_li">
            <i class="iconfont icon-exits"></i>
            <span>退出</span>
          </div>
        </a>
      </div> 
    </div> 
  <!-- assembly library -->
    <div class="library" unselectable="on" onselectstart="return false;">
      <!-- <nav class="lib_nav">
        <ol>
          <li class="on"><i class="iconfont icon-cube"></i><span>组件</span></li>
        </ol>
      </nav> -->
      <div class="lib_box">
        <div class="header basichead">基本组件 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol basicBox"></div>
        <div class="header basichead">网校组件 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol onlineBox"></div>
        <!-- <div class="header">正在做。。。 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol todoBox"></div> -->
        <div class="header">敬请期待。。。</div>
      </div>      
    </div>
  <!--   <div class="shrink libshrink">
      <i class="el-icon-arrow-left"></i>
    </div> -->
  <!-- layer      -->
    <div class="layer" unselectable="on" onselectstart="return false;">
      <div class="lib_box">
        <div class="header layerhead">模块索引 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol elementHead">
          <div class="ele_li" v-for="(item, index) in elementHead" :dataIndex="index"><span>{{item.text}}</span> <span :dataIndex="index" class="deleteLayer" title="删除">×</span></div>
        </div>
       <!--  <div class="header layerhead" >主体 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol elementMain">
          <div class="ele_li" v-for="(item, index) in elementMain" :dataIndex="index"><span>{{item.text}}</span> <span :dataIndex="index" class="deleteLayer" title="删除">×</span></div>
        </div>
        <div class="header layerhead">页尾 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol elementTail">
          <div class="ele_li" v-for="(item, index) in elementTail" :dataIndex="index"><span>{{item.text}}</span> <span :dataIndex="index" class="deleteLayer" title="删除">×</span></div>
        </div>       --> 
      </div>
     <!--  <div class="shrink shrinkout">
        <i class="el-icon-arrow-left"></i>
      </div> -->
    </div>
  <!-- editBox    -->
    <div class="editBox" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;padding-right:314px;">
      <div class="space">       
        <div class="canvas grid" >
          <div class="c_top">            
          </div>
         <!--  <div class="c_body">
          </div>
          <div class="c_foot">           
          </div> -->
        </div>
        <div class="row-t line"></div>
        <div class="row-b line"></div> 
        <div class="col-l line"></div>
        <div class="col-r line"></div>
          <!-- 自定义右键菜单 -->
        <ul class="contextmenu">
          <li @click="upFloorEvent" v-if="rightButton"><i class="iconfont icon-layer-up"></i>上移一层</li>
          <li @click="downFloorEvent" v-if="rightButton"><i class="iconfont icon-layer-down"></i>下移一层</li>
          <div class="divider" v-if="rightButton"></div>       
          <li v-if="rightButton"><i class="iconfont icon-align-left"></i>对齐
            <i class="el-icon-caret-bottom"></i>
            <ol>
           <!--    <li @click="topAlignEvent" v-if="rightButton"><i class="iconfont icon-align-up"></i>上对齐</li>
              <li @click="bottomAlignEvent" v-if="rightButton"><i class="iconfont icon-align-down"></i>下对齐</li> -->
              <li @click="leftAlignEvent" v-if="rightButton"><i class="iconfont icon-align-left"></i>左对齐</li>
              <li @click="rightAlignEvent" v-if="rightButton"><i class="iconfont icon-align-right"></i>右对齐</li>
              <li @click="centerAlignEvent" v-if="rightButton"><i class="iconfont icon-align-center"></i>水平居中</li>
            <!--   <li @click="middleAlignEvent" v-if="rightButton"><i class="iconfont icon-align-middle"></i>垂直居中</li> -->
            </ol>
          </li>
          <div class="divider" v-if="rightButton"></div>
          <li @click="shearEvent" :class="onlybloo?'':'tl_li_Disable'" v-if="rightButton"><i class="iconfont icon-shear"></i>剪切</li>
          <li @click="copyEvent" :class="onlybloo?'':'tl_li_Disable'" v-if="rightButton"><i class="iconfont icon-copy"></i>复制</li>
          <li @click="pasteEvent" :class="clipboard?'':'tl_li_Disable'"><i class="iconfont icon-paste"></i>粘贴</li>
          <li @click="deleteEvent" v-if="rightButton"><i class="iconfont icon-delete"></i>删除</li>
        </ul>
      </div>
    <!-- copyBox  选中的组件容器盒子-->
      <div class="copyBox">
        <div class="copyCon">
        </div>
      </div>  
    </div>
  <!-- dialog弹框 -->
    <el-dialog
      title="页面设置"
      :visible.sync="dialogPageSetting"
      size="pageSet" class="dialogSetting">
      <el-row>
        <el-col :span="4" class="tit">页高</el-col>          
        <el-col :span="7">          
          <el-input-number v-model="inp_height" :step="100" size="small"></el-input-number>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">前景色</el-col>
        <el-col :span="7">
         <!--  <el-color-picker v-model="prospectColorVal" ></el-color-picker> -->
          <colorPicker v-model="prospectColorVal" ></colorPicker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">前景图</el-col>
        <el-col :span="7">
          <el-upload
            class="upload-demo"
            name="upfile"
            action="/uploadv2/image.html"
            :show-file-list="false"
            :on-success="handlePredropSuccess"
            :before-upload="beforePictureUpload">
            <img v-if="pgImageUrl" :src="pgImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="6">
          <el-button size="small" @click="cleanPgEvent">清除前景图</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">显示（%）</el-col>
        <el-col :span="10">
          <el-input-number v-model="inp_pgPercent" :step="2" size="small" :min="0" :max="100"></el-input-number> 
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">平铺模式</el-col>
        <el-col :span="10">
          <el-select v-model="repeatPgValue" placeholder="请选择">
            <el-option
              v-for="item in repeatOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="tit">固定背景</el-col>
        <el-col :span="10">
          <el-select v-model="attachmentPgValue" placeholder="请选择">
            <el-option
              v-for="item in attachmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPageSetting = false">取 消</el-button>
        <el-button type="primary" @click="dialogPageSettingEvent">确 定</el-button>
      </span>
    </el-dialog>
  <!-- 网校模块   -->    
    <el-dialog
      title="模块动画"
      :visible.sync="dialogscrollanim"
      :close-on-click-modal="false"
      size="scrollanim">
      <el-row>
        <el-col>
          <div @click="editanim()" class="animlist active"><div :class="animtype==''?'animimg active':'animimg'">无<div class="animtip">✔</div></div><p>无效果</p></div>
          <div @click="editanim('fadeIn')" class="animlist"><div :class="animtype=='fadeIn'?'animimg active':'animimg'">
            <img  src="./assets/img/fadeIn_icon.png">
          <div class="animtip">✔</div></div><p>淡入</p></div>
          <div @click="editanim('slideInRight')" class="animlist"><div :class="animtype=='slideInRight'?'animimg active':'animimg'">
            <img  src="./assets/img/slideInRight_icon.png">
          <div class="animtip">✔</div></div><p>飞入</p></div>
          <div @click="editanim('zoomIn')" class="animlist"><div :class="animtype=='zoomIn'?'animimg active':'animimg'">
            <img  src="./assets/img/zoomIn_icon.png">
          <div class="animtip">✔</div></div><p>放大</p></div>
          <div @click="editanim('bounceInRight')" class="animlist"><div :class="animtype=='bounceInRight'?'animimg active':'animimg'">
            <img  src="./assets/img/bounceInRight_icon.png">
          <div class="animtip">✔</div></div><p>跳入</p></div><br>
          <div @click="editanim('flash')" class="animlist"><div :class="animtype=='flash'?'animimg active':'animimg'">
            <img  src="./assets/img/flash_icon.png">
          <div class="animtip">✔</div></div><p>闪现</p></div>
          <div @click="editanim('rotateIn')" class="animlist"><div :class="animtype=='rotateIn'?'animimg active':'animimg'">
            <img src="./assets/img/rotateIn_icon.png">
          <div class="animtip">✔</div></div><p>滚入</p></div>
          <div @click="editanim('flipInY')" class="animlist"><div :class="animtype=='flipInY'?'animimg active':'animimg'">
            <img src="./assets/img/flipInY_icon.png">
          <div class="animtip">✔</div></div><p>翻转</p></div>
          <div @click="editanim('bounceIn')" class="animlist"><div :class="animtype=='bounceIn'?'animimg active':'animimg'">
            <img src="./assets/img/bounceIn_icon.png">
          <div class="animtip">✔</div></div><p>弹性放大</p></div>
          <div @click="editanim('bounceOut')" class="animlist"><div :class="animtype=='bounceOut'?'animimg active':'animimg'">
            <img src="./assets/img/bounceOut_icon.png">
          <div class="animtip">✔</div></div><p>弹性缩小</p></div>
        </el-col>
        
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogscrollanim = false">取 消</el-button>
        <el-button @click="editanimate()" type="primary">确 定</el-button>
      </span>
    </el-dialog>  
  <!-- dialog弹框 suspendTools -->    
    <hrefdialog ref="hrefdialogp"></hrefdialog>
    <myimages ref="myimages"></myimages>
    <suspend ref="suspend"></suspend>
    <shape ref="shape"></shape>
  <!-- dialog弹框 modules 基本组件 -->
    <rectangle ref="rectangle"></rectangle>
    <ueditor ref="ueditor"></ueditor>
    <editbutton ref="editbutton"></editbutton>
    <picture ref="picture"></picture>
    <hline ref="hline"></hline>
    <sline ref="sline"></sline>
  <!-- dialog弹框 modules 网校组件 -->
    <headers ref="headers"></headers>  
    <menubar ref="menubar"></menubar>
    <carousel ref="carousel"></carousel>
    <course ref="course"></course>
    <information ref="information"></information>
    <footernav ref="footernav"></footernav>
  <!-- <weather ref="weather"></weather> 
       <carousel ref="carousel"></carousel>
       <waiter ref="waiter"></waiter>
       <advert ref="advert"></advert>
       <player ref="player"></player>
       <addcoursetype ref="addcoursetype"></addcoursetype>
       <effect ref="effect"></effect> -->
  </div>
</template>
<script>  
  import $ from 'jquery' 
  import configData from '@/data/configData.js'
  import tool from '@/data/tool.js'
  import colorPicker from '@/components/supendTools/colorPicker'
  import hrefdialog from '@/components/supendTools/hrefdialog'
  import myimages from '@/components/supendTools/myimages'
  import suspend from '@/components/supendTools/suspend'
  import shape from '@/components/supendTools/shape' 
  
  import rectangle from '@/components/modules/rectangle'
  import ueditor from '@/components/modules/ueditor'
  import editbutton from '@/components/modules/editbutton'
  import picture from '@/components/modules/picture'
  import hline from '@/components/modules/hline'
  import sline from '@/components/modules/sline'

  import menubar from '@/components/modules/menubar'
  import course from '@/components/modules/course'
  import footernav from '@/components/modules/footernav'
  import information from '@/components/modules/information'
  import carousel from '@/components/modules/carousel'
  import headers from '@/components/modules/header'
  // import weather from '@/components/modules/weather' 
  // import waiter from '@/components/modules/waiter'
  // import advert from '@/components/modules/advert'  
  // import player from '@/components/modules/player'
  // import addcoursetype from '@/components/modules/addcoursetype'  
  // import effect from '@/components/modules/effect'
  import '@/assets/animate.min.css'
  let config = configData.config.config
  export default { // todo: 本地操作保存
    name: 'app',
    components: {
      colorPicker,
      hrefdialog, 
      myimages,
      suspend, 
      shape,
      rectangle,
      ueditor, 
      editbutton,           
      picture,
      hline,
      sline,
      menubar,
      course,
      footernav,
      information,
      carousel,
      headers
      // weather,
      // carousel, 
      // waiter, 
      // advert, 
      // course,
      // player,
      // addcoursetype
    },
    data: function () {
      return {
      // ------------ 工具栏add ----------------- 
        onlybloo: true,
        br_width: '0',
        br_widths: [
          {
            value: '0',
            label: '0'
          },{
            value: '1',
            label: '1'
          },{
            value: '2',
            label: '2'
          },{
            value: '3',
            label: '3'
          },{
            value: '4',
            label: '4'
          },{
            value: '5',
            label: '5'
          }],
        br_style: 'solid',
        br_styles: [
          {
            value: 'solid',
            label: 'solid'
          },{
            value: 'double',
            label: 'double'
          },{
            value: 'dotted',
            label: 'dotted'
          },{
            value: 'dashed',
            label: 'dashed'
          },{
            value: 'groove',
            label: 'groove'
          },{
            value: 'ridge',
            label: 'ridge'
          },{
            value: 'inset',
            label: 'inset'
          },{
            value: 'outset',
            label: 'outset'
          }],
        br_color: '#ccc',
        inp_opacity: '',        
        check_shadow: false,
        inp_weight_x: '0',
        inp_weight_y: '0',
        inp_blur: '0',
        bw_color: '#ccc',
        editEditor: false,
      // ------------ 登录框文本 ---------------- 
        logintext :'',
        dialogedittext:false,
      // ------------ 基础组件弹框 -------------- 
        dialogscrollanim:false,
        anim:'',
        animtype : 0,
        dialogPageSetting: false,
        attachmentPgValue: 'scroll',
        attachmentBgValue: 'scroll',
        attachmentOptions: [
          {
            value: 'scroll',
            label: '滚动'
          },
          {
            value: 'fixed',
            label: '固定'
          }],
        repeatPgValue: 'no-repeat',
        repeatBgValue: 'no-repeat',
        repeatOptions: [
          {
            value: 'no-repeat',
            label: '不平铺'
          },
          {
            value: 'repeat-y',
            label: 'Y 轴平铺'
          },
          {
            value: 'repeat-x',
            label: 'X 轴平铺'
          },
          {
            value: 'repeat',
            label: '平铺'
          }],
        activeSetting: 'first',
        prospectColorVal: '#fff',
        bgColorVal: '#F5F5F5',
        fontHoverColorVal: '#333',
        bgImageUrl: '',
        pgImageUrl: '',
        inp_percent: '100',
        inp_pgPercent: '100',
        inp_width: 375,
        inp_height: 1800,
        disabled: true,
        rightButton: false,
        inp_z: '',
        inp_x: '',
        inp_y: '',
        inp_w: '',
        inp_h: '',
        inp_size: '',
        inp_line: '',
        color_font: '#fff',
        color_bg: '#fff',
        moduleElement: '', // 选中的模块全局引用
        moduleElementY:'',
        moduleElementX:'',
        moduleElementR:'',
        moduleElementB:'',
        moduleParentElementHeight: '',      
        clipboard: '',
        original: '',
      // ------------ config -------------------- 
        config: {
          stretchLimit: config.stretchLimit, // 是否开启module拉伸限制
          moveLimit: config.moveLimit // 是否开启module移动限制
        },
        paddingtop: config.paddingtop, // top栏高度
        paddingleft: config.paddingleft, // left栏高度
        postop: config.postop, // editbox  top值
        posleft: config.posleft, // editbox  left值
        fuzzyVal: config.fuzzyVal, // 模糊度
        choiceCon: config.choiceCon,
        preHandleTime: 0,
        elementStorage: {
          c_top: {},
          c_body: {},
          c_foot: {}
        },
        elementHead: [],
        elementMain: [],
        elementTail: [],
        moduleData: configData.config,
        tool: tool,
      // ------------ 封装的异步请求 ------------ 
        httpget: function (getParam) { 
          let self = this
          self.$http.get(window.host + getParam.url, {params: getParam.params}).then((response) => {
            if (getParam.fun !== undefined) {
              getParam.fun(response)
            }
          }).catch(function (response) {
          })
        },
        httppost: function (getParam) { 
          let self = this
          self.$http.post(window.host + getParam.url, getParam.params, {emulateJSON: true}).then((response) => {
            if (getParam.fun !== undefined) {
              getParam.fun(response)
            }
          }).catch(function (response) {
          })
        }
      }
    },
    created: function () {      
      var self = this     
      self.moduleData['toallGroup']['basic'] = []
      self.moduleData['toallGroup']['online'] = []
      self.$nextTick(function () {        
        let head = $('.c_top')
      // -------- 获取网校信息 ------------- 
          let getParam = {
            url: '/aroomv3/roominfo.html',
            params: {},
            fun: function (response) {
              let crid = response.body.data.crid
              window.roominfo = response.body.data
              // -------- 获取网校页面 -----------
              let getParams = {
                url: '/room/design/getdesign.html',
                params: {crid: crid},
                fun: function (response) {
                  let saveParams = response.body.data                
                  let headHtml = saveParams.head.replace(/[\\]/g, '')              
                  let pp = $.parseJSON(saveParams.settings.replace(/[\\]/g, ''))
                  self.prospectColorVal = pp.pg =='transparent'?null:pp.pg
                  self.fontHoverColorVal = pp.fontHover||'#333'                
                  self.pgImageUrl = pp.pgImage.backgroundImage.split('(')[1].split(')')[0]
                  self.inp_pgPercent = pp.pgImage.backgroundSize.split('%')[0]
                  self.repeatPgValue = pp.pgImage.backgroundRepeat
                  self.attachmentPgValue = pp.pgImage.backgroundAttachment
                  head.css('backgroundColor', pp.pg)
                  head.css(pp.pgImage)              
                  head.css('height', self.inp_height)
                  head.html(headHtml)
                  self.moduleElement = $('.on_module')
                  tool.tool.carryLayerEvent(self, head)
                  tool.tool.carryUpdateElementStorageEvent(self, head, head.find('.module'))
                }
              }
              self.httppost(getParams) 
            }
          }
      // self.httpget(getParam)  未有手机版接口     
      // -------- 工具初始化 ----------------  
        tool.tool.init(self, $)
      // -------- 工具栏位置自适应调整 ------ 
        let shadow = $('.property .shadow .toolbar')
        let colorbox = shadow.find('.box')
        let $top = $('.top')
        let width
        let moveShadow
        positionshadow()
        $(window).resize(function(event) {
           positionshadow()
        })
        function positionshadow() {
          width = parseInt($top.css('width'))
          if(width < 1845){
            width = parseInt($top.css('width'))   
            if(width < 1558) {             
              shadow.css('left', '0px')
              colorbox.css('left', '0px')
            } else {
              moveShadow = width - 1845             
              if (moveShadow < -212) {
                shadow.css('left', '-212px')
                colorbox.css('left', (moveShadow + 212) + 'px')
              }else{
                shadow.css('left', moveShadow + 'px')
              }
            }     
          }
        }

      })
    },
    methods: {
    // ------------- 清屏 -------------------- 
      cleanScreenEvent: function () {
        let self = this
        self.$confirm('此操作将清除页面为空白页, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let head = $('.c_top')
          let middle = $('.c_body')
          let foot = $('.c_foot')
          head.html('')
          tool.tool.carryLayerEvent(self, head)
          tool.tool.carryUpdateElementStorageEvent(self, head, head.find('.module'))
          self.elementStorage.c_top = {}
          self.$message({
            type: 'success',
            message: '清屏成功!'
          });
        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消清屏'
          });          
        });
      },
    // ------------- 动画效果 ---------------- 
      dialoganim(){
        let self = this
        let anim  = $('.on_module').attr('data-kui-anim')
        self.anim = anim;
        self.animtype = anim;
        self.dialogscrollanim = true
      },
      editanim(val){
        let self = this;
        let anim = val || ''
        self.animtype = anim;
        self.anim = anim;
        let a = $('.on_module');
        a.addClass('animated '+anim);
        setTimeout(function(){
          a.removeClass(anim);
          a.removeClass('animated');
        }, 1000);
      },
      editanimate(){
        let self = this;
        let a = $('.on_module');
        a.attr('data-kui-anim',self.anim)
        self.dialogscrollanim = false
      },
    // ------------- 页面设置 ---------------- 
      settingEvent: function () { // 页面设置
        let self = this
        self.dialogPageSetting = true
      },
      handlePredropSuccess: function (res) {
        let self = this
        let showurl = res.data.showurl       
        self.pgImageUrl = showurl
      },
      cleanPgEvent: function () {
        var self = this
        self.pgImageUrl = ''
      },
      dialogPageSettingEvent: function () { // 页面设置弹框保存
        var self = this       
        let canvas = $('.c_top')
        
        canvas.css('height', self.inp_height)
        if (self.prospectColorVal) {
          canvas.css('backgroundColor', self.prospectColorVal)
        } else {
          canvas.css('backgroundColor', 'transparent')
        }        
        if(self.pgImageUrl){
          let pgJson = {'backgroundImage': 'url(' + self.pgImageUrl + ')', 'backgroundSize': self.inp_pgPercent + '% auto', 'backgroundRepeat': self.repeatPgValue,'backgroundAttachment': self.attachmentPgValue}
          canvas.css(pgJson)
        } else {
          canvas.css('backgroundImage','none')
        }      
        if (self.fontHoverColorVal) {
          $('#fontHover').remove()
          $('head').append('<style id="fontHover">body a[href]:hover{color:' + self.fontHoverColorVal + ';}</style>')
        }
        self.dialogPageSetting = false
      },
      saveEvent: function () { // 页面保存
        let self = this
        let setting = {
          pg: self.prospectColorVal?self.prospectColorVal:'transparent',
          bg: self.bgColorVal?self.bgColorVal:'transparent',
          fontHover: self.fontHoverColorVal,
          pgImage: {'backgroundImage': 'url(' + self.pgImageUrl + ')', 'backgroundSize': self.inp_pgPercent + '% auto', 'backgroundRepeat': self.repeatPgValue,'backgroundAttachment': self.attachmentPgValue},
          bgImage: {'backgroundImage': 'url(' + self.bgImageUrl + ')', 'backgroundSize': self.inp_percent + '% auto', 'backgroundRepeat': self.repeatBgValue,'backgroundAttachment': self.attachmentBgValue},
          width: self.inp_width + 'px',
          height: self.inp_height + 'px',
          top: $('.c_top').css('height'),
          body: $('.c_body').css('height'),
          foot: $('.c_foot').css('height')
        }
        let strSetting = window.JSON.stringify(setting)
        let headArray = $('.c_top').html()
        let bodyArray = $('.c_body').html()
        if (bodyArray == '') {
          self.$notify({
            title: '警告',
            message: 'body主体内容不能为空',
            type: 'warning'
          })
          return false
        }
        let footArray = $('.c_foot').html()
        let audition = $('.audition ')
        let auditions = ''
        let auditionArr = {}
        for (let i = 0, len = audition.length; i < len; i++) {
          let itemid = audition.eq(i).attr('auditionid')
          if (!auditionArr[itemid]) {
            if (itemid){
              auditions += itemid + ','
              auditionArr[itemid] = true
            }
          }
        }
        auditions = auditions.substring(0, auditions.length - 1)
        let player = $('.player')
        let vedioids = []
        let vedioidObj = {}
        for (let i = 0, len = player.length; i < len; i++) {
          let playerData = $.parseJSON(player.eq(i).attr('playerData')).playerData
          for (let j = 0, jen = playerData.length; j < jen; j++) {
            let cwid = playerData[j].cwid
            if (!vedioidObj[cwid]) {
              vedioids.push(cwid) 
              vedioidObj[cwid] = true
            }
          }
        }       
        let param = {
          url: '/room/design/save.html',
          params: {
            head: headArray,
            foot: footArray,
            body: bodyArray,
            settings: strSetting,
            status: 0,
            auditions: auditions,
            vedioids: vedioids
          },
          fun: function (response) {
            let body = response.body
            let code = body.code
            let msg = body.msg
            if (code === 0) {
              self.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              })
            } else {
              self.$notify({
                title: '警告',
                message: msg,
                type: 'warning'
              })
            }
          }
        }
        self.httppost(param)
      },
    // ------------- 模块属性控制 ------------ 
      changeInpZ: function (val) { // z-index 定位
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'zIndex', val)
      },
      changeInpX: function (val) { // left 定位
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'left', val)
      },
      changeInpY: function (val) { // top 定位
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'top', val)
      },
      changeInpW: function (val) { // width 宽度
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'width', val)       
      },
      changeInpH: function (val) { // height 高度
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'height', val)       
      },
      changeInpSize: function (val) { // font-size 字体大小
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'fontSize', val) 
      },
      changeInpLine: function (val) { // line-height 行高
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'lineHeight', val)
      },
      changeColorFont: function (val) { // font-color 字体颜色
        var self = this       
        tool.tool.carryModuleOperationEvent(self, 'color', val)
      },
      changeColorBg: function (val) { // background-color 背景颜色
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'backgroundColor', val)
      },
      changeBorderWidth: function (val) { // 边框宽度（粗细）
        var self = this
        let mods = $('.on_module')
        if (mods.length > 1){
          if (parseInt(self.moduleElementY.css('border-left-width'))!== val){
            tool.tool.carryModuleOperationEvent(self, 'borderWidth', val)
          }
        }else if(mods.length!= 0){
          tool.tool.carryModuleOperationEvent(self, 'borderWidth', val)
        }        
      },
      changeBorderStyle: function (val) { // 边框样式
        var self = this
        let mods = $('.on_module')
        if (mods.length > 1){
          if (self.moduleElementY.css('border-left-style')!== val){
            tool.tool.carryModuleOperationEvent(self, 'borderStyle', val)
          }
        }else if(mods.length!= 0){          
          tool.tool.carryModuleOperationEvent(self, 'borderStyle', val)
        }        
      },
      changeBorderColor: function (val) { // 边框颜色
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'borderColor', val)
      },
      changeOpacity: function (val) { // 透明度
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'opacity', val)
      },
      changeShadow: function (val) { // 阴影开关
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'boxShadow', self.check_shadow)        
      },
      changHShadow: function (val) { // 水平偏移阴影
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'boxShadowX', val)        
      },
      changVShadow: function (val) { // 垂直偏移阴影
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'boxShadowY', val)        
      },
      changBlurShadow: function (val) { // 阴影模糊
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'boxShadowBlur', val)       
      },
      changColorShadow: function (val) { // 阴影颜色
        var self = this        
        tool.tool.carryModuleOperationEvent(self, 'boxShadowColor', val)
      },
    // ------------- 模块操作 ---------------- 
      topAlignEvent: function () { // top 上对齐
        var self = this
        tool.tool.carryModuleOperationEvent(self, 'topAlign')
      },
      bottomAlignEvent: function () { // top 下对齐
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'bottomAlign')
      },
      leftAlignEvent: function () { // left 左对齐
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'leftAlign')
      },
      rightAlignEvent: function () { // left 右对齐
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'rightAlign')
      },
      centerAlignEvent: function () { // left 水平居中
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'centerAlign')
      },
      middleAlignEvent: function () { // top 垂直居中
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'middleAlign')
      },
      topFloorEvent: function () { // 图层置顶
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'topFloor')
      },
      bottomFloorEvent: function () { // 图层置底
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'bottomFloor')
      },
      upFloorEvent: function () { // 图层上移一层
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'upFloor')       
      },
      downFloorEvent: function () { // 图层下移一层
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'downFloor')
      },
      shearEvent: function () { // 剪切
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'shear')
      },
      copyEvent: function () { // 复制
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'copy')
      },
      pasteEvent: function () { // 粘贴
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'paste')
      },
      deleteEvent: function () { // 删除
        let self = this
        tool.tool.carryModuleOperationEvent(self, 'delete')
      },    
      beforePictureUpload: function (file) {
        let self = this
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
          self.$notify({
            title: '警告',
            message: '上传的图片只能是jpg、png或gif格式。',
            type: 'warning',
            offset: 50,
            duration: 4000
          })
          return false
        }
      }
    }
  }
</script>

<style>
  /* ------------- header -------------- */
    .el-dialog__header{
      cursor: move;
    }
    .el-dialog--pageSet .el-dialog__header{
      cursor: move;
      padding-bottom: 15px;
      border-bottom: 1px solid #ccc;
    }
    .el-dialog--scrollanim{
      width: 510px;
    }
    .leftBorder{
      border-left: 1px solid #888;
      margin-left: 10px;
      padding-left: 10px;
      line-height: 20px;
      height: 20px;
      display: inline-block;
    }
    .picture{
      border-width: 0; 
      border-style: solid;
      border-color: #000;
    }
    .propertycolor{
      width: 22px;
      height: 15px;
    }
    .propertycolor .colorBtn{  
      position: absolute; 
      top:2px;
      left: 0;    
      border:1px solid #666;
      cursor: pointer;
      /*margin:2px;*/
    }
    #app .propertycolor .box.open{
      margin-top: 20px;
    }
    #app .propertycolor .disabled{
      border-color: #ccc;
    }
  /* ------------- app ----------------- */
    #app {
      position: relative;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
      cursor: default;
    }
    .nodata{
      background:url(assets/img/nodata.png) no-repeat 50%;
      min-width: 300px;
      width: 100%;
      height: 400px;
    }
  /* ------------- top ----------------- */
    #app .upload-demo{
      height: 105px;
      width: 120px;
    }
    #app .upload-demo .el-upload {
      width: 100%;
      height: 100%;
      line-height: 105px;
      border: 1px solid #bfcbd9;
      border-radius: 4px;
    }
    #app .upload-demo .el-upload img{
      width: 100%;
      height: 100%;
    }
    .top{
      padding-top: 3px;
      padding-left: 10px;
      padding-right: 130px;
      position: relative;    
      min-width: 1024px;
      border-bottom: 1px solid #d9d9d9;
      z-index: 4;
      background-color: #fff;
      letter-spacing: 0;
      float: left;
      width: 100%;
      box-sizing: border-box;
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
      width: 150px;  
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
    #app .t_clean{
      position: absolute;    
      width: 60px;
      height: 28px;
      top: 3px;
      right: 64px;      
    }
    #app .icon-clean{
      background-color: #fff;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid #f55d54;
      font-size: 18px;
      color: #f55d54;
      line-height: 12px;
    }
    #app .t_right{
      position: absolute;    
      width: 60px;
      height: 28px;
      top: 3px;
      right: 4px;
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
    .getRegion{
      position: absolute;
      z-index: 200;
      background-color: rgba(245, 93, 84, 0.5);
    }
  /* ------------- 边框 ---------------- */
    .pick{
      width: 20px;
      height: 20px;
      background-color: #ccc;
    }
    .border, .shadow{
      position: relative;
      display: inline-block;
      width: 38px;     
      cursor:pointer;
      margin-left: 5px; 
      font-size: 14px;
    }
    .border .doll, .shadow .doll{
      right: 8px;
      border-bottom-color: inherit;
      border-left-color:inherit;
    }
    .border:hover .toolbar{
      display: block;
    }
    .br-disable{    
      cursor: not-allowed;
      border-color: #ccc;
    }
    .br-disable i{
      color: #ccc;
    }  
    .br-disable:hover .toolbar{
      display: none;
    }
    .border .toolbar{
      padding: 10px 2px 4px 2px;
    }
    .border .toolbar li{
      padding: 8px;
      text-indent: 0;
    }
    .border .borderWidth{
      margin: 0 auto;
      display: block;
      width: 100px;
      border: 0;
    }
    .border .borderStyle{
      margin: 0 auto;
      display: block;
      width: 100px;
      height: 5px;
    }
    .shadow .toolbar{
      width: 212px;
      padding: 8px;
    }
    .colorShadow{
      position: relative;
    }
    .shadow .toolbar .m-colorPicker {
      top:5px;
      left:5px;
    }

    .shadow .toolbar span{
      display: inline-block;
    }
    .shadow .toolbar .el-input {
      width: 50px;
    }
    .shadow .toolbar .el-input__inner{
      width: 50px;
      text-indent: 0;
    }
    .shadow .toolbar input::-webkit-inner-spin-button {
      display: block;
    }
    .border .el-radio-button .el-radio-button__inner{
      border-radius: 2px;
    }
    #app .border .br_color {
      position: absolute;
      top:0;
      left: 0;
    }
    #app .border .br_color .colorBtn{
      width: 38px;
      height: 20px;
      opacity: 0;
    }
  /* ------------- tool ---------------- */
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
    .top .toolBox{
      margin-left: -2px;
      margin-top: 4px;
      display: inline-block;
      height: 20px;
      border-left: 1px solid #9c9c9c;
      padding: 0 10px;

    }  
    .property{
      float: left;
      width: auto;    
      height: 20px;
      margin-top: 4px;
      line-height: 20px;
      text-align: left;
    }
    .property .el-input{
      display: inline-block;
      width: 50px;    
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
  /* ------------- leftlibrary --------- */
    .library{
      position: absolute;
      left: 0;
      top: 0;
      padding-top:35px;
      width: 133px;
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
      /*padding-left: 48px;*/
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
      text-indent:10px;
    }    
    .header i{
      float: right;
      margin-right:10px;
      margin-top: 10px;
      font-size: 12px;
      color: #7d8695;
    }
    .basichead i{
      width: 13px;
      height: 13px;
      margin-left: 15px;
      margin-top: 8px;
      margin-right: 0;
      line-height: 15px;
      text-indent: 0;
      float: left;
    }
    .layerhead i{
      width: 13px;
      height: 13px;
      margin-right: 15px;
      margin-top: 8px;     
      line-height: 15px;
      text-indent: 0;      
    }
    .closei i{
      transform:rotate(-90deg);
      -ms-transform:rotate(-90deg);   /* IE 9 */
      -moz-transform:rotate(-90deg);  /* Firefox */
      -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
      -o-transform:rotate(-90deg); 
    }
    .closeiR i{
      width: 13px;
      height: 13px;
      margin-top: 8px;
      transform:rotate(90deg);
      -ms-transform:rotate(90deg);   /* IE 9 */
      -moz-transform:rotate(90deg);  /* Firefox */
      -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
      -o-transform:rotate(90deg); 
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
    .libshrink{
      position: absolute;
      top: 50%;
      left: 133px;
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
      z-index: 4;
      transition: all 400ms;
      -moz-transition: all 400ms; 
      -webkit-transition: all 400ms; 
      -o-transition: all 400ms;
    }
    .libshrink i {
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
      width: 5px;
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
  /* ------------- layer --------------- */
    .layer{
      position:absolute;
      top:0;
      right:0;
      padding-top:35px;
      width: 181px;
      height:100%;
      border-left: 1px solid #d9d9d9;
      background-color: #fff;
      box-sizing: border-box;
      z-index: 3;
      transition: all 400ms;
      -moz-transition: all 400ms; 
      -webkit-transition: all 400ms; 
      -o-transition: all 400ms;
    }
    .layerHide{
      width: 0;
    }
    .layer .shrink{
      position: absolute;
      top:50%;
      left: -22px;
      width: 22px;
      height: 24px;
      background-color: #fff;
      border:1px solid #d9d9d9;
      border-right: 0;
      border-top-left-radius: 12px;
      border-bottom-left-radius: 12px;
      color: #f55d54;
      text-indent: 1px;
      line-height: 24px;
      cursor: pointer;   
    }
    .layer .shrink i {
      transition: all 400ms;
      -moz-transition: all 400ms; 
      -webkit-transition: all 400ms; 
      -o-transition: all 400ms;
    }
    .layer .shrinkout {
      text-indent: 6px;
    }
    .layer .shrinkout i{
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -webkit-transform: rotate(180deg); 
      -o-transform: rotate(180deg); 
    }
    .layer .lib_box {
      padding: 0;
    }
    .layer .header{
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      background-color: #f8f8f8;
    }
    .layer .lib_ol {
      width: 100%;
      padding-left: 0px;
      text-indent: 20px;
      box-sizing: border-box;
    }
    .layer .lib_ol .ele_li{
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      border-top: 1px solid #eee;
    }
    .layer .lib_ol .ele_li:hover{
      background-color: #eee;
    }
  /* ------------- editBox ------------- */
    #app .module:hover .promptBox{
      display: block;
    }
    .editBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 35px;
      margin-left: 133px;
      margin-right: 181px;
      box-sizing:border-box;    
      background-color: #f5f5f5;
      z-index: 2;
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
      background-image: url(assets/iphone.png);
      background-size: 396px 792px;
      background-repeat: no-repeat;
      background-position: center 20px;      
    }    
    .canvas{
      position: relative; 
      left:3px;     
      width: 380px;
      height: 629px;
      margin: 109px auto;     
      overflow-y:scroll;
      background-size:10px 10px;     
      box-sizing: border-box;
      /*overflow: hidden;*/
      cursor: default;
   /*   outline: 1px solid #ccc;*/
    } 
    /*.grid{
      background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAABlBMVEUAAAAnNk6AHRRIAAAAAnRSTlMAsyT7Lw4AAAANSURBVAjXY2hgoCoAACfQAIGM5uSyAAAAAElFTkSuQmCC);    
    }*/
    .c_top{
      position: absolute;
      top:0;
      left: 0;
      width: 375px;
      height: 1800px; 
      background-color: #fff;     
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
      background-color: rgba(245, 93, 84, 0.9);
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      color: #fff;
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
      border-top: 1px solid #f55d54;
      border-bottom: 1px solid #f55d54;
    }
    .c_foot .hoverbar{
      top:-30px;
    }
  /* ------------- copyBox ------------- */
    .copyBox{
      position: absolute;
      display: block;    
      width: 200px;
      height: 50px;
      background-color: rgba(245,93,84,0.6);
      z-index: 100;
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
      height: 100%;
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
  /* ------------- module -------------- */
    .editBox .on_module{
      /*border-color: transparent;*/
      box-sizing: border-box;
      cursor: move;
    }
    .editBox .touch_module {
      border-color: #f55d54;
    }
    .supendTools{
      position: absolute;
      margin-top:-45px;
      left: 0px;
      height: 36px;       
      box-sizing: border-box;
      border:1px solid #E4E4E4;
      background-color: #fff;
      white-space: nowrap;
      cursor: default;
      z-index: 999;
    }
    .supendTools li {
      display: inline-block;
      margin-top: 8px;
      padding:0 12px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      vertical-align:top;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 18px;
    }
    .st-left {
      border-right: 1px solid #E4E4E4;
    }
    .st-prospect {
      width: 20px;
      background-image: url(./assets/toolIcon/a.png);
    }
    .st-effects {
      width: 20px;
      background-image: url(./assets/toolIcon/b.png);
    }
    .st-shape {
      width: 20px;
      background-image: url(./assets/toolIcon/c.png);
    }
    .st-animate {
      width: 20px;
      background-image: url(./assets/toolIcon/d.png);
    }
    .st-link {
      width: 20px;
      border-left: 1px solid #E4E4E4;
      background-image: url(./assets/toolIcon/e.png);
    }
    .fuzzybox{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(254, 233, 218);
    }
    .multiBox {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #f55d54;
      width: 100%;
      height: 100%;
      box-sizing:border-box;
      background-color: rgba(245, 93, 84, 0.5);
    }
    .resizeBox{
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #f55d54;
      width: 100%;
      height: 100%;
      box-sizing:border-box;
    }
    .resize{
      position: absolute;
      width: 6px;
      height: 6px;
      background-color:#fff;
      border:1px solid #f55d54;
      pointer-events: auto;
      box-sizing: border-box;
      z-index: 100;
    }
    .nw{
      top: -3px;
      left: -3px;
      cursor: nw-resize;
    }
    .w{
      top:50%;
      left: -3px;
      transform:translateY(-50%);
      -ms-transform:translateY(-50%);   /* IE 9 */
      -moz-transform:translateY(-50%);  /* Firefox */
      -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
      -o-transform:translateY(-50%);
      cursor: w-resize;
    }
    .sw{
      bottom: -3px;
      left:-3px;
      cursor: sw-resize;
    }
    .n{
      top: -3px;
      left: 50%;
      transform:translateX(-50%);
      -ms-transform:translateX(-50%);   /* IE 9 */
      -moz-transform:translateX(-50%);  /* Firefox */
      -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
      -o-transform:translateX(-50%);
      cursor: n-resize;
    }
    .ne{
      top: -3px;
      right: -3px;
      cursor: ne-resize;
    }
    .e{
      top:50%;
      right:-3px;
      transform:translateY(-50%);
      -ms-transform:translateY(-50%);   /* IE 9 */
      -moz-transform:translateY(-50%);  /* Firefox */
      -webkit-transform:translateY(-50%); /* Safari 和 Chrome */
      -o-transform:translateY(-50%);
      cursor: e-resize; 
    }
    .se{
      bottom: -3px;
      right:-3px;
      cursor: se-resize;
    }
    .s{
      bottom: -3px;
      left:50%;
      transform:translateX(-50%);
      -ms-transform:translateX(-50%);   /* IE 9 */
      -moz-transform:translateX(-50%);  /* Firefox */
      -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
      -o-transform:translateX(-50%);
      cursor: s-resize;
    }
  /* ------------- contextmenu --------- */
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
  /* ------------- editor -------------- */
    .el-dialog__footer {
      padding: 10px 10px 15px;
    } 
  /* ------------- 模块动画 ------------ */
    .animlist{
      display: block;
      width: 74px;
      height: 88px;
      text-align: center;
      float: left;
      margin: 24px 10px 0 10px;
      cursor: pointer;
    }
    .animlist .animimg{
      width: 74px;
      height: 64px;
      line-height:64px;
      border: 2px solid #f2f2f2;
      border-radius: 2px;
      position: relative;
    }
    .animlist .animimg:hover{
      border-color: #7fcc78;
    }
    .animlist .animimg .animtip{
      display: none;
      width: 16px;
      height: 16px;
      position: absolute;
      right: 0;
      bottom: 0;
      line-height: 16px;
      background: #7fcc78;
      color: #fff;
    }
    .animlist p{
      line-height: 24px;
    }
    .animlist .active{
      border-color: #7fcc78;
    }
    .animlist .active .animtip{
      display: block;
    }
  /* ------------- 模块动画弹窗 -------- */
    .animlist img{
      margin-top: 14px; 
    }
  /* ------------- 登录框编辑文本弹窗 -- */
    .el-dialog--edittext{
      width: 500px;
    }
    .pitchIcon {
      display:none; 
      position: absolute;
      bottom: 0;
      right:0;
      width: 14px;
      height: 14px;
      line-height: 14px;
      color: #fff;
      background-color: #20a0ff;
    }
    .is-active .pitchIcon {
      display: block;
    }
    .ele_li:hover .deleteLayer {
      display: block;
    }
    .deleteLayer{
      display: none;
      float: right;
      font-size: 16px;
      font-weight: 600;
      margin-right: 16px;
    }
    input:-webkit-autofill {
      background-color: #FAFFBD;
      background-image: none;
      color: #000;
    } 
  /* ------------- 页面设置 ------------ */
    .el-dialog--pageSet{
      width: 500px;
    }
    .el-dialog--pageSet .el-tabs__content{
      overflow: visible;
    }
    .el-dialog--pageSet .m-colorPicker .box{
      z-index: 99;
    }
    #app .el-dialog--pageSet .m-colorPicker .colorBtn{
      width: 30px;
      height: 30px;
      border:1px solid #c4c4c4;
    }
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
</style>
