<template>
	<div class="myimages">
		<!--我的图片库弹窗-->
		<el-dialog
		    title="添加图片 ( 只能添加 jpg，jpeg，gif，png，图片大小不超过1MB )"
		    :visible.sync="dialogmyPicture"
		    size="mypicture"
		    :close-on-click-modal="false"
		    @open="openMypic">
		      
			<ul class="pic_ul">
			    <li class="pic_li borderBnone">我的文件</li>
			    <li class="pic_li">图片库</li>
			    <div class="rectangularBlock"></div>
			    <div class="tabs_extendedLine"></div>
			</ul>
			     	
			<!--我的文件-->
			<div class="el-menu-mypic">
			   	<div class="el-menu-mypic-tool">
			     	<el-button @click="newFlies" class="newMyfile"><i class="el-icon-plus el-icon--right"></i>新建文件夹</el-button>
	     			<el-upload class="uploadMypic"
					  action="http://ss.ebh.net/room/albums/addphotos.html"
					  :data="{}"
					  multiple
					  :show-file-list="false"
					  :before-upload="beforeMypic"
					  :on-success="successMypic">
					  <el-button><i class="el-icon-upload el-icon--right"></i>直接上传</el-button>
					</el-upload>
		     		<el-input
					  placeholder="搜索所有文件"
					  icon="search"
					  v-model="searchMypic"
					  name="searchpic"
					  :on-icon-click="searchMypicClick">
					</el-input>
				</div>
				<!--最外层文件-->
				<ul class="myFiles" ref="myFiles"></ul>
				<!--文件夹内-->
				<div class="fileOfimg">	
				    <p><span class="allFile">所有文件 > </span><span class="nowfileName">文件夹</span></p>
				    <ul class="myImgs"></ul>
				</div>  		
			</div>
			     	
		    <span slot="footer" class="dialog-footer">
		      	<el-button @click="dialogmyPicture = false">取 消</el-button>
		        <el-button type="primary" @click="dialogPictureEvent">确 定</el-button>
		    </span>
		</el-dialog>
	</div>
