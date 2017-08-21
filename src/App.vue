<template>
  <div id="app">
  <!-- top main tool -->
    <div class="top" unselectable="on" onselectstart="return false;">
      <div class="t_logo"></div>
      <div class="t_left">
        <div class="tl_li" @click="settingEvent">
          <i class="iconfont mb icon-cog " title="设置"></i>
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
    <div class="tool" unselectable="on" onselectstart="return false;">
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
    <div class="library" unselectable="on" onselectstart="return false;">
      <nav class="lib_nav">
        <ol>
          <li class="on"><i class="iconfont icon-cube"></i><span>组件</span></li>
        </ol>
      </nav>
      <div class="lib_box">
        <div class="header">基本组件 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol basicBox"></div>
        <div class="header">网校组件 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol onlineBox"></div>
        <div class="header">正在做。。。 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol todoBox"></div>
        <div class="header">尽请期待。。。</div>
      </div>
      <div class="shrink">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
  <!-- layer -->
    <div class="layer" unselectable="on" onselectstart="return false;">
      <div class="lib_box">
        <div class="header">页头 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol elementHead">
          <div class="ele_li" v-for="(item, index) in elementHead" :dataIndex="index"><span>{{item.text}}</span></div>
        </div>
        <div class="header">主体 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol elementMain">
          <div class="ele_li" v-for="(item, index) in elementMain" :dataIndex="index"><span>{{item.text}}</span></div>
        </div>
        <div class="header">页尾 <i class="el-icon-caret-bottom"></i></div>
        <div class="lib_ol elementTail">
          <div class="ele_li" v-for="(item, index) in elementTail" :dataIndex="index"><span>{{item.text}}</span></div>
        </div>       
      </div>
      <div class="shrink shrinkout">
        <i class="el-icon-arrow-left"></i>
      </div>
    </div>
  <!-- editBox -->
    <div class="editBox" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;padding-right: 181px;">
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
        <el-col :span="5" class="tit">网校 * 前景色</el-col>
        <el-col :span="4">
          <el-color-picker v-model="prospectColorVal" ></el-color-picker>
        </el-col>
       <!--  <el-col :span="10">todo:背景图片</el-col> -->
      </el-row>
      <el-row>
        <el-col :span="5" class="tit">网校 * 背景色</el-col>
        <el-col :span="4">
          <el-color-picker v-model="bgColorVal"></el-color-picker>
        </el-col>
       <!--  <el-col :span="10">todo:背景图片</el-col> -->
      </el-row>
      <el-row>
        <el-col :span="5" class="tit">分辨率 * 页宽</el-col>
        <el-col :span="8">
          <el-input-number v-model="inp_width" :step="100" size="small"></el-input-number>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5" class="tit">分辨率 * 页高</el-col>          
        <el-col :span="8">          
          <el-input-number v-model="inp_height" :step="100" size="small"></el-input-number>
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
      title="修改图片 ( 点击添加 )"
      :visible.sync="dialogPicture"
      size="tiny" class="diaheader">
      <el-upload
        class="picture-uploader"
        name="upfile"
        action="/uploadv2/image.html"
        :show-file-list="false"
        :on-success="handlePictureSuccess"
        :before-upload="beforePictureUpload">
        <img v-if="pictureUrl" :src="pictureUrl" class="pictureMod">
        <i v-else class="el-icon-plus pageHeader-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogPicture = false">取 消</el-button>
        <el-button type="primary" @click="dialogPictureEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="按钮"
      :visible.sync="dialogButton"
      size="tiny" 
      class="dialogbutton">
      <el-row>
        <el-col :span="3">文字</el-col>
        <el-col :span="18"><el-input v-model="inputBtnText"></el-input></el-col>
      </el-row>
      <el-row>
        <el-col :span="3">链接</el-col>
        <el-col :span="18"><el-input v-model="inputBtnHref"></el-input></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogButton = false">取 消</el-button>
        <el-button type="primary" @click="dialogButtonEvent">确 定</el-button>
      </span>
    </el-dialog>
  <!-- 网校模块 -->
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
              <el-col :span="8"><el-input-number v-model="showWidth" :min="1" :max="2600" :step="100"></el-input-number></el-col>
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
    <el-dialog
      title="分类设置"
      :visible.sync="dialogAddcoursetype"
      size="dialogAddcoursetype" >
      <el-tabs v-model="courseactiveName"  @tab-click="handlecourseClick">
        <el-tab-pane label="基础设置" name="first">
          <el-form ref="courseHeightL" :model="courseHeightL" label-width="100px">
          	<el-form-item label="主选框高度：">
					    <el-radio-group v-model="courseHeightL.heightone">
					      <el-radio label="默认"></el-radio>
					      <el-radio label="自定义"></el-radio>
					    </el-radio-group>
					    
					    <el-input-number v-model="courseHeightL.heightonenum" size="small" :disabled=" courseHeightL.heightone != '自定义' " :controls=false></el-input-number>
					  </el-form-item>
					  <el-form-item label="主类框高度：">
					    <el-radio-group v-model="courseHeightL.heighttwo">
					      <el-radio label="默认"></el-radio>
					      <el-radio label="自定义"></el-radio>
					    </el-radio-group>
					    
					    <el-input-number v-model="courseHeightL.heighttwonum" size="small" :disabled=" courseHeightL.heighttwo != '自定义' " :controls=false></el-input-number>
					  </el-form-item>
					  <el-form-item label="主类个数：">
					    <el-radio-group v-model="courseHeightL.length">
					      <el-radio label="默认"></el-radio>
					      <el-radio label="自定义"></el-radio>
					    </el-radio-group>
					    
					    <el-input-number v-model="courseHeightL.lengthnum" size="small" :disabled=" courseHeightL.length != '自定义' " :controls=false></el-input-number>
					  </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="样式" name="second">
         <el-form ref="courseHeightL" :model="courseHeightL" label-width="60px">
          	<el-form-item label="颜色：">
					    <div class="togglePaletteOnly">
					    	<div class="Paletter Paletter1"><div color="theme_1" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter2"><div color="theme_2" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter3"><div color="theme_3" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter4"><div color="theme_4" class="Paletter-icon active-icon"></div></div>
					    	<div class="Paletter Paletter5"><div color="theme_5" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter6"><div color="theme_6" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter7"><div color="theme_7" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter8"><div color="theme_8" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter9"><div color="theme_9" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter10"><div color="theme_10" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter11"><div color="theme_11" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter12"><div color="theme_12" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter13"><div color="theme_13" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter14"><div color="theme_14" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter15"><div color="theme_15" class="Paletter-icon"></div></div>
					    	<div class="Paletter Paletter16"><div color="theme_16" class="Paletter-icon"></div></div>
					    </div>
					  </el-form-item>
					  <div class="Palettebuttonlist">
				    		<div color="default" class="csslist">
				    				<div class="csslist-div">
				    						<div class="csslist-div-top">
				    						</div>
				    							默认	
				    				</div>
				    				<p class="hovershow">默认</p>
				    		</div>
				    </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>    
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogAddcoursetype = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddcoursetypeEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导航栏设置"
      :visible.sync="dialogNavigation "
      size="nav" class="diaheader">
      <el-tabs v-model="activeNav" >
        <el-tab-pane label="基础设置" name="first">
          <div class="navBox">
            <el-row>
              <el-col :span='4'>搜索框</el-col>
              <el-col :span='4'>
                <el-switch
                  v-model="searchBtn"
                  on-text="开启"
                  off-text="关闭">
                </el-switch>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='4'>登录</el-col>
              <el-col :span='4'>
                <el-switch
                  v-model="loginBtn"
                  on-text="开启"
                  off-text="关闭">
                </el-switch>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='4'>注册</el-col>
              <el-col :span='4'>
                <el-switch
                  v-model="registerBtn"
                  on-text="开启"
                  off-text="关闭">
                </el-switch>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="导航设置" name="second">
          <div class="navBox">
            <template>
              <el-table
                :data="navData"
                style="width: 100%"
                max-height="300">
                <el-table-column
                  label="状态"
                  width="120">
                  <template scope="scope">
                    <el-checkbox v-model="scope.row.available" >启用</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="nickname"
                  label="导航名称"
                  width="160">
                </el-table-column>
                <el-table-column                
                  label="分类"
                  width="100">
                  <template scope="scope">
                    {{ scope.row.navtype == '0' ? '系统' : scope.row.navtype == '1' ? '资讯' : '自定义' }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template scope="scope">
                    <el-button size="small" type="text" @click="handleEidtNavnameEvent(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="text" @click="handleShiftUpNavEvent(scope.$index, scope.row)" v-if="scope.$index != 0">上移</el-button>
                    <el-button size="small" type="text" v-else style="color:#ccc;cursor: not-allowed;">上移</el-button>
                    <el-button size="small" type="text" @click="handleShiftDownNavEvent(scope.$index, scope.row)"  v-if="scope.$index != (navData.length - 1)">下移</el-button>
                    <el-button size="small" type="text" v-else style="color:#ccc;cursor: not-allowed;">下移</el-button>
                    <el-button size="small" type="text" @click="handleDeleteNavEvent(scope.$index, scope.row)"  v-if="scope.row.navtype != '0'">删除</el-button>
                    <el-button size="small" type="text" v-else style="color:#ccc;cursor: not-allowed;">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>        
        </el-tab-pane>       
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="float: left;margin-left: 10px;" v-if="activeNav=='second'" @click="addNavName = true">添加导航</el-button>
        <el-button @click="dialogNavigation = false">取 消</el-button>
        <el-button type="primary" @click="dialogNavigationEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新闻资讯设置"
      :visible.sync="dialognews"
      size="dialognews" >
      <el-tabs v-model="activenews"  @tab-click="handlenewsClick">
       	<el-tab-pane label="选择样式" name="first">
         	<div class="Palettebuttonlist">
		    		<div color="default" class="csslist" id="newsdefault">
		    				<div class="csslist-div">
		    						<div class="csslist-div-top">
		    						</div>
		    							默认	
		    				</div>
		    				<p class="hovershow">默认</p>
		    		</div>
			    </div>
        </el-tab-pane>
       	<el-tab-pane label="样式设置" name="second">
          <el-form ref="newsDetailed" :model="newsDetailed" label-width="100px">
          	<el-form-item label="资讯来源：">
					    <el-select v-model="newsDetailed.newsvalue" placeholder="新闻资讯">
					    	<el-option
						      v-for="(key,item) in newsDetailed.newssource"
						      :label="key.name" 
						      :value="key.code">
						    </el-option>
						  </el-select>
					  </el-form-item>
					  <el-form-item label="模块标题：">
					    <el-radio-group v-model="newsDetailed.ontitle">
					      <el-radio :label="1">开启</el-radio>
					      <el-radio :label="0">关闭</el-radio>
					    </el-radio-group>
					  </el-form-item>
          	<el-form-item label="图片显示：">
					    <el-radio-group v-model="newsDetailed.onimg">
					     <el-radio :label="1">开启</el-radio>
					      <el-radio :label="0">关闭</el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="内容显示：">
					    <el-radio-group v-model="newsDetailed.oncont">
					      <el-radio :label="1">开启</el-radio>
					      <el-radio :label="0">关闭</el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="时间显示：">
					    <el-radio-group v-model="newsDetailed.ontime">
					      <el-radio :label="1">开启</el-radio>
					      <el-radio :label="0">关闭</el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="单行显示：">
					    <el-radio-group v-model="newsDetailed.onrow">
					      <el-radio :label="1">1条</el-radio>
					      <el-radio :label="2">2条</el-radio>
					    </el-radio-group>
					  </el-form-item>
					  <el-form-item label="行数：">
					    <el-radio-group v-model="newsDetailed.oncol">
					      <el-radio :label="1">1</el-radio>
					      <el-radio :label="2">2</el-radio>
					      <el-radio :label="3">3</el-radio>
					      <el-radio :label="0">自定义</el-radio>
					    </el-radio-group>
					     <el-input-number v-model="newsDetailed.col" size="small" :disabled=" newsDetailed.oncol != '0' " :controls=false></el-input-number> 行
					  </el-form-item>
          </el-form>
        </el-tab-pane>
        
      </el-tabs>    
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialognews = false">取 消</el-button>
        <el-button type="primary" @click="dialognewsEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="登录框设置"
      :visible.sync="dialoglogin"
      size="dialoglogin" >
      <el-tabs v-model="activelogin"  @tab-click="handleloginClick">
       	<el-tab-pane label="基础设置" name="first">
          <el-form ref="loginDetailed" :model="loginDetailed" label-width="100px">
					  <el-form-item label="默认文字：">
					    <el-radio-group v-model="loginDetailed.ontext">
					      <el-radio :label="1">开启</el-radio>
					      <el-radio :label="0">关闭</el-radio>
					    </el-radio-group>
					  </el-form-item>
          	<el-form-item label="密码显示：">
					    <el-radio-group v-model="loginDetailed.onpassword">
					     <el-radio :label="1">开启</el-radio>
					      <el-radio :label="0">关闭</el-radio>
					    </el-radio-group>
					  </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="选择样式" name="second">
         	<div class="Palettebuttonlist">
		    		<div type="default" class="csslist logincsslist">
		    				<div class="csslist-div">
		    						<div class="csslist-div-top">
		    						</div>
		    							默认	
		    				</div>
		    				<p class="hovershow">默认</p>
		    		</div>
		    		<div type="one" class="csslist logincsslist">
		    				<div class="csslist-div logintype1">
		    				</div>
		    				<p class="hovershow">样式一</p>
		    		</div>
			    </div>
        </el-tab-pane>
      </el-tabs>    
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialoglogin = false">取 消</el-button>
        <el-button type="primary" @click="dialogloginEvent">确 定</el-button>
      </span>
    </el-dialog> 
    <el-dialog
      title="第三方登录设置"
      :visible.sync="dialogthirdlogin"
      size="dialogthirdlogin" >
      <el-tabs v-model="activethirdlogin"  @tab-click="handlethirdloginClick">
       	<el-tab-pane label="基础设置" name="first">
          <el-form ref="thirdloginDetailed" :model="thirdloginDetailed" label-width="100px">
					  <el-form-item label="第三方工具：">
					  	 <el-checkbox-group v-model="thirdloginDetailed.third">
						    <el-checkbox label="1">QQ</el-checkbox>
						    <el-checkbox label="2">微博</el-checkbox>
						    <el-checkbox label="3">微信</el-checkbox>
						  </el-checkbox-group>
					  </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>    
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogthirdlogin = false">取 消</el-button>
        <el-button type="primary" @click="dialogthirdloginEvent">确 定</el-button>
      </span>
    </el-dialog>
        <el-dialog
      title="教师列表"
      :visible.sync="dialogaddtea"
      size="dialogaddtea" >
      <el-row style="position: absolute;top: 16px;right: 40px;width: 280px;">
      	<el-col :span="16">
      		<el-input size="small" v-model="teainput" type="text" placeholder="请输入老师姓名或账号"></el-input>
      	</el-col>
      	<el-col :span="4">
      		<el-button style="margin-left: 10px;" @click="searchtealist" size="small">搜索</el-button>
      	</el-col>
      </el-row>
      <el-row>
      	<el-col >
      		<div class="teater_all">
      				
      		</div>
      	</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="dialogaddtea = false">取 消</el-button>
        <el-button type="primary" @click="dialogaddteaEvent">确 定</el-button>
      </span>
    </el-dialog> 

  <el-dialog
      title="修改导航"
      :visible.sync="editNavName "
      size="edit" >
      <el-input v-model="inp_editNav" placeholder="请输入导航名称"></el-input>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="editNavName = false">取 消</el-button>
        <el-button type="primary" @click="handleEidtNavnameConfirmEvent">确 定</el-button>
      </span>      
    </el-dialog>
    <el-dialog
      title="添加导航"
      :visible.sync="addNavName"
      size="nav" class="addNavName">
      <el-row>
        <el-col :span='4' style="text-align: center;">导航名称</el-col>
        <el-col :span='16'>
          <el-input v-model="inp_addNav" placeholder="请输入导航名称"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='4' style="text-align: center;">导航类型</el-col>
        <el-col :span='16'>
          <el-radio class="radio" v-model="navType" label="1">资讯</el-radio>
          <el-radio class="radio" v-model="navType" label="2">自定义链接</el-radio>
        </el-col>
      </el-row>
      <div v-if='navType=="2"'>
        <el-row>
          <el-col :span='4' style="text-align: center;">链接地址</el-col>
          <el-col :span='16'>
            <el-input v-model="inp_addNavUrl" placeholder="请输入导航跳转链接"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='4' style="text-align: center;">打开方式</el-col>
          <el-col :span='16' >
            <el-radio class="radio" v-model="openType" label="1">新窗口</el-radio>
            <el-radio class="radio" v-model="openType" label="2">当前窗口</el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="addNavName = false">取 消</el-button>
        <el-button type="primary" @click="handleAddNavConfirmEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="二级资讯导航设置"
      :visible.sync="dialogSecNavigation "
      size="nav" class="diaheader">
        <div class="navBox">
            <template>
              <el-table
                :data="secNavData"
                style="width: 100%"
                max-height="300">
                <el-table-column
                  label="状态"
                  width="120">
                  <template scope="scope">
                    <el-checkbox v-model="scope.row.subavailable" >启用</el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="subnickname"
                  label="导航名称"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template scope="scope">
                    <el-button size="small" type="text" @click="handleEidtSecNavnameEvent(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="text" @click="handleShiftUpSecNavEvent(scope.$index, scope.row)" v-if="scope.$index != 0">上移</el-button>
                    <el-button size="small" type="text" v-else style="color:#ccc;cursor: not-allowed;">上移</el-button>
                    <el-button size="small" type="text" @click="handleShiftDownSecNavEvent(scope.$index, scope.row)"  v-if="scope.$index != (secNavData.length - 1)">下移</el-button>
                    <el-button size="small" type="text" v-else style="color:#ccc;cursor: not-allowed;">下移</el-button>
                    <el-button size="small" type="text" @click="handleDeleteSecNavEvent(scope.$index, scope.row)"  v-if="scope.row.navtype != '0'">删除</el-button>
                    <el-button size="small" type="text" v-else style="color:#ccc;cursor: not-allowed;">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" style="float: left;margin-left: 10px;" @click="addSecNavName = true">添加导航</el-button>
        <el-button @click="dialogSecNavigation = false">取 消</el-button>
        <el-button type="primary" @click="dialogSecNavigationEvent">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改二级导航"
      :visible.sync="editSecNavName "
      size="edit" >
      <el-input v-model="inp_editSecNav" placeholder="请输入二级导航名称"></el-input>
      <span slot="footer" class="dialog-footer">        
        <el-button @click="editSecNavName = false">取 消</el-button>
        <el-button type="primary" @click="handleEidtSecNavnameConfirmEvent">确 定</el-button>
      </span>      
    </el-dialog>
    <el-dialog
      title="添加二级导航"
      :visible.sync="addSecNavName"
      size="nav" class="addNavName">
      <el-row>
        <el-col :span='4' style="text-align: center;">导航名称</el-col>
        <el-col :span='16'>
          <el-input v-model="inp_addSecNav" placeholder="请输入导航名称"></el-input>
        </el-col>
      </el-row>     
      <span slot="footer" class="dialog-footer">        
        <el-button @click="addSecNavName = false">取 消</el-button>
        <el-button type="primary" @click="handleAddSecNavConfirmEvent">确 定</el-button>
      </span>
    </el-dialog>
  <!-- todo -->
  <el-dialog
    title="设置免费试听课件"
    :visible.sync="dialogAudition"
    size="audition" class="auditiondia">
    <el-row>
      <el-col class='courseSource'>
        <el-radio-group v-model="radioSource" @change="radioCourseSourceChangeEvent"> <!-- todo -->
          <el-radio-button label="self">本校课程</el-radio-button>
          <el-radio-button v-for="(item, index) in sourceData" :key="item.sourceid" :label="item.sourceid">{{item.name}}</el-radio-button>
        </el-radio-group>
      </el-col>  
    </el-row>  
    <el-row>
      <el-col>
        <el-radio-group v-model="radioMainClass" @change="radioMainClassChangeEvent">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button v-for="(item, index) in pClassData" :key="item.pid"  :label="item.pid">{{item.pname}}</el-radio-button>
        </el-radio-group>
      </el-col>  
    </el-row>
    <el-row v-if="radioMainClass!=''&& sClassData.length > 0">
      <el-col>
        <el-radio-group v-model="radioNextClass" @change="radioNextClassChangeEvent">
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button v-for="(item, index) in sClassData" :key="item.sid" :label="item.sid">{{item.sname}}</el-radio-button>
        </el-radio-group>
      </el-col>  
    </el-row>
    <el-row class="conCourse">
      <el-col :span="12">
        <el-pagination
          layout="prev, pager, next"
          :total="courseListTotal"
          :current-page="courseListPage"
          :page-size="30"
          v-if="courseListTotal > 30"
          @current-change="courseListCurrPageEvent">
        </el-pagination>
        <el-input
          placeholder="去输入课程名"
          icon="search"
          v-model="inp_courseName"
          @change="searchCourseEvent"
          :on-icon-click="searchCourseEvent">
        </el-input>
        <div class="courseList"  v-loading="loading">
          <div class="courseLi" v-for="(item, index) in courseListData" :key="item.folderid" :label="item.folderid" @click="viewCoursewareEvent(item.folderid)">
            <div class="imgbox">
              <img :src="item.img" >
            </div>
            <span>{{item.iname}} ({{item.coursewarenum||item.cwnum}})</span>
          </div>
          <div class="nodata" v-if="courseListData.length == 0"></div>
        </div>        
      </el-col>
      <el-col :span="12" class="courseware"> 
        <el-pagination
          layout="prev, pager, next"
          :total="cwListTotal"
          :current-page="cwListPage"
          :page-size="30"
          v-if="cwListTotal > 30"
          @current-change="CoursewareListCurrPageEvent">
        </el-pagination>
        <el-input
          placeholder="去输入课件名"
          icon="search"
          v-model="inp_CoursewareName"
          @change="searchCoursewareEvent">
        </el-input>
        <div class="cwlist" v-loading="loading">
          <el-radio-group v-model="radioCourseware" @change="radioCoursewareChangeEvent">
            <div class="cwLi" v-for="(item, index) in cwlistData" :key="item.sid">
              <div class="chapter">{{item.sname}}</div>
              <el-radio-button v-for="(itemcw, index) in item.cwlist" :key="itemcw.cwid" :label="itemcw.cwid">{{itemcw.title}}</el-radio-button>
            </div>
          </el-radio-group>
          <div class="nodata" v-if="cwlistData.length == 0"></div>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">        
      <el-button @click="dialogAudition = false">取 消</el-button>
      <el-button type="primary" @click="handleSettingAuditionEvent">确 定</el-button>
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
      // -------------基础组件弹框---------
        dialogText: false,
        dialogEditor: false,
        dialogPicture: false,
        dialogButton: false,
        dialogPageHeader: false,
        dialogPageSetting: false,
        dialogCarousel: false,
      // ------------免费试听设置----
        dialogAudition: false,
        sourceData: [],
        radioSource: 'self',
        pClassData: [],
        radioMainClass: '',
        sClassData: [],
        radioNextClass: '',
        courseListData: [],
        courseListTotal: 0,
        courseListPage: 1,
        inp_courseName: '',
        cwlistData: [],
        cwListTotal: 0,
        cwListPage: 1,
        folderid: '',
        inp_CoursewareName: '',
        radioCourseware: '',
        loading: true,
        loadingcw: true,
      // ------------导航设置--------
        dialogNavigation: false,
        editNavName: false,
        addNavName: false,
        navType: '1',
        openType: '1',
        searchBtn: true,
        loginBtn: true,
        registerBtn: true,
        inp_editNav: '',
        inp_addNav: '',
        inp_addNavUrl: '',
        navIndex: 0,
        navData: [],
        dialogSecNavigation: false,
        editSecNavName: false,
        addSecNavName: false,
        secNavData: [],
        secNavIndex: 0,
        inp_editSecNav: '',
        inp_addSecNav: '',
      // ------------轮播设置--------
        inputBtnText: '',
        inputBtnHref: '',
        imageUrl: '',
        pictureUrl: '',
        textarea: '',
        activeName: 'first',
        activeNav: 'first',
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
      // ------------课程分类设置----------------
        courseactiveName: 'first',
        dialogAddcoursetype: false,
        courseHeightL: {
          heightone: '默认',
          heighttwo: '默认',
          length: '默认',
          heightonenumdefault: 50,
          heighttwonumdefault: 65,
          lengthnumdefault: 2,
          heightonenum: 50,
          heighttwonum: 65,
          lengthnum: 2,
          classs: 'theme_4'
        },
      //---------------新闻资讯设置------------------
      	dialognews : false,
      	activenews : 'first',
      	navcode :'news',
      	getTime:function (value) {		//换日期格式不包括时分
      		let d = new Date(parseInt(value) * 1000)
			    let year = d.getFullYear(),
			    month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1):d.getMonth()+1,
			    date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
			    hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
			   	minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
			    second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			
			    return  year+"-"+month+"-"+date;   
        },
      	getnews : function(pagesize){
      		let self = this;
	    			self.$http.get(window.host +"/aroomv3/news.html", {
	    				params:{
	    					q : '',
								pagesize : pagesize || 6,
								pagenum : 1,
								navcode : self.newsDetailed.newsvalue,
								starttime : '',
								endtime : '',
	    				}
	    			},{emulateJSON:true}).then(function(response){
	    				
	    				let datas = response.data.data
	    				$('.on_module .newsList').empty()
	    				
	    				if(datas.length){
	    					for(let i=0;i<datas.length;i++){
	    						let time = self.getTime(datas[i].dateline)
	    						
	    						let newli = '<div class="news_li"><div class="news_li_left"><img src="'+datas[i].thumb+'"></div><div class="news_li_right"><h3><a href="/dyinformation/'+datas[i].itemid+'.html" target="_blank" title="'+datas[i].subject+'"><span class="news_title">'+datas[i].subject+'</span></a><span class="times">'+time+'</span></h3><p class="news_cont">'+datas[i].note+'</p></div></div>'
	    						$('.on_module .newsList').append(newli)
	    					}
	    				}
					},function(response){
						console.log(response)
					});
      	},
      	getNewsCategorys  : function(pagesize){
      		var self = this;
	    			self.$http.get(window.host +"/aroomv3/news/getNewsCategorys.html", {
	    				params:{
	    					
	    				}
	    			},{emulateJSON:true}).then(function(response){
	    				if(response.data.code == 0){
		    					self.newsDetailed.newssource = response.data.data;
							}else{
								console.log("数据错误");
							}
					},function(response){
						console.log(response)
					});
      	},
      	
      	newsDetailed : {
      		newssource : [],
      		newsvalue : 'news',
      		ontitle : 1,
      		title : '新闻资讯',
      		onimg : 1,
      		oncont : 1,
      		ontime : 1,
      		onrow : 2,
      		oncol : 3,
      		col : 1
      	},
     	// ----------- 登录框设置 --------------
     		activelogin : 'first',
     		dialoglogin : false,
     		loginDetailed :{
     			ontext : 1,
     			onpassword : 1,
     			logintype :''
     		},
     	// ----------- 第三方登录设置 --------------
     		dialogthirdlogin : false,
     		activethirdlogin : 'first',
     		thirdloginDetailed :{
     			third :['1','2','3']
     		},
     	// ----------- 名师团队 ----------------
     		dialogaddtea :false,
     		teavalue : '',
     		teainput : '',
     		teauid : '',
     		getealist : function(){
     			let self = this;
	    		self.$http.get(window.host +"/aroomv3/teacher/lists.html", {
	    				params:{
	    					q : self.teainput,
	    					pagenum : 1,
	    					pagesize : 1000
	    				}
	    			},{emulateJSON:true}).then(function(response){
	    				let list = response.data.data.list
	    				let tids = [];
	    				$('.addtheteateam .team_bk').each(function(){  
							    tids.push($(this).attr('tid'))   
							});
	    				$('.teater_all').empty();
	    				if(list.length){
	    						for(var i=0;i<list.length;i++){
	    							let face = list[i].face
	    							if(face == ''){
	    								if(list[i].sex == '0'){
	    									face =  'http://static.ebanhui.com/ebh/tpl/default/images/t_man_120_120.jpg'
	    								}else{
	    									face =  'http://static.ebanhui.com/ebh/tpl/default/images/t_woman_120_120.jpg'
	    								}
	    							}
	    							let teas =  '<a  href="javascript:;" class="lisnres" tid="'+list[i].teacherid+'" urealname="'+list[i].realname+'" uname="'+list[i].username+'" uface="'+face+'" uprofile="'+list[i].profile+'" uprofessionaltitle="'+list[i].professionaltitle+'">'+list[i].realname+'('+list[i].username+')<span class="selectico"></span></a>'
	    							$('.teater_all').append(teas)
	    						}
	    				}
	    				self.$nextTick(function () {
	    					for(var i=0;i<tids.length;i++){
	    						$(".teater_all a[tid='"+tids[i]+"']").addClass('unonlock')
	    					}
	    					let team_bktid = $('.on_module .team_bk').attr('tid') || ''
	    					if(team_bktid != ''){
	    						$(".teater_all a[tid='"+team_bktid+"']").removeClass('unonlock').addClass('onlock')
	    					}
								$('.teater_all a').on('click',function(){
									if($(this).hasClass('unonlock')){
										return false
									}else{
										$('.teater_all a').removeClass('onlock')
                		$(this).addClass('onlock')
									}
                	
                })	
					    })
					},function(response){
						console.log(response)
					});
     		},
      // -----------工具栏+全局设置+右侧元素图层-----------------
        prospectColorVal: '#fff',
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
        posleft: 1000, // editbox  left值
        elementHead: [],
        elementMain: [],
        elementTail: [],
      // -----------common---------------------------
        editorConfig: {
          zIndex: 3000,
          toolbars: [[
            'undo', 'redo', 'customstyle', 'paragraph', 'fontfamily', 'fontsize', 'forecolor', 'backcolor', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', 'rowspacingtop', 'rowspacingbottom', 'lineheight', '|', 'simpleupload', 'emotion', 'spechars', '|', 'selectall', 'removeformat'
          ]]
        },
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
        moduleEvent: function () { // 特殊二级导航设置绑定事件
          let self = this
          let editBox = $('.editBox')
          editBox.on('click', '.setInfo', function (e) {
            self.dialogSecNavigation = true
            self.navIndex = $(this).attr('dataIndex')
            let getParam = {
              url: '/aroomv3/roominfo/navigator.html',
              params: {},
              fun: function (response) {
                let data = response.body.data
                let navigatorlist = data.navigatorlist
                self.navData = navigatorlist
                self.secNavData = self.navData[self.navIndex].subnav
                for (let i = 0, len = self.secNavData.length; i < len; i++) {
                  let item = self.secNavData[i]
                  if (item.subavailable === '1') {
                    item.subavailable = true
                  } else {
                    item.subavailable = false
                  }
                }
              }
            }
            self.httpget(getParam)
          })
        },
        courselist: function (param) { // 课程列表
          let self = this
          let getParam = {
            url: '/aroomv3/course/courselist.html',
            params: param,
            fun: function (response) {
              let data = response.body.data
              self.courseListData = data.courselist
              self.courseListTotal = parseInt(data.coursecount)
              self.loading = false
            }
          }
          self.loading = true
          self.httpget(getParam)
        },
        cwlist: function (param) {
          let self = this
          let getParam = {
            url: '/aroomv3/course/cwlist.html',
            params: param,
            fun: function (response) {
              let data = response.body.data
              self.cwlistData = data.cwlist
              self.cwListTotal = parseInt(data.cwcount)
              self.loadingcw = false
            }
          }
          self.loadingcw = true
          self.httpget(getParam)
        },
      // ---------------------
        tool: { /* 工具箱事件 */
        // --------------- complete ----------------
          linePosition: function (editBox, copyBox, self, e) {
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
            rowT.css('top', e.pageY + sTop - self.paddingtop)
            rowB.css('top', e.pageY + sTop - self.paddingtop + h)
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
          scrollHeight: function () { // 获得内容高度
            let colL = $('.col-l')
            let colR = $('.col-r')
            let scrollHeight = $('.space')[0].scrollHeight
            colL.css('height', scrollHeight)
            colR.css('height', scrollHeight)
          },
          getLayerElement: function (self, parent) { // 更新图层元素
            let ele = parent.find('.module')
            let arr = []
            for (let i = 0, len = ele.length; i < len; i++) {
              let item = ele.eq(i)
              let text = item.attr('datatext')
              let obj = {
                ele: item,
                text: text
              }
              arr.push(obj)
            }
            switch (parent.attr('class')) {
              case 'c_top':
                self.elementHead = arr
                break
              case 'c_body':
                self.elementMain = arr
                break
              case 'c_foot':
                self.elementTail = arr
                break
            }
          },
          bindLibraryMenu: function (self) { // 左侧菜单栏
            let toallGroup = datahtml.datahtml.toallGroup
            let basic = toallGroup.basic
            let bhtm = ''
            let basicBox = $('.basicBox')
            let online = toallGroup.online
            let ohtm = ''
            let onlineBox = $('.onlineBox')
            let todo = toallGroup.todo
            let thtm = ''
            let todoBox = $('.todoBox')
            for (let i = 0, len = basic.length; i < len; i++) {
              let item = basic[i]
              bhtm += '<div class="lib_li" dataHtml="' + item.name + '"><i class="' + item.icon + '"></i><span>' + item.text + '</span></div>'
            }
            for (let i = 0, len = online.length; i < len; i++) {
              let item = online[i]
              ohtm += '<div class="lib_li" dataHtml="' + item.name + '"><i class="' + item.icon + '"></i><span>' + item.text + '</span></div>'
            }
            for (let i = 0, len = todo.length; i < len; i++) {
              let item = todo[i]
              thtm += '<div class="lib_li" dataHtml="' + item.name + '"><i class="' + item.icon + '"></i><span>' + item.text + '</span></div>'
            }
            basicBox.html(bhtm)
            onlineBox.html(ohtm)
            todoBox.html(thtm)
            $('.library .header').on('click', function () {
              let e = $(this).next()
              let len = e.children().length
              let num = parseInt(len / 2) + len % 2
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
            let editBox = $('.editBox')
            let library = $('.library')
            let shrink = library.find('.shrink')
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
          bindLayerElement: function (self) { // 右侧图层列表
            let editBox = $('.editBox')
            let layer = $('.layer')
            let shrink = layer.find('.shrink')
            $('.layer .header').on('click', function () {
              let e = $(this).next()
              let len = e.children().length
              let h = 25 * len
              if (e.css('height') === '1px') {
                e.css('height', h + 'px')
              } else {
                e.css('height', h + 'px')
                setTimeout(function () {
                  e.css('height', '0px')
                }, 0)
              }
            })
            shrink.on('click', function () {
              if (shrink.hasClass('shrinkout')) {
                shrink.removeClass('shrinkout')
                layer.addClass('layerHide')
                editBox.css('paddingRight', '')
              } else {
                shrink.addClass('shrinkout')
                layer.removeClass('layerHide')
                editBox.css('paddingRight', '181px')
              }
            })
            $('.elementHead').on('click', '.ele_li', function (e) {
              let index = $(this).attr('dataIndex')
              let ele = self.elementHead[index].ele
              self.tool.initialize(self, ele)
            })
            $('.elementMain').on('click', '.ele_li', function (e) {
              let index = $(this).attr('dataIndex')
              let ele = self.elementMain[index].ele
              self.tool.initialize(self, ele)
            })
            $('.elementTail').on('click', '.ele_li', function (e) {
              let index = $(this).attr('dataIndex')
              let ele = self.elementTail[index].ele
              self.tool.initialize(self, ele)
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
            let line = $('.line')
            $('.c_top').on('mousedown', '.hoverbar', function (e) { // top容器调整
              y = e.pageY
              h = parseInt(cTop.css('height'))
              canvas.mousemove(function (e) {
                hs = h + (e.pageY - y)
                cTop.css('height', hs)
                canvas.css('paddingTop', hs)
                topRangeY = hs + self.paddingtop + self.postop
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
              })
              canvasMouseup()
            })
            $('.c_foot').on('mousedown', '.hoverbar', function (e) { // foot容器调整
              y = e.pageY
              h = parseInt(cFoot.css('height'))
              canvas.mousemove(function (e) {
                hs = h + (y - e.pageY)
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
              copyBox.show().css({'top': e.pageY, 'left': self.paddingleft})
              editBox.unbind('mouseup')
              editBox.mousemove(function (e) {
                copyBox.css({'top': e.pageY, 'left': e.pageX})
              })
              toolself.linePosition(editBox, copyBox, self, e)
              editMouseup()
              return false
            })
            function canvasMouseup () { // canvas解绑鼠标移动事件
              canvas.mouseup(function () {
                canvas.unbind('mousemove mouseup')
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
                x = e.pageX - self.paddingleft - self.posleft + sLeft
                topRangeY = parseInt(cTop.css('height')) + self.paddingtop + self.postop
                bodyRangeY = parseInt(cBody.css('height')) + topRangeY
                if (e.pageY + sTop < topRangeY) {
                  box = cTop
                  y = e.pageY + sTop - self.paddingtop - self.postop
                } else if (e.pageY + sTop < bodyRangeY) {
                  box = cBody
                  y = e.pageY + sTop - topRangeY
                } else {
                  box = cFoot
                  y = e.pageY + sTop - bodyRangeY
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
                self.tool.getLayerElement(self, box)
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
                  let original = module.parent()
                  module.remove()
                  self.tool.getLayerElement(self, original)
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
            editBox.on('mousedown', '.resize', function (e) { // 选中小圆点按钮拉伸容器
              let $this = $(this)
              let x = e.pageX
              let y = e.pageY
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
                  part = function (e) {
                    let xx = self.inp_x + self.posleft + ws + e.pageX - x
                    self.inp_w = ws + e.pageX - x
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
                  part = function (e) {
                    let yy = ys + self.postop + warp + hs + e.pageY - y
                    self.inp_h = hs + e.pageY - y
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
                  part = function (e) {
                    let xx = xs - x + e.pageX + self.posleft
                    self.inp_x = xs - x + e.pageX
                    self.inp_w = ws + x - e.pageX
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
                  part = function (e) {
                    let yy = ys - y + e.pageY + warp + self.postop
                    self.inp_y = ys - y + e.pageY
                    self.inp_h = hs + y - e.pageY
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
                  part = function (e) {
                    let yy = ys - y + e.pageY + warp + self.postop
                    let xx = self.inp_x + self.posleft + ws + e.pageX - x
                    self.inp_y = ys - y + e.pageY
                    self.inp_w = ws + e.pageX - x
                    self.inp_h = hs + y - e.pageY
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
                  part = function (e) {
                    let yy = ys - y + e.pageY + warp + self.postop
                    let xx = xs - x + e.pageX + self.posleft
                    self.inp_y = ys - y + e.pageY
                    self.inp_x = xs - x + e.pageX
                    self.inp_h = hs + y - e.pageY
                    self.inp_w = ws + x - e.pageX
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
                  part = function (e) {
                    let yy = self.inp_y + self.postop + warp + hs + e.pageY - y
                    let xx = self.inp_x + self.posleft + ws + e.pageX - x
                    self.inp_w = ws + e.pageX - x
                    self.inp_h = hs + e.pageY - y
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
                  part = function (e) {
                    let yy = self.inp_y + self.postop + hs + e.pageY - y + warp
                    let xx = xs - x + e.pageX + self.posleft
                    self.inp_x = xs - x + e.pageX
                    self.inp_h = hs + e.pageY - y
                    self.inp_w = ws + x - e.pageX
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
                part(e)
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
          bindDblclickEvent: function (self) { // 模块双击操作，单机设置按钮事件 todo:
            let editBox = $('.editBox')
            editBox.on('dblclick', '.on_module', function (e) {
              let onthis = self.moduleElement
              let type = onthis.attr('class').split(' ')[0]
              self.tool.switchModuleEvent(type, onthis, self)
            })
            editBox.on('click', '.promptBox', function (e) {
              let onthis = $(this).parent()
              self.moduleElement = $(this).parent()
              let type = onthis.attr('class').split(' ')[0]
              self.tool.switchModuleEvent(type, onthis, self)
            })
          },
          switchModuleEvent: function (type, onthis, self) {
            let w
            let getParam
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
              case 'picture':
                self.dialogPicture = true
                break
              case 'button':
                self.dialogButton = true
                self.inputBtnText = self.moduleElement.find('a').text()
                self.inputBtnHref = self.moduleElement.find('a').attr('href')
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
              case 'navigation':
                self.dialogNavigation = true
                getParam = {
                  url: '/aroomv3/roominfo/navigator.html',
                  params: {},
                  fun: function (response) {
                    let data = response.body.data
                    let navigatorlist = data.navigatorlist
                    self.navData = navigatorlist
                    for (let i = 0, len = self.navData.length; i < len; i++) {
                      let item = self.navData[i]
                      if (item.available === '1') {
                        item.available = true
                      } else {
                        item.available = false
                      }
                    }
                  }
                }
                self.httpget(getParam)
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
              case 'audition':
                self.dialogAudition = true
                getParam = {
                  url: '/aroomv3/schsource.html',
                  params: {},
                  fun: function (response) {
                    let data = response.body.data
                    self.sourceData = data
                    let param = {
                      url: '/aroomv3/course/coursesort.html',
                      params: {
                        showbysort: 0
                      },
                      fun: function (response) {
                        let classData = response.body.data
                        self.pClassData = classData
                        self.courselist({pagesize: 30, page: 1, issimple: 1})
                      }
                    }
                    self.httpget(param)
                  }
                }
                self.httpget(getParam)
                break
              case 'WeChat':
                break
              case 'addcoursetype':
                self.dialogAddcoursetype = true
                break
              case 'news':
              	self.getNewsCategorys()
                self.dialognews = true
                break
              case 'login':
                self.dialoglogin = true
                break
              case 'thirdlogin':
                self.dialogthirdlogin = true
                break
              case 'theteacherteam':
              	self.teainput = ''
              	self.getealist()
                self.dialogaddtea = true 
                break  
              default:
                console.log('module')
                break
            }
          }
        }
      }
    },
    created: function () {
      var self = this
      self.ueditorid = guidGenerator()
      self.$nextTick(function () {
        let canvas = $('.canvas')
        let space = $('.space')
        canvas.css({'left': self.posleft + 'px', 'top': self.postop + 'px'})
        self.inp_width = parseInt(canvas.css('width'))
        self.inp_height = parseInt(canvas.css('height'))
        self.tool.bindLibraryMenu(self)
        self.tool.bindLayerElement(self)
        self.tool.bindMouseEvent(self)
        self.tool.bindClickEvent(self)
        self.tool.bindDblclickEvent(self)
        self.tool.bindRightClickEvent(self)
        self.tool.scrollHeight()
        self.moduleEvent()
        space.scrollLeft(900)
        if (!window.saveParams) return false
        let params = window.saveParams
        let pp = params.page
        self.prospectColorVal = pp.pg
        self.bgColorVal = pp.bg
        self.inp_width = pp.width
        self.inp_height = pp.height
        space.css('backgroundColor', self.bgColorVal)
        canvas.css('backgroundColor', self.prospectColorVal)
        canvas.css('width', self.inp_width)
        canvas.css('height', self.inp_height)
        let head = $('.c_top')
        let middle = $('.c_body')
        let foot = $('.c_foot')
        head.css('height', pp.top)
        foot.css('height', pp.foot)
        canvas.css({'paddingTop': pp.top, 'paddingBottom': pp.foot})
        let module = params.module
        head.html(module.top)
        middle.html(module.body)
        foot.html(module.foot)
        self.tool.getLayerElement(self, head)
        self.tool.getLayerElement(self, middle)
        self.tool.getLayerElement(self, foot)
        self.tool.scrollHeight()
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
          self.tool.getLayerElement(self, self.original)
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
          let sLeft = parseInt($('.space').scrollLeft())
          let contextmenu = $('.contextmenu')
          let y = parseInt(contextmenu.css('top'))
          let x = parseInt(contextmenu.css('left'))
          switch (self.original.attr('class')) {
            case 'c_top':
              y = y - (self.paddingtop + self.postop) + sTop
              x = x - (self.paddingleft + self.posleft) + sLeft
              break
            case 'c_body':
              y = y - (self.paddingtop + self.postop) + sTop - parseInt($('.c_top').css('height'))
              x = x - (self.paddingleft + self.posleft) + sLeft
              break
            case 'c_foot':
              y = y - (self.paddingtop + self.postop) + sTop - parseInt($('.c_top').css('height')) - parseInt($('.c_body').css('height'))
              x = x - (self.paddingleft + self.posleft) + sLeft
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
          self.tool.getLayerElement(self, self.original)
        }
        $('.contextmenu').hide()
      },
      deleteEvent: function () { // 删除
        if ($('.on_module').length > 0) {
          let self = this
          self.original = self.moduleElement.parent()
          self.moduleElement.remove()
          $('.contextmenu').hide()
          self.tool.getLayerElement(self, self.original)
        }
      },
      previewEvent: function () { // 预览
        let self = this
        self.tool.missSeletedEvents(self)
        self.$router.push('preview')
        let params = {}
        let topArray = $('.c_top').html()
        let bodyArray = $('.c_body').html()
        let footArray = $('.c_foot').html()
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
        self.tool.scrollHeight()
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
      },
      handlePictureSuccess: function (res) { // 图片基础组件图片上传成功
        let self = this
        let code = res.code
        if (code === 0) {
          self.pictureUrl = res.data.showurl
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
      dialogPictureEvent: function () { // 保存图片
        let self = this
        self.dialogPicture = false
        self.moduleElement.find('img').attr('src', self.pictureUrl)
      },
    //   ---------------- todo: -----------------------
      dialogButtonEvent: function () { // 按钮设置
        let self = this
        self.dialogButton = false
        self.moduleElement.find('a').text(self.inputBtnText)
        self.moduleElement.find('a').attr('href', self.inputBtnHref)
      },
      dialogNavigationEvent: function () { // 导航条设置
        let self = this
        let search = self.moduleElement.find('.search_box')
        let login = self.moduleElement.find('.log')
        let register = self.moduleElement.find('.reg')
        if (self.searchBtn) {
          search.show()
        } else {
          search.hide()
        }
        if (self.loginBtn) {
          login.show()
        } else {
          login.hide()
        }
        if (self.registerBtn) {
          register.show()
        } else {
          register.hide()
        }
        self.dialogNavigation = false
        for (let i = 0, len = self.navData.length; i < len; i++) {
          let item = self.navData[i]
          if (item.available) {
            item.available = '1'
          } else {
            item.available = '0'
          }
        }
        let getParam = {
          url: '/aroomv3/roominfo/savenavigator.html',
          params: {navigatorlist: self.navData},
          fun: function (response) {
            let code = response.body.code
            let msg = response.body.msg
            if (code === 0) {
              self.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              let navHtml = ''
              for (let i = 0, len = self.navData.length; i < len; i++) {
                let item = self.navData[i]
                if (item.available === '1') {
                  switch (item.navtype) {
                    case '0':
                      navHtml += '<a >' + item.nickname + '</a>'
                      break
                    case '1':
                      navHtml += '<a ><div class="setInfo" dataIndex=' + i + '>设置</div>' + item.nickname + '</a>'
                      break
                    case '2':
                      navHtml += '<a target="' + item.target + '" href="' + item.url + '">' + item.nickname + '</a>'
                      break
                  }
                }
              }
              self.moduleElement.find('.navaBox').html(navHtml)
            } else {
              self.$notify.info({
                title: '消息',
                message: msg
              })
            }
          }
        }
        self.httppost(getParam)
      },
      handleEidtNavnameEvent: function (index, value) { // 编辑导航名称
        let self = this
        self.editNavName = true
        self.navIndex = index
        self.inp_editNav = value.nickname
      },
      handleEidtNavnameConfirmEvent: function () { // 确定修改导航名称
        let self = this
        self.editNavName = false
        self.navData[self.navIndex].nickname = self.inp_editNav
      },
      handleShiftUpNavEvent: function (index, value) { // 上移
        let self = this
        let item = self.navData.splice(index, 1)
        self.navData.splice(index - 1, 0, item[0])
      },
      handleShiftDownNavEvent: function (index, value) { // 下移
        let self = this
        let item = self.navData.splice(index, 1)
        self.navData.splice(index + 1, 0, item[0])
      },
      handleDeleteNavEvent: function (index, value) { // 删除
        let self = this
        self.navData.splice(index, 1)
      },
      handleAddNavConfirmEvent: function (index, value) { // 添加导航确定按钮
        let self = this
        let obj = {
          available: false,
          code: '',
          name: self.inp_addNav,
          navtype: self.navType,
          nickname: self.inp_addNav,
          subnav: [],
          target: '',
          url: ''
        }
        let len = self.navData.length
        let code = ''
        for (let i = 0; i < len; i++) {
          code = 'n' + (i + 1)
          let bloo = true
          for (let i = 0; i < len; i++) {
            let codes = self.navData[i].code
            if (code === codes) {
              bloo = false
            }
          }
          if (bloo) {
            break
          }
        }
        if (self.navType === '2') {
          obj.target = self.openType === '1' ? '_blank' : '_self'
          obj.url = self.inp_addNavUrl
        }
        obj.code = code
        self.navData.push(obj)
        self.addNavName = false
        self.inp_addNav = ''
        self.navType = '1'
      },
      dialogSecNavigationEvent: function (index, value) { // 二级导航条设置 todo:
        let self = this
        self.dialogSecNavigation = false
        for (let i = 0, len = self.secNavData.length; i < len; i++) {
          let item = self.secNavData[i]
          if (item.subavailable) {
            item.subavailable = '1'
          } else {
            item.subavailable = '0'
          }
        }
        self.navData[self.navIndex].subnav = self.secNavData
        let getParam = {
          url: '/aroomv3/roominfo/savenavigator.html',
          params: {navigatorlist: self.navData},
          fun: function (response) {
            let code = response.body.code
            let msg = response.body.msg
            if (code === 0) {
              self.$notify({
                title: '成功',
                message: '资讯导航设置成功',
                type: 'success'
              })
            } else {
              self.$notify.info({
                title: '消息',
                message: msg
              })
            }
          }
        }
        self.httppost(getParam)
      },
      handleEidtSecNavnameEvent: function (index, value) { // 编辑二级导航名称
        let self = this
        self.editSecNavName = true
        self.secNavIndex = index
        self.inp_editSecNav = value.subnickname
      },
      handleEidtSecNavnameConfirmEvent: function (index, value) { // 确定修改二级导航名称
        let self = this
        self.editSecNavName = false
        self.secNavData[self.secNavIndex].subnickname = self.inp_editSecNav
      },
      handleShiftUpSecNavEvent: function (index, value) { // 二级导航上移
        let self = this
        let item = self.secNavData.splice(index, 1)
        self.secNavData.splice(index - 1, 0, item[0])
      },
      handleShiftDownSecNavEvent: function (index, value) { // 二级导航下移
        let self = this
        let item = self.secNavData.splice(index, 1)
        self.secNavData.splice(index + 1, 0, item[0])
      },
      handleDeleteSecNavEvent: function (index, value) { // 二级导航删除
        let self = this
        self.secNavData.splice(index, 1)
      },
      handleAddSecNavConfirmEvent: function (index, value) {  // 二级导航添加
        let self = this
        let obj = {
          subavailable: false,
          subcode: '',
          subnickname: self.inp_addSecNav
        }
        let len = self.secNavData.length
        let code = ''
        for (let i = 0; i < len; i++) {
          code = self.navData[self.navIndex].code + 's' + (i + 1)
          let bloo = true
          for (let i = 0; i < len; i++) {
            let codes = self.secNavData[i].subcode
            if (code === codes) {
              bloo = false
              if (i === len - 1) {
                code = self.navData[self.navIndex].code + 's' + (i + 2)
              }
            }
          }
          if (bloo) {
            break
          }
        }
        obj.subcode = code
        self.secNavData.push(obj)
        self.addSecNavName = false
      },
    // ------------- 免费试听 ---------------------
      radioCourseSourceChangeEvent: function (value) { // 课程来源
        let self = this
        if (value !== 'self') {
          let param = {
            url: '/aroomv3/schsource/itemlist.html',
            params: {
              q: '',
              sourceid: value,
              pid: '',
              sid: ''
            },
            fun: function (response) {
              let data = response.body.data
              self.pClassData = data.splist
              self.courseListData = data.itemlist
              self.courseListTotal = data.itemlist.length
            }
          }
          self.httpget(param)
        } else {
          let getParam = {
            url: '/aroomv3/schsource.html',
            params: {},
            fun: function (response) {
              let data = response.body.data
              self.sourceData = data
              let param = {
                url: '/aroomv3/course/coursesort.html',
                params: {
                  showbysort: 0
                },
                fun: function (response) {
                  let classData = response.body.data
                  self.pClassData = classData
                  self.courselist({pagesize: 30, page: 1, issimple: 1})
                }
              }
              self.httpget(param)
            }
          }
          self.httpget(getParam)
        }
      },
      radioMainClassChangeEvent: function (value) { // 选择主类按钮
        let self = this
        let param
        for (let i = 0, len = self.pClassData.length; i < len; i++) {
          let item = self.pClassData[i]
          if (item.pid === value) {
            if (item.sorts) {
              self.sClassData = item.sorts
            } else {
              self.sClassData = []
            }
            break
          }
        }
        if (self.radioSource === 'self') {
          param = {
            pagesize: 30,
            page: 1,
            issimple: 1,
            pid: value
          }
          self.courselist(param)
        } else {
          param = {
            url: '/aroomv3/schsource/itemlist.html',
            params: {
              q: '',
              sourceid: self.radioSource,
              pid: value,
              sid: ''
            },
            fun: function (response) {
              let data = response.body.data
              // self.pClassData = data.splist
              self.courseListData = data.itemlist
              self.courseListTotal = data.itemlist.length
            }
          }
          self.httpget(param)
        }
        self.inp_courseName = ''
      },
      radioNextClassChangeEvent: function (value) { // 选择次类按钮
        let self = this
        let param
        if (self.radioSource === 'self') {
          param = {
            pagesize: 30,
            page: 1,
            issimple: 1,
            pid: self.radioMainClass,
            sid: value
          }
          self.courselist(param)
        } else {
          param = {
            url: '/aroomv3/schsource/itemlist.html',
            params: {
              q: '',
              sourceid: self.radioSource,
              pid: self.radioMainClass,
              sid: value
            },
            fun: function (response) {
              let data = response.body.data
              // self.pClassData = data.splist
              self.courseListData = data.itemlist
              self.courseListTotal = data.itemlist.length
            }
          }
          self.httpget(param)
        }
        self.inp_courseName = ''
      },
      courseListCurrPageEvent: function (value) { // 课程列表分页
        let self = this
        let param = {
          q: self.inp_courseName,
          pagesize: 30,
          page: value,
          issimple: 1,
          pid: self.radioMainClass,
          sid: self.radioNextClass
        }
        self.courselist(param)
      },
      searchCourseEvent: function (value) { // 搜索课程
        let self = this
        let param = {
          q: value,
          pagesize: 30,
          page: 1,
          issimple: 1,
          pid: self.radioMainClass,
          sid: self.radioNextClass
        }
        self.courseListPage = 1
        self.courselist(param)
      },
      viewCoursewareEvent: function (value) { // 查看课件
        let self = this
        let param = {
          folderid: value,
          page: 1,
          pagesize: 30
        }
        self.folderid = value
        self.radioCourseware = ''
        self.cwlist(param)
      },
      CoursewareListCurrPageEvent: function (value) { // 课件列表分页
        let self = this
        let param = {
          folderid: self.folderid,
          s: self.inp_CoursewareName,
          pagesize: 30,
          page: value
        }
        self.radioCourseware = ''
        self.cwlist(param)
      },
      searchCoursewareEvent: function (value) { // 课件列表搜索
        let self = this
        let param = {
          folderid: self.folderid,
          s: self.inp_CoursewareName,
          pagesize: 30,
          page: 1
        }
        self.cwListPage = 1
        self.radioCourseware = ''
        self.cwlist(param)
      },
      radioCoursewareChangeEvent: function () {},
      handleSettingAuditionEvent: function () {
        let self = this
        let cwData
        if (!self.radioCourseware) {
          self.$notify({
            title: '警告',
            message: '你还未选择要添加的课件',
            type: 'warning'
          })
        } else {
          for (let i = 0, len = self.cwlistData.length; i < len; i++) {
            let item = self.cwlistData[i].cwlist
            for (let j = 0, jen = item.length; j < jen; j++) {
              let jtem = item[j]
              if (jtem.cwid === self.radioCourseware) {
                cwData = jtem
                break
              }
            }
          }
          let module = $('.on_module')
          module.find('img').attr('src', cwData.logo)
          module.find('.audiTit').text(cwData.title)
          module.find('a').attr('dataHref', '/course/' + cwData.cwid + '.html')
          self.dialogAudition = false
        }
      },
      // ------------- 课程分类设置 ---------------------
      handlecourseClick: function () {
        let self = this
        let courseactiveName = self.courseactiveName
        if (courseactiveName === 'second') {
          let Paletters = $('.togglePaletteOnly .Paletter')
          Paletters.on('click', function () {
            $('.togglePaletteOnly .Paletter .active-icon').removeClass('active-icon')
            $(this).find('.Paletter-icon').addClass('active-icon')
            self.courseHeightL.classs = $('.togglePaletteOnly .Paletter .active-icon').attr('color')
          })
          $('.Palettebuttonlist .csslist').on('click', function () {
            $('.togglePaletteOnly .Paletter .active-icon').removeClass('active-icon')
            $('.togglePaletteOnly .Paletter4').find('.Paletter-icon').addClass('active-icon')
            self.courseHeightL.classs = 'theme_4'
          })
        }
      },
      dialogAddcoursetypeEvent: function () { // 分类设置配置数据
        let self = this
        let heightoneisdefault = self.courseHeightL.heightone
        let heighttwoisdefault = self.courseHeightL.heighttwo
        let lengthisdefault = self.courseHeightL.length
        if(lengthisdefault == '默认'){
        	var  lengthnum = 2
        }else{
        	var  lengthnum = self.courseHeightL.lengthnum
        }
        
        if(heightoneisdefault == '默认'){
        	var  heightonenum = 50
        }else{
        	var  heightonenum = self.courseHeightL.heightonenum
        }
        
        if(heighttwoisdefault == '默认'){
        	var   heighttwonum = 65
        }else{
        	var   heighttwonum = self.courseHeightL.heighttwonum
        }
        let obj = {
          classs: self.courseHeightL.classs,
          lengthnum: lengthnum
        }
        $('.courseclassification .first_li').css('height', heightonenum + 'px')
        $('.courseclassification .first_li').css('line-height', heightonenum + 'px')
        $('.courseclassification .second_mune_ul').css('top', heightonenum + 'px')
        $('.courseclassification .second_mune_ul li').css('height', heighttwonum + 'px')
        $('.addcoursetype #coursenav_ul').attr('class', self.courseHeightL.classs)
        let str = JSON.stringify(obj)
        self.dialogAddcoursetype = false
        $('.on_module').attr('carouselData', str)
      },
      
      
      //-------------新闻资讯设置------------
      handlenewsClick : function(){
      	let self = this
        let activenews = self.activenews
        if (activenews === 'first') {
          $('.Palettebuttonlist #newsdefault').on('click', function () {
          	self.newsDetailed.newsvalue = 'news'
          	self.newsDetailed.ontitle = 1
          	self.newsDetailed.onimg = 1
          	self.newsDetailed.oncont = 1
          	self.newsDetailed.ontime = 1
          	self.newsDetailed.onrow = 2
          	self.newsDetailed.oncol = 3
          	self.newsDetailed.col = 3
          })
        }
      },
      dialognewsEvent : function(){
      	let self = this
      	let newsDetailed = self.newsDetailed
      	if(newsDetailed.oncol == '自定义'){
      		var  col = newsDetailed.col
      	}else{
      		var  col = newsDetailed.oncol
      	}
      	let pagesize =  col * newsDetailed.onrow
      	self.getnews(pagesize)
      	let newli = '<div class="news_li"><div class="news_li_left"><img src=""></div><div class="news_li_right"><h3><span class="news_title"></span><span class="times"></span></h3><p class="news_cont"></p></div></div>'
      	let obj = {
          newssource: newsDetailed.newsvalue,
          ontitle: newsDetailed.ontitle,
          onimg : newsDetailed.onimg,
          oncont : newsDetailed.oncont,
          ontime : newsDetailed.ontime,
          onrow : newsDetailed.onrow,
          col : col
        }
      	if(!newsDetailed.ontitle){
      		$('.news .mod-title').hide();
      		$('.news .newsList').css('padding-top', '0px')
      	}else{
      		$('.news .mod-title').show();
      		$('.news .newsList').css('padding-top', '50px')
      	}
      	if(!newsDetailed.onimg){
      		$('.news .news_li .news_li_left').hide();
      	}else{
      		$('.news .news_li .news_li_left').show();
      	}
      	if(!newsDetailed.oncont){
      		$('.news .news_li .news_cont').hide();
      	}else{
      		$('.news .news_li .news_cont').show();
      	}
      	if(!newsDetailed.ontime){
      		$('.news .news_li .times').hide();
      	}else{
      		$('.news .news_li .times').show();
      	}
      	if(newsDetailed.onrow == 2){
      		$('.news .news_li').css('float', 'left')
      		$('.news .news_li').css('width', '50%')
      	}else{
      		$('.news .news_li').css('float', 'none')
      		$('.news .news_li').css('width', '100%')
      	}
      	let str = JSON.stringify(obj)
        self.dialognews = false
        $('.on_module').attr('carouselData', str)
      },
      //---------------登录框设置-------------
      
      handleloginClick : function(){
      	let self = this
      	let activelogin = self.activelogin
      	if(activelogin == 'second'){
      		let logincsslist = $('.Palettebuttonlist .logincsslist')
      		logincsslist.on('click',function(){
      			let type = $(this).attr('type')
      			if(type == 'one'){
      				self.loginDetailed.logintype = 'logintype1'
      			}else if(type == 'default'){
      				self.loginDetailed.logintype = ''
      			}
      		})
      	}
      },
      dialogloginEvent : function(){
      	let self = this
      	let loginDetailed = self.loginDetailed
      	let typeone = '<input type="hidden" name="loginsubmit" value="1"><div class="chorejrxtxtarea"><span class="chorejrx">账号  </span><input name="username" id="username" class="txtarea" placeholder="请输入用户名/手机号/邮箱"></div><div class="chorejrxtxtpass"><span class="chorejrx">密码  </span><input name="password" id="password" type="password" maxlength="20" class="txtpass" placeholder="请输入密码"><a href="#" id="passwordeye" class="invisible bgImg"></a></div><input class="signbtn" value="" name="Submit" type="submit">'
      	let typedefault = '<input type="hidden" name="loginsubmit" value="1"><div class="chorejrxtxtarea"><span class="chorejrx"></span><input name="username" id="username" class="txtarea" placeholder="请输入用户名/手机号/邮箱"></div><div class="chorejrxtxtpass"><input name="password" id="password" type="password" maxlength="20" class="txtpass" placeholder="请输入密码"><a href="#" id="passwordeye" class="invisible bgImg"></a></div><input class="signbtn" value="立即登录" name="Submit" type="submit">'
      	if(loginDetailed.logintype == 'logintype1'){
      		$('.login .denser').empty().append(typeone)
      		$('.login .denser').attr('id',loginDetailed.logintype)
      	}else if(loginDetailed.logintype == ''){
      		$('.login .denser').empty().append(typedefault)
      		$('.login .denser').attr('id',loginDetailed.logintype)
      	}
      	if(loginDetailed.ontext){
      		$('#username').attr('placeholder','请输入用户名/手机号/邮箱')
      		$('#password').attr('placeholder','请输入密码')      		
      	}else{
      		$('#username,#password').attr('placeholder','')
      	}
      	if(loginDetailed.onpassword){
      		$('#passwordeye').show()
      	}else{
      		$('#passwordeye').hide()
      	}
      	let obj = {
        }
      	let str = JSON.stringify(obj)
        self.dialoglogin = false
        $('.on_module').attr('carouselData', str)
      },
      //-----------第三方登录设置---------
      handlethirdloginClick :function(){
      	
      },
      dialogthirdloginEvent :function(){
      	let self = this
      	let third = self.thirdloginDetailed.third
      	if(!third.length){
      		$('.md-qq,.md-sina,.md-weixin').hide();
      	}else{
      		$('.md-qq,.md-sina,.md-weixin').hide();
      		for(var i=0;i<third.length;i++){
      			if(third[i] == '1'){
      				$('.md-qq').show();
      			}else if(third[i] == '2'){
      				$('.md-sina').show();
      			}else if(third[i] == '3'){
      				$('.md-weixin').show();
      			}
      		}
      	}
      	let obj = {
        }
      	let str = JSON.stringify(obj)
        self.dialogthirdlogin = false
        $('.on_module').attr('carouselData', str)
      }, 
      //--------------名师团队-----------
      searchtealist : function(){
      	let self = this
      	self.getealist()
      },
      dialogaddteaEvent : function(){
      	let self = this 
      	let unlocka = $('.teater_all .onlock')
      	let realname = unlocka.attr('urealname')
      	let tid = unlocka.attr('tid')
      	let username = unlocka.attr('uname')
      	let face = unlocka.attr('uface')
      	let profile = unlocka.attr('uprofile')
      	let professionaltitle = unlocka.attr('uprofessionaltitle') || '暂无职称'
      	let team_bk =  '<div class="team_bk" tid="'+tid+'"><a class="team_mask" href="/master/'+tid+'.html" target="_blank">'+profile+'</a><a href="/master/12166.html" target="_blank"><div class="team_hbj"><img src="'+face+'"><h3 class="team_h3">'+realname+'</h3><p class="team_p1">'+professionaltitle+'</p></div><p class="team_p2">'+profile+'</p></a></div>'
      	$('.on_module .addtheteateam .team_bk').remove()
      	$('.on_module .addtheteateam').append(team_bk)
      	$('.on_module .addtea-icon').hide()
      	self.dialogaddtea = false
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
  .nodata{
    background:url(assets/img/nodata.png) no-repeat 50%;
    min-width: 300px;
    width: 100%;
    height: 400px;
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
  .library .shrink{
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
  .library .shrink i {
    transition: all 400ms;
    -moz-transition: all 400ms; 
    -webkit-transition: all 400ms; 
    -o-transition: all 400ms;
  }
  .library .shrinkout {
    text-indent: 4px;
  }
  .library .shrinkout i{
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
/*layer*/
  .layer{
    position:absolute;
    top:0;
    right:0;
    padding-top:62px;
    width: 181px;
    height:100%;
    border-left: 1px solid #d9d9d9;
    background-color: #fff;
    box-sizing: border-box;
    z-index: 2;
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
    padding: 62px 0px 0 181px;
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
    width: 3600px;
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
    background-color: #fff;
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
    background-color: rgba(21,204,236,0.6);
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
  #app .module:hover{
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.2);   
  }
  .editBox .on_module{
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
/*picture*/  
  .picture-uploader .el-upload{
    display: block;
    margin:0 auto; 
    border: 1px dashed #d9d9d9;
  }
  .pictureMod {    
    max-width: 100%;
  }
/*button*/
  .dialogbutton .el-row{
    margin-top: 10px;
  }
  .dialogbutton .el-col-3{
    margin-right: 20px;
    height: 36px;
    text-align: right;
    line-height: 36px;
  }
/*Navigation*/
  .el-dialog__body{
    padding: 10px 20px;
  }
  .el-dialog--nav{
    width: 600px;
  }
  .el-dialog--edit{
    width: 400px;
  }
  .navBox{   
    width:100%;
    height: 300px;
  }
  .navBox .el-row{
    margin-bottom: 15px;
  }
  .navBox .el-col{
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .addNavName .el-row{
    margin-bottom: 15px;
  }
  .addNavName .el-col{
    font-size: 14px;
    line-height: 36px;
  }
  .navaBox a{
    position:relative;
  }
  .navaBox .setInfo{
    display: none;
    position:absolute;
    top:0;
    right:0;
    font-size: 12px;
    background-color: #199ED8;
    height: 20px;
    line-height: 20px;
    padding:0 5px;
    color: #fff;    
  }
  .navaBox a:hover .setInfo{
    display: block;
  }
/*免费试听*/
  .el-dialog--audition{
    width: 1000px;
  }
  .auditiondia .el-col{
    max-height:100px;
    overflow-y:auto;
  }
  .auditiondia .el-radio-button .el-radio-button__inner{
    border:0;
    border-radius: 2px;
  }
  .auditiondia .el-radio-button:first-child .el-radio-button__inner{
    border:0;
  }
  .auditiondia .el-row{
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 1px solid #d1dbe5;
  }
  .auditiondia .conCourse .el-col{
    height: 480px;
    max-height:480px;
    border-right: 1px solid #d1dbe5;
  }
  .auditiondia .courseList{
    float: left;
    width: 100%;
    overflow-y:auto;
    height: 443px;
    margin-top: 5px; 
  }
  .auditiondia .courseLi{
    float: left;
    width: 150px;
    height: 120px;
    overflow: hidden;
    padding: 0 4px; 
    cursor: pointer;
  }
  .auditiondia .imgbox {
    width: 150px;
    height: 90px;
  }
  .imgbox img{
    width: 100%;
    height: 100%;
  }
  .auditiondia .courseLi span{
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
  .conCourse  .el-input {    
    float: right;
    width: 180px;
    margin-right: 5px;
  } 
  .conCourse .el-input__inner{
    margin: 2px 2px 0 0;
    height: 28px;
    line-height: 28px;
  }
  .conCourse .el-pagination{
    float: left;
  }
  .conCourse .cwlist{
    float: left;
    width: 100%;
    overflow-y:auto;
    height: 443px;
    margin-top: 5px; 
  }
  .conCourse .cwLi{
    margin-left: 20px;

  }
  .courseware .chapter{
    height: 36px;
    font-size: 16px;
    font-weight: 600;
    line-height: 36px;
  }
  .courseware .el-radio-button{
    display: block;
  }
/*设置*/
  .promptBox{
    display: none;
    position: absolute;
    top: -20px;
    left: 0;
    height: 20px;
    line-height: 20px;
    padding:0 10px;
    background-color: #199ED8;
    color: #fff;
    cursor: pointer;   
  }
  .on_module .promptBox{
    display: block;
  }
/*课程分类设置*/
	.el-dialog--dialogAddcoursetype{
    width: 680px;
  }
  .togglePaletteOnly .Paletter{
  	width: 16px;
  	height: 16px;
  	float: left;
  	background: #000;
  	margin-right: 8px;
    margin-top: 10px;
    cursor: pointer;
  }
  .togglePaletteOnly .Paletter1{
  	background: #9b28ae;
  }
  .togglePaletteOnly .Paletter2{
  	background: #663db5;
  }
  .togglePaletteOnly .Paletter3{
  	background: #4052b4;
  }
  .togglePaletteOnly .Paletter4{
  	background: #1f96f2;
  }
  .togglePaletteOnly .Paletter5{
  	background: #ff753f;
  }
  .togglePaletteOnly .Paletter6{
  	background: #00bcd2;
  }
  .togglePaletteOnly .Paletter7{
  	background: #fea000;
  }
  .togglePaletteOnly .Paletter8{
  	background: #f2c300;
  }
  .togglePaletteOnly .Paletter9{
  	background: #b7c500;
  }
  .togglePaletteOnly .Paletter10{
  	background: #89c34a;
  }
  .togglePaletteOnly .Paletter11{
  	background: #4daf51;
  }
  .togglePaletteOnly .Paletter12{
  	background: #009687;
  }
  .togglePaletteOnly .Paletter13{
  	background: #f47d00;
  }
  .togglePaletteOnly .Paletter14{
  	background: #f34637;
  }
  .togglePaletteOnly .Paletter15{
  	background: #e71e62;
  }
  .togglePaletteOnly .Paletter16{
  	background: #c11759;
  }
  .togglePaletteOnly .Paletter .Paletter-icon{
  	width: 16px;
  	height: 16px;
  }
  .togglePaletteOnly .Paletter .active-icon{
  	background: url(assets/icon/xuanzhong.png) no-repeat;
  	background-size: 16px;
  }
  .Palettebuttonlist .csslist{
  	width: 178px;
  	height: 134px;
  	border: 1px solid #cccccc;
  	position: relative;
  	cursor: pointer;
  	float: left;
  	margin: 10px;
  }
  .Palettebuttonlist .csslist .hovershow{
   	height: 28px;
   	display: none;
   	position: absolute;
   	bottom: 0;
   	width: 100%;
   	background: #666666;
   	color: #fff;
   	text-align: center;
   	line-height: 28px;
  }
  .Palettebuttonlist .csslist:hover  .hovershow{
  	display: block;
  }
  .Palettebuttonlist .csslist .csslist-div{
  	width: 134px;
    height: 80px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #cccccc;
    position: absolute;
    top: 27px;
    left: 22px;
    line-height: 80px;
    
  }
  .Palettebuttonlist .csslist .logintype1{
  	border: none;
  	background: url(assets/icon/logintype1.png)center center no-repeat;
  }
  .Palettebuttonlist .csslist .csslist-div .csslist-div-top{
  	width: 100%;
  	height: 20px;
  	background: #338bff;
  }
  
 	/*新闻资讯设置*/
 	.el-dialog--dialognews{
 		width: 680px;
 		
 	}
 	.el-dialog--dialognews .el-dialog__body{
 		height: 464px;
 	}
 	/*登录框设置*/
 	.el-dialog--dialoglogin{
 		width: 680px;
 	}
 	.el-dialog--dialoglogin  .el-dialog__body{
 		height: 464px;
 	}
 	/*第三方登录设置*/
 	.el-dialog--dialogthirdlogin{
 		width: 680px;
 	}
 	.el-dialog--dialogthirdlogin  .el-dialog__body{
 		height: 464px;
 	}
 	/*名师团队 教师列表*/
 	.el-dialog--dialogaddtea{
 		width: 680px;
 	}
 	.el-dialog--dialogaddtea  .el-dialog__body{
 		height: 464px;
 	}
 	.el-dialog--dialogaddtea .el-radio-group .el-radio{
    width: 30%;
    margin: 0 8px 0 5px;
    height: 23px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
 	}
 	.el-dialog--dialogaddtea .teater_all {
    float: left;
    height: 464px;
    width: 640px;
    overflow-y: auto;
	}

	.el-dialog--dialogaddtea .teater_all a:visited {
    color: #3D3D3D;
    text-decoration: none;
	}
	.el-dialog--dialogaddtea .teater_all a:hover{
		text-decoration: none;
	}
	.el-dialog--dialogaddtea .teater_all .lisnres {
    border: solid 1px #eee;
    height: 28px;
    line-height: 28px;
    color: #999;
    font-size: 14px;
    display: block;
    float: left;
    padding: 0 8px;
    margin: 10px 0 2px 10px;
    position: relative;
    border-radius: 3px;
	}
	.el-dialog--dialogaddtea .teater_all .onlock .selectico {
    background: url(http://static.ebanhui.com/ebh/tpl/newschoolindex/images/selectico.png) no-repeat;
    height: 13px;
    width: 13px;
    position: absolute;
    top: -5px;
    right: -5px;
	}
	.el-dialog--dialogaddtea .teater_all .onlock {
    border: solid 1px #f4c96c;
    background: #fff7e5;
    color: #ffae00;
	}
	.el-dialog--dialogaddtea .teater_all .unonlock{
		color: #f3f3f3;
    cursor: inherit;
	}
</style>
