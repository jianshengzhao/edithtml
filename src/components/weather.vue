<template>
	<div class="information">
		<el-dialog
		    title="天气"
		    :visible.sync="dialogweather"
		    size="myweather"
		    :close-on-click-modal="false"
		    @open="openWeather"
		    @close="closeWeather">
			    <div style="border-top: 1px solid #ccc;margin-top: 10px;">
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
		      	<el-button @click="dialogweather = false" size="large">取 消</el-button>
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
				currentEle_wea:''
			}
		},
		created:function(){
			var self = this;
		},
		methods:{
			//用于主页调用当前模板函数，弹出弹框并加载数据
			show:function(element){
		        var self = this;
		        self.dialogweather = true;
		        if (!element.length) {
			        self.currentEle_wea = $('.on_module')
			    } else {
			        self.currentEle_wea = element
			    }  
		   	},
		   	openWeather:function(){
		   		var self = this;
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
		   	closeWeather:function(){
		   		
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
						udatetime_today = today.udatetime,			//更新时间
					 	wind_dir_today = today.direction1,
					 	temp_min_today = today.temperature2,
					 	temp_max_today = today.temperature1,
					 	status_today = today.status1,
					 	
					 	//tomorrow
					 	udatetime_tomorrow = tomorrow.udatetime,	//更新时间
					 	temp_min_tomorrow = tomorrow.temperature2,
					 	temp_max_tomorrow = tomorrow.temperature1,
					 	status_tomorrow = tomorrow.status1
					
//					.weaCloudy,.weaCloudy_night,.weaFog,.weaHeavyrain,.weaLightrain,.weaModeraterain,.weaShade,.weaSunny,.weaSunny_night,.weaThundershower,
					var imgsrc_today = "http://static.ebanhui.com/ebh/tpl/aroomv3/icon";
					if(status_today == "晴"){
						imgsrc_today += "/weaSunny.png"
					}else if(status_today == "多云"){
						imgsrc_today += "/weaCloudy.png"
					}
					
					var imgsrc_tomorrow = "http://static.ebanhui.com/ebh/tpl/aroomv3/icon";
					if(status_tomorrow == "晴"){
						imgsrc_tomorrow += "/weaSunny.png"
					}else if(status_tomorrow == "多云"){
						imgsrc_tomorrow += "/weaCloudy.png"
					}
					
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
