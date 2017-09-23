<template>
  <div class="hrefdialog">
    <el-dialog
      title="设置链接"
      :visible.sync="visdialog"
      size="hrefs">
      <el-row>
        <div id="tabs-vertical" class="tabs-vertical" >
          <ul class="tabsul">
            <li>
              <a class="tab-active" type="online" data-index="0" href="javascript:void(0)">链接</a>
            </li>
            <li>
              <a data-index="1"  type="news" href="javascript:void(0)">资讯</a>
            </li>
            <li>
              <a data-index="2"  type="course" href="javascript:void(0)">课程</a>
            </li>
            <li>
              <a data-index="3"  type="teacher" href="javascript:void(0)">教师</a>
            </li>
            <li>
              <a data-index="4"  type="onlineschool" href="javascript:void(0)">网校</a>
            </li>
          </ul>
          <div class="tabs-content-placeholder">
            <div class="tab-content-active tab-content tab-content-href"> 
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
            <div class="tab-content"> 
                  <div class="newsmbx mbx">
                      <span class="newsonembx"><a @click="indexinit()">首页</a> ></span>
                      <span class="newstwombx" style="display: none;"><a @click="newsmbxinit(2)" ></a> ></span>
                      <span class="newsthreembx"  style="display: none;"><a></a> ></span>
                  </div>
                  <div class="newscont">
                    <form class="oneselnews">
                      <div class="newsradio" v-for="(item,index) in NewsOptions">
                        <input :code="item.value"  name="onenews" type="radio" value="" />
                        <a @click="getsonNews(item.value,0,item.label)" class="vc-font2"><span class="vc-inner">{{item.label}}</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                      </div>
                      <div style="clear: both;"></div>
                    </form>
                    <div class="nodata" v-if="!NewsOptions.length"></div>
                    <form class="twoselnews">
                      <div class="newsradio" v-for="(item,index) in sonNewsOptions">
                        <input :code="item.value" name="twonews" type="radio" value="" />
                        <a @click="getsonNews(item.value,1,item.label)" class="vc-font2"><span class="vc-inner">{{item.label}}</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                      </div>
                      <div style="clear: both;"></div>
                    </form>
                    <el-col class="threeselnews" >
                        <el-col>
                          <el-input icon="search" style="width: 200px;float: right;" type="text" size="small" placeholder="请输入资讯标题" v-model="newsq" :on-icon-click="handleIconClick"></el-input>
                        </el-col>
                        <el-col style="margin-top: 10px;max-height: 393px; overflow-x: hidden;border: 1px solid #CECECE;">
                          <div class="nodata" style="display: none;"></div>
                          <el-radio-group v-model="threenewsradio">
                            <el-radio  v-for="(item,index) in newslist" :label="item.itemid" :key="item.itemid">
                              <div :title="item.subject" style="width: 360px;display: inline-block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;float: left;" >
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
            <div  class="tab-content">
                <div class="coursembx mbx">
                      <span class="courseonembx"><a @click="indexinit()">首页</a> ></span>
                      <span class="coursetwombx" style="display: none;"><a  @click="coursebxinit(2)"></a> ></span>
                      <span class="coursethreembx"  style="display: none;"><a  @click="coursebxinit(3)"></a> ></span>
                      <span class="coursefourmbx" style="display: none;"><a  @click="coursebxinit(4)"></a> ></span>
                      <span class="coursefivembx"  style="display: none;"><a  @click="coursebxinit(5)"></a> ></span>
                  </div>
                  <div class="coursecont" style="max-height: 393px; overflow-x: hidden;">
                    <form class="oneselcourse">
                     <div class="courseradio">
                        <input sourceid="0" sourcename="本校课程"  name="onecourse" type="radio" value="" />
                        <a @click="getsoncourse(0)" class="vc-font2"><span class="vc-inner">本校课程</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                      </div>
                      <div class="courseradio" v-for="(item,index) in schsourcelist">
                        <input :sourceid="item.sourceid" :sourcename="item.name"  name="onecourse" type="radio" value="" />
                        <a @click="getsoncourse(item.sourceid,item.name)" class="vc-font2"><span class="vc-inner">{{item.name}}</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                      </div>
                      <div style="clear: both;"></div>
                    </form>
                    <form class="twoselcourse" style="display: none;">
                      <div class="courseradio" v-for="(item,index) in coursesort">
                        <input :pid="item.pid" :pname="item.pname" :checked="inpid == item.pid?true:false"  name="twocourse" type="radio" value="" />
                        <a  @click="getsidcourse(item.pid,item.pname)" class="vc-font2"><span class="vc-inner">{{item.pname}}</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                      </div>
                      <div style="clear: both;"></div>
                    </form>
                    <form class="threeselcourse" style="display: none;">
                      <div class="courseradio" v-if="sourceid">
                        <input sid="0"  name="threecourse" :checked="insid == '0'?true:false" sname="其他" type="radio" value="" />
                        <a  @click="getcourseall(0,'其他')" class="vc-font2"><span class="vc-inner">其他</span><span class="vc-fix">此标签不能换行</span></a>
                      </div>

                      <div class="courseradio" v-for="(item,index) in sidlist">
                        <input :sid="item.sid" :sname="item.sname" :checked="insid == item.sid?true:false"  name="threecourse" type="radio" value="" />
                        <a  @click="getcourseall(item.sid,item.sname)" class="vc-font2"><span class="vc-inner">{{item.sname}}</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                      </div>
                      <div style="clear: both;"></div>
                    </form>
                    <form class="fourselcourse" style="display: none;">
                      <el-col>
                        <el-input  icon="search" :on-icon-click="handleIconfolderClick" style="width: 200px;float: right;" type="text" size="small" placeholder="请输入课程名称" v-model="folderq"></el-input>
                      </el-col>
                      <div class="nodata" v-if="!courselist.length"></div>
                      <!-- <div class="courseradio" v-for="(item,index) in courselist">
                        <input :folderid="item.folderid"  name="fourcourse" type="radio" value="" />
                        <a @click="getcwlistall(item.folderid,item.foldername)" class="vc-font2"><span class="vc-inner">{{item.foldername}}</span><span class="vc-fix">此标签不能换行</span></a>
                      </div> -->
                      <label  class="courselist" v-for="(item,index) in courselist">
                        <input :folderid="item.folderid" :itemid="item.itemid"  :checked="infolderid == item.folderid?true:false" :foldername="item.foldername"  name="fourcourse" type="radio" value="" />
                        <a  class="vc-font2">
                          <img :src="item.img" ><br/>
                          <h3>{{item.foldername}}</h3>
                        </a>
                      </label> 
                     <!--  @click="getcwlistall(item.folderid,item.foldername)" -->
                      <div style="clear: both;"></div>
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
                      <el-col>
                        <el-input  icon="search" :on-icon-click="handleIconcwClick" style="width: 200px;float: right;" type="text" size="small" placeholder="请输入课件名称" v-model="cwq"></el-input>
                      </el-col>
                      <div class="nodata" v-if="!cwlist.length"></div>
                      <el-col v-for="(item,index) in cwlist" :key="item.sname">
                        <h3>{{item.sname}}</h3>
                        <label  class="courselist" v-for="(items,indexs) in item.cwlist" :key="items.cwid">
                          <input :cwid="items.cwid" :cwname="items.title"  name="fivecourse" type="radio" value="" />
                          <a class="vc-font2">
                            <img :src="items.face" ><br/>
                            <h3>{{items.title}}</h3>
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
            <div class="tab-content teacont">
              <el-col>
                <el-input  icon="search" :on-icon-click="handleIconteaClick" style="width: 200px;float: right;" type="text" size="small" placeholder="请输入教师姓名" v-model="hrefteaq"></el-input>
              </el-col>
              <el-col style="height: 415px;overflow-x: hidden;">
                <form >
                  <label  class="teacherlist" v-for="(item,index) in tealist">
                    <input :code="item.uid"  name="teacher" type="radio" value="" />
                    <a class="vc-font2">
                      <img :src="item.face" ><br/>
                      <h3>{{item.realname}}</h3>
                    </a>
                  </label> 
                </form>
              </el-col>
            </div>
            <div class="tab-content">
              <div class="inlineschool mbx">
                  <span class="inlineschoolonembx"><a @click="indexinit()">首页</a> ></span>
                  <span class="inlineschooltwombx" style="display: none;"><a>登录</a> ></span>
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
                      <a @click="getmorelogin()" class="vc-font2"><span class="vc-inner">登录</span><span class="vc-fix"><!-- 此标签不能换行 --></span></a>
                    </div>
                  </form>
                  <form class="twoselinlineschool" style="display: none;">
                    <label class="inlineschoolradio">
                      <input code="login"  name="logintype" type="radio" value="" />
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
                  </form>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visdialog = false">取 消</el-button>
        <el-button type="primary" @click="dialogEvent" >确 定</el-button>
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
        visdialog:false,
        edithref:'',
        showtype:'1',
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
        initemid : '',
        init: function () {
          let self = this;
          self.showtype = '1';
          self.edithref = '';
          self.newsq = '';
          self.folderq = '';
          self.hrefteaq = '';
          $('.threeselnews').hide();
          $('.twoselnews').hide();
          $('.oneselnews').show();
          $('.newstwombx a,.newsthreembx a').text('');
          $('.newsthreembx a,.newsthreembx a').attr('code','')
          $('.newstwombx,.newsthreembx').hide()
          $('.inlineschooltwombx').hide()
          $('.oneselinlineschool').show()
          $('.twoselinlineschool').hide()
          $('.oneselcourse').show();
          $('.twoselcourse,.coursetwombx,.coursethreembx,.coursefourmbx,.coursefivembx,.threeselcourse,.fourselcourse,.fiveselcourse').hide();
          self.hrefgetealist() 
          /*let onenews =  $("input[name=onenews]");
          let twonews =  $("input[name=twonews]");
          let lenone =  onenews.length;
          let lentwo =  twonews.length;
          let i = 0; 
          let j = 0;   
          for(; i < lenone; i++){ 
            onenews[i].checked = false; 
            onenews[i].removeAttribute("checked"); 
          } 
          for(; j < lentwo; j++){ 
            twonews[i].checked = false; 
            twonews[i].removeAttribute("checked"); 
          }*/
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
          self.$http.get(window.host + '/aroomv3/schsource.html', {
            params: {
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data
            self.schsourcelist = list;
          }, function (response) {
            console.log(response)
          })
        },
        getcoursesort:function(linkobj){
          let self = this
          self.$http.get(window.host + '/aroomv3/course/coursesort.html', {
            params: {
              showbysort : 0
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data
            self.coursesort = list;
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
          self.$http.get(window.host + '/aroomv3/schsource/itemlist.html', {
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
          })

        },
        getcourselist:function(pid,sid){
          let self = this
          self.$http.get(window.host + '/aroomv3/course/courselist.html', {
            params: {
              pid : pid || '',
              sid : sid || '',
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
          }, function (response) {
            console.log(response)
          })

        },
        getitemcourselist:function(sourceid,pid,sid){
          let self = this
          self.$http.get(window.host + '/aroomv3/schsource/itemlist.html', {
            params: {
              q:'',
              sourceid : sourceid,
              pid : pid || '',
              sid : sid || ''
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.itemlist;
            if(list.length){
              for(var i=0;i<list.length;i++){
                list[i].foldername = list[i].iname
                if(!list[i].img || list[i].img == undefined || list[i].img =='undefined'){
                  list[i].img = 'http://static.ebanhui.com/ebh/tpl/default/images/folderimgs/course_cover_default_247_147.jpg';
                }
              }
            }

            self.courselist = list;

          }, function (response) {
            console.log(response)
          })

        },
        getcwlist:function(folderid,sourceid){
          let self = this
          self.$http.get(window.host + '/aroomv3/course/cwlist.html', {
            params: {
              folderid : folderid,
              page:self.cwpage,
              pagesize:self.cwpagesize,
              s : self.cwq,
              sourceid: sourceid || ''
            }
          }, {emulateJSON: true}).then(function (response) {
            let list = response.data.data.cwlist;
            self.cwlist = list;
            self.cwcount = response.data.data.cwcount;
          }, function (response) {
            console.log(response)
          })
        },
        getNewsData: function () {
          var self = this
          self.$http.get(window.host + '/aroomv3/news/getNewsCategorys.html', {
            params: {}
          }, {emulateJSON: true}).then(function (response) {
            if (response.data.code === 0) {
              
              let navList = response.data.data
              let obj = []
              for (let i = 0, len = navList.length; i < len; i++) {
                let item = navList[i]
                if (item.code.length < 4 || item.code === 'news') {
                  let items = {
                    label: item.name,
                    value: item.code,
                    children: []
                  }
                  if (item.subnav) {
                    for (let j = 0, jen = item.subnav.length; j < jen; j++) {
                      let jtem = item.subnav[j]
                      let jtems = {
                        label: jtem.name,
                        value: jtem.code,
                        children: []
                      }
                      items.children.push(jtems)
                    }
                  }
                  obj.push(items)
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
            page: self.newspage
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
      show:function(){
        let self = this;
        self.visdialog = true;
        self.$nextTick( () => {
          let linktype = $('.on_module a').attr('linktype');
          let linkobj =  $('.on_module a').attr('linkobj');
          linkobj = linkobj?$.parseJSON(linkobj):'';
          $('ul.tabsul li a').removeClass('tab-active')
           $('.tabs-content-placeholder .tab-content').removeClass('tab-content-active')
          if(linktype == 'news'){
            $('ul.tabsul li a[data-index=1]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(1).addClass('tab-content-active')
            if(linkobj.active == 3){
              if(linkobj.news.len){
                self.getsonNews(linkobj.news.code,linkobj.news.son,linkobj.news.label)
                setTimeout(function(){
                  self.newsq = linkobj.q;
                  self.newspagesize =  linkobj.pagesize;
                  self.newspage = linkobj.page;
                  self.newscode = linkobj.newscode;
                  self.getsonNews(linkobj.news.code1,linkobj.news.son1,linkobj.news.label1)
                },0)
              }else{
                self.newsq = linkobj.q;
                self.newspagesize =  linkobj.pagesize;
                self.newspage = linkobj.page;
                self.newscode = linkobj.newscode;
                self.getsonNews(linkobj.news.code,linkobj.news.son,linkobj.news.label)
              }
            }else if(linkobj.active == 2){
              self.getsonNews(linkobj.news.code,linkobj.news.son,linkobj.news.label)
              setTimeout(function(){
                  $("input[code='"+linkobj.newscode+"']").attr('checked','true');
              },0)        
            }else{
              $("input[code='"+linkobj.newscode+"']").attr('checked','true');
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
            $("input[code='"+linkobj.teauid+"']").attr('checked','true');
          }else if(linktype == 'onlineschool'){
            $('ul.tabsul li a[data-index=4]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(4).addClass('tab-content-active')
            if(linkobj.oneinlineschool == 'QQ' || linkobj.oneinlineschool == 'WeChat' || linkobj.oneinlineschool == 'weibo'){ 
                self.getmorelogin()       
            }
            $("input[code='"+linkobj.oneinlineschool+"']").attr('checked','true');
          }else{
            $('ul.tabsul li a[data-index=0]').addClass('tab-active')
            $('.tabs-content-placeholder .tab-content').eq(0).addClass('tab-content-active')
            self.edithref = linkobj.href;
          }
          let widget = $('#tabs-vertical');
          let tabs = widget.find('ul.tabsul a'),
          content = widget.find('.tabs-content-placeholder > div');
          tabs.on('click', function (e) {
            e.preventDefault();
            let index = $(this).data('index');
            tabs.removeClass('tab-active');
            content.removeClass('tab-content-active');
            $(this).addClass('tab-active');
            content.eq(index).addClass('tab-content-active');
            self.init()
          });
        })
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
                      $('.twoselnews').show();
                      self.newsobj.len = 1;
                }else{
                    self.handleNewsItemChange(code)
                    self.getCount(code)
                    $('.oneselnews').hide();
                    $('.twoselnews').hide();
                    $('.threeselnews').show();
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
        self.getcourselist(self.pid,self.sid)
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
        self.getcourselist(self.pid,self.sid)
      },
      handlefolderCurrentChange(val){
        let self = this;
        self.folderpage = val;
        self.getcourselist(self.pid,self.sid)
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
      indexinit(){
        let self = this;
        self.init();
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
          $('.twoselnews').show();
        }else{
          $('.newsthreembx').hide();
          $('.oneselnews').hide();
          $('.threeselnews').show();
          $('.twoselnews').hide();
        }
        $('.newsthreembx a').text('');
        $('.newsthreembx a').attr('code','');
      },
      getmorelogin(){
        let self = this
        $('.oneselinlineschool').hide();
        $('.twoselinlineschool,.inlineschooltwombx').show();
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
         
         let list = self.coursesort;
         let item = self.itemlist;
         let sidlist  = [];
         let pidcourse = [];
         let names =  $('.coursetwombx a').text();
         if(names == '本校课程'){
            for(var i=0;i<list.length;i++){
              if(pid == list[i].pid){
                sidlist = list[i].sorts
              }
            }
         }else{
            for(var i=0;i<item.length;i++){
              if(pid == item[i].pid){
                sidlist = item[i].sorts
              }
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
              self.getcourseall(linkobj.sid,linkobj.sname)
            }
          }
         })
      },
      getcourseall(sid,name){
        let self = this;
        let sids = sid || '';
        if(self.sourceid){
          self.getitemcourselist(self.sourceid,self.pid,sids)
        }else{
          self.getcourselist(self.pid,sids)
        }
        $('.coursefourmbx a').text(name)
        $('.coursefourmbx').show()
        $('.oneselcourse,.twoselcourse,.threeselcourse').hide();
        $('.fourselcourse').show();
        self.sid = sids;
        
      },
      coursebxinit(num){
        let self = this;
        if(num == 2){
            $('.coursethreembx,.coursefourmbx,.coursefivembx,.threeselcourse,.fourselcourse,.fiveselcourse').hide()
            $('.twoselcourse').show()
        }else if(num == 3){
            $('.coursefourmbx,.coursefivembx,.fourselcourse,.fiveselcourse').hide()
            $('.threeselcourse').show()
        }else if(num == 4){
            $('.coursefivembx,.fiveselcourse').hide()
            $('.fourselcourse').show()
        }
      },
      getcwlistall(folderid,name){
        let self = this;
        self.getcwlist(folderid,self.sourceid)
        $('.coursefivembx a').text(name)
        $('.coursefivembx').show()
        $('.oneselcourse,.twoselcourse,.threeselcourse,.fourselcourse').hide();
        $('.fiveselcourse').show();
        self.folderid = folderid;
      },
      dialogEvent: function () { // 编辑文本窗口
        let self = this;
        let obj;
        let a = $('.on_module').find('a');
        let linkType = $('a.tab-active').attr('type')
        let origin = window.location.origin
        a.removeClass('registerEvent')
        a.removeClass('getUserNameEvent')
        a.removeClass('loginEvent')
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
              a.attr('href', self.edithref)
              a.attr('linkobj', JSON.stringify(obj))   
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
            let onenews = $('.oneselnews').is(':hidden');
            let twonews = $('.twoselnews').is(':hidden');
            let threenews = $('.threeselnews').is(':hidden');
            if(!onenews){
              news = $("input[name='onenews']:checked").attr('code');
              num = 1;
            }else if(!twonews){
              news = $("input[name='twonews']:checked").attr('code');
              num = 2;
              
            }else if(!threenews){
              news = self.threenewsradio;
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
            let teauid = $("input[name='teacher']:checked").attr('code');
            if(teauid == undefined || teauid == 'undefined' || !teauid) {
              this.$notify({
                title: '警告',
                message: '请选择教师',
                type: 'warning'
              })
              return false
            }
            obj = {
              teauid : teauid,
              q :self.hrefteaq
            }
            a.attr('linkobj', JSON.stringify(obj))
            a.attr('href', '/master/'+teauid+'.html')
          break  
          case 'course':
            let courseactive;
            let onecourse = $('.oneselcourse').is(':hidden');
            let twocourse = $('.twoselcourse').is(':hidden');
            let threecourse = $('.threeselcourse').is(':hidden');
            let fourcourse = $('.fourselcourse').is(':hidden');
            let fivecourse = $('.fiveselcourse').is(':hidden');
            if(!onecourse){
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
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href','/platform.html')
            }else if(!twocourse){
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
              obj = {
                course : 2,
                sourceid: self.sourceid,
                name : $("input[sourceid='"+self.sourceid+"']").attr('sourcename'),
                pid: twocourseradio,
                pname : pname
              }
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href','/platform-1-0-0.html?pid='+ twocourseradio)              
            }else if(!threecourse){
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
              a.attr('linkobj', JSON.stringify(obj))
              if(threecourseradio == 0){
                a.attr('href','/platform-1-0-0.html?pid='+ self.pid)
              }else{
                a.attr('href','/platform-1-0-0.html?pid='+ self.pid + '&sid=' + threecourseradio)
              }
              
            }else if(!fourcourse){
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
                folderq : self.folderq,
                folderpage : self.folderpage,
                folderpagesize: self.folderpagesize
              }
              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href','/courseinfo/' + itemid + '.html')
            }else if(!fivecourse){
              let fivecourseradio = $("input[name='fivecourse']:checked").attr('cwid');
              if(fivecourseradio == undefined ||fivecourseradio == 'undefined' || fivecourseradio == ''){
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
                foldername : $("input[folderid='"+self.folderid+"']").attr('foldername'),
                folderq : self.folderq,
                folderpage : self.folderpage,
                folderpagesize: self.folderpagesize,
                cwid :fivecourseradio,
                cwname : $("input[cwid='"+fivecourseradio+"']").attr('cwname'),
                cwq : self.cwq,
                cwpage : self.cwpage,
                cwpagesize : self.cwpagesize

              }

              a.attr('linkobj', JSON.stringify(obj))
              a.attr('href','/platform.html')
            }
          break  
      }
      a.attr('linktype',linkType)
      a.attr('target','_blank')
      self.visdialog = false
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
  .hrefdialog .el-dialog--hrefs{
    width: 720px;
    /*height: 720px;*/
  }
 .hrefdialog .tabs-vertical{
    background-color: #fff;
    /* box-shadow: 0 0 22px #E2E2E2 inset, 2px 2px 3px #E8E8E8; */
    border: 1px solid #CECECE;
    margin: 20px auto 10px;
    border-radius: 2px;
    height: 552px;
    color: #333333;
 }
 .hrefdialog .tabs-vertical .mbx{
    width: 97%;
    height: 41px;
    border-bottom: 1px solid #CECECE;
    text-align: left;
    line-height: 41px;
    padding-left: 15px;
    display:block;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
  }
  .hrefdialog .tabs-vertical .mbx a{
    cursor: pointer;
    display: inline-block;
    max-width: 200px;
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;    
    float: left;
  }
  .hrefdialog .tabs-vertical .coursembx a{
    max-width: 160px;
  } 
  .hrefdialog .tabs-vertical .mbx span{
    display: inline-block;
    float: left;
  }
  .hrefdialog .tabs-vertical .newscont,.hrefdialog .tabs-vertical .inlineschoolcont,.hrefdialog .tabs-vertical .teacont,.hrefdialog .tabs-vertical .coursecont{
    padding: 20px 15px;
  }
  .hrefdialog .tabs-vertical .newscont .newsradio,.hrefdialog .tabs-vertical .inlineschoolcont .inlineschoolradio,.hrefdialog .tabs-vertical .coursecont .courseradio{
    width: 33.3%;
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
    width: 575px;
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
    width: 33.3%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog .teacherlist input{
    position: absolute;
    top: 36%;
  }
  .hrefdialog .teacherlist a{
    width: 120px;
    height: 127px;
    text-align: center;
    overflow: hidden;
    display: inline-block;
    margin-left: 28px;
    cursor: pointer;
  }
  .hrefdialog .teacherlist a img{
    width: 100px;
    height: 100px;
    border-radius: 50%
  }
  .hrefdialog .teacherlist a h3{
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .hrefdialog .courselist{
    width: 33.3%;
    float: left;
    margin-top: 5px;
    position: relative;
  }
  .hrefdialog  .courselist input{
    position: absolute;
    left: 34px;
    top: 28%;
  }
  .hrefdialog  .courselist a{
    width: 170px;
    height: 100px;
    text-align: center;
    overflow: hidden;
    display: inline-block;
    margin-left: 28px;
    cursor: pointer;
  }
  .hrefdialog  .courselist a img{
    width: 110px;
    height: 65px;
  }
  .hrefdialog  .courselist a h3{
    display:block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
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
}
.hrefdialog .el-dialog__body{
  padding: 5px 10px
}

</style>