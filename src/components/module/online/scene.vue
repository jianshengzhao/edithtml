<template>
  <div id="scene">
    
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'scene',
    data: function() {
      return {}
    },
    created: function () {
      let self = this    
      let moduleData = self.$parent.datahtml    
    
      moduleData['toallGroup']['online'].push({
        name: 'scene',
        icon: 'imgicon icon-scene',
        text: '天气'
      })    
      moduleData['scene'] = {
        style: 'width:260px; height:190px',
        tool: {
          private: {
            text: '',
            class: ''
          },
          public: ['b', 'd']
        },        
        createEvent: function (self, element, me) { // 添加元素时的回调，回调参数:self指向主实例, element当前添加的模块
          if (me.$('.scene').length > 1) {
            self.$notify({
              title: '警告',
              message: '您已经添加过天气',
              type: 'warning'
            })
            element.remove()
          }else{
            self.$refs.scene.getScene(element)
          }
        },
        html: '<div class="scene module addmodule"  datatext="天气"><a class="picBox"><div class="scene-top"><div class="scene-demo"><input class="cityinput" id="sceneCitySelect" value="杭州" type="text"></div><span class="scene-city">杭州</span><span class="scene-change">[切换]</span><span class="scene-airquality">51良好</span><span class="scene-air">空气质量: </span></div><ul class="scene-ul"><li class="scene-on"><span class="scene-date">3日星期三</span><img class="scene-icon" src="http://static.ebanhui.com/ebh/tpl/wnl/images/small_rain.png"><span class="scene-temp">7<b>º</b></span><span class="scene-weather">小雨</span><span class="scene-tempSection">4℃~ 9℃</span><span class="scene-wind">东北风 4-5级</span></li><li><span class="scene-date">3日星期三</span><img class="scene-icon" src="http://static.ebanhui.com/ebh/tpl/wnl/images/small_rain.png"><span class="scene-temp">7<b>º</b></span><span class="scene-weather">小雨</span><span class="scene-tempSection">4℃~ 9℃</span><span class="scene-wind">东北风 4-5级</span></li><li><span class="scene-date">3日星期三</span><img class="scene-icon" src="http://static.ebanhui.com/ebh/tpl/wnl/images/small_rain.png"><span class="scene-temp">7<b>º</b></span><span class="scene-weather">小雨</span><span class="scene-tempSection">4℃~ 9℃</span><span class="scene-wind">东北风 4-5级</span></li></ul></a></div>' 
      }
    },
    methods: {
      getScene: function (element) {
        $.ajax({
          type: "get",
          async: false,
          url: "http://wthrcdn.etouch.cn/weather_mini?city=杭州&callback=flightHandler",
          dataType: "jsonp",
          jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
          jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
          success: function(data){
            if(data.status == 1000){
              var d = data.data;
              var _aqi = d.aqi;
              var level="";
              if(_aqi<=50&&_aqi>0) level="优秀";
              if(_aqi<=100&&_aqi>50) level="良好";
              if(_aqi<=150&&_aqi>100) level="一般";
              if(_aqi<=200&&_aqi>150)  level="很差";
              if(_aqi>200)  level="很差";
              $(".scene-airquality").text(_aqi + ' ' + level);
              if(!_aqi) {
                level="暂缺";
                $(".scene-airquality").text(level);
              }              
              var src="";
              var src1="";
              var reg=/[\u4E00-\u9FA5]/g;
              var lower=[];
              var higher=[];
              var sceneUlLi = $('.scene-ul li')
              for(var i = 0; i < 3; ++i) {
                var day = $("#day" + i);
                lower[i] = d.forecast[i].low.replace(reg,'' );
                higher[i] = d.forecast[i].high.replace(reg,'' );
                switch (d.forecast[i].type) {
                  case "多云":
                    src="cloud.png";
                    src1="cloud2.png";
                  break;
                  case "晴":
                    src="fine.png";
                    src1="fine2.png";
                  break;
                  case "阴":
                    src="overcast.png";
                    src1="overcast2.png";
                  break;
                  case "小雨":
                    src="small_rain.png";
                    src1="small_rain2.png";
                  break;
                  case "小到中雨":
                    src="stom_rain.png";
                    src1="stom_rain2.png";
                  break;
                  case "大雨":
                    src="big_rain.png";
                    src1="big_rain2.png";
                  break;
                  case "中到大雨":
                    src="big_rain.png";
                    src1="big_rain2.png";
                  break;
                  case "暴雨":
                    src="mbig_rain.png";
                    src1="mbig_rain2.png";
                  break;
                  case "大暴雨":
                    src="mbig_rain.png";
                    src1="mbig_rain2.png";
                  break;
                  case "特大暴雨":
                    src="mbig_rain.png";
                    src1="mbig_rain2.png";
                  break;
                  case "大到暴雨":
                    src="mbig_rain.png";
                    src1="mbig_rain2.png";
                  break;
                  case "暴雨到大暴雨":
                    src="mbig_rain.png";
                    src1="mbig_rain2.png";
                  break;
                  case "大暴雨到特大暴雨":
                    src="mbig_rain.png";
                    src1="mbig_rain2.png";
                  break;
                  case "雨夹雪":
                    src="rain_snow.png";
                    src1="rain_snow2.png";
                  break;
                  case "阵雪":
                    src="quick_snow.png";
                    src1="quick_snow2.png";
                  break;
                  case "雾":
                    src="fog.png";
                    src1="fog2.png";
                  break;
                  case "沙尘暴":
                    src="sand.png";
                    src1="sand2.png";
                  break;
                  case "浮尘":
                    src="sand.png";
                    src1="sand2.png";
                  break;
                  case "扬沙":
                    src="sand.png";
                    src1="sand2.png";
                  break;
                  case "强沙尘暴":
                    src="sand.png";
                    src1="sand2.png";
                  break;
                  case "雾霾":
                    src="sand.png";
                    src1="sand2.png";
                  break;
                  case "冻雨":
                    src="ice_rain.png";
                    src1="ice_rain2.png";
                  break;
                  case "中雨":
                    src="mid_rain.png";
                    src1="mid_rain2.png";
                  break;
                  case "雷阵雨伴有冰雹":
                    src="quick_rain_ice.png";
                    src1="quick_rain_ice2.png";
                  break;
                  case "阵雨":
                    src="quick_rain.png";
                    src1="quick_rain2.png";
                  break;
                  case "雷阵雨":
                    src="lquick_rain.png";
                    src1="lquick_rain2.png";
                  break;
                  case "无天气类型":
                    src="unknown.png";
                    src1="unknown2.png";
                  break;
                }
                var sceneLi = sceneUlLi.eq(i)
                var forecast = d.forecast[i]
                sceneLi.find('.scene-date').text(forecast.date)
                if (sceneLi.hasClass('scene-on')) {
                  sceneLi.find('.scene-icon').attr("src", "http://static.ebanhui.com/ebh/tpl/wnl/images/" + src); 
                  sceneLi.find('.scene-temp').html(d.wendu + '<b>º</b>')
                } else {
                  sceneLi.find('.scene-icon').attr("src", "http://static.ebanhui.com/ebh/tpl/wnl/images/" + src1);
                  sceneLi.find('.scene-temp').html(' ') 
                }                         
                sceneLi.find('.scene-weather').text(forecast.type); 
                sceneLi.find('.scene-tempSection').text(lower[i] + "~" + higher[i]);
                var str = forecast.fengli;
                var newfengli = str.replace('<![CDATA[','', forecast.fengli);
                newfengli = newfengli.replace(']]>','', newfengli);
                sceneLi.find('.scene-wind').text(forecast.fengxiang +' '+ newfengli);
              }
              $(".scene .scene-ul li").show()
            }else{             
              $(".scene .scene-ul").css("background","url(http://static.ebanhui.com/ebh/tpl/wnl/images/wrong.png) no-repeat center");
              $(".scene .scene-ul li").hide()
            }
          },
          error: function(){            
            $(".scene .scene-ul").css("background","url(http://static.ebanhui.com/ebh/tpl/wnl/images/wrong.png) no-repeat center");
            $(".scene .scene-ul li").hide()
          }
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
