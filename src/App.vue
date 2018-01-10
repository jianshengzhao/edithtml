<template>
  <div id="app" unselectable="on" onselectstart="return false;">
  <!-- top main tool -->
    <div class="top" unselectable="on" onselectstart="return false;">     
      <div class="tl_li" @click="settingEvent" style="margin-left: -90px;">
        <i class="tImgicon icon-setting" title="设置"></i>
      </div>
      <div class="tl_li" @click="saveEvent"  style="margin-left: -64px;">
        <i class="tImgicon icon-save" title="保存"></i>
      </div>
      <div class="tl_li tl_span" @click="previewEvent" title="预览"  style="margin-left: -40px;">
        <i class="tImgicon icon-preview"></i>
        <span>预览</span>
      </div>
      <div class="tl_li tl_span tl_li_on gridli" @click="gridHangle" title="格线"  style="margin-left: -5px;">
        <i class="tImgicon icon-gridlines"></i>
        <span>格线</span>
      </div>
      <div class="tl_li" :class="selectBloo?'':'tl_li_Disable'">
        <i class="tImgicon icon-align-left" title="排列"></i>
        <ul class="toolbar">
          <li title="左对齐" @click="selectBloo ? leftAlignEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-align-left"></i>左对齐</li>
          <li title="右对齐" @click="selectBloo ? rightAlignEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-align-right"></i>右对齐</li>
          <li title="上对齐" @click="selectBloo ? topAlignEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-align-up"></i>上对齐</li>
          <li title="下对齐" @click="selectBloo ? bottomAlignEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-align-down"></i>下对齐</li>
          <li title="水平居中" @click="selectBloo ? centerAlignEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-align-center"></i>水平居中</li>
          <li title="垂直居中" @click="selectBloo ? middleAlignEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-align-middle"></i>垂直居中</li>
          <li title="水平等间距" @click="selectBloo ? centerSpacingEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-spacing-center"></i>水平等间距</li>
          <li title="垂直等间距" @click="selectBloo ? middleSpacingEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-spacing-middle"></i>垂直等间距</li>
        </ul>
      </div>
      <div class="tl_li" :class="selectBloo?'':'tl_li_Disable'">
        <i class="tImgicon icon-layer-top" title="图层"></i>
        <ul class="toolbar">
            <li title="置于顶层" @click="selectBloo ? topFloorEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-layer-top"></i>置于顶层</li>
            <li title="上移一层" @click="selectBloo ? upFloorEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-layer-up"></i>上移一层</li>
            <li title="置于底层" @click="selectBloo ? bottomFloorEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-layer-bottom"></i>置于底层</li>
            <li title="下移一层" @click="selectBloo ? downFloorEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-layer-down"></i>下移一层</li>
            <!--  <li class="col-li" title="剪切" @click="selectBloo ? shearEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-shear"></i></li>
            <li class="col-li" title="复制" @click="selectBloo ? copyEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-copy"></i></li>
            <li class="col-li" title="粘贴" @click="clipboard ? pasteEvent() :''" :class="clipboard?'':'tl_li_Disable'"><i class="tImgicon icon-paste"></i></li>
            <li class="col-li" title="删除" @click="selectBloo ? deleteEvent() : ''" :class="selectBloo?'':'tl_li_Disable'"><i class="tImgicon icon-delete"></i></li>  -->
        </ul>
      </div>
      <div class="propertyLi">
        <li class="con-pli">
          <span class="tit">Z：</span>
          <el-input v-model="inp_z" type='number' :disabled='disabled' min='0' @change='changeInpZ' ></el-input>
        </li>
        <li class="con-pli">
          <span class="tit">X：</span>
          <el-input v-model="inp_x" type='number' :disabled='disabled' min='0' @change='changeInpX' ></el-input>
        </li>
        <li class="con-pli">
          <span class="tit">Y：</span>
          <el-input v-model="inp_y" type='number' :disabled='disabled' min='0' @change='changeInpY' ></el-input>
        </li>
        <li class="con-pli">
          <span class="tit">宽：</span>
          <el-input v-model="inp_w" type='number' :disabled='disabled' min='0' @change='changeInpW'></el-input>
        </li>
        <li class="con-pli">
          <span class="tit">高：</span>
          <el-input v-model="inp_h" type='number' :disabled='disabled' min='0' @change='changeInpH'></el-input>
        </li>    
      </div>
      <div class="fontLi">
        <el-select v-model="inp_fontFamily" placeholder="设置字体" :disabled='disabled' @change='changeFontFamily' size="mini">
          <el-option
            v-for="item in optionsFontFamily"
            :key="item.name"
            :label="item.label"
            :value="item.val">
          </el-option>
        </el-select>
        <span class="tip p bold " @click="clickBoldEvent">B</span>
        <span class="tip p bold style" @click="clickStyleEvent">I</span>
        <span class="tip p bold underline" @click="clickUnderlineEvent">U</span> 
        <li class="con-pli">  
          <span class="tit">字号：</span>
          <el-input v-model="inp_size" type='number' :disabled='disabled' min='12' :max='99' @change='changeInpSize'></el-input>  
        </li>
        <li class="con-pli">  
          <span class="tit">行高：</span>
          <el-input v-model="inp_line" type='number' :disabled='disabled' min='12'  :max='99' @change='changeInpLine'></el-input>       
        </li>  
        <li class="con-pli">     
          <span class="tit">字色：</span>
          <el-color-picker v-model="color_font" :disabled='disabled' size="mini" @change='changeColorFont'></el-color-picker>
        </li>  
      </div>
      <div class="backgLi">
        <li class="con-pli"> 
          <span class="tit">背景：</span>
          <el-color-picker v-model="color_bg" :disabled='disabled' size="mini" @change='changeColorBg'></el-color-picker>         
        </li>
      </div>
      <div class="borderLi">
        <li class="con-pli">
          <span class="tit">边框：</span>
          <div class="border br-mod br-disable br_width">
            <i class="iconfont2 icon-dayin_biankuangshezhi" :style="'color:' + br_color + ';'"></i>
            <div class="doll" :style="'border-bottom-color:' + br_color + ';border-left-color:' + br_color + ';'"></div>
            <ul class="toolbar">
              <el-radio-group v-model="br_width" @change='changeBorderWidth'>
              <li v-for="(item, index) in br_widths">
                <el-radio-button :key="item.value" :label="item.label">
                  <span v-if="item.value == 0" class="borderWidth">none</span>
                  <span v-else class="borderWidth" :style="'border-bottom-width:' + item.label + 'px;border-style: ' + br_style + ';border-color: ' + br_color + ';'">{{item.label}}</span>
                </el-radio-button>
              </li>
              </el-radio-group>
            </ul>
          </div>
          <div class="border br-mod br-disable br_style" :style="br_width=='0'?'cursor:not-allowed':''">
            <i class="iconfont2 icon-biankuangyangshi" :style="'color:' + br_color + ';'"></i>
            <div class="doll" :style="'border-bottom-color:' + br_color + ';border-left-color:' + br_color + ';'"></div>
            <ul class="toolbar" v-if="br_width!='0'">
              <el-radio-group v-model="br_style" @change='changeBorderStyle'>
              <li v-for="(item, index) in br_styles">
                <el-radio-button :key="item.value" :label="item.label">
                  <span class="borderStyle" :style="'border-width:' + br_width + 'px;border-style: ' + item.label + ';border-color: ' + br_color + ';'"></span>
                </el-radio-button>
              </li>
              </el-radio-group>
            </ul>
          </div>
          <div class="border br-mod br-disable br_color" >
            <i class="iconfont2 icon-biankuangyanse"  :style="'color:' + br_color + ';'"></i>
            <div class="doll" :style="'border-bottom-color:' + br_color + ';border-left-color:' + br_color + ';'"></div>
            <el-color-picker class="br_color" v-model="br_color" :disabled='br_width==0' size="mini" @change='changeBorderColor'></el-color-picker>
          </div> 
         </li>       
      </div>
      <div class="opacityLi" :class="disabled?'opacityDisabled':''">
        <li class="con-pli">
          <span class="tit">透明度：</span>
          <el-input v-model="inp_opacity" type='number' :disabled='disabled' :step="1" :min='0' :max='100' @change='changeOpacity'></el-input>
          <div class="sliderbar">
            <div class="scroll-track">
              <div class="slider-track" :style="'width:' + inp_opacity +'px;'"></div>
              <div class="scroll-thumb" :style="'left:' + inp_opacity +'px;'"></div>
            </div>
          </div>
        </li>
      </div>
      <div class="shadowLi">
        <li class="con-pli">
          <span class="tit">阴影：</span>
            <div class="border br-mod br-disable shadow">
              <i class="iconfont2 icon-yinying"></i>
              <div class="doll"></div>
              <ul class="toolbar shadowToolbar" >
                <el-checkbox v-model="check_shadow" @change='changeShadow'>阴影</el-checkbox>
                <div class="shadow-col">
                  <span>厚度：</span>
                  <span>X</span>
                  <span>
                    <el-input v-model="inp_weight_x" type='number' :disabled='!check_shadow' :step="1" :min='0' :max='10' @change='changHShadow'></el-input>
                  </span>
                  <span >Y</span>
                  <span>
                    <el-input v-model="inp_weight_y" type='number' :disabled='!check_shadow' :step="1" :min='0' :max='10' @change='changVShadow'></el-input>
                  </span>
                </div>
                <div class="shadow-col">
                  <span>模糊度：</span>                 
                  <span>
                    <el-input v-model="inp_blur" type='number' :disabled='!check_shadow' :step="1" :min='0' :max='10' @change='changBlurShadow'></el-input>
                  </span>
                  <span>颜色值：</span>
                  <span @click="clickShadowColor">
                    <el-color-picker class="bw_color" popper-class="shadowColor" v-model="bw_color" :disabled='!check_shadow' size="mini" @change='changColorShadow'></el-color-picker>
                  </span>
                </div>
              </ul>
            </div>
        </li>
      </div>
      <!-- 精选模板 -->
      <!-- <board></board> -->
      <div class="t_right tl_span tl_li">
        <a href="/">
          <i class="tImgicon icon-exits"></i>
          <span>退出</span>
        </a>
      </div>
      <div class="t_clean tl_span tl_li"  @click="cleanScreenEvent">
        <i class="tImgicon icon-clean"></i>
        <span>清屏</span>
      </div>
    </div>
  <!-- assembly library -->
    <div class="library" unselectable="on" onselectstart="return false;">
      <div class="lib-scroll">
        <div class="lib_box">
          <div class="header basichead">基本组件 <i class="el-icon-caret-bottom"></i></div>
          <div class="lib_ol basicBox"></div>
          <div class="header basichead">网校组件 <i class="el-icon-caret-bottom"></i></div>
          <div class="lib_ol onlineBox"></div>
        </div>
      </div>
    </div>
    <div class="shrink libshrink">     
    </div>
  <!-- layer -->
    <div class="layer" unselectable="on" onselectstart="return false;">
      <div class="lib_box">
        <layer :elementHead = 'elementHead' :elementMain = 'elementMain' :elementTail = 'elementTail'></layer>
      </div>
      <div class="shrink shrinkout">
      </div>
    </div>
  <!-- editBox -->
    <div class="editBox" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;padding-right: 245px;">
      <div class="space" >
        <div class="scrollcanvas"></div>
        <div class="canvas grid" >
          <div class="c_top">
            <div class="hoverbar" ondragstart="return false">拖动调节公共页头选区高度</div>
          </div>
          <div class="c_body">
          </div>
          <div class="c_foot">
            <div class="hoverbar" ondragstart="return false">拖动调节公共页尾选区高度</div>
          </div>
        </div>        
        <div class="row-t line"></div>
        <div class="row-b line"></div>
        <div class="col-l line"></div>
        <div class="col-r line"></div>
      <!-- 自定义右键菜单 -->
        <ul class="contextmenu">
          <li @click="upFloorEvent" v-if="rightButton"><i class="tImgicon icon-layer-up"></i>上移一层</li>
          <li @click="downFloorEvent" v-if="rightButton"><i class="tImgicon icon-layer-down"></i>下移一层</li>
          <div class="divider" v-if="rightButton"></div>
          <li v-if="rightButton"><i class="tImgicon icon-align-left"></i>对齐
            <i class="el-icon-caret-bottom"></i>
            <ol>
              <li @click="topAlignEvent" v-if="rightButton"><i class="tImgicon icon-align-up"></i>上对齐</li>
              <li @click="bottomAlignEvent" v-if="rightButton"><i class="tImgicon icon-align-down"></i>下对齐</li>
              <li @click="leftAlignEvent" v-if="rightButton"><i class="tImgicon icon-align-left"></i>左对齐</li>
              <li @click="rightAlignEvent" v-if="rightButton"><i class="tImgicon icon-align-right"></i>右对齐</li>
              <li @click="centerAlignEvent" v-if="rightButton"><i class="tImgicon icon-align-center"></i>水平居中</li>
              <li @click="middleAlignEvent" v-if="rightButton"><i class="tImgicon icon-align-middle"></i>垂直居中</li>
              <li @click="middleSpacingEvent" v-if="rightButton"><i class="tImgicon icon-spacing-middle"></i>垂直等间距</li>
              <li @click="centerSpacingEvent" v-if="rightButton"><i class="tImgicon icon-spacing-center"></i>水平等间距</li>
            </ol>
          </li>
          <div class="divider" v-if="rightButton"></div>
          <li @click="shearEvent" :class="onlybloo?'':'tl_li_Disable'" v-if="rightButton"><i class="tImgicon icon-shear"></i>剪切</li>
          <li @click="copyEvent" :class="onlybloo?'':'tl_li_Disable'" v-if="rightButton"><i class="tImgicon icon-copy"></i>复制</li>
          <li @click="pasteEvent" :class="clipboard?'':'tl_li_Disable'"><i class="tImgicon icon-paste"></i>粘贴</li>
          <li @click="deleteEvent" v-if="rightButton"><i class="tImgicon icon-delete"></i>删除</li>
        </ul>
      </div>
    <!-- copyBox  选中的组件容器盒子-->
      <div class="copyBox">
        <div class="copyCon">
        </div>
      </div>
    </div>
  <!-- 页面设置 -->
    <el-dialog
      title="页面设置"
      :visible.sync="dialogPageSetting"      
      class="dialogSetting">
      <el-tabs v-model="activeSetting">
        <el-tab-pane label="基础设置" name="first" >
          <el-row>
            <el-col :span="4" class="tit">背景色</el-col>
            <el-col :span="7">
              <!-- <el-color-picker v-model="bgColorVal"></el-color-picker> -->
            <!--   <colorPicker v-model="bgColorVal" ></colorPicker> -->
              <el-color-picker v-model="bgColorVal"></el-color-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="tit">前景色</el-col>
            <el-col :span="7">
             <!--  <el-color-picker v-model="prospectColorVal" ></el-color-picker> -->
             <!--  <colorPicker v-model="prospectColorVal" ></colorPicker> -->
              <el-color-picker v-model="prospectColorVal"></el-color-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="tit">链接hover</el-col>
            <el-col :span="7">
              <!-- <el-color-picker v-model="fontHoverColorVal" ></el-color-picker> -->
             <!--  <colorPicker v-model="fontHoverColorVal" ></colorPicker> -->
              <el-color-picker v-model="fontHoverColorVal"></el-color-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="tit">页宽</el-col>
            <el-col :span="7">
              <el-input-number v-model="inp_width" :step="100" size="small"></el-input-number>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="tit">页高</el-col>
            <el-col :span="7">
              <el-input-number v-model="inp_height" :step="100" size="small"></el-input-number>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="背景图设置" name="second">
          <el-row>
            <el-col :span="4" class="tit">背景图</el-col>
            <el-col :span="7">
              <div class="upload-demo" @click="getImageHref('bgImageUrl')">
                <div class="el-upload el-upload--text" >
                  <img v-if="bgImageUrl" :src="bgImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <el-button size="small" @click="cleanBgEvent">清除背景图</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="tit">显示（%）</el-col>
            <el-col :span="10">
              <el-input-number v-model="inp_percent" :step="2" size="small" :min="0" :max="100"></el-input-number>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" class="tit">平铺模式</el-col>
            <el-col :span="10">
              <el-select v-model="repeatBgValue" placeholder="请选择">
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
              <el-select v-model="attachmentBgValue" placeholder="请选择">
                <el-option
                  v-for="item in attachmentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="前景图设置" name="third">
          <el-row>
            <el-col :span="4" class="tit">前景图</el-col>
            <el-col :span="7">
              <div class="upload-demo" @click="getImageHref('pgImageUrl')">
                <div class="el-upload el-upload--text" >
                  <img v-if="pgImageUrl" :src="pgImageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </div>
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
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPageSetting = false">取 消</el-button>
        <el-button type="primary" @click="dialogPageSettingEvent">确 定</el-button>
      </span>
    </el-dialog>
  <!-- 页面设置 -->
  <!-- 小悬浮工具栏 -->
    <shape ref="shape"></shape>
    <suspend ref="suspend"></suspend>
    <animates ref="animates"></animates>
    <myimages ref="myimages"></myimages>
    <pulldown ref="pulldown"></pulldown>    
    <hrefdialog ref="hrefdialogp"></hrefdialog>
  <!-- 基本组件 -->
    <ueditor ref="ueditor"></ueditor>     
    <editbutton ref="editbutton"></editbutton>
    <loginCase ref="loginCase"></loginCase>
    <waiter ref="waiter"></waiter>
  <!-- 网校组件 -->
    <carousel ref="carousel"></carousel> 
    <advert ref="advert"></advert>
    <course ref="course"></course>
    <player ref="player"></player>
    <addcoursetype ref="addcoursetype"></addcoursetype>
    <information ref="information"></information>   
    <edittab ref="edittab"></edittab>
    <addsearch ref="addsearch"></addsearch>     
    <suspendCase ref="suspendCase"></suspendCase>
    <calendar ref="calendar"></calendar>
    <scene ref="scene"></scene>
  <!-- <weather ref="weather"></weather> -->
  <!-- <effect ref="effect"></effect> -->
  </div>
