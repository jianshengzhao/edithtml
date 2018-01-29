<template>
  <div class="hrefdialog">
    <el-dialog
      title="设置链接"
      :visible.sync="visdialog"
      :close-on-click-modal="false"
      class="el-dialog--hrefs">
      <el-row>
        <div id="tabs-vertical" class="tabs-vertical" >
          <ul class="tabsul">
            <li v-if="!parameter||parameter.linktype =='online'||parameter.thatName == 'advert'||parameter.thatName == 'carousel' || parameter.thatName == 'pulldown'">
              <a class="tab-active" type="online" data-index="0" >链接</a>
            </li>
            <li v-if="!parameter||parameter.linktype =='news'||parameter.thatName == 'advert'||parameter.thatName == 'carousel' || parameter.thatName == 'pulldown'">
              <a data-index="1"  type="news" >资讯</a>
            </li>
            <li v-if="!parameter||parameter.linktype =='course'||parameter.thatName == 'advert'||parameter.thatName == 'carousel' || parameter.thatName == 'pulldown'">
              <a data-index="2"  type="course">课程</a>
            </li>
            <li v-if="!parameter||parameter.linktype =='teacher'||parameter.thatName == 'advert'||parameter.thatName == 'carousel' || parameter.thatName == 'pulldown'">
              <a data-index="3"  type="teacher">教师</a>
            </li>
            <li v-if="!parameter||parameter.linktype =='onlineschool'||parameter.thatName == 'advert' || parameter.thatName == 'pulldown'">
              <a data-index="4"  type="onlineschool" >网校</a>
            </li>
          </ul>
          <div class="tabs-content-placeholder">
            <div class="tab-content">
              <div class="hrefmbx mbx">
                <span class="hreonembx"><a @click="indexinit()">链接</a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
              </div>
              <div class="hrefcont">
                <el-col style="text-align: left;font-size: 14px;margin-bottom: 10px ">链接地址：
                </el-col>
                <el-col>
                  <el-input type="text" size="small" placeholder="请输入链接地址" v-model="edithref"></el-input>
                </el-col>
                <el-col style="text-align: left;font-size: 14px;margin-top: 20px ">
                  显示方式：
                  <el-radio class="radio" v-model="showtype" label="1">新窗口</el-radio>
                  <!-- <el-radio class="radio" v-model="showtype" label="2">弹出层</el-radio> -->
                </el-col>
              </div>
            </div>
            <div class="tab-content-active tab-content">
              <div class="newsmbx mbx">
                <span class="newsonembx"><a @click="indexinit()">资讯</a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="newstwombx" style="display: none;"><a @click="newsmbxinit(2)" ></a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="newsthreembx"  style="display: none;"><a></a></span>
                <el-input suffix-icon="el-icon-search" class="newsseaq" style="width: 200px;margin-right:10px;float: right;display: none;" type="text" size="small" placeholder="请输入资讯标题" v-model="newsq" @change="handleIconClick"></el-input>
              </div>
              <div class="newscont">
                <form class="oneselnews">
                  <div class="newsradio" v-for="(item,index) in NewsOptions">
                    <input :code="item.value" :newsname="item.label" name="onenews" type="radio" value="" />
                    <a @click="parameter.thatName == 'addsearch' ? checkedincode(item.value) : getsonNews(item.value,0,item.label)" class="vc-font2"><span class="vc-inner">{{item.label}}(<span style="color: red;"> {{item.newsCount}} </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <div style="clear: both;"></div>
                  <input type="reset" class="newsradioreset" style="display: none;" value="Reset">
                </form>
                <div class="nodata" v-if="!NewsOptions.length"></div>
                <form class="twoselnews">
                  <div class="newsradio" v-for="(item,index) in sonNewsOptions">
                    <input :code="item.value" :newsname="item.label" name="twonews" type="radio" value="" />
                    <a @click="getsonNews(item.value,1,item.label)" class="vc-font2"><span class="vc-inner">{{item.label}}(<span style="color: red;"> {{item.newsCount}} </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <div style="clear: both;"></div>
                  <input type="reset" class="newsradiotworeset" style="display: none;" value="Reset">
                </form>
                <el-col class="threeselnews" >
                  <el-col style="margin-top: 10px;max-height: 393px; overflow-x: hidden;border: 1px solid #CECECE;">
                    <div class="nodata" style="display: none;"></div>
                    <el-radio-group v-model="threenewsradio">
                      <el-radio  v-for="(item,index) in newslist" :label="item.itemid" :key="item.itemid">
                        <div :title="item.subject" style="width: 660px;display: inline-block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;float: left;" >
                          {{item.subject}}
                        </div>
                        <div style="display: inline-block;" >
                          {{item.dateline | time}}
                        </div>

                      </el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col v-if="newscount > newspagesize" style="text-align: right;margin-top: 10px;">
                    <el-pagination
                      @size-change="handlenewsSizeChange"
                      @current-change="handlenewsCurrentChange"
                      :current-page="newspage"
                      :page-sizes="[15, 30, 50, 100]"
                      :page-size="newspagesize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="newscount">
                    </el-pagination>
                  </el-col>
                </el-col>
              </div>
            </div>
            <div class="tab-content">
              <div class="coursembx mbx">
                <span class="courseonembx"><a @click="indexinit()">课程</a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="coursetwombx" style="display: none;"><a  @click="coursebxinit(2)"></a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="coursethreembx"  style="display: none;"><a  @click="coursebxinit(3)"></a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="coursefourmbx" style="display: none;"><a  @click="coursebxinit(4)"></a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="coursefivembx"  style="display: none;"><a  @click="coursebxinit(5)"></a></span>
                <el-input  suffix-icon="el-icon-search" v-if="seaqshow == 1" @change="handleIconfolderClick" class="folderseaq" style="width: 200px;float: right;margin-right: 10px; " type="text" size="small" placeholder="请输入课程名称" v-model="folderq"></el-input>
                <el-input  suffix-icon="el-icon-search" v-if="seaqshow == 2" @change="handleIconcwClick"  class="cwseaq" style="width: 200px;float: right;margin-right: 10px; " type="text" size="small" placeholder="请输入课件名称" v-model="cwq"></el-input>
              </div>
              <div class="coursecont" style="max-height: 450px; overflow-x: hidden;">
                <form class="oneselcourse">
                  <div class="courseradio">
                    <input sourceid="0" sourcename="本校课程"  name="onecourse" type="radio" value="" />
                    <a @click="getsoncourse(0)" class="vc-font2"><span class="vc-inner">本校课程 (<span style="color: red;"> {{mecoursenum}} </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <div class="courseradio" v-for="(item,index) in schsourcelist">
                    <input :sourceid="item.sourcecrid" :sourcename="item.name"  name="onecourse" type="radio" value="" />
                    <a @click="getsoncourse(item.sourcecrid,item.name)" class="vc-font2"><span class="vc-inner">{{item.name}} (<span style="color: red;"> {{item.coursenum}} </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <div style="clear: both;"></div>
                  <input type="reset" class="courseradioreset" style="display: none;" value="Reset">
                </form>
                <form class="twoselcourse" style="display: none;">
                  <div class="courseradio" v-for="(item,index) in coursesort">
                    <input :pid="item.pid" :pname="item.pname" :checked="inpid == item.pid?true:false"  name="twocourse" type="radio" value="" />

                    <a @click="parameter.thatName == 'addcoursetype' ? inpid = item.pid  : getsidcourse(item.pid,item.pname)" class="vc-font2">
                      <span class="vc-inner">{{item.pname}} (<span style="color: red;"> {{item.coursenum}} </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <div style="clear: both;"></div>
                  <input type="reset" class="courseradiotworeset" style="display: none;" value="Reset">
                </form>
                <form class="threeselcourse" style="display: none;">
                  <!--  <div class="courseradio" v-if="sourceid">
                    <input sid="0"  name="threecourse" :checked="insid == '0'?true:false" sname="其他" type="radio" value="" />
                    <a  @click="getcourseall(0,'其他')" class="vc-font2"><span class="vc-inner">其他</span><span class="vc-fix">此标签不能换行</span></a>
                  </div>
                   -->
                  <div class="courseradio" v-for="(item,index) in sidlist">
                    <input :sid="item.sid" :sname="item.sname" :checked="insid == item.sid?true:false"  name="threecourse" type="radio" value="" />
                    <a  @click="getcourseall(item.sid,item.sname)" class="vc-font2"><span class="vc-inner">{{item.sname}} (<span style="color: red;"> {{item.coursenum}} </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <div class="nodata" v-if="!sidlist.length && !sourceid"></div>
                  <div style="clear: both;"></div>
                  <input type="reset" class="courseradiothreereset" style="display: none;" value="Reset">
                </form>
                <form class="fourselcourse" style="display: none;">

                  <div class="nodata" v-if="!courselist.length"></div>
                  <!-- <div class="courseradio" v-for="(item,index) in courselist">
                    <input :folderid="item.folderid"  name="fourcourse" type="radio" value="" />
                    <a @click="getcwlistall(item.folderid,item.foldername)" class="vc-font2"><span class="vc-inner">{{item.foldername}}</span><span class="vc-fix">此标签不能换行</span></a>
                  </div> -->
                  <div  class="courselist" v-for="(item,index) in courselist">
                    <input :folderid="item.folderid" :itemid="item.itemid"  :checked="infolderid == item.folderid?true:false" :foldername="item.foldername" :cover="item.cover" :img="item.img" :viewnum="item.viewnum" :studynum="item.studynum" :summary="item.summary" name="fourcourse" type="radio" value="" />
                    <a @click="parameter.thatName == 'course' ? infolderid = item.folderid  : getcwlistall(item.folderid,item.foldername,item.fprice,item.itemid,1)"  class="vc-font2">
                      <img :src="item.img" ><br/>
                      <div style="text-align: center;width: 140px;">
                        <h3 class="coursetitle" :title="item.foldername">{{item.foldername}} </h3>
                        <h3  style="display: inline-block;">(<span style="color: red;"> {{item.coursewarenum==undefined?item.coursewareCount:item.coursewarenum}} </span>)</h3>
                      </div>
                    </a>
                  </div>
                  <!--  @click="getcwlistall(item.folderid,item.foldername)" -->
                  <div style="clear: both;"></div>
                  <input type="reset" class="courseradiofourreset" style="display: none;" value="Reset">
                  <el-col v-if="foldercount > folderpagesize" style="text-align: right;margin-top: 10px;">
                    <el-pagination
                      @size-change="handlefolderSizeChange"
                      @current-change="handlefolderCurrentChange"
                      :current-page="folderpage"
                      :page-sizes="[15, 30, 50, 100]"
                      :page-size="folderpagesize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="foldercount">
                    </el-pagination>
                  </el-col>
                </form>
                <form class="fiveselcourse" style="display: none;">

                  <div class="nodata" v-if="!cwlist.length"></div>
                  <el-col v-for="(item,index) in cwlist" :key="item.sname">
                    <h3>{{item.sname}}</h3>
                    <label  class="courselist" v-for="(items,indexs) in item.cwlist" :key="items.cwid" >
                      <input :cwid="items.cwid" :cwname="items.title" :cwpay="items.cwpay"  name="fivecourse" type="radio" :thumb="items.thumb" :cwsize="items.cwsize" :logo="items.logo" :cover="items.cover" :summary="items.summary" :viewnum="items.viewnum" value="" :disabled="items.ism3u8=='1'|| items.islive=='1'? false:true"/>
                      <a class="vc-font2" :style="items.ism3u8=='1' || items.islive=='1'? '':'opacity:0.5;cursor:not-allowed;border:0!important;'">
                        <img :src="items.logo" ><br/>
                        <h3 :title="items.title">{{items.title}}</h3>
                      </a>
                    </label>
                    <!-- <div class="courseradio" v-for="(items,indexs) in item.cwlist">
                      <input :cwid="items.cwid"  name="fivecourse" type="radio" value="" />
                      <a  class="vc-font2"><span class="vc-inner">{{items.title}}</span><span class="vc-fix">此标签不能换行</span></a>
                    </div> -->
                  </el-col>

                  <div style="clear: both;"></div>
                  <el-col v-if="cwcount > cwpagesize" style="text-align: right;margin-top: 10px;">
                    <el-pagination
                      @size-change="handlecwSizeChange"
                      @current-change="handlecwCurrentChange"
                      :current-page="cwpage"
                      :page-sizes="[15, 30, 50, 100]"
                      :page-size="cwpagesize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="cwcount">
                    </el-pagination>
                  </el-col>
                </form>
              </div>
            </div>
            <div class="tab-content">
              <div class="teambx mbx">
                <span class="teaonembx"><a @click="indexinit()">教师</a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <el-input  suffix-icon="el-icon-search" @change="handleIconteaClick" style="width: 200px;float: right;margin-right: 10px; " type="text" size="small" placeholder="请输入教师姓名" v-model="hrefteaq"></el-input>
              </div>
              <div class="teacont">
                <el-col class="teaflowx" style="height: 450px;overflow-x: hidden;">
                  <form >
                    <label  class="teacherlist" v-for="(item,index) in tealist">
                      <input :code="item.uid" :face="item.face" :profile="item.profile" :realname="item.realname" :professionaltitle="item.professionaltitle" name="teacher" type="radio" value="" />
                      <a class="vc-font2">
                        <img :src="item.face" ><br/>
                        <h3 :title="item.realname">{{item.realname}}</h3>
                      </a>
                    </label>
                    <input type="reset" class="teacherradioreset" style="display: none;" value="Reset">
                  </form>
                </el-col>
              </div>
            </div>
            <div class="tab-content">
              <div class="inlineschool mbx">
                <span class="inlineschoolonembx"><a @click="indexinit()">网校</a> <span style="margin: 0 8px;color: #bfcbd9;">/</span></span>
                <span class="inlineschooltwombx" style="display: none;"><a>登录</a></span>
              </div>
              <div class="inlineschoolcont">
                <form class="oneselinlineschool">
                  <label class="inlineschoolradio">
                    <input code="summary"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">网校简介</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="course"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">选课中心</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="contact"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">联系我们</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="register"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">注册</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="password"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">获取密码</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="username"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">获取用户名</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <div class="inlineschoolradio">
                    <input code="login"  name="oneinlineschool" type="radio" value="" />
                    <a @click="getmorelogin()" class="vc-font2"><span class="vc-inner">登录(<span style="color: red;"> 4 </span>)</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </div>
                  <label class="inlineschoolradio">
                    <input code="index"  name="oneinlineschool" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">主页</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <input type="reset" class="oneselinlineschoolReset" style="display: none;" value="Reset">
                </form>
                <form class="twoselinlineschool" style="display: none;">
                  <label class="inlineschoolradio">
                    <input code="login1"  name="logintype" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">普通登录</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="QQ"  name="logintype" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">QQ登录</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="WeChat"  name="logintype" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">微信登录</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <label class="inlineschoolradio">
                    <input code="weibo"  name="logintype" type="radio" value="" />
                    <a class="vc-font2"><span class="vc-inner">微博登录</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                  </label>
                  <input type="reset" class="twoselinlineschoolReset" style="display: none;" value="Reset">
                </form>
              </div>
            </div>
          </div>
        </div>
        <el-col v-if="newschoolactive" style="text-align: left;font-size: 14px;margin-top: 20px;margin-left:20px;">
          打开方式：
          <el-radio class="radio" v-model="showtype1" label="1">本窗口打开</el-radio>
          <el-radio class="radio" v-model="showtype1" label="2">打开新页面</el-radio>
        </el-col>
        <el-col v-if="cwidon" style="text-align: left;font-size: 14px;margin-top: 20px;margin-left:20px;">
          课件属性：
          <el-radio class="radio" v-model="cwidtype" label="1">正常课件</el-radio>
          <el-radio class="radio" v-model="cwidtype" label="2">免费试听</el-radio>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="!addsearch" @click="indexinit(1)">重 置</el-button>
        <el-button v-if="!addcoursetype && !addsearch" type="primary" @click="dialogEvent" >确 定</el-button>
        <el-button v-if="addsearch" @click="visdialog = false" >取 消</el-button>
        <el-button v-if="addcoursetype" type="primary" @click="dialogaddcourse" >确 定</el-button>
        <el-button v-if="addsearch" type="primary" @click="dialogaddsearch" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'hrefdialog',
    data: function () {
      return {
        cwidon:false,
        cwidtype:'1',
        addcoursetype:false,
        addsearch:false,
        formVue: '',
        parameter:'',
        visdialog:false,
        mecoursenum : 0,
        edithref:'',
        showtype:'1',
        showtype1:'1',
        newschoolactive:false,
        newsradio:'',
        newsq : '',
        NewsOptions : [],
        sonNewsOptions:[],
        newspagesize : 30,
        newspage:1,
        newscount : 0,
        newslist : [],
        navcode : '',
        newsobj:{
          code : '',
          son : '',
          label : '',
          len : '',
          code1 : '',
          son1 : '',
          label1 : ''
        },
        threenewsradio:'',
        hrefteaq :'',
        tealist : [],
        schsourcelist : [],
        coursesort : [],
        itemsplist:[],
        itemlist : [],
        courselist:[],
        sourceid : '',
        pid : '',
        sid : '',
        folderid : '',
        sidlist: [],
        cwlist:[],
        cwlistpage:1,
        cwlistpagesize:30,
        folderq :'',
        folderpagesize : 30,
        folderpage:1,
        foldercount : 0,
        cwq : '',
        cwcount:0,
        cwpagesize : 30,
        cwpage:1,
        inpid : '',
        insid : '',
        infolderid : '',
        incode:'',
        initemid : '',
        incwid : '',
        fprice : '',
        itemid : '',
        seaqshow : 0,
        init: function () {
          let self = this;
          self.showtype = '1';
          self.edithref = '';
          self.newsq = '';
          self.folderq = '';
          self.hrefteaq = '';
          $('.threeselnews').hide();
          $('.newsseaq').hide();
          $('.twoselnews').hide();
          $('.oneselnews').show();
          self.seaqshow = 0;
          self.$nextTick( () => {
            $("input[name='oneinlineschool']").removeAttr('checked');
            $("input[name='onecourse']").removeAttr('checked');
            $("input[name='twocourse']").removeAttr('checked');
            $("input[name='threecourse']").removeAttr('checked');
            $("input[name='teacher']").removeAttr('checked');
            $("input[name='onenews']").removeAttr('checked');
            $('.courseradioreset').click()
            $('.courseradiotworeset').click()
            $('.courseradiothreereset').click()
            $('.courseradiofourreset').click()
            $('.newsradioreset').click()
            $('.teacherradioreset').click()
            $('.newsradiotworeset').click()
            $('.twoselinlineschoolReset').click()
            $('.oneselinlineschoolReset').click()
            self.inpid = 'eeeee';
            self.insid = 'eeeee';
            self.infolderid = 'eeeee';
            self.incwid = 'eeeee';
            self.incode = 'eeeee';
          })
          $('.newstwombx a,.newsthreembx a').text('');
          $('.newsthreembx a,.newsthreembx a').attr('code','')
          $('.newstwombx,.newsthreembx').hide()
          $('.inlineschooltwombx').hide()
          $('.oneselinlineschool').show()
          $('.twoselinlineschool').hide()
          $('.oneselcourse').show();
          $('.twoselcourse,.coursetwombx,.coursethreembx,.coursefourmbx,.coursefivembx,.threeselcourse,.fourselcourse,.fiveselcourse').hide();
          self.newschoolactive = false;
          self.cwidon = false
        },
        hrefgetealist: function () {
          let self = this
          self.$http.get(window.host + '/aroomv3/teacher/lists.html', {
            params: {
              q: self.hrefteaq,
              pagenum: 1,
              pagesize: 1000
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.list
            if (list.length) {
              for (var i = 0; i < list.length; i++) {
                if (list[i].face == '' || !list[i].face) {
                  if (list[i].sex === '0') {
                    list[i].face = 'http://static.ebanhui.com/ebh/tpl/default/images/t_man_120_120.jpg'
                  } else {
                    list[i].face = 'http://static.ebanhui.com/ebh/tpl/default/images/t_woman_120_120.jpg'
                  }
                }
              }
            }
            self.tealist = list;
          }, function (response) {
            console.log(response)
          })
        },
        geschsource: function () {
          let self = this
          self.$http.get(window.host + '/aroomv3/course/courseCategory.html', {
            params: {
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data[1]
            let list1 = response.data.data[0]
            self.mecoursenum = 0;
            if(list1.length){
              for(var i=0;i<list1.length;i++){
                self.mecoursenum = self.mecoursenum + list1[i].coursenum
              }
            }
            self.schsourcelist = list;
          }, function (response) {
            console.log(response)
          })
        },
        getcoursesort:function(linkobj){

          let self = this
          self.$http.get(window.host + '/aroomv3/course/courseCategory.html', {
            params: {
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data[0]
            self.coursesort = list;
            self.mecoursenum = 0;
            if(list.length){
              for(var i=0;i<list.length;i++){
                self.mecoursenum = self.mecoursenum + list[i].coursenum
              }
            }
            self.$nextTick( () => {
              if(linkobj){
                if(linkobj.course > 2){
                  self.getsidcourse(linkobj.pid,linkobj.pname,linkobj)
                  self.insid = linkobj.sid;
                }
              }
            })
          }, function (response) {
            console.log(response)
          })
        },
        getitemlist:function(sourceid,pid,sid,linkobj){
          let self = this
          for(var i=0;i<self.schsourcelist.length;i++){
            if(self.schsourcelist[i].sourcecrid == sourceid){
              self.coursesort = self.schsourcelist[i].packages;

            }
          }
          self.$nextTick( () => {
            if(linkobj){
              if(linkobj.course > 2){
                self.getsidcourse(linkobj.pid,linkobj.pname,linkobj)
                self.insid = linkobj.sid;
              }
            }
          })
          /*self.$http.get(window.host + '/aroomv3/schsource/itemlist.html', {
            params: {
              q : '',
              sourceid: sourceid,
              pid : pid || '',
              sid : sid || '',
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.splist;
            self.coursesort = list;
            self.itemlist = response.data.data.itemlist;
            self.$nextTick( () => {
              if(linkobj){
                if(linkobj.course > 2){
                  self.getsidcourse(linkobj.pid,linkobj.pname,linkobj)
                  self.insid = linkobj.sid;
                }
              }
             })
          }, function (response) {
            console.log(response)
          })*/
        },
        getcourselist:function(pid,sid,linkobj){
          let self = this
          self.$http.get(window.host + '/aroomv3/course/courselist.html', {
            params: {
              pid : pid || '',
              sid : sid || 0,
              pagesize : self.folderpagesize,
              page : self.folderpage,
              q: self.folderq
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.courselist;
            if(list.length){
              for(var i=0;i<list.length;i++){
                if(!list[i].img || list[i].img == undefined || list[i].img =='undefined'){
                  list[i].img = 'http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_247_147.jpg';
                }
              }
            }

            self.courselist = list;
            self.foldercount   =  parseInt(response.data.data.coursecount)
            setTimeout(function(){
              $('.courseradiothreereset').click()
            },0)
            self.$nextTick( () => {
              if(linkobj){
                if(linkobj.course > 4){
                  self.cwpage = linkobj.cwpage;
                  self.cwpagesize= linkobj.cwpagesize;
                  self.cwq= linkobj.cwq;
                  self.getcwlistall(linkobj.folderid,linkobj.foldername,linkobj.fprice,linkobj.itemid,self.cwq,linkobj.cwid,linkobj.cwidtype)
                  self.incwid = linkobj.cwid;
                  $('.oneselcourse,.twoselcourse,.threeselcourse,.fourselcourse').hide();
                }
              }
            })
          }, function (response) {
            console.log(response)
          })
        },
        getitemcourselist:function(sourceid,pid,sid,linkobj,cwid){
          let self = this
          self.$http.get(window.host + '/aroomv3/course/schCourse.html', {
            params: {
              s:self.folderq,
              sourcecrid : sourceid || 0,
              pid : pid || '',
              sid : sid || 0,
              pagesize : self.folderpagesize,
              page : self.folderpage
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.list;
            if(list.length){
              for(var i=0;i<list.length;i++){
                list[i].foldername = list[i].iname
                if(!list[i].img || list[i].img == undefined || list[i].img =='undefined'){
                  list[i].img = 'http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_247_147.jpg';
                }
              }
            }

            self.courselist = list;
            self.foldercount   =  parseInt(response.data.data.count)

            setTimeout(function(){
              $('.courseradiothreereset').click()
            },0)
            self.$nextTick( () => {
              if(linkobj){
                if(linkobj.course > 4){
                  self.cwpage = linkobj.cwpage;
                  self.cwpagesize= linkobj.cwpagesize;
                  self.cwq= linkobj.cwq;
                  self.getcwlistall(linkobj.folderid,linkobj.foldername,linkobj.fprice,linkobj.itemid,self.cwq,linkobj.cwid,linkobj.cwidtype)
                  self.incwid = linkobj.cwid;
                  $('.oneselcourse,.twoselcourse,.threeselcourse,.fourselcourse').hide();

                }
              }
            })
          }, function (response) {
            console.log(response)
          })
        },
        getcwlist:function(folderid,sourceid,cwid,cwidtype){
          let self = this
          self.$http.get(window.host + '/aroomv3/course/cwlist.html', {
            params: {
              folderid : folderid,
              page:self.cwpage,
              pagesize:self.cwpagesize,
              s : self.cwq,
              crid: sourceid || 0
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.cwlist;
            for (var i = 0; i < list.length; i++) {
              if (list[i].cwlist) {
                for (var j = 0; j < list[i].cwlist.length; j++) {
                  if (list[i].cwlist[j].logo == null || list[i].cwlist[j].logo  == "") {
                    if (list[i].cwlist[j].type == "flv" || list[i].cwlist[j].type == "jar" || list[i].cwlist[j].type == "mp3") {

                      list[i].cwlist[j].logo = "http://static.ebanhui.com/ebh/tpl/2014/images/attach.png"

                    } else if (list[i].cwlist[j].islive == '1') {

                      list[i].cwlist[j].logo = "http://static.ebanhui.com/ebh/tpl/2014/images/livelogo.jpg"

                    } else if (list[i].cwlist[j].type == "ppt") {

                      list[i].cwlist[j].logo = "http://static.ebanhui.com/ebh/tpl/2014/images/ppt.png"

                    } else if (list[i].cwlist[j].type == "doc") {

                      list[i].cwlist[j].logo = "http://static.ebanhui.com/ebh/tpl/2014/images/doc.png"

                    } else {

                      list[i].cwlist[j].logo = "http://static.ebanhui.com/ebh/tpl/2014/images/defaultcwimggray.png?v=20160504001"

                    }
                  }
                }
              }
            }
            self.cwlist = list;
            self.cwcount = parseInt(response.data.data.cwcount);
            setTimeout(function(){
              $('.courseradiofourreset').click()
              $('.courseradiothreereset').click()
              if(cwidtype){
                self.cwidtype = cwidtype
              }
              if (cwid){
                $("input[cwid='"+cwid+"']").attr('checked','true');
              }

            },0)
          }, function (response) {
            console.log(response)
          })
        },
        getNewsData: function () {
          var self = this
          self.$http.get(window.host + '/aroomv3/news/newsCategory.html', {
            params: {}
          }, {emulateJSON: true}).then(function (response) {
            if (response.data.code === 0) {

              let navList = response.data.data
              let obj = []
              for (let i = 0, len = navList.length; i < len; i++) {
                if(navList[i].value !='news'){
                  let item = navList[i]
                  if (item.code.length < 4 || item.code === 'news') {
                    let items = {
                      label: item.name,
                      value: item.code,
                      newsCount : item.newsCount,
                      children: []
                    }
                    if (item.subnav) {
                      for (let j = 0, jen = item.subnav.length; j < jen; j++) {
                        let jtem = item.subnav[j]
                        let jtems = {
                          label: jtem.name,
                          value: jtem.code,
                          newsCount : jtem.newsCount,
                          children: []
                        }
                        items.children.push(jtems)
                      }
                    }
                    if(items.value != 'news'){
                      obj.push(items)
                    }
                  }
                }
              }
              self.NewsOptions = obj
            } else {
              console.log('数据错误')
            }
          }, function (response) {
            console.log(response)
          })
        },
        handleNewsItemChange: function (code) {
          var self = this
          self.$http.get(window.host + '/aroomv3/news.html', {
            params: {
              q : self.newsq,
              navcode: code,
              pagesize: self.newspagesize,
              pagenum: self.newspage
            }
          }, {emulateJSON: true}).then(function (response) {
            if (response.data.code === 0) {
              self.newslist = response.data.data
              if(self.newslist.length){
                self.threenewsradio = self.newscode;
              }
              if(!self.newslist.length){
                $('.threeselnews .nodata').show()
              }else{
                $('.threeselnews .nodata').hide()
              }
            } else {
              console.log('数据错误')
            }
          }, function (response) {
            console.log(response)
          })
        },
        getCount:function(code){
          var self = this
          self.$http.get(window.host + '/aroomv3/news/getCount.html', {
            params: {
              q : self.newsq,
              navcode: code
            }
          }, {emulateJSON: true}).then(function (response) {
            if (response.data.code === 0) {
              self.newscount  =  parseInt(response.data.data)
            } else {
              console.log('数据错误')
            }
          }, function (response) {
            console.log(response)
          })
        }
      }
    },
    created:function(){
      this.getNewsData()
      this.hrefgetealist()
      this.geschsource()
    },
    methods:{
      show: function(thatName, thatSelf, Callback) {
        let self = this;
        self.visdialog = true;
        self.addcoursetype = false;
        self.addsearch =false;
        self.$nextTick( () => {
          let linktype = $('.on_module a').attr('linktype');
          let linkobj =  $('.on_module a').attr('linkobj');
          linkobj = linkobj?$.parseJSON(linkobj):'';
          let tCP = $('.tabs-content-placeholder')
          tCP.attr('class', 'tabs-content-placeholder')
          // ----------- update start------------
          self.parameter = ''
          if (thatName) {
            let saveparam = false
            switch(thatName.split('|')[0]){
              case 'course':
                linktype = 'course'
                saveparam = true
                tCP.addClass('inputCoruse')
                self.indexinit()
                break
              case 'pulldown':
                saveparam = true
                linkobj = {}
                self.indexinit()
                break
              case 'addsearch':
                linktype = 'news'
                saveparam = false
                tCP.addClass('inputaddsearch')
                self.addsearch = true
                self.addcoursetype = false
                let editsearch = thatName.split('|')[1]
                if(editsearch == 'edit'){
                  linkobj =  thatSelf.$refs.addsearch.newsobj
                  self.parameter = {thatName : 'addsearch',linktype: 'news',thatSelf: thatSelf}
                }else{
                  self.parameter = {thatName : 'addsearch',linktype: 'news',thatSelf: thatSelf}
                }
                self.indexinit()
                break
              case 'addcoursetype':
                linktype = 'course'
                saveparam = true
                tCP.addClass('inputAddcoursetype')
                self.indexinit()
                self.addcoursetype = true
                self.addsearch = false
                let index1 = parseInt(thatName.split('|')[1])
                saveparam = false
                if(index1 >= 0){
                  self.parameter = {thatName : 'addcoursetype',linktype: 'course',thatSelf: thatSelf,index:index1}
                }else{
                  self.parameter = {thatName : 'addcoursetype',linktype: 'course',thatSelf: thatSelf}
                }
                break
              case 'coursecw':
                linktype = 'course'
                saveparam = true
                self.formVue = thatName.split('|')[1]
                tCP.addClass('inputCwlist')
                break
              case 'teacher':
                linktype = 'teacher'
                saveparam = true
                break
              case 'online':
                linktype = 'online'
                saveparam = true
                break
              case 'advert':
                saveparam = true
                break
              case 'carousel':
                saveparam = true
                break
            }
            if (saveparam) {
              self.parameter = {
                linktype: linktype,
                thatName: thatName,
                thatSelf: thatSelf,
                Callback: Callback
              }
            }
          }
          // ----------- update end--------------

          $('ul.tabsul li a').removeClass('tab-active')
          $('.tabs-content-placeholder .tab-content').removeClass('tab-content-active')
          if(linkobj.newschoolactive){
            self.newschoolactive = true;
            if(linkobj.newschoolactive == '1'){
              self.showtype1 = '1';
            }else{
              self.showtype1 = '2';
            }
          }else{
            self.newschoolactive = false;
            self.cwidon = false
          }
          if(linktype == 'news'){
            $('ul.tabsul li a[data-index=1]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(1).addClass('tab-content-active')
            if(linkobj.active == 3){
              if(linkobj.news.len){
                self.getsonNews(linkobj.news.code,linkobj.news.son,linkobj.news.label)
                setTimeout(function () {
                  self.newsq = linkobj.q;
                  self.newspagesize =  linkobj.pagesize;
                  self.newspage = linkobj.page;
                  self.newscode = linkobj.newscode;
                  self.getsonNews(linkobj.news.code1,linkobj.news.son1,linkobj.news.label1)
                }, 0)
              } else {
                self.newsq = linkobj.q;
                self.newspagesize =  linkobj.pagesize;
                self.newspage = linkobj.page;
                self.newscode = linkobj.newscode;
                self.getsonNews(linkobj.news.code,linkobj.news.son,linkobj.news.label)
              }
            }else if(linkobj.active == 2){
              self.getsonNews(linkobj.news.code,linkobj.news.son,linkobj.news.label)
              self.$nextTick( () => {
                $("input[code='"+linkobj.newscode+"']").attr('checked','true');
              })
            }else{
              self.$nextTick( () => {
                $("input[code='"+linkobj.newscode+"']").attr('checked','true');
              })

            }
          }else if(linktype == 'course'){
            $('ul.tabsul li a[data-index=2]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(2).addClass('tab-content-active')
            if(linkobj.course == 1){
              $("input[sourceid='"+linkobj.sourceid+"']").attr('checked','true');
            }
            if(linkobj.course == 2 || linkobj.course == 3 || linkobj.course == 4 || linkobj.course == 5){
              if(linkobj.sourceid == 0){
                self.getsoncourse(0,'',linkobj)
              }else{
                self.getsoncourse(linkobj.sourceid,linkobj.name,linkobj)
              }
              if(linkobj.course == 2){
                self.$nextTick( () => {
                  self.inpid = linkobj.pid;
                })
              }
            }
          }else if(linktype == 'teacher'){

            $('ul.tabsul li a[data-index=3]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(3).addClass('tab-content-active')
            self.hrefteaq = linkobj.q;
            this.hrefgetealist();
            self.$nextTick( () => {
              $("input[code='"+linkobj.teauid+"']").attr('checked','true');
            })
          }else if(linktype == 'onlineschool'){

            $('ul.tabsul li a[data-index=4]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(4).addClass('tab-content-active')
            if(linkobj.oneinlineschool == 'QQ' || linkobj.oneinlineschool == 'WeChat' || linkobj.oneinlineschool == 'weibo'){
              self.getmorelogin()
            }
            self.$nextTick( () => {
              $("input[code='"+linkobj.oneinlineschool+"']").attr('checked','true');
            })
          }else {
            $('ul.tabsul li a[data-index=0]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(0).addClass('tab-content-active')
            self.edithref = linkobj.href;
          }
          let widget = $('#tabs-vertical');
          let tabs = widget.find('ul.tabsul'),
            content = widget.find('.tabs-content-placeholder > div');
          $('.teaflowx').scrollTop(0);
          tabs.on('click','a', function (e) {
            e.preventDefault();
            let index = $(this).data('index');
            tabs.find('a').removeClass('tab-active');
            content.removeClass('tab-content-active');
            $(this).addClass('tab-active');
            content.eq(index).addClass('tab-content-active');
            self.init()
          });
          $('input:radio[name="onenews"]').change(function(){
            if($(this).is(":checked")){
              self.newschoolactive = true;
            }
          });
          $('input:radio[name="oneinlineschool"]').change(function(){
            if($(this).is(":checked")){
              var code =   $(this).attr('code');
              if(code == 'summary' || code == 'course' || code == 'contact' || code == 'index' ){
                self.newschoolactive = true;
              }else{
                self.newschoolactive = false;
                self.cwidon = false
              }

            }
          });
        })
      },
      dialogEvent: function () { // 选择链接确定
        let self = this;
        let obj;
        let linkType
        let a
        let origin
        // ----------- update start------------
        let parameter = self.parameter
        if (parameter && parameter.thatName!='advert'&& parameter.thatName!='carousel') {
          linkType = parameter.linktype
          if (parameter.thatName == 'pulldown'){
            linkType = $('a.tab-active').attr('type')
          }
        } else {
          origin = window.location.origin
          a = $('.on_module').find('a').eq(0);
          linkType = $('a.tab-active').attr('type')
          a.removeClass('registerEvent')
          a.removeClass('getUserNameEvent')
          a.removeAttr('auditionid')
        }

        // ----------- update end------------
        switch (linkType) {
          case 'none':
            a.removeAttr('href')
            break
          case 'online':
            let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
            if (reg.test(self.edithref)) {
              obj = {
                href : self.edithref,
                opentype : self.showtype
              }
              // ----------- update start------------
              if (!parameter) {
                a.attr('href', self.edithref)
                a.attr('target', '_blank')
                a.attr('linkobj', JSON.stringify(obj))
              }
              // ----------- update end------------
            } else {
              self.$notify({
                title: '警告',
                message: '请输入正确完整的跳转链接',
                type: 'warning'
              })
              return
            }
            break
          case 'news':
            let news;
            let url;
            let num = 0;
            let newsTitle = ''
            let onenews = $('.oneselnews').is(':hidden');
            let twonews = $('.twoselnews').is(':hidden');
            let threenews = $('.threeselnews').is(':hidden');
            if(!onenews){
              let onenewsChecked = $("input[name='onenews']:checked")
              news = onenewsChecked.attr('code');
              self.newsobj['label'] = onenewsChecked.attr('newsname')
              num = 1;
            }else if(!twonews){
              let twonewsChecked = $("input[name='twonews']:checked")
              news = twonewsChecked.attr('code');
              self.newsobj['label1'] = twonewsChecked.attr('newsname')
              num = 2;
            }else if(!threenews){
              news = self.threenewsradio;
              for (let i = 0, len = self.newslist.length; i < len; i++) {
                let itemNews = self.newslist[i]
                if (itemNews.itemid == self.threenewsradio) {
                  newsTitle = itemNews.subject
                }
              }
              num = 3;
            }
            if(news == undefined || news == 'undefined' || !news) {
              this.$notify({
                title: '警告',
                message: '请选择资讯',
                type: 'warning'
              })
              return false
            }
            if(num == 1){
              let navcm = news.split('n')[1]
              switch (news) {
                case 'news':
                  url = '/dyinformation.html'
                  break
                default:
                  url = '/navcm/' + navcm + '.html'
              }
            }else if(num == 2){
              let w = news.indexOf("s");
              let navcm = news.substring(0,w).split('n')[1]
              let ns = news.split('s')[1]
              if (ns) {
                url = '/navcm/' + navcm + '.html?s=' + ns
              } else {
                url = '/navcm/' + navcm + '.html'
              }
            }else if(num == 3){
              url = '/dyinformation/' + news + '.html'

            }
            if(num == 3){
              obj = {
                active : num,
                newsTitle: newsTitle,
                newscode : news,
                news : self.newsobj,
                pagesize : self.newspagesize,
                page: self.newspage,
                q : self.newsq,
                url: url
              }
            }else{
              if(num == 1){
                obj = {
                  active : num,
                  newscode : news,
                  news : self.newsobj,
                  newschoolactive : self.showtype1,
                  url: url
                }
                if(self.showtype1 == '1'){
                  a.removeAttr('target')
                }else{
                  a.attr('target', '_blank')
                }
              }else{
                obj = {
                  active : num,
                  newscode : news,
                  news : self.newsobj,
                  url: url
                }
              }

            }
            if (!parameter) {
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href', url)
            }

            break
          case 'onlineschool':
            let oneinlineschool;
            let oneschool = $('.oneselinlineschool').is(':hidden');
            let twoschool = $('.twoselinlineschool').is(':hidden');
            if(!oneschool){
              oneinlineschool =  $("input[name='oneinlineschool']:checked").attr('code');
            }else if(!twoschool){
              oneinlineschool =  $("input[name='logintype']:checked").attr('code');
            }
            if(oneinlineschool == undefined ||  oneinlineschool == 'undefined' || !oneinlineschool) {
              this.$notify({
                title: '警告',
                message: '请选择网校功能',
                type: 'warning'
              })
              return false
            }
            if (!parameter) {
              switch (oneinlineschool) {
                case 'summary':
                  a.attr('href', '/introduce.html')
                  break
                case 'course':
                  a.attr('href', '/platform.html')
                  break
                case 'contact':
                  a.attr('href', '/contacts.html')
                  break
                case 'register':
                  a.removeAttr('href')
                  a.addClass('registerEvent')
                  break
                case 'password':
                  a.attr('href', '/forget.html')
                  break
                case 'username':
                  a.removeAttr('href')
                  a.addClass('getUserNameEvent')
                  break
                case 'login':
                  a.removeAttr('href')
                  a.addClass('loginEvent')
                  break
                case 'login1':
                  a.removeAttr('href')
                  a.addClass('loginEvent')
                  break
                case 'QQ':
                  a.attr('href', 'http://www.ebh.net/otherlogin/qq.html?returnurl=' + origin)
                  break
                case 'weibo':
                  a.attr('href', 'http://www.ebh.net/otherlogin/sina.html?returnurl=' + origin)
                  break
                case 'WeChat':
                  a.attr('href', 'http://www.ebh.net/otherlogin/wx.html?returnurl=' + origin)
                  break
                case 'index':
                  a.attr('href', 'http://' + window.roominfo.domain)
                  break
              }
            }
            if(oneinlineschool == 'summary' || oneinlineschool == 'course'  || oneinlineschool == 'contact'  || oneinlineschool == 'index' ){
              obj = {
                oneinlineschool : oneinlineschool,
                newschoolactive : self.showtype1
              }
              if (!parameter) {
                if (self.showtype1 == '1') {
                  a.removeAttr('target')
                } else {
                  a.attr('target', '_blank')
                }
              }
            }else{
              obj = {
                oneinlineschool : oneinlineschool
              }
            }
            if (!parameter) {
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href', url)
            }

            break
          case 'teacher':
            let face = $("input[name='teacher']:checked").attr('face');
            let teauid = $("input[name='teacher']:checked").attr('code');
            let profile = $("input[name='teacher']:checked").attr('profile');
            let realname = $("input[name='teacher']:checked").attr('realname');
            let professionaltitle = $("input[name='teacher']:checked").attr('professionaltitle');
            if(teauid == undefined || teauid == 'undefined' || !teauid) {
              this.$notify({
                title: '警告',
                message: '请选择教师',
                type: 'warning'
              })
              return false
            }
            obj = {
              teauid: teauid,
              face: face,
              profile: profile,
              realname: realname,
              professionaltitle: professionaltitle,
              q :self.hrefteaq
            }
            // ----------- update start------------
            if (!parameter) {
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href', '/master/'+teauid+'.html')
            }
            // ----------- update end------------
            break
          case 'course':
            let courseactive;
            let onecourse = $('.oneselcourse').is(':hidden');
            let twocourse = $('.twoselcourse').is(':hidden');
            let threecourse = $('.threeselcourse').is(':hidden');
            let fourcourse = $('.fourselcourse').is(':hidden');
            let fivecourse = $('.fiveselcourse').is(':hidden');
            if (!onecourse) {
              let onecourseradio = $("input[name='onecourse']:checked").attr('sourceid');
              let sourcename = $("input[name='onecourse']:checked").attr('sourcename');
              if(onecourseradio == undefined || onecourseradio == '' || onecourseradio == 'undefined'){
                this.$notify({
                  title: '警告',
                  message: '请选择网校分类',
                  type: 'warning'
                })
                return false
              }
              courseactive = 1;
              obj = {
                course : 1,
                sourceid: onecourseradio,
                name : sourcename

              }
              if (!parameter) {
                a.attr('linkobj', JSON.stringify(obj))
                a.attr('href','/platform.html')
              }
            } else if (!twocourse) {
              let twocourseradio = $("input[name='twocourse']:checked").attr('pid');
              let pname = $("input[name='twocourse']:checked").attr('pname');
              if(twocourseradio == undefined ||twocourseradio == 'undefined' || twocourseradio == ''){
                this.$notify({
                  title: '警告',
                  message: '请选择课程主类',
                  type: 'warning'
                })
                return false
              }
              courseactive = 2;
              let sourceid = self.sourceid?self.sourceid:'0';
              obj = {
                course : 2,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                pid: twocourseradio,
                pname : pname
              }
              if (!parameter) {
                a.attr('linkobj', JSON.stringify(obj))
                a.attr('href','/platform-1-0-0.html?pid='+ twocourseradio)
              }

            } else if (!threecourse) {
              let threecourseradio = $("input[name='threecourse']:checked").attr('sid');
              let sname = $("input[name='threecourse']:checked").attr('sname');
              if(threecourseradio == undefined ||threecourseradio == 'undefined' || threecourseradio == ''){
                this.$notify({
                  title: '警告',
                  message: '请选择课程子类',
                  type: 'warning'
                })
                return false
              }
              courseactive = 3;
              let sourceid = self.sourceid?self.sourceid:'0';
              obj = {
                course : 3,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                sid: threecourseradio,
                sname : sname,
                pid : self.pid,
                pname : $("input[pid='"+self.pid+"']").attr('pname')
              }
              if (!parameter) {
                a.attr('linkobj', JSON.stringify(obj))
                if(threecourseradio == 0){
                  a.attr('href','/platform-1-0-0.html?pid='+ self.pid)
                }else{
                  a.attr('href','/platform-1-0-0.html?pid='+ self.pid + '&sid=' + threecourseradio)
                }
              }

            } else if (!fourcourse) {
              let fourcourseradio = $("input[name='fourcourse']:checked").attr('folderid');
              let itemid = $("input[name='fourcourse']:checked").attr('itemid');

              if(fourcourseradio == undefined ||fourcourseradio == 'undefined' || fourcourseradio == ''){
                this.$notify({
                  title: '警告',
                  message: '请选择课程',
                  type: 'warning'
                })
                return false
              }
              courseactive = 4;
              let sourceid = self.sourceid?self.sourceid:'0';
              let sid = self.sid?self.sid:'0';
              obj = {
                course : 4,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                sid: self.sid || '0',
                sname : $("input[sid='"+sid+"']").attr('sname'),
                pid : self.pid,
                pname : $("input[pid='"+self.pid+"']").attr('pname'),
                folderid : fourcourseradio,
                itemid : itemid,
                foldername : $("input[folderid='"+fourcourseradio+"']").attr('foldername'),
                // ----------- update start------------
                summary: $("input[folderid='"+fourcourseradio+"']").attr('summary'),
                img: $("input[folderid='"+fourcourseradio+"']").attr('img'),
                cover: $("input[folderid='"+fourcourseradio+"']").attr('cover'),
                studynum: $("input[folderid='"+fourcourseradio+"']").attr('studynum'),
                viewnum: $("input[folderid='"+fourcourseradio+"']").attr('viewnum'),
                // ----------- update end------------
                folderq : self.folderq,
                folderpage : self.folderpage,
                folderpagesize: self.folderpagesize
              }
              // ----------- update start------------
              if (!parameter) {
                a.attr('linkobj', JSON.stringify(obj))
                a.attr('href','/courseinfo/' + itemid + '.html')
              }
              // ----------- update end------------
            } else if (!fivecourse) {
              let fivecourseradio = $("input[name='fivecourse']:checked").attr('cwid');
              let cwpay = $("input[name='fivecourse']:checked").attr('cwpay');
              if (fivecourseradio == undefined || fivecourseradio == 'undefined' || fivecourseradio == '') {
                this.$notify({
                  title: '警告',
                  message: '请选择课件',
                  type: 'warning'
                })
                return false
              }
              courseactive = 5;
              let sourceid = self.sourceid?self.sourceid:'0';
              let sid = self.sid?self.sid:'0';
              obj = {
                course : 5,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                sid: self.sid || '0',
                sname : $("input[sid='"+sid+"']").attr('sname'),
                pid : self.pid,
                pname : $("input[pid='"+self.pid+"']").attr('pname'),
                folderid : self.folderid,
                itemid : self.itemid,
                foldername : $("input[folderid='"+self.folderid+"']").attr('foldername'),
                folderq : self.folderq,
                fprice : self.fprice,
                folderpage : self.folderpage,
                folderpagesize: self.folderpagesize,
                cwid:fivecourseradio,
                // ----------- update start------------
                cwpay: cwpay,
                thumb: $("input[cwid='"+fivecourseradio+"']").attr('thumb'),
                cwsize: $("input[cwid='"+fivecourseradio+"']").attr('cwsize'),
                logo: $("input[cwid='"+fivecourseradio+"']").attr('logo'),
                cover: $("input[cwid='"+fivecourseradio+"']").attr('cover'),
                viewnum: $("input[cwid='"+fivecourseradio+"']").attr('viewnum'),
                summary: $("input[cwid='"+fivecourseradio+"']").attr('summary'),
                // ----------- update end------------
                cwname : $("input[cwid='"+fivecourseradio+"']").attr('cwname'),
                cwq : self.cwq,
                cwpage : self.cwpage,
                cwpagesize : self.cwpagesize,
                cwidtype : self.cwidtype
              }
              // ----------- update start------------
              if (!parameter) {
                a.attr('linkobj', JSON.stringify(obj))
                if (self.cwidtype == '2'){
                  if($("input[cwid='"+fivecourseradio+"']").attr('islive') == '1'){
                    a.attr('href','/course/' + fivecourseradio + '.html?flag=1')
                  }else{
                    a.attr('href','/course/' + fivecourseradio + '.html')
                  }
                  a.attr('auditionid',fivecourseradio)
                }else{
                  if(cwpay == '1'){
                    a.attr('href','/ibuy.html?cwid='+fivecourseradio)
                  }else{
                    a.attr('href','/courseinfo/' + self.itemid + '.html')
                  }
                }
              }
              // ----------- update end------------
            }
            break
        }
        // ----------- update start------------
        if (parameter) {
          parameter.Callback(parameter.thatSelf, obj, linkType)
        } else {
          a.attr('linktype',linkType)
          //a.attr('target','_blank')
        }
        // ----------- update end------------
        self.visdialog = false
      },
      dialogaddsearch(){
        let self = this
        let obj;
        let linkType
        let a
        let origin
        // ----------- update start------------
        let parameter = self.parameter
        linkType = 'news'

        // ----------- update end------------
        switch (linkType) {
          case 'none':
            a.removeAttr('href')
            break
          case 'news':
            let news;
            let url;
            let num = 0;
            let newsTitle = ''
            let onenews = $('.oneselnews').is(':hidden');
            let twonews = $('.twoselnews').is(':hidden');
            let threenews = $('.threeselnews').is(':hidden');
            if(!onenews){
              let onenewsChecked = $("input[name='onenews']:checked")
              news = onenewsChecked.attr('code');
              self.newsobj['label'] = onenewsChecked.attr('newsname')
              num = 1;
            }else if(!twonews){
              let twonewsChecked = $("input[name='twonews']:checked")
              news = twonewsChecked.attr('code');
              self.newsobj['label1'] = twonewsChecked.attr('newsname')
              num = 2;
            }else if(!threenews){
              news = self.threenewsradio;
              for (let i = 0, len = self.newslist.length; i < len; i++) {
                let itemNews = self.newslist[i]
                if (itemNews.itemid == self.threenewsradio) {
                  newsTitle = itemNews.subject
                }
              }
              num = 3;
            }
            if(news == undefined || news == 'undefined' || !news) {
              this.$notify({
                title: '警告',
                message: '请选择资讯',
                type: 'warning'
              })
              return false
            }
            if(num == 1){
              let navcm = news.split('n')[1]
              switch (news) {
                case 'news':
                  url = '/dyinformation.html'
                  break
                default:
                  url = '/navcm/' + navcm + '.html'
              }
            }else if(num == 2){
              let w = news.indexOf("s");
              let navcm = news.substring(0,w).split('n')[1]
              let ns = news.split('s')[1]
              if (ns) {
                url = '/navcm/' + navcm + '.html?s=' + ns
              } else {
                url = '/navcm/' + navcm + '.html'
              }
            }else if(num == 3){
              url = '/dyinformation/' + news + '.html'

            }
            if(num == 3){
              obj = {
                active : num,
                newsTitle: newsTitle,
                newscode : news,
                news : self.newsobj,
                url : url,
                pagesize : self.newspagesize,
                page: self.newspage,
                q : self.newsq
              }
            }else{
              if(num == 1){
                obj = {
                  active : num,
                  newscode : news,
                  url : url,
                  news : self.newsobj
                }
              }else{
                obj = {
                  active : num,
                  newscode : news,
                  url : url,
                  news : self.newsobj
                }
              }
            }
            parameter.thatSelf.$refs.addsearch.newson = 1
            parameter.thatSelf.$refs.addsearch.newsobj = obj
            break
        }

        self.visdialog = false
      },
      // -------------------
      dialogaddcourse(){  //添加课程导航
        let self = this;
        let obj;
        let linkType
        let a
        let origin
        // ----------- update start------------
        let parameter = self.parameter
        if (parameter && parameter.thatName!='advert'&& parameter.thatName!='carousel') {
          linkType = parameter.linktype
        } else {
          origin = window.location.origin
          a = $('.on_module').find('a').eq(0);
          linkType = $('a.tab-active').attr('type')
          a.removeClass('registerEvent')
          a.removeClass('getUserNameEvent')
          a.removeClass('loginEvent')
        }
        // ----------- update end------------
        switch (linkType) {
          case 'none':
            a.removeAttr('href')
            break
          case 'online':
            let reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
            if (reg.test(self.edithref)) {
              obj = {
                href : self.edithref,
                opentype : self.showtype
              }
              // ----------- update start------------
              if (!parameter) {
                a.attr('href', self.edithref)
                a.attr('linkobj', JSON.stringify(obj))
              }
              // ----------- update end------------
            } else {
              self.$notify({
                title: '警告',
                message: '请输入正确完整的跳转链接',
                type: 'warning'
              })
              return
            }
            break
          case 'news':
            let news;
            let url;
            let num = 0;
            let newsTitle = ''
            let onenews = $('.oneselnews').is(':hidden');
            let twonews = $('.twoselnews').is(':hidden');
            let threenews = $('.threeselnews').is(':hidden');
            if(!onenews){
              let onenewsChecked = $("input[name='onenews']:checked")
              news = onenewsChecked.attr('code');
              self.newsobj['label'] = onenewsChecked.attr('newsname')
              num = 1;
            }else if(!twonews){
              let twonewsChecked = $("input[name='twonews']:checked")
              news = twonewsChecked.attr('code');
              self.newsobj['label1'] = twonewsChecked.attr('newsname')
              num = 2;
            }else if(!threenews){
              news = self.threenewsradio;
              for (let i = 0, len = self.newslist.length; i < len; i++) {
                let itemNews = self.newslist[i]
                if (itemNews.itemid == self.threenewsradio) {
                  newsTitle = itemNews.subject
                }
              }
              num = 3;
            }
            if(news == undefined || news == 'undefined' || !news) {
              this.$notify({
                title: '警告',
                message: '请选择资讯',
                type: 'warning'
              })
              return false
            }
            if(num == 1){
              let navcm = news.split('n')[1]
              switch (news) {
                case 'news':
                  url = '/dyinformation.html'
                  break
                default:
                  url = '/navcm/' + navcm + '.html'
              }
            }else if(num == 2){
              let w = news.indexOf("s");
              let navcm = news.substring(0,w).split('n')[1]
              let ns = news.split('s')[1]
              if (ns) {
                url = '/navcm/' + navcm + '.html?s=' + ns
              } else {
                url = '/navcm/' + navcm + '.html'
              }
            }else if(num == 3){
              url = '/dyinformation/' + news + '.html'

            }
            if(num == 3){
              obj = {
                active : num,
                newsTitle: newsTitle,
                newscode : news,
                news : self.newsobj,
                pagesize : self.newspagesize,
                page: self.newspage,
                q : self.newsq
              }
            }else{
              obj = {
                active : num,
                newscode : news,
                news : self.newsobj
              }
            }
            a.attr('linkobj', JSON.stringify(obj))
            a.attr('href', url)
            break
          case 'onlineschool':
            let oneinlineschool;
            let oneschool = $('.oneselinlineschool').is(':hidden');
            let twoschool = $('.twoselinlineschool').is(':hidden');
            if(!oneschool){
              oneinlineschool =  $("input[name='oneinlineschool']:checked").attr('code');
            }else if(!twoschool){
              oneinlineschool =  $("input[name='logintype']:checked").attr('code');
            }
            if(oneinlineschool == undefined ||  oneinlineschool == 'undefined' || !oneinlineschool) {
              this.$notify({
                title: '警告',
                message: '请选择网校功能',
                type: 'warning'
              })
              return false
            }

            switch (oneinlineschool) {
              case 'summary':
                a.attr('href', '/introduce.html')
                break
              case 'course':
                a.attr('href', '/platform.html')
                break
              case 'contact':
                a.attr('href', '/contacts.html')
                break
              case 'register':
                a.removeAttr('href')
                a.addClass('registerEvent')
                break
              case 'password':
                a.attr('href', '/forget.html')
                break
              case 'username':
                a.removeAttr('href')
                a.addClass('getUserNameEvent')
                break
              case 'login':
                a.removeAttr('href')
                a.addClass('loginEvent')
                break
              case 'login1':
                a.removeAttr('href')
                a.addClass('loginEvent')
                break
              case 'QQ':
                a.attr('href', 'http://www.ebh.net/otherlogin/qq.html?returnurl=' + origin)
                break
              case 'weibo':
                a.attr('href', 'http://www.ebh.net/otherlogin/sina.html?returnurl=' + origin)
                break
              case 'WeChat':
                a.attr('href', 'http://www.ebh.net/otherlogin/wx.html?returnurl=' + origin)
                break
            }
            obj = {
              oneinlineschool : oneinlineschool
            }
            a.attr('linkobj', JSON.stringify(obj))
            a.attr('href', url)
            break
          case 'teacher':
            let face = $("input[name='teacher']:checked").attr('face');
            let teauid = $("input[name='teacher']:checked").attr('code');
            let profile = $("input[name='teacher']:checked").attr('profile');
            let realname = $("input[name='teacher']:checked").attr('realname');
            let professionaltitle = $("input[name='teacher']:checked").attr('professionaltitle');
            if(teauid == undefined || teauid == 'undefined' || !teauid) {
              this.$notify({
                title: '警告',
                message: '请选择教师',
                type: 'warning'
              })
              return false
            }
            obj = {
              teauid: teauid,
              face: face,
              profile: profile,
              realname: realname,
              professionaltitle: professionaltitle,
              q :self.hrefteaq
            }
            // ----------- update start------------
            if (!parameter) {
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href', '/master/'+teauid+'.html')
            }
            // ----------- update end------------
            break
          case 'course':
            let courseactive;
            let onecourse = $('.oneselcourse').is(':hidden');
            let twocourse = $('.twoselcourse').is(':hidden');
            let threecourse = $('.threeselcourse').is(':hidden');
            let fourcourse = $('.fourselcourse').is(':hidden');
            let fivecourse = $('.fiveselcourse').is(':hidden');
            if (!onecourse) {
              let onecourseradio = $("input[name='onecourse']:checked").attr('sourceid');
              let sourcename = $("input[name='onecourse']:checked").attr('sourcename');
              if(onecourseradio == undefined || onecourseradio == '' || onecourseradio == 'undefined'){
                this.$notify({
                  title: '警告',
                  message: '请点击网校分类',
                  type: 'warning'
                })
                return false
              }
              courseactive = 1;
              obj = {
                course : 1,
                sourceid: onecourseradio,
                name : sourcename

              }
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href','/platform.html')
            } else if (!twocourse) {
              let twocourseradio = $("input[name='twocourse']:checked").attr('pid');
              let pname = $("input[name='twocourse']:checked").attr('pname');
              if(twocourseradio == undefined ||twocourseradio == 'undefined' || twocourseradio == ''){
                this.$notify({
                  title: '警告',
                  message: '请点击课程主类',
                  type: 'warning'
                })
                return false
              }
              courseactive = 2;
              let sourceid = self.sourceid?self.sourceid:'0';
              obj = {
                course : 2,
                sourceid: sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                pid: twocourseradio,
                pname : pname
              }
              let courselist = self.parameter.thatSelf.$refs.addcoursetype.courselist
              let index = self.parameter.index
              let len =  courselist.length;
              if(courselist){
                for(var i=0;i<len;i++){
                  if(twocourseradio == courselist[i].pid){
                    this.$notify({
                      title: '警告',
                      message: '该课程分类已添加',
                      type: 'warning'
                    })
                    return false
                  }
                }
              }

              if (index != undefined ){
                courselist.splice(parseInt(index),1,obj)
              }else{
                if(courselist){
                  let len =  courselist.length;
                  if(len >= 15){
                    this.$notify({
                      title: '警告',
                      message: '最多添加15个课程分类',
                      type: 'warning'
                    })
                    return false
                  }
                }
                courselist.push(obj)
              }

              /* a.attr('linkobj', JSON.stringify(obj))
               a.attr('href','/platform-1-0-0.html?pid='+ twocourseradio) */
            } else if (!threecourse) {
              let threecourseradio = $("input[name='threecourse']:checked").attr('sid');
              let sname = $("input[name='threecourse']:checked").attr('sname');
              if(threecourseradio == undefined ||threecourseradio == 'undefined' || threecourseradio == ''){
                this.$notify({
                  title: '警告',
                  message: '请点击课程子类',
                  type: 'warning'
                })
                return false
              }
              courseactive = 3;
              let sourceid = self.sourceid?self.sourceid:'0';
              obj = {
                course : 3,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                sid: threecourseradio,
                sname : sname,
                pid : self.pid,
                pname : $("input[pid='"+self.pid+"']").attr('pname')
              }
              a.attr('linkobj', JSON.stringify(obj))
              if(threecourseradio == 0){
                a.attr('href','/platform-1-0-0.html?pid='+ self.pid)
              }else{
                a.attr('href','/platform-1-0-0.html?pid='+ self.pid + '&sid=' + threecourseradio)
              }
            } else if (!fourcourse) {
              let fourcourseradio = $("input[name='fourcourse']:checked").attr('folderid');
              let itemid = $("input[name='fourcourse']:checked").attr('itemid');

              if(fourcourseradio == undefined ||fourcourseradio == 'undefined' || fourcourseradio == ''){
                this.$notify({
                  title: '警告',
                  message: '请选择课程',
                  type: 'warning'
                })
                return false
              }
              courseactive = 4;
              let sourceid = self.sourceid?self.sourceid:'0';
              let sid = self.sid?self.sid:'0';
              obj = {
                course : 4,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+sourceid+"']").attr('sourcename'),
                sid: self.sid || '0',
                sname : $("input[sid='"+sid+"']").attr('sname'),
                pid : self.pid,
                pname : $("input[pid='"+self.pid+"']").attr('pname'),
                folderid : fourcourseradio,
                itemid : itemid,
                foldername : $("input[folderid='"+fourcourseradio+"']").attr('foldername'),
                // ----------- update start------------
                summary: $("input[folderid='"+fourcourseradio+"']").attr('summary'),
                img: $("input[folderid='"+fourcourseradio+"']").attr('img'),
                studynum: $("input[folderid='"+fourcourseradio+"']").attr('studynum'),
                viewnum: $("input[folderid='"+fourcourseradio+"']").attr('viewnum'),
                // ----------- update end------------
                folderq : self.folderq,
                folderpage : self.folderpage,
                folderpagesize: self.folderpagesize
              }

              // ----------- update start------------
              /*if (!parameter) {
                a.attr('linkobj', JSON.stringify(obj))
                a.attr('href','/courseinfo/' + itemid + '.html')
              }*/
              // ----------- update end------------
            }
            break
        }
        self.visdialog = false
      },
      getsonNews(code,son,label){
        let self = this;
        self.navcode = code;
        if(son){
          self.handleNewsItemChange(code)
          self.getCount(code)
          $('.oneselnews').hide();
          $('.twoselnews').hide();
          $('.threeselnews').show();
          $('.newsseaq').show();
          $('.newsthreembx a').text(label);
          $('.newsthreembx a').attr('code',code)
          $('.newsthreembx').show()
          self.newsobj.code1 = code;
          self.newsobj.son1 = son;
          self.newsobj.label1 = label;
        }else{
          for(var i=0;i<self.NewsOptions.length;i++){
            if(code == self.NewsOptions[i].value){
              if(self.NewsOptions[i].children.length){
                self.sonNewsOptions = self.NewsOptions[i].children;
                $('.oneselnews').hide();
                $('.threeselnews').hide();
                $('.newsseaq').hide();
                $('.twoselnews').show();
                self.newsobj.len = 1;
              }else{
                self.handleNewsItemChange(code)
                self.getCount(code)
                $('.oneselnews').hide();
                $('.twoselnews').hide();
                $('.threeselnews').show();
                $('.newsseaq').show();
                self.newsobj.len = '';
              }
              $('.newstwombx a').text(label);
              $('.newsthreembx a').attr('code',code)
              $('.newstwombx').show()
            }
          }
          self.newsobj.code = code;
          self.newsobj.son = son;
          self.newsobj.label = label;
        }
        self.newschoolactive = false;
        self.cwidon = false
      },
      handleIconClick(){
        let self = this;
        self.handleNewsItemChange(self.navcode)
        self.getCount(self.navcode)
      },
      handleIconteaClick(){
        let self = this;
        self.hrefgetealist()
      },
      handleIconfolderClick(){
        let self = this;
        self.folderpage = 1;
        if(!self.sourceid){
          self.getcourselist(self.pid,self.sid)
        }else{
          self.getitemcourselist(self.sourceid,self.pid,self.sid)
        }
      },
      handleIconcwClick(){
        let self = this;
        self.cwpage = 1;
        self.getcwlist(self.folderid,self.sourceid)
      },
      handlenewsSizeChange(val){
        let self = this;
        self.newspagesize = val;
        self.newspage = 1;
        self.handleNewsItemChange(self.navcode)
        self.getCount(self.navcode)
      },
      handlenewsCurrentChange(val){
        let self = this;
        self.newspage = val;
        self.handleNewsItemChange(self.navcode)
        self.getCount(self.navcode)
      },
      handlefolderSizeChange(val){
        let self = this;
        self.folderpagesize = val;
        self.folderpage = 1;
        if(!self.sourceid){
          self.getcourselist(self.pid,self.sid)
        }else{
          self.getitemcourselist(self.sourceid,self.pid,self.sid)
        }
      },
      handlefolderCurrentChange(val){
        let self = this;
        self.folderpage = val;
        if(!self.sourceid){
          self.getcourselist(self.pid,self.sid)
        }else{
          self.getitemcourselist(self.sourceid,self.pid,self.sid)
        }
      },
      handlecwSizeChange(val){
        let self = this;
        self.cwpagesize = val;
        self.cwpage = 1;
        self.getcwlist(self.folderid,self.sourceid)
      },
      handlecwCurrentChange(val){
        let self = this;
        self.cwpage = val;
        self.getcwlist(self.folderid,self.sourceid)
      },
      indexinit(resetting){
        let self = this;
        let a = $('.on_module a')
        self.init();
        if(resetting){
          a.removeAttr('linkobj');
          a.removeAttr('linktype');
          a.removeAttr('href');
          a.removeAttr('target');
          a.removeClass('registerEvent')
          a.removeClass('getUserNameEvent')
          a.removeClass('loginEvent')
        }
      },
      newsmbxinit(num){
        let self = this;
        let mbxnum = 0;
        let onembx = $('.newsonembx').is(':hidden');
        let twombx = $('.newstwombx').is(':hidden');
        let threembx = $('.newsthreembx').is(':hidden');
        if(!onembx){
          mbxnum ++
        }
        if(!twombx){
          mbxnum ++
        }
        if(!threembx){
          mbxnum ++
        }
        if(mbxnum == 3){
          $('.newsthreembx').hide();
          $('.oneselnews').hide();
          $('.threeselnews').hide();
          $('.newsseaq').hide();
          $('.twoselnews').show();
        }else{
          $('.newsthreembx').hide();
          $('.oneselnews').hide();
          $('.threeselnews').show();
          $('.newsseaq').show();
          $('.twoselnews').hide();
        }
        $('.newsthreembx a').text('');
        $('.newsthreembx a').attr('code','');
      },
      getmorelogin(){
        let self = this
        $('.oneselinlineschool').hide();
        $('.twoselinlineschool,.inlineschooltwombx').show();
        self.newschoolactive = false;
        self.cwidon = false
      },
      getsoncourse(sourceid,name,linkobj){
        let self = this;
        let id = sourceid;
        if(id == 0){
          self.getcoursesort(linkobj)
        }else{
          self.getitemlist(id,'','',linkobj)
        }
        $('.oneselcourse').hide();
        $('.twoselcourse').show();
        if(name){
          $('.coursetwombx a').text(name)
          self.sourceid = sourceid;
        }else{
          $('.coursetwombx a').text('本校课程')
          self.sourceid = '';
        }
        $('.coursetwombx').show()
      },
      getsidcourse(pid,name,linkobj){
        let self = this;
        self.cwidon = false
        let list = self.coursesort;
        //let item = self.itemlist;
        let sidlist  = [];
        let pidcourse = [];
        let names =  $('.coursetwombx a').text();
        for(var i=0;i<list.length;i++){
          if(pid == list[i].pid){
            sidlist = list[i].sorts || []
          }
        }
        self.pid = pid;
        self.sidlist = sidlist
        $('.coursethreembx a').text(name)
        $('.coursethreembx').show()
        $('.oneselcourse,.twoselcourse').hide();
        $('.threeselcourse').show();
        self.$nextTick( () => {
          if(linkobj){
            if(linkobj.course > 3){
              self.folderpage = linkobj.folderpage;
              self.folderpagesize = linkobj.folderpagesize;
              self.folderq = linkobj.folderq;
              self.infolderid = linkobj.folderid;
              self.getcourseall(linkobj.sid,linkobj.sname,linkobj)
            }
          }
        })
      },
      getcourseall(sid,name,linkobj){
        let self = this;
        if(!linkobj){
          self.folderpage = 1;
        }
        let sids = sid || '';
        if(self.sourceid){
          self.getitemcourselist(self.sourceid,self.pid,sids,linkobj)
        }else{
          self.getcourselist(self.pid,sids,linkobj)
        }
        $('.coursefourmbx a').text(name)
        $('.coursefourmbx').show()
        $('.oneselcourse,.twoselcourse,.threeselcourse').hide();
        $('.fourselcourse').show();
        self.seaqshow = 1;
        self.sid = sids;
        self.cwidon = false
      },
      coursebxinit(num){
        let self = this;
        if(num == 2){
          $('.coursethreembx,.coursefourmbx,.coursefivembx,.threeselcourse,.fourselcourse,.fiveselcourse').hide()
          $('.twoselcourse').show();
          self.seaqshow = 0;
          self.cwidon = false
        }else if(num == 3){
          $('.coursefourmbx,.coursefivembx,.fourselcourse,.fiveselcourse').hide()
          $('.threeselcourse').show()
          self.seaqshow = 0;
          self.cwidon = false
        }else if(num == 4){
          $('.coursefivembx,.fiveselcourse').hide()
          $('.fourselcourse').show()
          self.seaqshow = 1;
          self.cwidon = false
        }
      },
      getcwlistall(folderid,name,fprice,itemid,page,cwid,cwidtype){
        let self = this;
        if(page){
          self.cwpage = 1;
        }
        self.folderid = folderid;
        self.fprice = fprice;
        self.itemid = itemid;
        self.getcwlist(folderid,self.sourceid,cwid,cwidtype)
        $('.coursefivembx a').text(name)
        $('.coursefivembx').show()
        $('.oneselcourse,.twoselcourse,.threeselcourse,.fourselcourse').hide();
        $('.fiveselcourse').show();
        self.seaqshow = 2;
        if (self.parameter.thatName == 'coursecw' || self.parameter.thatName == 'coursecw|player'){
          self.cwidon = false
          self.cwidtype = '2'
        }else{
          self.cwidon = true
          self.cwidtype = '1'
        }
      },
      checkedincode(incode){
        let self = this;
        $("input[name='onenews']").removeAttr('checked');
        $('.newsradioreset').click()
        $("input[code='"+incode+"']").attr('checked','true');
      }
    }
  }
</script>
<style>
  .hrefdialog{
    height: 100%;
    width: 100%;
  }
  .hrefdialog *{
    font-size: 14px;
  }
  .hrefdialog .el-dialog__title{
    font-size: 16px;
  }
  .hrefdialog .el-dialog--hrefs .el-dialog{
    width: 1000px;
    /*height: 720px;*/
  }
  .hrefdialog .el-dialog--hrefs .el-dialog__body{
    padding: 5px 0px;
  }
  .hrefdialog .tabs-vertical{
    background-color: #fff;
    /* box-shadow: 0 0 22px #E2E2E2 inset, 2px 2px 3px #E8E8E8; */
    border: 1px solid #CECECE;
    border-right:none;
    border-left:none;
    margin: 20px auto 10px;
    border-radius: 2px;
    height: 552px;
    color: #333333;
  }
  .hrefdialog .tabs-vertical .mbx{
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #CECECE;
    text-align: left;
    line-height: 41px;
    padding-left: 15px;
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    box-sizing:border-box;
  }
  .hrefdialog .tabs-vertical .mbx a{
    cursor: pointer;
    display: inline-block;
    max-width: 160px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    float: left;

  }
  .hrefdialog .tabs-vertical .mbx a:hover{
    text-decoration: none;
    color: #20a0ff;
  }
  .hrefdialog .tabs-vertical .coursembx a{
    max-width: 160px;
  }
  .hrefdialog .tabs-vertical .mbx span{
    display: inline-block;
    float: left;
  }

  .hrefdialog .tabs-vertical .newscont,.hrefdialog .tabs-vertical .inlineschoolcont,.hrefdialog .tabs-vertical .teacont,.hrefdialog .tabs-vertical .coursecont,.hrefdialog .tabs-vertical .hrefcont{
    padding: 20px 15px;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio,.hrefdialog .tabs-vertical .coursecont .courseradio{
    width: 20%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio a,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio a,.hrefdialog .tabs-vertical .coursecont .courseradio a{
    width:110px;
    height:65px;
    text-align:center;
    overflow:hidden;
    display: inline-block;
    background:#F2F2F2;
    margin-left: 20px;
    cursor: pointer;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio input ,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio input,.hrefdialog .tabs-vertical .coursecont .courseradio input{
    position: absolute;
    top: 36%;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio a span ,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio  a span,.hrefdialog .tabs-vertical .coursecont .courseradio a span{
    display:inline-block;
    vertical-align:middle;
  }
  .hrefdialog .threeselnews,.hrefdialog .twoselnews{
    display: none;
  }
  .hrefdialog .threeselnews .el-radio-group .el-radio{
    margin-left: 0px;
    width: 880px;
    height: 48px;
    line-height: 48px;
    border-bottom:1px solid #d9d9d9;
    text-indent: 5px
  }
  .hrefdialog .threeselnews .el-radio-group .el-radio:last-child{
    border-bottom: none ;
  }
  .hrefdialog .threeselnews .el-radio-group .el-radio .el-radio__input{
    display: inline-flex;
    float: left;
    margin-top: 15px;
    margin-left: 10px;
  }
  .hrefdialog .vc-font2 .vc-fix{display:inline-block;width:0;height:100%;line-height:100%;vertical-align:middle;visibility: hidden;}
  .hrefdialog .teacherlist{
    width: 16.5%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog .teacherlist input{
    position: absolute;
    top: 36%;
  }
  .hrefdialog .teacherlist a{
    width: 100px;
    height: 100px;
    text-align: center;
    overflow: hidden;
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
  }
  .hrefdialog .teacherlist a img{
    width: 60px;
    height: 60px;
    border-radius: 50%
  }
  .hrefdialog .teacherlist a h3{
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .hrefdialog .courselist{
    width: 20%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog  .courselist input{
    position: absolute;
    left: 5px;
    top: 28%;
  }
  .hrefdialog  .courselist a{
    width: 148px;
    height: 120px;
    text-align: center;
    overflow: hidden;
    display: inline-block;
    margin-left: 20px;
    cursor: pointer;
    /* border:1px solid #fff; */

  }
  .hrefdialog  .courselist a:hover{
    text-decoration: none;
  }
  .hrefdialog  .courselist a img{
    width: 135px;
    height: 80px;
  }
  .hrefdialog  .courselist a h3{
    display:inline-block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .hrefdialog .courselist a h3{
    max-width: 120px;
    font-size: 12px;
    font-weight: 500;
  }
  .hrefdialog  .courselist a h3.coursetitle{
    max-width: 104px;
  }


  /* The tabs */

  .hrefdialog .tabs-vertical ul.tabsul{
    float: left;
    list-style: none;
    text-align: left;
    margin: 0;
    padding-left: 0;
    height: 100%;
    border-right: 1px solid #CECECE;
  }

  .hrefdialog .tabs-vertical ul.tabsul li{
    /* margin-right: -1px; */
    border-bottom: 1px solid #CECECE;
  }

  .hrefdialog .tabs-vertical ul.tabsul li a{
    display: block;
    text-decoration: none;
    color: #656a6d;
    border: 1px solid transparent;
    border-right: 0;
    border-left: 0;
    width: 88px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .hrefdialog .tabs-vertical ul.tabsul li a.tab-active {
    background-color: #f3f3f3;
    /*  border-color: #dddddd;
    background-color: #ffffff;
    box-shadow: 0px 2px 0px #EFEFEF; */
  }

  .hrefdialog .tabs-vertical ul.tabsul li:first-child a{
    border-top: 0;
  }

  /* The content */

  .hrefdialog .tabs-vertical .tabs-content-placeholder{
    overflow: hidden;
    font-weight: normal;
    background-color: #fff;
    /* margin: 0 auto; */
    /* box-shadow: -3px 0 0px #F3F3F3; */
    height: 100%
  }

  .hrefdialog .tabs-vertical .tabs-content-placeholder div.tab-content{
    display: none;
  }
  .hrefdialog .tabs-vertical .tabs-content-placeholder div.tab-content-href{
    padding: 30px 25px;
    box-sizing: border-box;
  }
  .hrefdialog .tabs-vertical .tabs-content-placeholder div.tab-content-active{
    display: block;
    height: 100%;
  }

  .hrefdialog .tabs-vertical .tabs-content-placeholder div p{
    color: #565a5c;
    line-height: 1.5;
    text-align: left;
    margin: 5px 0 20px;
  }

  .hrefdialog .tabs-vertical .tabs-content-placeholder div img{
    max-width: 100%;
    margin-top:5px;
  }
  .hrefdialog .el-dialog__body{
    padding: 5px 10px
  }
  .hrefdialog .vc-font2:hover{
    border:1px solid red;
    box-sizing: border-box;
  }
  .hrefdialog .teacherlist .vc-font2{
    padding-top: 5px;
    box-sizing: border-box;
    height: 100px;
  }
  /* update 隐藏选中框*/
  .hrefdialog .inputCoruse input[name='onecourse'],
  .hrefdialog .inputCoruse input[name='twocourse'],
  .hrefdialog .inputCoruse input[name='threecourse']{
    display: none;
  }

  .hrefdialog .inputCwlist input[name='onecourse'],
  .hrefdialog .inputCwlist input[name='twocourse'],
  .hrefdialog .inputCwlist input[name='threecourse'],
  .hrefdialog .inputCwlist input[name='fourcourse']{
    display: none;
  }
  /* update */
  .hrefdialog .inputAddcoursetype input[name='onecourse']{
    display: none;
  }
</style>
