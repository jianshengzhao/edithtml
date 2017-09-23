<template>
	<div class="myimages">
		<!--我的图片库弹窗-->
		<el-dialog
		    title="添加图片 ( 只能添加 jpg，jpeg，gif，png，图片大小不超过1MB )"
		    :visible.sync="dialogmyPicture"
		    size="mypicture"
		    :close-on-click-modal="false"
		    @open="openMypic"
		    @close="closeMypic">
		      
			<ul class="pic_ul">
			    <li class="pic_li borderBnone">我的文件</li>
			    <!-- <li class="pic_li">图片库</li> -->
			    <div class="rectangularBlock"></div>
			    <div class="tabs_extendedLine"></div>
			</ul>
			     	
			<!--我的文件-->
			<div class="el-menu-mypic">
			   	<div class="el-menu-mypic-tool">
			     	<el-button @click="newFlies" :disabled="newdisabled" class="newMyfile"><i class="el-icon-plus el-icon--right"></i>新建文件夹</el-button>
	     			
	     			<el-upload
	     			  class="uploadMypic"
	     			  name="upimg"
					  action="/room/albums/addphotos.html"
					  :data="data_img"
					  :show-file-list="false"
					  :with-credentials="true"
					  :before-upload="beforeMypic"
					  :on-success="successMypic">
					  <el-button><i class="el-icon-upload el-icon--right"></i>直接上传</el-button>
					</el-upload>
					
		     		<el-input
					  icon="search"
					  v-model="searchMypic"
					  name="searchpic"
					  :placeholder="placeholder"
					  :on-icon-click="searchMypicClick">
					</el-input>
				</div>
				<!--最外层文件-->
				<ul class="myFiles"></ul>
				<!--文件夹内-->
				<div class="fileOfimg">	
				    <p><span class="allFile">所有文件 > </span><span class="nowfileName">文件夹</span></p>
				    <ul class="myImgs"></ul>
				</div>  		
			</div>
			     	
		    <span slot="footer">
		        <el-button :disabled="hasimg" type="primary" @click="imgconfirm" size="large">确 定</el-button>
		      	<el-button @click="dialogmyPicture = false" size="large">取 消</el-button>
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
				hasimg:true, 			//弹窗确认按钮禁用控制
				httpStart:0,			//后台请求控制，防止多次请求发生
				dialogmyPicture: false,	//弹窗控制
				newdisabled: false,		//新建文件夹按钮控制
				data_img:{aid:0},		//上传图片参数
				placeholder:'搜索所有文件',//搜索框提示语控制
       			searchMypic:'',			//搜索关键字
       			fileaid:0,
				// --------- 图片模块组件 ---------
				
				//获取文件以及图片列表，参数表示文件夹aid和搜索关键字q
       			getfilelist:function(param){ 
		       		var self = this;
		       		$('.myFiles').empty();
		       		$('.myImgs').empty();
		       		if(self.httpStart > 0) return;
            		self.httpStart = 1;
		       		self.$http.post(window.host+"/room/albums/getalbums.html",param,{emulateJSON:true}).then(function(response){
		        		self.httpStart = 0;
		        		if(response.data.code == 0){
		        			var datas = response.data.data;
		       				var newli = "";
		       				if(datas.ablums){ //文件夹
		       					for(var i=0,len=datas.ablums.length;i<len;i++){
							      	newli += '<li class="myFiles_li">';
							      		newli += '<div class="file_box" aid="'+datas.ablums[i].aid+'" paid="'+datas.ablums[i].paid+'">'
						     				newli	+= '<img class="flieimg" src="http://static.ebanhui.com/ebh/tpl/default/images/newfile.png" />';
						     				newli += '<span class="del_flie"></span>'
						     			newli += '</div>'
						     			newli	+= '<input class="fliename" type="text" value="'+datas.ablums[i].alname+'" readonly />';
						     		newli	+= '</li>';
			        			}
		       				}
		        			if(datas.photos){ //图片
		        				for(var j=0,len=datas.photos.length;j<len;j++){
			        				newli += '<li class="myFiles_li">';
			        					newli += '<div class="img_box" aid="'+datas.photos[j].aid+'" pid="'+datas.photos[j].pid+'">'
			        						newli += '<img class="myimgs" src="'+datas.showpath+datas.photos[j].path+'" />';
			        						newli += '<span class="del_img"></span>';
			        						newli += '<span class="checked_img"></span>'
			        					newli += '</div>'
			        					newli += '<input class="fliename" type="text" value="'+datas.photos[j].photoname+'" readonly />';
			        				newli+= '</li>';
			        			}
		        			}
		        			
		        			if(self.fileaid == 0){
		        				$('.myFiles').show();
			        			$('.myImgs').hide();
		        				if(datas.ablums.length || datas.photos.length){
			        				$('.myFiles').append(newli);
		        				}else{
		        					//缺省图	
		        					var noli = '<div class="nofile"></div>';
		        					$('.myFiles').append(noli);
		        				}
		        			}else{
		        				$('.myFiles').hide();
			        			$('.myImgs').show();
		        				if(datas.photos.length){
			        				$('.myImgs').append(newli);
		        				}else{
		        					//缺省图	
		        					var noli = '<div class="nofile"></div>';
		        					$('.myImgs').append(noli);
		        				}
		        			}
		        			
		        			
		        			//点击进入文件夹
		        			$('.file_box').on('click',function(){
		        				var enteraid = $(this).attr('aid');
		        				var param = {
		        					aid: enteraid
		        				};
		        				self.intofile(param);
		        				$('.nowfileName').html($(this).siblings().val());
		        				self.newdisabled = true;
		        				self.searchMypic = "";
					   			self.placeholder = '搜索当下文件夹';
					   			self.data_img.aid = enteraid;
		        				self.fileaid = enteraid;
		        				self.hasimg = true;
		        			});
		        			//选中图片
		        			$('.img_box').on('click',function(){
		        				for(var i=0;i<$('.img_box').length;i++){
		        					$($('.img_box')[i]).css("border-color","#ffffff");
		        				}
		        				$(this).css("border-color","#557CE1");
		        				
		        				$(".checked_img").hide();
		        				$(this).children(".checked_img").show();
		        				self.hasimg = false;
		        			});
		        			
		        			//文件夹鼠标移上出现删除叉号
		        			$('.file_box').hover(function(){
		        				$(this).children(".del_flie").show();
		        			},function(){
		        				$(this).children(".del_flie").hide();
		        			});
		        			//图片鼠标移上显示删除按钮，移除隐藏，并出现边框
							$('.img_box').hover(function(){
								if($(this).children(".checked_img").css("display") == "none"){
									$(this).css("border-color","#557CE1");
								}
								$(this).children(".del_img").show();
							},function(){
								if($(this).children(".checked_img").css("display") == "block"){
									$(this).css("border-color","#557CE1");
								}else{
									$(this).css("border-color","#ffffff");
								}
								$(this).children(".del_img").hide();
							});
		        			//鼠标移上显示重命名边框提示
		        			$('.fliename').hover(function(){
								$(this).css("border-color","#557CE1");
							},function(){
								$(this).css("border-color","#ffffff");
							});
		        			
		        			//删除相册
		        			$('.del_flie').on('click',function(event){
		        				event.stopPropagation();
		        				self.hasimg = true;
		        				var delfilename = $(this).parent().siblings().val();
		        				var delaid = $(this).parent().attr('aid'),
		        					deltips = "此操作将删除文件夹："+delfilename+"，并且删除文件夹下所有文件",
		        					param = {aid:delaid},
		        					$url = '/room/albums/delalbums.html',
		        					temp = {aid:self.fileaid};
		        				self.delfileorimg(deltips,param,$url,temp);
		        			});
		        			//删除图片
		        			$('.del_img').on('click',function(event){
		        				event.stopPropagation();
		        				self.hasimg = true;
		        				var delimgname = $(this).parent().siblings().val();
		        				var delaid = $(this).parent().attr('aid'),
		        					delpid = $(this).parent().attr('pid'),
		        					deltips = "此操作将删除图片："+delimgname+"",
		        					param = {aid:delaid,pid:delpid},
		        					$url = '/room/albums/delphotos.html',
		        					temp = {aid:self.fileaid};
		        				self.delfileorimg(deltips,param,$url,temp);
		        			});
		        			
		        			//重命名开始
							var nowName = "";
							$('.fliename').on("dblclick",function(event){
								event.stopPropagation();
								nowName = $(this).val();
								$(this).removeAttr("readonly");
								$(this).css("border-color","#ccc");
								$(this).focus();
								$(this).select();
							});
							$('.fliename').on("blur",function(event){
								event.stopPropagation();
								self.hasimg = true;
								$(this).attr('readonly');
								$(this).css("border-color","#fff");
								var aid = $(this).siblings().attr('aid'),
									pid = $(this).siblings().attr('pid'),
									paid = $(this).siblings().attr('paid'),
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
									if( pid == undefined ){
										$url = "/room/albums/editalbums.html";
										param = {aid:aid,paid:paid,alname:filename};
									}else{
										$url = "/room/albums/editphotos.html";
										param = {aid:aid,pid:pid,photoname:filename};
									}
									self.$http.post(window.host+$url,
									param,{emulateJSON:true}).then(function(response){
										if(response.data.code == 0){
											self.$message({
									            type: 'success',
									            message: '修改成功!'
									        });
										}else{
											self.$message({
									            type: 'error',
									            message: '修改失败!'
									        });
										}
									},function(response){
										console.log(response);
									});
								}
								nowName = "";
							});
		        			//重命名结束
		        			
		        		}else{
		        			
		        		}
		        	},function(response){
		        		console.log(response);
		        	});
		       	},
		       	//删除文件或者图片
		       	delfileorimg:function(deltips,param,$url,temp){
		       		var self = this;
		       		self.$confirm(deltips, '提示', {
				      	confirmButtonText: '确定',
				      	cancelButtonText: '取消',
				      	type: 'warning'
				    }).then(() => {
				    	self.$http.post(window.host+$url,param,{emulateJSON:true}).then(function(response){
				    		if(response.data.code == 0){
								self.$message({
						            type: 'success',
						            message: '删除成功!'
						        });
						        //删除成功重新请求列表接口
						        self.getfilelist(temp);
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
		       },
		       	//点击进入文件夹操作
		       	intofile:function(param){
		       		var self = this;
		       		$('.myFiles').hide();
		       		$('.fileOfimg').show();
		       		self.getfilelist(param);
		       }
			}
		},
		created:function(){
			
		},
		methods:{
			//用于主页调用当前模板函数，弹出弹框并加载数据
			show:function(){
		        let self = this;
		        self.dialogmyPicture = true;
		        
		        self.$nextTick( () => {
		        	let $allFile = $('.allFile');
		        	//点击所有文件跳回最外层
		         	$allFile.click(function(){
						$('.myFiles').show();
			   			$('.fileOfimg').hide();
			   			self.fileaid = 0;
			   			self.newdisabled = false;
			   			self.searchMypic = "";
			   			self.placeholder = '搜索所有文件';
			   			self.data_img.aid = 0;
			   			var param = {
			   				aid:self.fileaid
			   			};
			   			self.getfilelist(param);
					});
		        })
		    },
			//弹窗打开事件
			openMypic: function(){
				var self = this;
				var param = {
					aid:self.fileaid
				};
				self.getfilelist(param);		
				self.$nextTick( () => {
					let $pic_li = $('.pic_li');
					let $rectangularBlock = $('.rectangularBlock');
					let $tabs_extendedLine = $('.tabs_extendedLine');
					//我的文件和图片库切换
					$pic_li.on('click',function(){
						if(!$(this).hasClass('borderBnone')){
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
						}
					});
				})
			},
			//弹窗关闭事件
			closeMypic: function(){
				var self = this;
				self.fileaid = 0;
				self.placeholder = '搜索所有文件';
				self.searchMypic = "";
				self.data_img = {aid:0};
				self.newdisabled = false;
				self.hasimg = true;
				$('.myFiles').show();
		       	$('.fileOfimg').hide();
			},
			//图片上传前，控制图片大小和格式
	     	beforeMypic: function(file){
	     		var self = this;
	     		if(self.httpStart > 0) return;
            	self.httpStart = 1;
     			if(file.size / 1024 / 1024 > 1){
	    			self.$notify({
		    			title: '警告',
		    			message: '上传的文件不能大于1MB。',
		    			type: 'warning',
		    			offset: 50,
		    			duration: 4000
		    		});
		    		return false;
	    		}
	      	},
	      	//上传成功回调
	      	successMypic: function(res, file){
	      		var self = this;
	      		if(res.code == 0){
	      			self.httpStart = 0;
	      			self.searchMypic = "";
	      			var param = {
	      				aid:self.fileaid
	      			};
	      			self.getfilelist(param);
	      		}else{
	      			self.httpStart = 0;
	      		}
	      	},
	      	
	      	//新建文件夹
      		newFlies: function(){
      			var self = this;
      			self.hasimg = true;
      			self.$http.post(window.host+"/room/albums/addalbums.html",
	    		{},{emulateJSON:true}).then(function(response){
	    			if(response.data.code == 0){
	    				var param={
	    					aid:0
	    				}
	    				self.getfilelist(param);
	    			}
	    		},function(response){
	    			console.log(response);
	    		});
      		},
			//---------- 搜索我的图片 -------------
      		searchMypicClick: function(ev){
      			var self = this;
      			self.hasimg = true;
      			if(self.searchMypic){
      				var param = {
	      				aid:self.fileaid,
	      				q:self.searchMypic
	      			};
      			}else{
      				var param = {
	      				aid:self.fileaid
	      			};
      			}
      			self.getfilelist(param);
      		},
      		//点击确定按钮保存图片
      		imgconfirm: function(){
      			var self = this;
      			var $checked_img = $('.img_box').children(".checked_img");
      			var checkimg;
      			for(var i=0;i<$checked_img.length;i++){
      				if($($checked_img[i]).css("display") == 'block'){
      					checkimg = $($checked_img[i]).siblings('img').attr('src');
      				}
      			}
      			let mod = $('.on_module')
      			let img = mod.find('img')
      			img.attr('src',checkimg);
      			setTimeout(function() {
      				let imgW = img.css('width')
  					let imgH = img.css('hegiht')
  					mod.css({'width': imgW, 'hegiht': imgH})
  					mod.find('.resizeBox').css({'width': imgW, 'hegiht': imgH})
      			},300)      			
			  	
				self.dialogmyPicture = false;
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
	.el-dialog--mypicture .el-dialog__footer{
		text-align: center;
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
		height: 459px;
		list-style: none;
		padding: 8px 0 0 22px;
		position: absolute;
		top: 67px;
		left: 0;
		display: block;
		overflow-y: auto;
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
		height: 400px;
		list-style: none;
		padding: 8px 0 15px 22px;
		margin-top: 10px;
		overflow-y: auto;
	}
	.myFiles .myFiles_li,.myImgs .myFiles_li{
		width: 78px;
		height: 106px;
		float: left;
		margin: 0 25px 20px 0;
		-moz-user-select: all;
		-ms-user-select: all;
		-webkit-user-select: all;
		position: relative;
	}
	
	.file_box,.img_box{
		width: 76px;
		height: 76px;
		position: relative;
		border: 1px solid #FFFFFF;
	}
	.myFiles .myFiles_li img,.myImgs .myFiles_li img{
		float: left;
		width: 76px;
		height: 76px;
		border: 0 none;
		cursor: pointer;
	}
	.myFiles .myFiles_li .fliename,.myImgs .myFiles_li .fliename{
		clear: both;
		display: block;
		width: 76px;
		height: 26px;
		line-height: 28px;
		margin: 0;
		text-align: center;
		border: 1px solid #FFFFFF;
	}
	.del_flie{
		display: none;
		width: 20px;
		height: 20px;
		position: absolute;
		top: 8px;
		right: -4px;
		cursor: pointer;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/delnewfile.png) center center no-repeat;
		border-radius: 50%;
		z-index: 10;
	}
	.del_img{
		display: none;
		width: 16px;
		height: 16px;
		position: absolute;
		top: -8px;
		right: -8px;
		cursor: pointer;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/delnewfile.png) center center no-repeat #FFFFFF;
		border-radius: 50%;
		z-index: 10;
	}
	.checked_img{
		display: none;
		width: 17px;
		height: 13px;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 5;
		cursor: pointer;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png);
	}
	.nofile{
		width: 100%;
		height: 100%;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/nofile.png) center center no-repeat;
	}
</style>