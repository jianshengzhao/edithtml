<template>
	<div class="information">
		<el-dialog
		    title="资讯"
		    :visible.sync="dialogInformation"
		    size="myinformation"
		    :close-on-click-modal="false"
		    @open="openInformation"
		    :before-close="beforeclose">
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
					    v-model="selectedclassify">
					</el-cascader>
		      	</div>
		      	<div class="contentrange-wrap">
		      		<div class="infordesc">内容区间：</div>
		      		<el-input-number v-model="num1" :min="1" :max="num2"></el-input-number>&nbsp;~&nbsp;
		      		<el-input-number v-model="num2" :min="num1"></el-input-number>&nbsp;条
		      	</div>
		      	<p class="infrotips">（选择后显示已选择分类下对应位置资讯）</p>
		    <span slot="footer">
		      	<el-button @click="cancelInformation" size="large">取 消</el-button>
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
				},
				getLocalTime:function (nS) {//时间戳转换日期格式
		            var now = new Date(nS*1000),
		               year = now.getFullYear(),
		               month = (now.getMonth()+1) < 10 ? '0' + (now.getMonth()+1):now.getMonth()+1,
		               date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate(),
		               hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours(),
		               minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
		               second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
		            return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
		       	},
		       	currentEle_info:''
			}
		},
		created:function(){
			var self = this;
		},
		methods:{
			//用于主页调用当前模板函数，弹出弹框并加载数据
			show:function(that,element){
		        var self = this;
		        self.that = that
      			self.element = element 
		        self.dialogInformation = true;
		        if (!element.length) {
			        self.currentEle_info = $('.on_module')
			    } else {
			        self.currentEle_info = element
			    }  
		    },
		    //窗口打开函数
		    openInformation:function(){
		    	var self = this;
		    	$(".img-wrap").css("border-color","#FFFFFF");
	    		$($(".img-wrap")[0]).css("border-color","#557CE1");
	    		$('.checked_infor').hide();
	    		$($('.checked_infor')[0]).show();
	    		self.infortype = 1;
				self.selectedclassify = [];
	    		self.num1 = 1;
	    		self.num2 = 5;
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
		   	beforeclose:function(done){
		   		var self = this;
		   		if(self.currentEle_info.find(".inforCon").children().length < 1){
		   			let parent = self.element.parent()
			        self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
			        self.element.remove()        
			        self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
		   		}
		   		done();
		   	},
		   	cancelInformation:function(){
		   		var self = this;
		   		if(self.currentEle_info.find(".inforCon").children().length < 1){
		   			let parent = self.element.parent()
			        self.that.tool.tool.carryUpdateElementStorageEvent(self.that, parent, self.element, self.element) // 更新选区
			        self.element.remove()        
			        self.that.tool.tool.carryLayerEvent(self.that, parent) // 更新图层
		   		}
		   		self.dialogInformation = false;
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
						duration: 2000
					});
		   			return false;
		   		}
		   		self.currentEle_info.attr('begin', self.num1)
		   		self.currentEle_info.attr('last', self.num2)
		   		self.currentEle_info.attr('navcode', self.selectedclassify[i])
		   		self.currentEle_info.attr('infortype', self.infortype)		   		
		   		self.currentEle_info.find(".inforCon").empty();
		   		self.$http.post(window.host + "/aroomv3/news/getnewslists.html", 
		   		{
					begin:self.num1,
					last:self.num2,
					navcode:self.selectedclassify[i],
				}, {emulateJSON: true}).then(function(response) {
					var datas = response.data;
					if(datas.code == 0){
						if(self.num1 <= datas.data.count){
							var inforhtml = "";
							if(self.infortype == 1){
								for(var i in datas.data.newslist){
									datas.data.newslist[i].dateline = self.getLocalTime(datas.data.newslist[i].dateline);
									inforhtml += '<div class="infor-wrap">'
									inforhtml += 	'<div class="infor-cont">'
									inforhtml += 		'<a style="text-decoration:none;" href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank"><p class="infor-title" title='+datas.data.newslist[i].subject+'>'+datas.data.newslist[i].subject+'</p></a>'
									if(datas.data.newslist[i].thumb != ""){
										inforhtml += '<div class="infor-img">'
										inforhtml += '<a class="infor-img-a" style="text-decoration:none;" href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank"><img src="'+datas.data.newslist[i].thumb+'" /></a>'
										inforhtml += '<div class="infor-desc">'
									}else{
										inforhtml += '<div class="infor-desc-text">'
										inforhtml += '<div class="infor-desc-no">'
									}
									inforhtml += 				'<p class="infor-conc" title='+datas.data.newslist[i].note+'>'+datas.data.newslist[i].note+'</p>'
									inforhtml += 				'<div class="infor-time">发表于：'+datas.data.newslist[i].dateline+'  阅读<span style="color: #FFAF28">'+datas.data.newslist[i].viewnum+'</span>次</div>'
									inforhtml += 			'</div>'
									inforhtml += 		'</div>'
									inforhtml += 	'</div>'
									inforhtml += '</div>'
								}
								self.currentEle_info.find(".inforCon").html(inforhtml);
								self.dialogInformation = false;
								self.currentEle_info.ready(function() {
									self.currentEle_info.css("background-color","#FFFFFF");
							        self.currentEle_info.css('height',datas.data.newslist.length * 200 + 'px')
							        self.currentEle_info.find('.resizeBox').css('width',self.currentEle_info.width()+'px')
							        self.currentEle_info.find('.infor-wrap').css('width',(self.currentEle_info.width() - 60)+'px')
							        self.currentEle_info.find('.resizeBox').css('height',datas.data.newslist.length * 200 + 'px')
								})
							}else{
								for(var i in datas.data.newslist){
									datas.data.newslist[i].dateline = self.getLocalTime(datas.data.newslist[i].dateline);
									inforhtml += '<div class="infor-wrap" style="height:40px;padding:0;">'
									inforhtml += 	'<div class="infor-cont" style="border:0 none;height:40px;">'
									inforhtml += 		'<a style="text-decoration:none;" href="/dyinformation/'+datas.data.newslist[i].itemid+'.html" target="_blank"><p style="text-indent:10px;" class="infor-title" title='+datas.data.newslist[i].subject+'>'+datas.data.newslist[i].subject+'</p></a>'
									inforhtml += 	'</div>'
									inforhtml += '</div>'
								}
								self.currentEle_info.find(".inforCon").html(inforhtml);
								self.dialogInformation = false;
								self.currentEle_info.ready(function() {
									self.currentEle_info.css("background-color","#FFFFFF");
							        self.currentEle_info.css('height',datas.data.newslist.length * 40 + 'px')
							        self.currentEle_info.find('.resizeBox').css('width',self.currentEle_info.width()+'px')
							        self.currentEle_info.find('.infor-wrap').css('width',(self.currentEle_info.width() - 60)+'px')
							        self.currentEle_info.find('.resizeBox').css('height',datas.data.newslist.length * 40 + 'px')
								})
							}
						}else{
							self.$notify({
								title: '提示',
								message: '资讯条数总共只有'+datas.data.count+'条。',
								type: 'warning',
								offset: 40,
								duration: 3000
							});
						}
					}
				}, function(response) {
					console.log(response)
				});
		   	}
		}
	}
</script>

<style type="text/css">
	.el-dialog--myinformation{
		width: 420px;
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
	.information .el-dialog__header{
	    border-bottom: 1px solid #CECECE;
	    height: 30px;
	}
	.infrotips{
		width: 100%;
		margin-left: 78px;
		color: #999999;
	}
</style>