</template>
<script>
  import $ from 'jquery'
  import configData from '@/data/datahtml.js'
  import tool from '@/data/tool.js'
  import colorPicker from '@/components/colorPicker'
  // ------------ main界面模块 ------------
  import board from '@/components/mainPage/board'
  import layer from '@/components/mainPage/layer'
  // ------------ 小悬浮工具栏 ------------
  import shape from '@/components/supendTool/shape'
  import suspend from '@/components/supendTool/suspend'
  import animates from '@/components/supendTool/animate'
  import myimages from '@/components/supendTool/myimages'
  import pulldown from '@/components/supendTool/pulldown'
  import hrefdialog from '@/components/supendTool/hrefdialog'
  /* import effect from '@/components/supendTool/effect' */
// -------------- module ------------------
  // ------------ 基本组件 ----------------
  import ueditor from '@/components/module/basic/ueditor'
  import editbutton from '@/components/module/basic/editbutton'
  import loginCase from '@/components/module/basic/loginCase'
  import waiter from '@/components/module/basic/waiter'
  // ------------ 网校组件 ----------------
  import carousel from '@/components/module/online/carousel'
  import advert from '@/components/module/online/advert'
  import course from '@/components/module/online/course'
  import player from '@/components/module/online/player'
  import addcoursetype from '@/components/module/online/addcoursetype'
  import information from '@/components/module/online/information'
  import edittab from '@/components/module/online/edittab'  
  import addsearch from '@/components/module/online/addsearch' 
  import suspendCase from '@/components/module/online/suspendCase' 
  import calendar from '@/components/module/online/calendar' 
  import scene from '@/components/module/online/scene'
  /* import weather from '@/components/module/online/weather' */
  
  import '@/assets/animate.min.css'
  let config = configData.config.config
  export default { // todo: 本地操作保存
    name: 'app',
    components: {
      colorPicker,
      // -------------
      board,
      layer,
      // -------------
      hrefdialog,
      myimages,
      animates,   
      suspend,
      shape,
      pulldown,
      // -------------
      ueditor,           
      editbutton,
      loginCase,
      waiter,
      // -------------
      information,  
      carousel,     
      advert,
      course,
      player,
      addcoursetype,
      edittab,     
      addsearch,
      suspendCase,
      calendar,
      scene
    },
    data: function () {
      return {
      // ------------ 工具栏add ----------------------
        did: 0,
        onlybloo: true,
        selectBloo: false,
        br_width: '0',
        br_widths: [{
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
        br_styles: [{
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
        }
        ],
        br_color: '#ccc',
        inp_opacity: 100,
        check_shadow: false,
        inp_weight_x: '0',
        inp_weight_y: '0',
        inp_blur: '0',
        bw_color: '#ccc', 
        inp_fontFamily: '微软雅黑',
        optionsFontFamily: [
           { label:'宋体',name:'songti',val:'宋体,SimSun'},
           { label:'楷体',name:'kaiti',val:'楷体,楷体_GB2312, SimKai'},
           { label:'微软雅黑',name:'yahei',val:'微软雅黑'},
           { label:'黑体',name:'heiti',val:'黑体, SimHei'},
           { label:'隶书',name:'lishu',val:'隶书, SimLi'},
           { label:'andale mono',name:'andaleMono',val:'andale mono'},
           { label:'arial',name:'arial',val:'arial, helvetica,sans-serif'},
           { label:'arial black',name:'arialBlack',val:'arial black,avant garde'},
           { label:'comic sans ms',name:'comicSansMs',val:'comic sans ms'},
           { label:'impact',name:'impact',val:'impact,chicago'},
           { label:'times new roman',name:'timesNewRoman',val:'times new roman'}
        ],
      // ------------ 工具栏+全局设置+右侧元素图层 ---
        dialogPageSetting: false,
        attachmentPgValue: 'scroll',
        attachmentBgValue: 'scroll',
        attachmentOptions: [{
          value: 'scroll',
          label: '滚动'
        },
        {
          value: 'fixed',
          label: '固定'
        }],
        repeatPgValue: 'no-repeat',
        repeatBgValue: 'no-repeat',
        repeatOptions: [{
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
        bgColorVal: '#fff',
        fontHoverColorVal: '#333',
        bgImageUrl: '',
        pgImageUrl: '',
        inp_percent: '100',
        inp_pgPercent: '100',
        inp_width: 1200,
        inp_height: 1600,
        disabled: true,
        rightButton: false,
        inp_z: 0,
        inp_x: 0,
        inp_y: 0,
        inp_w: 0,
        inp_h: 0,
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
        slider_opacity: 100,
      // ---------- config --------------
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
        datahtml: configData.config,
        copynum: 0,
      // ------------ common -------------------------
        httpget: function (getParam) { // 封装的异步请求数据
          let self = this
          self.$http.get(window.host + getParam.url, {params: getParam.params}).then((response) => {
            if (getParam.fun !== undefined) {
              getParam.fun(response)
            }
          }).catch(function (response) {
          })
        },
        httppost: function (getParam) { // 封装的异步请求数据
          let self = this
          self.$http.post(window.host + getParam.url, getParam.params, {emulateJSON: true}).then((response) => {
            if (getParam.fun !== undefined) {
              getParam.fun(response)
            }
          }).catch(function (response) {
          })
        },    
        tool: tool
      }
    },
    created: function () {
      let self = this
      self.datahtml['toallGroup']['basic'] = []
      self.datahtml['toallGroup']['online'] = []
      
      let hash = window.location.hash
      let paramArr = hash.split('?')      
      if (paramArr.length > 1) {
        let paramdid = paramArr[1].split('&')
        for (let i = 0, len = paramdid.length; i < len; i++) {
          let item = paramdid[i]
          if (item.indexOf('did=') > -1) {
            self.did = item.split('=')[1]
            break
          }
        }       
      }      
      self.$nextTick(function () {
        let canvas = $('.canvas')
        let space = $('.space')
        canvas.css({'left': self.posleft + 'px', 'top': self.postop + 'px'})
        self.inp_width = parseInt(canvas.css('width'))
        self.inp_height = parseInt(canvas.css('height'))
        space.scrollLeft(900)
        let head = $('.c_top')
        let middle = $('.c_body')
        let foot = $('.c_foot')
        if (window.saveParams) {
          let params = window.saveParams
          let pp = params.page
          self.prospectColorVal = pp.pg =='transparent'?null:pp.pg
          self.bgColorVal = pp.bg =='transparent'?null:pp.bg
          self.fontHoverColorVal = pp.fontHover
          self.inp_width = parseInt(pp.width)
          self.inp_height = parseInt(pp.height)
          //  背景
          self.bgImageUrl = pp.bgImage.backgroundImage.split('(')[1].split(')')[0]
          if (self.bgImageUrl != '') {
            space.css(pp.bgImage)
          }
          self.inp_percent = pp.bgImage.backgroundSize.split('%')[0]
          self.repeatBgValue = pp.bgImage.backgroundRepeat
          self.attachmentBgValue = pp.bgImage.backgroundAttachment
          //  前景
          self.pgImageUrl = pp.pgImage.backgroundImage.split('(')[1].split(')')[0]
          if (self.pgImageUrl != '') {
            space.css(pp.pgImage)
          }
          self.inp_pgPercent = pp.pgImage.backgroundSize.split('%')[0]
          self.repeatPgValue = pp.pgImage.backgroundRepeat
          self.attachmentPgValue = pp.pgImage.backgroundAttachment

          space.css(pp.bgImage)
          space.css('backgroundColor', pp.bg)
          canvas.css(pp.pgImage)
          canvas.css('backgroundColor', pp.pg)
          canvas.css('width', pp.width)
          canvas.css('height', pp.height)
          head.css('height', pp.top)
          foot.css('height', pp.foot)
          canvas.css({'paddingTop': pp.top, 'paddingBottom': pp.foot})
          let module = params.module
          head.html(module.top)
          middle.html(module.body)
          foot.html(module.foot)         
          tool.adaptation.renderLayer(self, head)
          tool.adaptation.renderLayer(self, middle)
          tool.adaptation.renderLayer(self, foot)
          tool.adaptation.computeLineHeight(tool)
          tool.carryUpdateElementStorageEvent(self, head, head.find('.module'))
          tool.carryUpdateElementStorageEvent(self, middle, middle.find('.module'))
          tool.carryUpdateElementStorageEvent(self, foot, foot.find('.module'))
          // 客服
          if ($('.waiter').length < 2 && $('.waiter').length > 0) {
            $('.editBox').append('<div class="waiter "><div class="kf-head"></div><div class="kf-top"></div></div>')
            $('.waiter').on('click', function() {
              self.$refs.waiter.show(self, canvas.find('.waiter'))
            })
          }
        } else {
          let getParam = {
            url: '/aroomv3/roominfo.html',
            params: {},
            fun: function (response) {
              let crid = response.body.data.crid
              window.roominfo = response.body.data
              let getParams = {
                url: '/room/design/getdesign.html',
                params: {
                  crid: crid,                  
                  did: self.did,
                  clientType: 0
                },
                fun: function (response) {
                  let saveParams = response.body.data
                  let headHtml = saveParams.head.replace(/[\\]/g, '')
                  let bodyHtml = saveParams.body.replace(/[\\]/g, '')
                  let footHtml = saveParams.foot.replace(/[\\]/g, '')
                  let pp = $.parseJSON(saveParams.settings.replace(/[\\]/g, ''))
                  self.prospectColorVal = pp.pg =='transparent'?null:pp.pg
                  self.bgColorVal = pp.bg =='transparent'?null:pp.bg
                  self.fontHoverColorVal = pp.fontHover||'#333'
                  self.inp_width = parseInt(pp.width) || 1200
                  self.inp_height = parseInt(pp.height)
                  //  背景
                  self.bgImageUrl = pp.bgImage.backgroundImage.split('(')[1].split(')')[0]
                  if (self.bgImageUrl != '') {
                    space.css(pp.bgImage)
                  }
                  self.inp_percent = pp.bgImage.backgroundSize.split('%')[0]
                  self.repeatBgValue = pp.bgImage.backgroundRepeat
                  self.attachmentBgValue = pp.bgImage.backgroundAttachment
                  //  前景
                  self.pgImageUrl = pp.pgImage.backgroundImage.split('(')[1].split(')')[0]
                  if (self.pgImageUrl != '') {
                    canvas.css(pp.pgImage)
                  }
                  self.inp_pgPercent = pp.pgImage.backgroundSize.split('%')[0]
                  self.repeatPgValue = pp.pgImage.backgroundRepeat
                  self.attachmentPgValue = pp.pgImage.backgroundAttachment
                 
                  space.css('backgroundColor', pp.bg)
                  canvas.css('backgroundColor', pp.pg)
                  canvas.css('width', self.inp_width)
                  canvas.css('height', self.inp_height)
                  head.css('height', pp.top)
                  foot.css('height', pp.foot)
                  canvas.css({'paddingTop': pp.top, 'paddingBottom': pp.foot})
                  head.html(headHtml)
                  middle.html(bodyHtml)
                  foot.html(footHtml)
                  self.moduleElement = $('.on_module')
                  tool.adaptation.renderLayer(self, head)
                  tool.adaptation.renderLayer(self, middle)
                  tool.adaptation.renderLayer(self, foot)
                  // tool.carryLineHeightEvent()
                  tool.adaptation.computeLineHeight(tool)
                  tool.carryUpdateElementStorageEvent(self, head, head.find('.module'))
                  tool.carryUpdateElementStorageEvent(self, middle, middle.find('.module'))
                  tool.carryUpdateElementStorageEvent(self, foot, foot.find('.module'))
                  if ($('.tab').length){
                    tool.tab('.tab')
                  }
                  if ($('.waiter').length < 2 && $('.waiter').length > 0) {
                    $('.editBox').append('<div class="waiter "><div class="kf-head"></div><div class="kf-top"></div></div>')
                    $('.waiter').on('click', function() {
                      self.$refs.waiter.show(self, canvas.find('.waiter'))
                    })
                  }
                  tool.topRangeY = parseInt(tool.top.css('height')) + self.paddingtop + self.postop // top选区范围
                  tool.bodyRangeY = parseInt(tool.body.css('height')) + tool.topRangeY // body选区范围
                }
              }
              self.httppost(getParams)
            }
          }
          self.httpget(getParam)
        }

        tool.init(self, $)
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
          head.html('<div class="hoverbar" ondragstart="return false">拖动调节公共页头选区高度</div>')
          middle.html('')
          foot.html('<div class="hoverbar" ondragstart="return false">拖动调节公共页尾选区高度</div>')
          tool.carryLayerEvent(self, head)
          tool.carryLayerEvent(self, middle)
          tool.carryLayerEvent(self, foot)
          tool.carryLineHeightEvent()
          tool.carryUpdateElementStorageEvent(self, head, head.find('.module'))
          tool.carryUpdateElementStorageEvent(self, middle, middle.find('.module'))
          tool.carryUpdateElementStorageEvent(self, foot, foot.find('.module'))
          self.elementStorage.c_top = {}
          self.elementStorage.c_body = {}
          self.elementStorage.c_foot = {}
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
      getImageHref: function (name) { // 获取图片
        let self = this
        self.$refs.myimages.show('waiter', self, function (self, data) {
          self[name] = data
        })
      },
    // ------------- complete ----------------
      settingEvent: function () { // 页面设置
        let self = this
        self.dialogPageSetting = true 
      },
      handleBackdropSuccess: function (res) {
        let self = this
        let showurl = res.data.showurl
        self.bgImageUrl = showurl
      },
      handlePredropSuccess: function (res) {
        let self = this
        let showurl = res.data.showurl
        self.pgImageUrl = showurl
      },
      cleanBgEvent: function () {
        var self = this
        self.bgImageUrl = ''
      },
      cleanPgEvent: function () {
        var self = this
        self.pgImageUrl = ''
      },
      dialogPageSettingEvent: function () { // 页面设置弹框保存
        var self = this
        let space = $('.space')
        let canvas = $('.canvas')
        if (self.bgColorVal) {
          space.css('backgroundColor', self.bgColorVal)
        } else {
          space.css('backgroundColor', 'transparent')
        }
        if (self.prospectColorVal) {
          canvas.css('backgroundColor', self.prospectColorVal)
        } else {
          canvas.css('backgroundColor', 'transparent')
        }
        if(self.bgImageUrl){
          let bgJson = {'backgroundImage': 'url(' + self.bgImageUrl + ')', 'backgroundSize': self.inp_percent + '% auto', 'backgroundRepeat': self.repeatBgValue,'backgroundAttachment': self.attachmentBgValue}
          space.css(bgJson)
        } else {
          space.css('backgroundImage','none')
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
        canvas.css('width', self.inp_width)
        canvas.css('height', self.inp_height)
        tool.carryLineHeightEvent()
        self.dialogPageSetting = false
      },
      previewEvent: function () { // 预览
        let self = this
        tool.cleanSignEvent(self)
        $('.setInfo').remove()
        self.$router.push('preview?did=' + self.did)
        $('.resizeBox').remove()
        $('.supendTools').remove()
        $('.on_module').parent().css('outline','0')
        $('.on_module').removeClass('on_module')
        let params = {}
        let headArray = $('.c_top').html()
        let bodyArray = $('.c_body').html()
        let footArray = $('.c_foot').html()
        params = {
          page: {
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
          },
          module: {
            top: headArray,
            body: bodyArray,
            foot: footArray
          }
        }
        window.saveParams = params
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
        // 清空
        $('.resizeBox').remove()
        $('.supendTools').remove()
        $('.on_module').parent().css('outline','0')
        $('.on_module').removeClass('on_module')
       
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
        let audition = $('[auditionid]')
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
            vedioids: vedioids,
            clientType:0,
            did: self.did
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
      clickShadowColor: function () {
        $('.shadowToolbar').css('display','block')
      },
    // ------------- 模块属性控制 ------------
      changeInpZ: function (val) { // z-index 定位
        var self = this
        tool.carryModuleOperationEvent(self, 'zIndex', val)
      },
      changeInpX: function (val) { // left 定位
        var self = this
        tool.carryModuleOperationEvent(self, 'left', val)
      },
      changeInpY: function (val) { // top 定位
        var self = this
        tool.carryModuleOperationEvent(self, 'top', val)
      },
      changeInpW: function (val) { // width 宽度
        var self = this        
        tool.carryModuleOperationEvent(self, 'width', val)
      },
      changeInpH: function (val) { // height 高度
        var self = this
        tool.carryModuleOperationEvent(self, 'height', val)
      },
      changeInpSize: function (val) { // font-size 字体大小
        var self = this
        tool.carryModuleOperationEvent(self, 'fontSize', val)
      },
      changeInpLine: function (val) { // line-height 行高
        var self = this
        tool.carryModuleOperationEvent(self, 'lineHeight', val)
      },
      changeFontFamily: function (val) { // 字体类型
        var self = this     
        if ($(".on_module").length > 0) {
          tool.carryModuleOperationEvent(self, 'fontFamily', val)
        }
      },
      clickBoldEvent: function () { // 加粗
        var self = this
        if ($(".on_module").length < 1) return false
        var element = $('.tip.p').eq(0)
        if (element.hasClass('on')) {
          element.removeClass('on')
          tool.carryModuleOperationEvent(self, 'fontWeight', 'normal')
        } else {
          element.addClass('on')
          tool.carryModuleOperationEvent(self, 'fontWeight', 'bold')
        }
      },
      clickStyleEvent: function () { // 斜体
        var self = this
        if ($(".on_module").length < 1) return false
        var element = $('.tip.p').eq(1)
        if (element.hasClass('on')) {
          element.removeClass('on')
          tool.carryModuleOperationEvent(self, 'fontStyle', 'normal')
        } else {
          element.addClass('on')
          tool.carryModuleOperationEvent(self, 'fontStyle', 'italic')
        }
      },
      clickUnderlineEvent: function () { // 下划线
        var self = this
        if ($(".on_module").length < 1) return false
        var element = $('.tip.p').eq(2)
        if (element.hasClass('on')) {
          element.removeClass('on')
          tool.carryModuleOperationEvent(self, 'textDecoration', 'none')
        } else {
          element.addClass('on')
          tool.carryModuleOperationEvent(self, 'textDecoration', 'underline')
        }        
      },     
      changeColorFont: function (val) { // font-color 字体颜色
        var self = this
        tool.carryModuleOperationEvent(self, 'color', val)
      },
      changeColorBg: function (val) { // background-color 背景颜色
        var self = this
        tool.carryModuleOperationEvent(self, 'backgroundColor', val)
      },
      changeBorderWidth: function (val) { // 边框宽度（粗细）
        var self = this
        let mods = $('.on_module')
        if (mods.length > 1){
          if (parseInt(self.moduleElementY.css('border-left-width'))!== val){
            tool.carryModuleOperationEvent(self, 'borderWidth', val)
          }
        }else if(mods.length!= 0){
          tool.carryModuleOperationEvent(self, 'borderWidth', val)
        }
      },
      changeBorderStyle: function (val) { // 边框样式
        var self = this
        let mods = $('.on_module')
        if (mods.length > 1){
          if (self.moduleElementY.css('border-left-style')!== val){
            tool.carryModuleOperationEvent(self, 'borderStyle', val)
          }
        }else if(mods.length!= 0){
          tool.carryModuleOperationEvent(self, 'borderStyle', val)
        }
      },
      changeBorderColor: function (val) { // 边框颜色
        var self = this
        tool.carryModuleOperationEvent(self, 'borderColor', val)
      },
      changeOpacity: function (val) { // 透明度
        var self = this
        tool.carryModuleOperationEvent(self, 'opacity', val)
      },
      changeShadow: function (val) { // 阴影开关
        var self = this
        tool.carryModuleOperationEvent(self, 'boxShadow', self.check_shadow)
      },
      changHShadow: function (val) { // 水平偏移阴影
        var self = this
        tool.carryModuleOperationEvent(self, 'boxShadowX', val)
      },
      changVShadow: function (val) { // 垂直偏移阴影
        var self = this
        tool.carryModuleOperationEvent(self, 'boxShadowY', val)
      },
      changBlurShadow: function (val) { // 阴影模糊
        var self = this
        tool.carryModuleOperationEvent(self, 'boxShadowBlur', val)
      },
      changColorShadow: function (val) { // 阴影颜色
        var self = this
        tool.carryModuleOperationEvent(self, 'boxShadowColor', val)
        $('.shadowToolbar').removeAttr('style')
      },
    // ------------- 模块操作 ----------------
      topAlignEvent: function () { // top 上对齐
        var self = this
        tool.carryModuleOperationEvent(self, 'topAlign')
      },
      bottomAlignEvent: function () { // top 下对齐
        let self = this
        tool.carryModuleOperationEvent(self, 'bottomAlign')
      },
      leftAlignEvent: function () { // left 左对齐
        let self = this
        tool.carryModuleOperationEvent(self, 'leftAlign')
      },
      rightAlignEvent: function () { // left 右对齐
        let self = this
        tool.carryModuleOperationEvent(self, 'rightAlign')
      },
      centerAlignEvent: function () { // left 水平居中
        let self = this
        tool.carryModuleOperationEvent(self, 'centerAlign')
      },
      middleAlignEvent: function () { // top 垂直居中
        let self = this
        tool.carryModuleOperationEvent(self, 'middleAlign')
      },
      centerSpacingEvent: function () { // 水平等间距
        let self = this
        tool.carryModuleOperationEvent(self, 'centerSpacing')
      },
      middleSpacingEvent: function () { // 垂直等间距
        let self = this
        tool.carryModuleOperationEvent(self, 'middleSpacing')
      },
      topFloorEvent: function () { // 图层置顶
        let self = this
        tool.carryModuleOperationEvent(self, 'topFloor')
      },
      bottomFloorEvent: function () { // 图层置底
        let self = this
        tool.carryModuleOperationEvent(self, 'bottomFloor')
      },
      upFloorEvent: function () { // 图层上移一层
        let self = this
        tool.carryModuleOperationEvent(self, 'upFloor')
      },
      downFloorEvent: function () { // 图层下移一层
        let self = this
        tool.carryModuleOperationEvent(self, 'downFloor')
      },
      shearEvent: function () { // 剪切
        let self = this
        tool.carryModuleOperationEvent(self, 'shear')
      },
      copyEvent: function () { // 复制
        let self = this
        tool.carryModuleOperationEvent(self, 'copy')
      },
      pasteEvent: function () { // 粘贴
        let self = this
        tool.carryModuleOperationEvent(self, 'paste')
      },
      deleteEvent: function () { // 删除
        let self = this
        tool.carryModuleOperationEvent(self, 'delete')
      }
    }
  }
</script>

<style>
  .dialogSetting .el-dialog{
    width: 500px;
  }
  .dialogSetting .el-dialog__body{
    padding: 0 20px;
    height: 360px;
  }
  /*header*/
    .el-dialog__header{
      cursor: move;
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
      border:1px solid #bfcbd9;
      cursor: pointer;
      /*margin:2px;*/
    }
    #app .propertycolor .box.open{
      margin-top: 20px;
    }
    #app .propertycolor .disabled{
      border-color: #d1dbe5;
      background-color: #eef1f6!important;
    }
    .br-disable i.icon-yinying{
       background-color: #eef1f6;
    }
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
  /*app*/
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
  /*top*/
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
      padding-top: 1px;
      padding-left: 99px;
      padding-right: 140px;
      height: 36px;
      position: relative;     
      border-bottom: 1px solid #d9d9d9;
      z-index: 4;
      background-color: #f7f9f9;
      letter-spacing: 0;
      float: left;
      width: 100%;
      box-sizing: border-box;
    }  
    .tl_li{
      position: relative;
      float: left; 
      margin-top: 2px;
      margin-right: 9px;
      margin-bottom: 3px;
      height: 30px;
      line-height: 36px;   
      border-radius: 4px;     
      cursor: pointer;
      text-align: center;
      border:1px solid #fff;
      box-sizing: border-box;
    }
    .tl_span{
      margin-left: -3px;
      width: 54px;
      box-sizing: border-box;
    }
    .tl_li.tl_span i {
      float: left;
      margin-left: 3px;
    }
    .doll{
      position: absolute;
      top: 50%;
      right:-4px;
      margin-top: -2px;
      border: 3px solid transparent;
      border-bottom-color: #20a0ff;
      border-left-color: #20a0ff;
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
    .tl_li i{
      display: block;
      margin: 5px auto 0;
      font-size: 18px;
      line-height: 18px;
      color:#f55d54;
    }
    .tl_li a:hover{
      text-decoration: none;
    }
    .tl_li span{
      margin-top: 6px;  
      display: block;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      color: #525e71;
    }
    .tl_li:hover .toolbar{
      display: block;
    }
    .tl_li.tl_li_Disable{
      cursor: not-allowed;
    }
    .tl_li_Disable:hover .toolbar{
      display: none;
    }
    .toolbar{
      display: none;
      position: absolute;
      left: 0;
      top: 100%;
      min-width: 123px;
      background: #fff;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
      z-index: 101;
    }
    .toolbar li{
      padding: 0 10px;
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
      margin-top: 8px;
      margin-right:5px;
      float: left;
    }
    .toolbar input::-webkit-inner-spin-button{
      display: none;
    }
  /* tool */
    .top .border .toolbar li{
      margin-top: 0;
      padding: 4px;
      height: 28px;
    }
    .toolbar .el-radio-group{
      margin-bottom: 5px;
    }
    /*propertyLi*/
      .propertyLi{
        float: left;
        margin-right: -1px;
        padding-top: 4px;
        padding-right: 6px;
        height: 30px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #d9d9d9;
        background-color: #f7f9f9;
      }
      .propertyLi li{
        float: left;
        margin-top: 4px;
        height: 18px;
      }
      .propertyLi li .el-input__inner{
        border: 0;
        border-bottom: 1px solid #999;
        background-color: #f6f7f7;
      }
      .propertyLi li .el-input.is-disabled .el-input__inner{
        background-color: #f6f7f7;
        border-bottom: 1px solid #ccc;
      }
    /*fontLi*/
      .fontLi{
        float: left;
        margin-right: -1px;
        padding-top: 4px;
        padding-right: 6px;
        height: 30px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #d9d9d9;
        background-color: #f7f9f9;
      }
      .fontLi li{
        float: left;
        margin-top: 4px;
        height: 18px;
      }
      .fontLi li .el-input__inner{
        background-color: #f6f7f7;
        border: 0;
        border-bottom: 1px solid #999;
      }
      .fontLi .tip{
        float: left;
        margin-top: 4px;
      }
      .fontLi .el-select{
        float: left;
        margin-left: 5px;
        margin-top: -1px;
        margin-right: 2px;
        width: 100px;
        height: 28px;
      } 
      .fontLi .el-input--mini .el-input__inner{
        height: 28px;
        line-height: 28px;
      }  
      .fontLi .el-input--suffix .el-input__inner{
        padding-right: 20px;
        padding-left: 5px;
      }
      .fontLi .el-input__suffix{
        right: 0;
      }
      .fontLi .el-select .el-input.is-disabled .el-input__inner{
        height: 28px;
      }
      .fontLi .el-color-picker{
        margin-top: -3px;        
      }     
      .fontLi .el-color-picker__trigger{
        padding: 1px;
        width: 24px;
        height: 24px;
        border-radius: 1px;
       /* border: 1px solid #ccc;*/
      }
      .fontLi .el-color-picker--mini .el-color-picker__mask{
        width: 22px;
        height: 22px;
      }
      .fontLi li .el-input.is-disabled .el-input__inner{
        background-color: #f6f7f7;
        border-bottom: 1px solid #ccc;
      }
    /*backgLi*/
      .backgLi{
        float: left;
        margin-right: -1px;
        padding-top: 4px;
        padding-right: 6px;
        height: 30px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #d9d9d9;
        background-color: #f7f9f9;
      }
      .backgLi li{
        float: left;
        margin-top: 4px;
        height: 18px;
      }
      .backgLi .tip{
        float: left;
        margin-top: 4px;
      }
      .backgLi .el-color-picker{
        margin-top: -3px;        
      }     
      .backgLi .el-color-picker__trigger{
        padding: 1px;
        width: 24px;
        height: 24px;
        border-radius: 1px;
       /* border: 1px solid #ccc;*/
      }
      .backgLi .el-color-picker--mini .el-color-picker__mask{
        width: 22px;
        height: 22px;
      }
    /*borderLi*/
      .borderLi{
        float: left;
        margin-right: -1px;
        padding-top: 4px;        
        height: 30px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #d9d9d9;
        background-color: #f7f9f9;
      }
      .borderLi li{
        float: left;
        margin-top: 4px;
        height: 18px;
      }
      .borderLi .tip{
        float: left;
        margin-top: 4px;
        margin-left: 6px;
      }    
      .borderLi .el-color-picker__mask{
        display: none;
      }
      .borderLi .el-color-picker__trigger{
        border: 0;
      }
      .borderLi .el-color-picker__color{
        display: none;
      }
    /*opacityLi*/
      .opacityLi{
        position: relative;
        float: left;
        margin-right: -1px;
        padding-top: 4px;
        padding-right: 6px;
        height: 30px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #d9d9d9;
        background-color: #f7f9f9;
      }
      .opacityLi li{
        float: left;
        margin-top: 4px;
        height: 18px;
      }      
      .opacityLi li .el-input__inner{
        border: 0;
        border-bottom: 1px solid #999;
        background-color: #f6f7f7;
      }
      .opacityLi li .el-input.is-disabled .el-input__inner{
        background-color: #f6f7f7;
        border-bottom: 1px solid #ccc;
      }
      .opacityLi:hover .sliderbar{
        display: block;
      }
      .opacityLi.opacityDisabled:hover .sliderbar{
        display: none;
      }
      .sliderbar{
        display: none;
        position: absolute;
        top: 30px;
        left: 0px;
        width: 112px;
        height: 18px;
        background-color: #fff;
        box-shadow: 1px 2px 5px #888888;
      }
      .scroll-track{
        position: relative;
        width: 100px;
        height: 2px;
        background-color: #ccc;
        margin: 8px auto;
      }
      .slider-track{
        width: 50%;
        height: 2px;
        background-color: #333;
      }
      .scroll-thumb{
        position: absolute;
        left: 50px;
        top: -3px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        box-shadow: 1px 1px 4px #333;
        cursor: pointer;
      }
      .scroll-thumb:hover{scale(x,y)
        transform:scale(1.4);
        -ms-transform:scale(1.4);   /* IE 9 */
        -moz-transform:scale(1.4);  /* Firefox */
        -webkit-transform:scale(1.4); /* Safari 和 Chrome */
        -o-transform:scale(1.4); 
      }
    /*shadowLi*/
      .shadowLi{
        float: left;
        margin-right: -1px;
        padding-top: 4px;       
        height: 30px;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #d9d9d9;
        background-color: #f7f9f9;
      }
      .shadowLi li{
        float: left;
        margin-top: 4px;
        height: 18px;
      }
      .shadowLi .border .toolbar{
        left: -45px;
        width: 212px;
        padding: 8px;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
      }
      .shadowLi .toolbar span{
        float: left;
        display: block;
        min-width: 12px;
        text-align: center;
      }
      .shadowLi .el-input {
        margin-top: 0px;
      }
      .shadowLi .shadow-col{
        padding-top: 3px;
        margin-bottom: 5px;
        height: 28px;
        overflow: hidden;
      }
      .shadowLi .el-input{
        margin-right: 4px;
      }
      .shadowLi li .el-input__inner{
        border: 0;
        border-bottom: 1px solid #999;
      }
      .shadowLi li .el-input.is-disabled .el-input__inner{
        background-color: #fff;
        border-bottom: 1px solid #ccc;
      }
      .shadowLi .el-color-picker--mini .el-color-picker__mask{
        width: 22px;
        height: 22px;
      }
      .shadowLi .el-color-picker__trigger{
        padding: 1px;
        width: 24px;
        height: 24px;
        border-radius: 1px;
       /* border: 1px solid #ccc;*/
      }
  /* #app*/
    #app .t_clean{    
      float: right;  
      position: absolute;
      top: 0px;
      right: 70px;   
    }   
    #app .t_right{
      float: right;
      position: absolute;
      top: 0px;
      right: 10px;
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
      background-color: rgba(64, 158, 255, 0.5);
    }
  /*边框*/
    .pick{
      width: 20px;
      height: 20px;
      background-color: #ccc;
    }
    .border, .shadow{
      position: relative;
      display: inline-block;
      width: 36px;
      height: 20px;
      cursor:pointer;     
      font-size: 14px;
      line-height: 20px;
    }
    .border i{
      color: #20a0ff;
    }
    .border .doll, .shadow .doll{
      right: 8px;
     /* border-bottom-color: inherit;
      border-left-color:inherit;*/
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
    .border.br-disable .doll, .shadow.br-disable .doll{
       border-bottom-color: #ccc;
      border-left-color:#ccc;
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
      width: 98px;
      height: 5px;
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
  /*leftlibrary*/
    .library{
      position: absolute;
      left: 0;
      top: 0;
      padding-top: 36px;
      width: 100px;
      height:100%;
      overflow: hidden;
      border-right: 1px solid #d9d9d9;
      background-color: #f6f7f7;
      box-sizing: border-box;
      z-index: 2;
      transition: all 400ms;
      -moz-transition: all 400ms;
      -webkit-transition: all 400ms;
      -o-transition: all 400ms;
    }
    .lib-scroll{
      width: 110px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .library .lib_ol{
      padding-left: 0;
      width: 100px;
    }
    .library .lib_ol .lib_li{
      margin-bottom: 3px;
      width: 50px;
      height: 52px;
    }
    .library .lib_li span {
      font-family: 'serif';
      margin-left: -3px;
      width: 110%;
      transform:scale(0.9);
      -ms-transform:scale(0.9);   /* IE 9 */
      -moz-transform:scale(0.9);  /* Firefox */
      -webkit-transform:scale(0.9); /* Safari 和 Chrome */
      -o-transform:scale(0.9);
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
      /*overflow-y: auto;
      overflow-x: hidden;*/
      box-sizing: border-box;
      /*background-color: #f3f3f3;*/
    }
    .header{
      float: left;
      width: 100px;
      font-size: 12px;
      color: #7d8695;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      text-indent:5px;
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
      margin-left: 10px;
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
      border-bottom: 1px solid #e5e5e5;
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
      background-color: #409eff;
      color: #fff;
      cursor:pointer;
    }
    .dataHtml{
      display: none;
    }
    .libshrink{
      position: absolute;
      top: 50%;
      left: 99px;
      width: 15px;
      height: 97px;
      background-image: url(./assets/image/left2.png);
      z-index: 3;
      transition: all 400ms;
      -moz-transition: all 400ms;
      -webkit-transition: all 400ms;
      -o-transition: all 400ms;
    }
    .shrinkout {
      background-image: url(./assets/image/left1.png);
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
  /*layer*/
    /*I*/
      .layer{
        position:absolute;
        top:0;
        right:0;
        padding-top:36px;
        width: 150px;
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
        left: -15px;
        width: 15px;
        height: 97px;       
        background-image: url(./assets/image/right2.png);       
        cursor: pointer;
      }
     
      .layer .shrinkout {
        background-image: url(./assets/image/right1.png);  
      }
   
      .layer .lib_box {
        padding: 0;
      }
      .layer .header{
        width: 100%;
        padding-left: 10px;
        box-sizing: border-box;
        background-color: #f8f8f8;
        border-bottom: 1px solid #e5e5e5;
      }
      .layer .lib_ol {
        width: 100%;
        padding-left: 0px;
        text-indent: 20px;
        box-sizing: border-box;
      }        
    /*alignBox*/ 
      .alignBox{
        padding-top: 1px;
        width: 174px;
        height: 240px;
        border-bottom: 1px solid #e5e5e5;
      }
      .con-row{
        margin: 10px auto;
        height: 100px;
      }
      .con-col{
        float: left;
        width: 50%;
        height: 100px;
      }
      .con-col.r{
        box-sizing: border-box;
        border-left: 1px solid #ededed;
      }
      .con-border{
        display: block;
        margin: 0 auto;
        width: 135px;
        height: 0;
        border-bottom: 1px solid #ededed;
      }
      .col-head{
        height: 16px;
        line-height: 16px;
        font-size: 13px;
        color: #333;
        text-indent: 12px;
        /*text-shadow: 0 0 15px #999;*/
      }
      .col-li{
        float: left;
        margin: 12px 0 0 12px;
        width: 25px;
        height: 25px;       
      }
      .col-li i {
        margin: 3px;
      }
      .col-li:hover{
        cursor: pointer;
        background-color: #dbe1ef;
      }
      .tl_li_Disable.col-li:hover{
        cursor: not-allowed;
        background-color: #fff;
      }
    /*propertyBox*/
      .propertyBox{       
        width: 174px;
        height: 120px;
        border-bottom: 1px solid #e5e5e5;
      }
      .propertyBox .con-col{
        padding-top: 12px;
        height: 108px;
      }
      .con-pli{
        height: 20px;
        margin-bottom: 15px;
      }
      .con-pli.head{
        line-height: 20px;
        font-size: 14px;
        color: #333;
        text-indent: 12px;
       /* text-shadow: 0 0 15px #999;*/
      }
      .con-pli .tit{
        float: left;
        margin-left: 6px;
        line-height: 20px;
        font-size: 13px;
        color: #333;        
        /*text-shadow: 0 0 15px #999;*/
      }
      .con-pli .el-input{
        float: left;
        width: 48px;
        height: 20px;
        padding: 0;        
      }
      .con-pli .el-input__inner{
        padding: 0;
        height: 20px;
        text-align: center;  
        border-radius: 0;
      }
    /*effectsBox*/
      .effectsBox{
        padding-top: 10px;
        width: 174px;
        height: 90px;
        border-bottom: 1px solid #e5e5e5; 
      }
      .effectsBox .con-col{
        height: 16px;
      }
      .effectsBox .tip{
        float: left;
        margin-left: 6px;
        line-height: 20px;
        font-size: 13px;
        color: #333;        
        /*text-shadow: 0 0 15px #999;*/
      }
      .effectsBox .m-colorPicker .colorBtn{
        width: 36px!important;
      }
      .con-erow{
        height: 16px;
        margin-bottom: 14px;
      }      
      .effectsBox .shadow .toolbar{    
        left: -120px;
        width: 135px;
        padding: 8px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        z-index: 99;
      }
      .colorShadow{
        position: relative;
      }
      .shadow .toolbar .m-colorPicker {
        top:5px;
        left:5px;
      }
      .effectsBox .el-input {
        /*float: left;*/
        width: 48px;
        height: 20px;
        padding: 0;
      }
      
      .effectsBox .el-input__inner {
        padding: 0;
        height: 20px;
        text-align: center;
        border-radius: 0;
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
      .br_width .toolbar{       
        left: -32px;      
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        z-index: 99;
      }
      .br_width .toolbar .el-radio-button__inner{
        padding: 7px 15px;
      }
      .br_style .toolbar{
        left: -70px;       
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        z-index: 99;
      }
      .effectsBox .el-slider{
        float: left;
        width: 54px;
      }
      .effectsBox .el-slider__runway{
        margin: 8px 0;
      }
      .effectsBox .el-slider__button-wrapper{
        z-index: 9;
      }
      .effectsBox .el-slider__button{
        width: 10px;
        height: 10px;
      }
      .effectsBox .opacity .el-input{
        width: 46px;
        margin-left: 10px;
      }
    /*fontBox*/
      .fontBox{        
        padding-top: 10px;
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #e5e5e5;
      }
      .fontBox .tip{
        float: left;
        margin-left: 6px;
        line-height: 20px;
        font-size: 13px;
        color: #333;
      }
      .tip.on{
        background-color: rgba(119,119,119,0.4);
      }
      .tip.p{
        cursor: pointer;
      }
      .tip.bold{
        margin-left: 0;
        width: 18px;
        text-align: center;
        font-family: 'sans-serif';
        font-weight: bold;
        color: #777;
        font-size: 14px;       
      }
      .tip.style{
       /* margin-left: 6px;*/
        width: 16px;
        font-family: 'sans-serif';
        font-style: italic;
        text-align: left;
        text-indent: 4px;
      }
      .tip.underline{
       /* margin-left: 10px;*/
        font-family: 'sans-serif';
        text-decoration: underline;
      }
      .tip.family{
        position: relative
      }     
      .fontBox .m-colorPicker .colorBtn {
        width: 36px!important;
      }
      .fontBox .con-col{
        height: 20px;
      }
      .fontBox .el-input {
        /*float: left;*/
        width: 38px;
        height: 20px;
        padding: 0;
      }
      .fontBox  .el-select{
        float: left;
        width: 80px;
      }
      .fontBox .el-select .el-input {
        width: 80px;        
        text-indent: 2px;
      }
      .fontBox .el-select .el-input .el-input__icon{
        width: 14px;
      }
      .fontBox .el-select .el-input .el-input__inner{
      /*  text-align: left;*/
        padding-right: 14px;
      }
      .fontBox .el-input .el-input__inner {
        padding: 0;
        height: 20px;
        text-align: center;
        border-radius: 0;
      }
      .waiter {
        margin-right: 6px;
        transition: all 400ms;
        -moz-transition: all 400ms;
        -webkit-transition: all 400ms;
        -o-transition: all 400ms;
      }
  /*editBox*/
    #app .module:hover .promptBox{
      display: block;
    }
    .editBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 36px;
      margin-left: 100px;
      margin-right: 181px;
      box-sizing:border-box;
      background-color: #f7f7f7;
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
      background-color:#fff;
    }
    .scrollcanvas {
      width: 3600px;
      height: 1px;
    }
    .canvas{
      position:absolute;
      top: 50px;
      left: 50px;
      padding: 400px 0 200px 0;
      margin-bottom: 600px;
      width: 1200px;
      height: 1800px;
      background-color: #fff;
      background-size:10px 10px;
      box-shadow: 0 0 0 1px #d9d9d9;
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
      background-color: rgba(64, 158, 255, 0.9);
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
  /*copyBox*/
    .copyBox{
      position: absolute;
      display: block;
      width: 200px;
      height: 50px;
      background-color: rgba(64, 158, 255, 0.6);
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
      width: 3600px;
      height: 100%;
      border:0;
      border-style:dashed;
      border-color: #409eff;
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
      top:-45px;
      left: 0px;
      height: 36px;
      box-sizing: border-box;
      border:1px solid #E4E4E4;
      background-color: #fff;
      white-space: nowrap;
      cursor: default;
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
    .st-pulldown{
      width: 20px;
      background-image: url(./assets/toolIcon/f.png);
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
      background-color: rgba(64, 158, 255, 0.3);
      z-index: 100;
    }
    .multiBox {
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #20a0ff;
      width: 100%;
      height: 100%;
      box-sizing:border-box;
      background-color: rgba(32, 160, 255, 0.5);
      z-index: 100;
    }
    .resizeBox{
      position: absolute;
      top: 0;
      left: 0;
      border: 1px solid #409eff;
      width: 100%;
      height: 100%;
      box-sizing:border-box;
      z-index: 100;
    }
    .resize{
      position: absolute;
      width: 6px;
      height: 6px;
      background-color:#fff;
      border:1px solid #409eff;
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
  /* 模块动画 */
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
    /* 模块动画弹窗 */
    .animlist img{
      margin-top: 14px;
    }
    /* 登录框编辑文本弹窗 */  
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
</style>
