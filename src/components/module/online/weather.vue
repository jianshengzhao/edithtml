<template>
  <div class="weather">
    <el-dialog
        title="天气"
        :visible.sync="dialogweather"       
        :close-on-click-modal="false"
        :before-close="beforeclose">
          <div style="margin-top: 10px;">
            <p style="margin: 20px 0 0 20px;">选择样式：</p>
            <ul class="weather-ul">
              <li class="weather-li" style="margin: 0 45px 0 0;">
                <div class="weather-wrap" type="1" style="border-color: #557CE1;">
                  <img src="../assets/img/weathertype1.jpg" alt="天气样式一" />
                  <span class="checked_weather" style="display: block;"></span>
                </div>
                <p class="weather-type">样式一</p>
              </li>
              <li class="weather-li">
                <div class="weather-wrap" type="2">
                  <img src="../assets/img/weathertype2.jpg" alt="天气样式二" />
                  <span class="checked_weather"></span>
                </div>
                <p class="weather-type">样式二</p>
              </li>
              <li class="weather-li" style="margin: 0 45px 0 0;">
                <div class="weather-wrap" type="3">
                  <img src="../assets/img/weathertype3.jpg" alt="天气样式三" />
                  <span class="checked_weather"></span>
                </div>
                <p class="weather-type">样式三</p>
              </li>
              <li class="weather-li">
                <div class="weather-wrap" type="4">
                  <img src="../assets/img/weathertype4.jpg" alt="天气样式四" />
                  <span class="checked_weather"></span>
                </div>
                <p class="weather-type">样式四</p>
              </li>
            </ul>
          </div>
        <span slot="footer">
            <el-button @click="cancelweather" size="large">取 消</el-button>
            <el-button type="primary" @click="confirmweather" size="large">确 定</el-button>
        </span>
    </el-dialog>
    
    <!--类型一-->
    <div id="weather-type1">
      <div class="weather-box weather-type1">
        <div class="centered" style="height: 60%;">
          <p class="weacity">北京</p>
          <div class="weacontent">
            <div class="weatoday">
              <div class="oneimg_box">
                <img class="oneimg_today" src="" alt="" />
              </div>
              <div class="onedetail">
                <p>今天<span class="temp_min_today"></span>℃~<span class="temp_max_today"></span>℃</p>
                <p class="weastatus status_today"></p>
              </div>
            </div>
            <div class="weatomorrow">
              <div class="oneimg_box">
                <img class="oneimg_tomorrow" src="" alt="" />
              </div>
              <div class="onedetail">
                <p>明天<span class="temp_min_tomorrow"></span>℃~<span class="temp_max_tomorrow"></span>℃</p>
                <p class="weastatus status_tomorrow"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!--类型二-->
    <div id="weather-type2">
      <div class="weather-box weather-type2">
        <div class="centered" style="height: 50%;">
          <div class="weaicon_box">
            <img class="imgser" src=""/>
          </div>
          <div class="weadetail_box">
            <div class="weadetail">
              <div><span class="ser_city">北京</span><span class="weatem"><b class="ser_max_temp">21</b>℃</span></div>
              <div><span class="ser_status">多云转阵雨</span>&nbsp;&nbsp;<span class="ser_wind">微风</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!--类型三-->
    <div id="weather-type3">
      <div class="weather-box weather-type3">
        <div class="centered" style="height: 60%;">
          <div class="weatypethd">
            <p class="weatypethd_city">北京</p>
            <p class="imgthd_box">
              <img class="imgthd" src="" alt="" />
            </p>
            <p class="status_thd">多云转小雨</p>
          </div>
          <div class="weatypethd_detail">
            <p style="margin-top: 5%;">温度：
              <span class="thd_temp">
                <span class="thd_min_temp">15</span>℃~<span class="thd_max_temp">15</span>℃
              </span>
            </p>
            <p>风力：<span class="thddescribe windpower">微风</span></p>
            <p>风向：<span class="thddescribe winddir">西风</span></p>
          </div>
        </div>
      </div>
    </div>
    
    <!--类型四-->
    <div id="weather-type4">
      <div class="weather-box weather-type4">
        <div class="centered">
          <div class="detailfor">
            <span class="detailfor_city">北京</span>
            <span class="detailfor_weacon">多云转晴</span>
            <span class="detailfor_tem"><span class="for_min_temp">15</span>℃~<span class="for_max_temp">15</span>℃</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
  import $ from 'jquery'
  export default{
    name: 'weather',
    data: function () {
      return {
        dialogweather:false,
        weathertype:1,
        currentEle_wea:'',
        weatherData:''
      }
    },
    created:function(){
      var self = this;
      let moduleData = self.$parent.datahtml     
        moduleData['toallGroup']['online'].push({
          name: 'weather',
          icon: 'imgicon icon-weather',
          text: '天气'
        }) 

        moduleData['weather'] = { 
          style: 'width:260px; height:140px',
          tool: {
            private: {
              text: '编辑天气',
              class: 'st-weather'
            },
            public: []
          },
          resizeMousemove: function (self, parent, resizeBox) { // 拉伸时的回调  
            let weatherCon = parent.find('.weatherCon')
            weatherCon.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
            resizeBox.css({'width': self.inp_w + 'px','height': self.inp_h + 'px'})
          },
          createEvent: function (self, element, me) {
            self.$refs.weather.show(self,element)
          },
          html: '<div class="weather module addmodule" datatext="天气"><div class="weatherCon"></div></div>'
        }
    },
    methods:{
      //用于主页调用当前模板函数，弹出弹框并加载数据
      show:function(that,element){
            var self = this;
            self.that = that
            self.element = element  
            self.dialogweather = true;
            if (!element.length) {
              self.currentEle_wea = $('.on_module')
          } else {
              self.currentEle_wea = element
          }  
          self.$nextTick( () => {
          let $weatherwrap = $(".weather-wrap");
          $weatherwrap.on("click",function(){
            $(this).css("border-color","#557CE1");
            $(this).children(".checked_weather").show();
            $(this).parent().siblings().children(".weather-wrap").css("border-color","#cccccc");
            $(this).parent().siblings().children(".weather-wrap").children(".checked_weather").hide();
            self.weathertype = $(this).attr("type");
          });
        })
        },
        beforeclose:function(done){
          var self = this;
          if(self.currentEle_wea.find(".weatherCon").children().length < 1){
            let parent = self.element.parent()
              self.that.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
              self.element.remove()        
              self.that.tool.carryLayerEvent(self.that, parent) // 更新图层
          }
          done();
        },
        cancelweather:function(){
          var self = this;
          if(self.currentEle_wea.find(".weatherCon").children().length < 1){
            let parent = self.element.parent()
              self.that.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
              self.element.remove()        
              self.that.tool.carryLayerEvent(self.that, parent) // 更新图层
          }
          self.dialogweather = false;
        },
        confirmweather:function(){
          var self = this;
          self.currentEle_wea.find(".weatherCon").empty();
          self.$http.get(window.host + "/weather.html",
        {},{emulateJSON: true}).then(function(response) {
          var datas = response.data;
          let today = datas[0],tomorrow = datas[1];
          let city = today.city,
            
            //today
            udatetime_today = today.udatetime,      //更新时间
            wind_dir_today = today.direction1,
            temp_min_today = today.temperature2,
            temp_max_today = today.temperature1,
            status_today = today.status1,
            
            //tomorrow
            udatetime_tomorrow = tomorrow.udatetime,  //更新时间
            temp_min_tomorrow = tomorrow.temperature2,
            temp_max_tomorrow = tomorrow.temperature1,
            status_tomorrow = tomorrow.status1

          var imgsrc_today = "http://static.ebanhui.com/ebh/tpl/aroomv3/icon";
          if(status_today.indexOf("小雨") != -1)
            imgsrc_today += "/weaLightrain.png"
          if(status_today.indexOf("中雨") != -1)
            imgsrc_today += "/weaModeraterain.png"  
          if(status_today.indexOf("大雨") != -1)
            imgsrc_today += "/weaHeavyrain.png"
          if(status_today.indexOf("暴雨") != -1)
            imgsrc_today += "/weaBigerrain.png" 
          if(status_today.indexOf("雷阵雨") != -1)
            imgsrc_today += "/weaThundershower.png" 
            
          if(status_today.indexOf("小雪") != -1)
            imgsrc_today += "/weaLightsnow.png"
          if(status_today.indexOf("中雪") != -1)
            imgsrc_today += "/weaModeratesnow.png"
            if(status_today.indexOf("大雪") != -1)
            imgsrc_today += "/weaHeavysnow.png"
          if(status_today.indexOf("暴雪") != -1)
            imgsrc_today += "/weaBigersnow.png" 
            
          if(status_today.indexOf("霾") != -1)
            imgsrc_today += "/weaHaze.png"  
          if(status_today.indexOf("阴") != -1)
            imgsrc_today += "/weaShade.png"
          if(status_today.indexOf("雾") != -1)
            imgsrc_today += "/weaFog.png" 
          
          
          if(status_today.indexOf("多云") != -1)
            imgsrc_today += "/weaCloudy.png"
//          if(status_today.indexOf("多云") != -1)
//            imgsrc_today += "/weaCloudy_night.png"
          if(status_today.indexOf("晴") != -1)
            imgsrc_today += "/weaSunny.png"
//          if(status_today.indexOf("晴") != -1)
//            imgsrc_today += "/weaSunny_night.png"
          
          var imgsrc_tomorrow = "http://static.ebanhui.com/ebh/tpl/aroomv3/icon";
          if(status_tomorrow.indexOf("小雨") != -1)
            imgsrc_tomorrow += "/weaLightrain.png"
          if(status_tomorrow.indexOf("中雨") != -1)
            imgsrc_tomorrow += "/weaModeraterain.png" 
          if(status_tomorrow.indexOf("大雨") != -1)
            imgsrc_tomorrow += "/weaHeavyrain.png"
          if(status_tomorrow.indexOf("暴雨") != -1)
            imgsrc_tomorrow += "/weaBigerrain.png"  
          if(status_tomorrow.indexOf("雷阵雨") != -1)
            imgsrc_tomorrow += "/weaThundershower.png"  
            
          if(status_tomorrow.indexOf("小雪") != -1)
            imgsrc_tomorrow += "/weaLightsnow.png"
          if(status_tomorrow.indexOf("中雪") != -1)
            imgsrc_tomorrow += "/weaModeratesnow.png"
            if(status_tomorrow.indexOf("大雪") != -1)
            imgsrc_tomorrow += "/weaHeavysnow.png"
          if(status_tomorrow.indexOf("暴雪") != -1)
            imgsrc_tomorrow += "/weaBigersnow.png"  
            
          if(status_tomorrow.indexOf("霾") != -1)
            imgsrc_tomorrow += "/weaHaze.png" 
          if(status_tomorrow.indexOf("阴") != -1)
            imgsrc_tomorrow += "/weaShade.png"
          if(status_tomorrow.indexOf("雾") != -1)
            imgsrc_tomorrow += "/weaFog.png"  
          
          if(status_tomorrow.indexOf("多云") != -1)
            imgsrc_tomorrow += "/weaCloudy.png"
//          if(status_tomorrow.indexOf("多云") != -1)
//            imgsrc_tomorrow += "/weaCloudy_night.png"
          if(status_tomorrow.indexOf("晴") != -1)
            imgsrc_tomorrow += "/weaSunny.png"
//          if(status_tomorrow.indexOf("晴") != -1)
//            imgsrc_tomorrow += "/weaSunny_night.png"
          
          if(self.weathertype == 1){
            $(".weacity").html(city);
            $(".oneimg_today").attr('src',imgsrc_today)
            $(".temp_min_today").html(temp_min_today)
            $(".temp_max_today").html(temp_max_today)
            $(".status_today").html(status_today)
            $(".oneimg_tomorrow").attr("src",imgsrc_tomorrow)
            $(".temp_min_tomorrow").html(temp_min_tomorrow)
            $(".temp_max_tomorrow").html(temp_max_tomorrow)
            $(".status_tomorrow").html(status_tomorrow)
            var typeone_html = $('#weather-type1').html();
            self.currentEle_wea.find(".weatherCon").append(typeone_html);
          }else if(self.weathertype == 2){
            $(".ser_city").html(city)
            $(".imgser").attr("src",imgsrc_today)
            $(".ser_max_temp").html(temp_max_today)
            $(".ser_status").html(status_today)
            var typeone_html = $('#weather-type2').html();
            self.currentEle_wea.find(".weatherCon").append(typeone_html);
          }else if(self.weathertype == 3){
            $(".weatypethd_city").html(city)
            $(".imgthd").attr("src",imgsrc_today)
            $(".status_thd").html(status_today)
            $(".thd_min_temp").html(temp_min_today)
            $(".thd_max_temp").html(temp_max_today)
            $(".windpower").html(wind_dir_today)
            $(".winddir").html(wind_dir_today)
            var typeone_html = $('#weather-type3').html();
            self.currentEle_wea.find(".weatherCon").append(typeone_html);
          }else{
            $(".detailfor_city").html(city)
            $(".detailfor_weacon").html(status_today)
            $(".for_min_temp").html(temp_min_today)
            $(".for_max_temp").html(temp_max_today)
            var typeone_html = $('#weather-type4').html();
            self.currentEle_wea.find(".weatherCon").append(typeone_html);
          }
          self.currentEle_wea.attr("weathertype",self.weathertype)
          self.dialogweather = false;
        }, function(response){
          console.log(response)
        });
        }
    }
  }
</script>
<style type="text/css">
  .el-dialog--myweather{
    width: 420px;
  }
  .weather .el-dialog__header{
      border-bottom: 1px solid #CECECE;
      height: 30px;
  }
  .el-dialog--myweather .el-dialog__body{
    padding: 0;
  }
  .weather-ul{
    padding: 0 63px;
    margin-top: 5px;
    height: 230px;
  }
  .weather-li{
    width: 124px;
    height: 116px;
    float: left;
    list-style: none;
  }
  .weather-wrap{
    width: 120px;
    height: 80px;
    border: 1px solid #cccccc;
    position: relative;
    cursor: pointer;
  }
  .weather-wrap img{
    float: left;
    width: 120px;
    height: 80px;
  }
  .weather-type{
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
  }
  .checked_weather{
    display: none;
    width: 17px;
    height: 13px;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 5;
    background: url(http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png);
  }
</style>