</template>
<script>
	import $ from 'jquery'
	export default{
		name: 'myimages',
		data: function () {
			return {
				dialogmyPicture:false,
				// --------- 图片模块组件 ---------
       			searchMypic:'',
       			getfilelist:function(){ //获取最外层文件以及图片
		       		var self = this;
		       		$('.myFiles').empty();
		       		self.$http.get(window.host+"/room/albums.html",{},{emulateJSON:true}).then(function(response){
		        		if(response.data.code == 0){
		        			var datas = response.data.data;
		       				var newli = "";
		        			for(var i=0,len=datas.ablums.length;i<len;i++){
						      	newli += '<li class="myFiles_li">';
						     			newli	+= '<img class="flieimg" src="http://static.ebanhui.com/ebh/tpl/default/images/newfile.png" aid="'+datas.ablums[i].aid+'" />';
						     			newli	+= '<input class="fliename" type="text" value="'+datas.ablums[i].alname+'" readonly />';
						     			newli += '<span class="delflie"></span>'
						     		newli	+= '</li>';
		        			}
		        			for(var j=0,len=datas.photos.length;j<len;j++){
		        				newli += '<li class="myFiles_li">';
		        					newli+=	'<img class="flieimg" src="'+datas.showpath+datas.photos[j].path+'" aid="'+datas.photos[j].aid+'" pid="'+datas.photos[j].pid+'" />';
		        					newli	+= '<input class="fliename" type="text" value="'+datas.photos[j].photoname+'" readonly />';
						     			newli += '<span class="delflie"></span>';
		        				newli	+= '</li>';
		        			}
		        			$('.myFiles').append(newli);
		        			
		        			//鼠标移上显示删除按钮，移除隐藏
				        	$(".myFiles_li").hover(function(){
				        		$(this).children(".delflie").show();
				        	},function(){
				        		$(this).children(".delflie").hide();
				        	});
				        	//删除操作
				        	$('.delflie').on("click",function(){
				        		var param = {},$url = "",deltips="",delfilename = $(this).siblings("input").val();
				        		if( typeof($(this).siblings('img').attr('pid')) == "undefined" ){//这是文件夹
					   					var aid = $(this).siblings("img").attr('aid');
					   					$url = "/room/albums/delalbums.html";
					   					param = {aid:aid};
					   					deltips = "此操作将删除文件夹："+delfilename+"，同时删除文件夹下的所有图片。"
					   				}else{//图片
					   					var pid = $(this).siblings("img").attr('pid');
					   					$url = "/room/albums/delphotos.html";
					   					param = {pid:pid};
					   					deltips = "此操作将删除图片："+delfilename+"";
					   				}
				        		 self.$confirm(deltips, '提示', {
						          confirmButtonText: '确定',
						          cancelButtonText: '取消',
						          type: 'warning'
						        }).then(() => {
						        	self.$http.post(window.host+$url,param,{emulateJSON:true}).then(function(response){
						        		if(response.data.code == 0){
						        			$(this).parent().remove();
				        					self.$message({
								            type: 'success',
								            message: '删除成功!'
								          });
						        		}else{
						        			
						        		}
						        	},function(response){
						        		console.log(response);
						        	});
						        }).catch(() => {
						          self.$message({
						            type: 'info',
						            message: '已取消删除'
						          });          
						        });
				        	});
				        	
				        	
									//图片移动操作
				        	$(".myFiles_li").on("click",function(){
				        		
				        	});
				        	
				        	
				        	//修改名字操作
		    	   			var nowName = "";
						   		$('.fliename').on("dblclick",function(){
						   			nowName = $(this).val();
						   			$(this).removeAttr("readonly");
						   			$(this).css("border-color","#ccc");
						   			$(this).focus();
						   			$(this).select();
						   		});
						   		$('.fliename').on("blur",function(){
						   			$(this).attr('readonly');
						   			$(this).css("border-color","#fff");
						   			var aid = $(this).siblings("img").attr('aid'),
						   					pid = $(this).siblings("img").attr('pid'),
						   					filename = $(this).val();
						   			if(filename == ""){
						   				$(this).val(nowName);
						   				self.$notify({
								          title: '警告',
								          message: '重命名不能为空',
								          type: 'warning',
								          duration: 2000,
								          offset: 50
								        });
						   			}else{
						   				//重命名接口
						   				var param = {},$url = "";
						   				if( typeof($(this).siblings('img').attr('pid')) == "undefined" ){
						   					$url = "/room/albums/editalbums.html";
						   					param = {aid:aid,alname:filename};
						   				}else{
						   					$url = "/room/albums/editphotos.html";
						   					param = {aid:aid,pid:pid,photoname:filename};
						   				}
						   				self.$http.post(window.host+$url,param,{emulateJSON:true}).then(function(response){
						        		
						        	},function(response){
						        		console.log(response);
						        	});
						   			}
						   			nowName = "";
						   		});
						   		
									//点击进入文件夹操作
						   		$('.flieimg').on("click",function(){
						   			var aid = $(this).attr('aid');
						   			if( typeof($(this).attr('pid')) == "undefined" ){
						   				self.getfileofimg(aid);
						   			}
						   		});
		        		}else{
		        			console.log("获取失败");
		        		}
		        	},function(response){
		        		console.log(response);
		        	});
		       	},
		       	getfileofimg:function(aids){
		       		var self = this;
		       		$('.myFiles').hide();
		       		$('.fileOfimg').show();
		       		$('.myImgs').empty();
		       		self.$http.post(window.host+"/room/albums/getalbums.html",
		       		{aid:aids},{emulateJSON:true}).then(function(response){
		       			if(response.data.code == 0){
		       				var datas = response.data.data;
		       				var newli = "";
		       				for(var j=0,len=datas.photos.length;j<len;j++){
		       					newli += '<li class="myImgs_li">';
		        					newli+=	'<img class="flieimg" src="'+datas.showpath+datas.photos[j].path+'" aid="'+datas.photos[j].aid+'" pid="'+datas.photos[j].pid+'" />';
		        					newli	+= '<input class="fliename" type="text" value="'+datas.photos[j].photoname+'" readonly />';
						     			newli += '<span class="delflie"></span>';
		        				newli	+= '</li>';
		       				}
		       				$('.myImgs').append(newli);
		       				//鼠标移上显示删除按钮，移除隐藏
				        	$(".myImgs_li").hover(function(){
				        		$(this).children(".delflie").show();
				        	},function(){
				        		$(this).children(".delflie").hide();
				        	});
				        	//删除操作
				        	$('.delflie').on("click",function(){
				        		var delfilename = $(this).siblings("input").val(),
				        		  	pid = $(this).siblings("img").attr('pid');
				        		self.$confirm("此操作将删除图片："+delfilename+"", '提示', {
						          confirmButtonText: '确定',
						          cancelButtonText: '取消',
						          type: 'warning'
						        }).then(() => {
						        	self.$http.post(window.host+"/room/albums/delphotos.html",{pid:pid},{emulateJSON:true}).then(function(response){
						        		if(response.data.code == 0){
						        			$(this).parent().remove();
				        					self.$message({
								            type: 'success',
								            message: '删除成功!'
								          });
						        		}else{
						        			self.$message({
								            type: 'error',
								            message: '删除失败!'
								          });
						        		}
						        	},function(response){
						        		console.log(response);
						        	});
						        }).catch(() => {
						          self.$message({
						            type: 'info',
						            message: '已取消删除'
						          });          
						        });
				        	});
				        	//修改名字操作
		    	   			var nowName = "";
						   		$('.fliename').on("dblclick",function(){
						   			nowName = $(this).val();
						   			$(this).removeAttr("readonly");
						   			$(this).css("border-color","#ccc");
						   			$(this).focus();
						   			$(this).select();
						   		});
						   		$('.fliename').on("blur",function(){
						   			$(this).attr('readonly');
						   			$(this).css("border-color","#fff");
						   			var aid = $(this).siblings("img").attr('aid'),
						   					pid = $(this).siblings("img").attr('pid'),
						   					filename = $(this).val();
						   			if(filename == ""){
						   				$(this).val(nowName);
						   				self.$notify({
								          title: '警告',
								          message: '重命名不能为空',
								          type: 'warning',
								          duration: 2000,
								          offset: 50
								        });
						   			}else{
						   				//重命名接口
						   				self.$http.post(window.host+"/room/albums/editphotos.html",
						   				{aid:aid,pid:pid,photoname:filename},{emulateJSON:true}).then(function(response){
						        		
						        	},function(response){
						        		console.log(response);
						        	});
						   			}
						   			nowName = "";
						   		});
		       			}
		       		},function(response){
		        		console.log(response);
		        	});
		       	},
			}
		},
		created:function(){
			var self = this;
		},
		methods:{
			show:function(){
		        let self = this;
		        self.dialogmyPicture = true;
		        self.$nextTick( () => {
		        	let $allFile = $('.allFile');
		         	$allFile.click(function(){
						$('.myFiles').show();
			   			$('.fileOfimg').hide();
			   			self.getfilelist();
					});
		        })
		    },
// --------------- 图片弹窗模块 --------------
			//--------- 上传图片 ---------
			openMypic: function(){
				var self = this;
				self.$nextTick( () => {
					let $pic_ul = $('.pic_ul');
					let $pic_li = $('.pic_li');
					let $rectangularBlock = $('.rectangularBlock');
					let $tabs_extendedLine = $('.tabs_extendedLine');
					self.getfilelist();
					$pic_li.on('click',function(){
						$(this).addClass("borderBnone");
						$(this).siblings().removeClass("borderBnone");
						if($rectangularBlock.css('top') == '0px'){
							$rectangularBlock.animate({top: '67px'}, 150);
							$pic_li.eq(0).css('border-right','1px solid #ccc');
							$pic_li.eq(0).css('border-bottom-color','#ccc');
						}else{
							$rectangularBlock.animate({top: '0'}, 150);
							$pic_li.eq(0).css('border-right','0 none');
							$pic_li.eq(0).css('border-bottom-color','#fff');
						}
						if($tabs_extendedLine.css('top') == '67px'){
							$tabs_extendedLine.css({
								top:'134px',
								height:'401px'
							});
						}else{
							$tabs_extendedLine.css({
								top:'67px',
								height:'468px'
							});
						}
					});
				})
			},
	     	beforeMypic(file){
	      		if(file.size / 1024 / 1024 > 1){
	    			this.$notify({
		    			title: '警告',
		    			message: '上传的文件不能大于1MB。',
		    			type: 'warning',
		    			offset: 50,
		    			duration: 4000
		    		});
		    		return false;
	    		}
	      	},
	      	successMypic(res, file){
	      	
	      	},
      		newFlies: function(){
      			var self = this;
      			self.$http.post(window.host+"/room/albums/addalbums.html",
	    		{aid:0},{emulateJSON:true}).then(function(response){
	    			if(response.data.code == 0){
	    				self.getfilelist();
	    			}
	    		},function(response){
	    		console.log(response);
	    		});
      		},
			//---------- 搜索我的图片 -------------
      		searchMypicClick: function(ev){
      			console.log(ev);
      		},
      		dialogPictureEvent: function () {
      			
      		}
		}
	}
