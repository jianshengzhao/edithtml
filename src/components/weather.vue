<template>
	<div class="information">
		<el-dialog
		    title="天气"
		    :visible.sync="dialogweather"
		    size="myweather"
		    :close-on-click-modal="false"
		    @open="openWeather"
		    @close="closeWeather">
		    	<p>选择样式：</p>
		    	<ul class="weather-ul">
		    		<li class="weather-li">
		    			<div class="weather-wrap" style="border-color: #557CE1;">
		    				<img src="../assets/img/weathertype1.jpg" alt="天气样式一" />
		    				<span class="checked_weather" style="display: block;"></span>
		    			</div>
		    			<p class="weather-type">样式一</p>
		    		</li>
		    		<li class="weather-li">
		    			<div class="weather-wrap">
		    				<img src="../assets/img/weathertype2.jpg" alt="天气样式二" />
		    				<span class="checked_weather"></span>
		    			</div>
		    			<p class="weather-type">样式二</p>
		    		</li>
		    		<li class="weather-li">
		    			<div class="weather-wrap">
		    				<img src="../assets/img/weathertype3.jpg" alt="天气样式三" />
		    				<span class="checked_weather"></span>
		    			</div>
		    			<p class="weather-type">样式三</p>
		    		</li>
		    		<li class="weather-li">
		    			<div class="weather-wrap">
		    				<img src="../assets/img/weathertype4.jpg" alt="天气样式四" />
		    				<span class="checked_weather"></span>
		    			</div>
		    			<p class="weather-type">样式四</p>
		    		</li>
		    	</ul>
		    	
		    <span slot="footer">
		      	<el-button @click="dialogweather = false" size="large">取 消</el-button>
		        <el-button type="primary" @click="dialogweather = false" size="large">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>
<script>
	import $ from 'jquery'
	export default{
		name: 'weather',
		data: function () {
			return {
				dialogweather:false,
			}
		},
		created:function(){
			var self = this;
		},
		methods:{
			//用于主页调用当前模板函数，弹出弹框并加载数据
			show:function(){
		        var self = this;
		        self.dialogweather = true;
		   	},
		   	openWeather:function(){
		   		var self = this;
		    	self.$nextTick( () => {
					let $weatherwrap = $(".weather-wrap");
					$weatherwrap.on("click",function(){
						$(this).css("border-color","#557CE1");
						$(this).children(".checked_weather").show();
						$(this).parent().siblings().children(".weather-wrap").css("border-color","#FFFFFF");
						$(this).parent().siblings().children(".weather-wrap").children(".checked_weather").hide();
						
					});
				})
		   	},
		   	closeWeather:function(){
		   		
		   	}
		}
	}
</script>
<style type="text/css">
	.el-dialog--myweather{
		width: 350px;
	}
	.weather-ul{
		height: 230px;
	}
	.weather-li{
		width: 124px;
		height: 116px;
		float: left;
		list-style: none;
		margin: 15px;
	}
	.weather-wrap{
		width: 120px;
		height: 80px;
		border: 2px solid #FFFFFF;
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
