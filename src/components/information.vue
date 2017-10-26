<template>
	<div class="information">
		<el-dialog
		    title="资讯"
		    :visible.sync="dialogInformation"
		    size="myinformation"
		    :close-on-click-modal="false"
		    @open="openInformation"
		    @close="closeInformation">
		      	<div class="style-wrap">
		      		<div class="infordesc" style="padding-top: 5px;">选择样式：</div>
		      		<div class="imgdesc" style="margin-right: 20px;">
		      			<div class="img-wrap" style="border-color: #557CE1;">
		      				<img src="../assets/img/inforpictext.jpg" alt="图文" />
		      				<span class="checked_infor" style="display: block;"></span>
		      			</div>
		      			<p class="desc">图文</p>
		      		</div>
		      		<div class="imgdesc">
		      			<div class="img-wrap">
		      				<img src="../assets/img/infortext.jpg" alt="纯文字" />
		      				<span class="checked_infor"></span>
		      			</div>
		      			<p class="desc">纯文字</p>
		      		</div>
		      	</div>
		      	<div class="classify-wrap">
		      		<div class="infordesc">资讯分类：</div>
		      		<el-cascader
		      			:props="propsclassify"
					    :options="optionsclassify"
					    v-model="selectedclassify"
					    @change="classifyChange">
					</el-cascader>
		      	</div>
		      	<div class="contentrange-wrap">
		      		<div class="infordesc">内容区间：</div>
		      		<el-input-number v-model="num1" :min="1" @change="minrows"></el-input-number>&nbsp;~&nbsp;
		      		<el-input-number v-model="num2" :min="1" @change="maxrows"></el-input-number>&nbsp;行
		      	</div>
		      	<p class="infrotips">（选择后显示已选择分类下对应位置资讯）</p>
		    <span slot="footer">
		      	<el-button @click="dialogInformation = false" size="large">取 消</el-button>
		        <el-button type="primary" @click="confirmInformation" size="large">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>
<script>
	import $ from 'jquery'
	export default{
		name: 'information',
		data: function () {
			return {
				dialogInformation: false,
				infortype:1,
				optionsclassify:[],
				propsclassify:{
		          	label: 'name',
		          	value: 'code',
					children: 'subnav',
				},
				selectedclassify: [],
				num1:1,
				num2:5,
				
				getinfordesc:function(){
					var self = this;
					self.$http.get(window.host + "/aroomv3/news/newsCategory.html",
					{},{emulateJSON: true}).then(function(response) {
						var datas = response.data;
						if(datas.code == 0){
							self.optionsclassify = datas.data;
						}
					}, function(response){
						console.log(response)
					});
				}
			}
		},
		created:function(){
			var self = this;
		},
		methods:{
			//用于主页调用当前模板函数，弹出弹框并加载数据
			show:function(){
		        var self = this;
		        self.dialogInformation = true;
		    },
		    //窗口打开函数
		    openInformation:function(){
		    	var self = this;
		    	self.selectedclassify = [];
		    	self.getinfordesc();
		    	self.$nextTick( () => {
					let $imgwrap = $(".img-wrap");
					$imgwrap.on("click",function(){
						$(this).css("border-color","#557CE1");
						$(this).children(".checked_infor").show();
						$(this).parent().siblings().children(".img-wrap").css("border-color","#FFFFFF");
						$(this).parent().siblings().children(".img-wrap").children(".checked_infor").hide();
						self.infortype = $(this).siblings("p").html() == "图文"?1:2;
					});
				})
		    },
			closeInformation:function(){
				var self = this;
				//弹窗关闭初始化数据还是弹窗打开先初始化数据有待考虑
//				$(".img-wrap").css("border-color","#FFFFFF");
//	    		$($(".img-wrap")[0]).css("border-color","#557CE1");
//	    		$('.checked_infor').hide();
//	    		$($('.checked_infor')[0]).show();
//	    		
//	    		self.infortype = 1;
	    		//这里还要将分类初始化
//	    		self.num1 = 1;
//	    		self.num2 = 5;
			},
			
			classifyChange:function(value) {//分类改变函数
				
		   	},
		   
		   	minrows:function(value){
		   		
		   	},
		   	maxrows:function(value){
		   		
		   	},
		   	confirmInformation:function(){
		   		var self = this;
		   		let i = self.selectedclassify.length - 1;
		   		if(i<0){
		   			self.$notify({
						title: '提示',
						message: '请选择资讯分类！',
						type: 'warning',
						offset: 40,
						duration: 1500
					});
		   			return false;
		   		}
		   		self.$http.post(window.host + "/aroomv3/news/getnewslists.html", 
		   		{
					begin:self.num1,
					last:self.num2,
					navcode:self.selectedclassify[i],
				}, {emulateJSON: true}).then(function(response) {
					var datas = response.data;
					
				}, function(response) {
					console.log(response)
				});
		   	}
		}
	}
</script>

<style type="text/css">
	.el-dialog--myinformation{
		width: 500px;
	}
	
	
	.style-wrap{
		width: 100%;
		height: 116px;
	}
	.infordesc{
		float: left;
		padding-top: 10px;
		width: 78px;
		height: 50px;
	}
	.imgdesc{
		float: left;
	}
	.img-wrap{
		width: 120px;
		height: 80px;
		cursor: pointer;
		border: 2px solid #FFFFFF;
		position: relative;
	}
	.img-wrap img{
		float: left;
	}
	.desc{
		width: 124px;
		height: 32px;
		line-height: 32px;
		text-align: center;
	}
	.checked_infor{
		display: none;
		width: 17px;
		height: 13px;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 5;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png);
	}
	
	
	.classify-wrap{
		width: 100%;
		height: 60px;
		margin-top: 20px;
	}
	
	
	
	.contentrange-wrap{
		width: 100%;
		height: 50px;
	}
	.contentrange-wrap .el-input-number{
		width: 40px;
	}
	.contentrange-wrap .el-input-number .el-input__inner{
		padding: 0;
		text-indent: 5px;
	}
	.contentrange-wrap .el-input-number__decrease,.contentrange-wrap .el-input-number__increase{
		display: none;	
	}
	
	.infrotips{
		width: 100%;
		margin-left: 78px;
		color: #999999;
	}
</style>