</script>
<!--我的图片库样式-->
<style type="text/css">
	.el-dialog--mypicture .el-dialog__body{
		width: 943px;
		height: 534px;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		padding: 0;
		margin: 20px 0 10px 0;
		position: relative;
	}
	.el-dialog--mypicture .pic_ul{
		width:140px;
		height:135px;
		float:left;
		position: relative;
	}
	.el-dialog--mypicture .pic_li{
		width: 140px;
		height: 65px;
		line-height: 65px;
		text-align: center;
		list-style: none;
		font-size: 14px;
		border-top: 1px solid #FFFFFF;
		border-bottom: 1px solid #FFFFFF;
		border-radius: 1px;
		cursor: pointer;
		color: #333;
	}
	.borderBnone{
		border-bottom-color: #ccc!important;
		color: #557ce1!important;
	}
	.rectangularBlock {
    position: absolute;
    left: 0;
    height: 66px;
    width: 6px;
    background: #557ce1;
    top: 0;
	}	
	.tabs_extendedLine{
		position: absolute;
		top: 67px;
    right: 0px;
    border-right: 1px solid #ccc;
    height: 468px;
	}
	
	
	.el-menu-mypic{
		width: 803px;
		height: 536px;
		position: absolute;
		top: 0;
		right: 0;
	}
	.el-menu-mypic .el-menu-mypic-tool{
		width: 763px;
		height: 37px;
		padding: 15px 20px;
	}
	.el-menu-mypic-tool .newMyfile{
		float: left;
		margin-right: 15px;
	}
	.el-menu-mypic-tool .uploadMypic{
		float: left;
	}
	.el-menu-mypic-tool .el-input{
		width: 162px;
		float: right;
		margin-right: 20px;
	}
	
	.myFiles{
		width: 781px;
		height: 454px;
		list-style: none;
		padding: 0 0 15px 22px;
		position: absolute;
		top: 67px;
		left: 0;
		display: block;
	}
	
	
	.fileOfimg{
		width: 803px;
		height: 469px;
		position: absolute;
		top: 67px;
		left: 0;
		display: none;
	}
	.fileOfimg p{
		margin: 0;
		padding: 0;
		width: 803px;
		height: 36px;
		line-height: 36px;
	}
	.fileOfimg p .allFile{
		margin-left: 20px;
		color: #557ce1;
		font-size: 14px;
		cursor: pointer;
	}
	.fileOfimg p .nowfileName{
		font-size: 14px;
	}
	
	.myImgs{
		width: 781px;
		height: 408px;
		list-style: none;
		padding: 0 0 15px 22px;
		margin-top: 10px;
	}
	
	.myFiles .myFiles_li,.myImgs .myImgs_li{
		width: 78px;
		height: 106px;
		float: left;
		margin: 0 25px 20px 0;
		-moz-user-select: all;
		-ms-user-select: all;
		-webkit-user-select: all;
		position: relative;
	}
	.myFiles .myFiles_li img,.myImgs .myImgs_li img{
		float: left;
		width: 78px;
		height: 78px;
		border: 0 none;
		cursor: pointer;
	}
	.myFiles .myFiles_li .fliename,.myImgs .myImgs_li .fliename{
		clear: both;
		display: block;
		width: 76px;
		height: 26px;
		line-height: 28px;
		margin: 0;
		text-align: center;
		border: 1px solid #FFFFFF;
	}
	.myFiles .myFiles_li .delflie,.myImgs .myImgs_li .delflie{
		display: block;
		width: 16px;
		height: 16px;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/delnewfile.png);
		position: absolute;
		top: -8px;
		right: -8px;
		display: none;
		cursor: pointer;
	}
</style>