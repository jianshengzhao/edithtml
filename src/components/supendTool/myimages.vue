<template>
	<div class="myimages">
		<!--我的图片库弹窗-->
		<el-dialog
		    title="添加图片"
		    :visible.sync="dialogmyPicture"
		    size="mypicture"
		    :close-on-click-modal="false"
		    @open="openMypic"
		    @close="closeMypic">

			<ul class="pic_ul">
			    <li class="pic_li borderBnone">我的文件</li>
			    <li class="pic_li">图片库</li>
			    <div class="rectangularBlock"></div>
			    <div class="tabs_extendedLine"></div>
			</ul>

			<!--我的文件结构-->
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
					  <el-button title="只能添加 jpg，jpeg，gif，png，图片大小不超过1MB"><i class="el-icon-upload el-icon--right"></i>直接上传</el-button>
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

			<!--图片库结构-->
			<div class="el-menu-library">
				<div class="nofile nofir" v-loading="libraryloading" style="display: none;"></div>
				<div class="fir" v-loading="libraryloading">
					<div class="library_tabs">
						<el-radio-group v-model="radio_type" @change="radio_type_change(radio_type)">
						    <el-radio-button v-for="(item, index) in radio_type_tabs" :key="index" :label="item.alname"></el-radio-button>
						</el-radio-group>
					</div>
					<div class="library_content">
						<div class="nofile nosec" style="display: none;"></div>
						<div class="sec">
							<p class="library_classifys">

							</p>
							<div class="library_img nofalls"> <!--非瀑布流-->
								<div class="nofile nothd" style="display: none;"></div>
								<div class="library_imgs thd">

								</div>
							</div>
							<div class="library_img falls"> <!--瀑布流-->
								<div class="nofile nothdfalls" style="display: none;"></div>

								<div class="library_imgs_falls thdfalls" id="waterfall-box">

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		    <span slot="footer">
		      	<el-button @click="dialogmyPicture = false" size="large">取 消</el-button>
		        <el-button v-if="!picturetype" :disabled="hasimg" type="primary" @click="imgconfirm" size="large">确 定</el-button>
            <el-button v-if="picturetype" :disabled="hasimg" type="primary" @click="pictureedit" size="large">确 定</el-button>
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
			  picturetype:false,  //是否是修改用户名/密码图标
				hasimg:true, 			//弹窗确认按钮禁用控制
				httpStart:0,			//后台请求控制，防止多次请求发生
				dialogmyPicture: false,	//弹窗控制
				newdisabled: false,		//新建文件夹按钮控制
				data_img:{aid:0},		//上传图片参数
				placeholder:'搜索所有文件',//搜索框提示语控制
       			searchMypic:'',			//搜索关键字
       			fileaid:0,
				// --------- 图片模块组件 ---------

				//图片库组件
				radio_type:'图片', 		//图片类型
				radio_type_tabs:[],
				libraryloading:true,//加载中
				radioaid:"",		//第一层图片图标分类id
				scrollimgpage:1,
				scrollimg: 40,		//一次加载多少张图
				systype:1,
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
						     			newli	+= '<input class="fliename" type="text" value="'+datas.ablums[i].alname+'" readonly title="'+datas.ablums[i].alname+'"/>';
						     		newli	+= '</li>';
			        			}
		       				}
		        			if(datas.photos){ //图片
		        				for(var j=0,len=datas.photos.length;j<len;j++){
			        				newli += '<li class="myFiles_li">';
			        					newli += '<div class="img_box" aid="'+datas.photos[j].aid+'" pid="'+datas.photos[j].pid+'">'
			        						newli += '<img class="myimgs" src="'+datas.showpath+datas.photos[j].path+'"  dataW="'+ (datas.photos[j].width|| false) +'" dataH ="'+(datas.photos[j].height|| false)+'" />';
			        						newli += '<span class="del_img"></span>';
			        						newli += '<span class="checked_img"></span>'
			        					newli += '</div>'
			        					newli += '<input class="fliename" type="text" value="'+datas.photos[j].photoname+'" readonly title="'+datas.photos[j].photoname+'" />';
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
		        				$('.checked_icons').hide();
		        				$(".icons_box").css("border-color","#ffffff");
		        				$('.checked_falls').hide();
		        				$('.waterfall').css("border-color","#ffffff");

		        				$(this).parent().siblings().children(".img_box").css("border-color","#ffffff");
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
		       	},
		       	//获取图片库分类信息
		       	getlibraryclassify:function(){
		       		var self = this;
		       		self.libraryloading = true;
		       		self.$http.post(window.host+"/room/albums/getgallerys.html",
		       		{},{emulateJSON:true}).then(function(response){
		        		if(response.data.code == 0){
		        			var datas = response.data;
		        			var gallerys = [];
		        			for(var i=0;i<datas.data.gallerys.length;i++){
		        				if(datas.data.gallerys[i].ishide != 1){
		        					gallerys.push(datas.data.gallerys[i]);
		        				}
		        			}
		        			if(gallerys.length <= 0){
		        				$('.nofir').show();
		        				$('.fir').hide();
		        			}else{
		        				$('.nofir').hide();
		        				$('.fir').show();
			        			self.radio_type_tabs = gallerys;
		        				self.radio_type = gallerys[0].alname;


		        				if(gallerys[0].children){
		        					$('.nosec').hide();
      								$('.sec').show();
      								$(".library_classifys").empty();
				      				var spans = "";
				      				for( i in gallerys[0].children){
				      					spans += "<span class='classify' aid="+gallerys[0].children[i].aid+">"+gallerys[0].children[i].alname+"</span>"
				      				}
				      				$(".library_classifys").append(spans);
				      				$($(".classify")[0]).addClass("classify_check");

				      				self.radioaid = gallerys[0].children[0].aid;
				      				var param = {
				      					systype:self.systype,
										aid:self.radioaid,
										page:self.scrollimgpage,
										pagesize:self.scrollimg
									}
									self.getlibrary(param);

									//二级分类点击切换
									$(".classify").on("click",function(){
										$("#waterfall-box").empty();
				      					$(this).siblings().removeClass("classify_check");
				      					$(this).addClass("classify_check");
				      					self.radioaid = $(this).attr("aid");
				      					self.scrollimgpage = 1;
				      					var param = {
				      						systype:self.systype,
											aid:self.radioaid,
											page:self.scrollimgpage,
											pagesize:self.scrollimg
										}
										self.getlibrary(param);

										$("#waterfall-box").on("scroll",function(){
											var thisHeight = $(this).height();
											var thisscrollTop = $(this).scrollTop();
											var scrollHeight = $("#waterfall-box")[0].scrollHeight;
											if(thisscrollTop + thisHeight >= scrollHeight){
												self.scrollimgpage = self.scrollimgpage + 1;
												var param = {
													systype:self.systype,
													aid:self.radioaid,
													page:self.scrollimgpage,
													pagesize:self.scrollimg
												}
												self.getlibrary(param);
											}
										})

				      				});

		        				}else{
		        					$('.nosec').show();
      								$('.sec').hide();
		        				}
		        			}
		        			self.libraryloading = false;
		        		}
		        	},function(response){
		        		console.log(response);
		        	});
		       	},
		       	//获取图片库的图片
		       	getlibrary:function(param){
		       		var self = this;
		       		self.$http.post(window.host+"/room/albums/getgalleryphotos.html",
		       		param,{emulateJSON:true}).then(function(response){
		       			if(response.data.code == 0){
		       				var datas = response.data;
		       				if(self.radio_type == "图片"){ 	//瀑布流
		       					$(".falls").show();
		       					$(".nofalls").hide();
		       					if(datas.data.photos.length < self.scrollimg){
		       						$("#waterfall-box").unbind("scroll");
		       					}
		       					if(datas.data.photos.length || $('.waterfall').length){
		       						$(".nothdfalls").hide();
		       						$(".thdfalls").show();
		       						var photos = datas.data.photos;
		       						var oDiv = "";
									for(let i in photos){
										var oDiv = "<div class='waterfall' style='height:" + photos[i].picheight +"px' title="+photos[i].photoname+"><img class='' style='height:"+photos[i].picheight+"px' src="+photos[i].imgurl+"  dataW='"+ (photos[i].width|| false) +"' dataH='"+ (photos[i].height|| false) +"'/><span class='checked_falls'></span></div>"
										$("#waterfall-box").append(oDiv);
									}
		       						change();
		       						$('.waterfall').on("click",function(){
		       							$('.img_box').css("border-color","#ffffff");
		       							$(".checked_img").hide();
		       							$(this).siblings().children(".checked_falls").hide();
		       							$(this).children(".checked_falls").show();
		       							$(this).css("border-color","#557CE1");
		       							$(this).siblings().css("border-color","#FFFFFF");
		       							self.hasimg = false;
		       						});
		       						$('.waterfall').hover(function(){
										if($(this).children(".checked_falls").css("display") == "none"){
											$(this).css("border-color","#557CE1");
										}
									},function(){
										if($(this).children(".checked_falls").css("display") == "block"){
											$(this).css("border-color","#557CE1");
										}else{
											$(this).css("border-color","#ffffff");
										}
									});
		       					}else{
		       						$(".nothdfalls").show();
		       						$(".thdfalls").hide();
		       					}

		       				}else{							//非瀑布流
		       					$(".falls").hide();
		       					$(".nofalls").show();

		       					$(".library_imgs").empty();
		       					if(datas.data.photos.length){
		       						$(".nothd").hide();
		       						$(".thd").show();
		       						var uls = "<ul>";
		       						for(var i in datas.data.photos){
		       							uls += "<li class='icons_box' title="+datas.data.photos[i].photoname+"><img class='icons' dataW='"+ (datas.data.photos[i].width|| false) +"' dataH='"+ (datas.data.photos[i].height|| false) +"' src="+datas.data.photos[i].imgurl+' /><span class="checked_icons"></span></li>'
		       						}
		       						uls += "</ul>";
		       						$(".library_imgs").append(uls);
		       					}else{
		       						$(".nothd").show();
		       						$(".thd").hide();
		       					}
		       				}
		       				//这里
		       				$(".icons_box").on("click",function(){
		       					$('.img_box').css("border-color","#ffffff");
		       					$(".checked_img").hide();
		       					$(this).children(".checked_icons").show();
		       					$(this).siblings().children(".checked_icons").hide();
		       					$(this).css("border-color","#557CE1");
		       					$(this).siblings().css("border-color","#FFFFFF");
		       					self.hasimg = false;
		       				});

		       				$('.icons_box').hover(function(){
								if($(this).children(".checked_icons").css("display") == "none"){
									$(this).css("border-color","#557CE1");
								}
							},function(){
								if($(this).children(".checked_icons").css("display") == "block"){
									$(this).css("border-color","#557CE1");
								}else{
									$(this).css("border-color","#ffffff");
								}
							});

		       				function change() {
		       					var $waterfall = $(".waterfall");
		       					var arrH = [];
								for(let i=0,len=$waterfall.length;i<len;i++){
									var j = i%4;
									if (arrH.length == 4) {
						                var min = findMin(arrH);
						                $waterfall[i].style.left = 30 + min*190 + "px";
						                $waterfall[i].style.top = arrH[min]+10 + "px";
						                arrH[min] += $($waterfall[i]).height() + 10;
						           }else{
						                arrH[j] = $($waterfall[i]).height();
						                $waterfall[i].style.left = 30 + 180*j+10*j + "px";
						                $waterfall[i].style.top = 0;
						            }
								}
						    }
		       				function findMin(arr) {
							    var m = 0;
							    for (var i = 0; i < arr.length; i++) {
							        m = Math.min(arr[m], arr[i]) == arr[m] ? m : i;
							    }
							    return m;
							}

		       			}
		        	},function(response){
		        		console.log(response);
		        	});
		       	},

		       	getImageWidth:function(url,callback){
					var img = new Image();
					img.src = url;
					if(img.complete){
					    callback(img.width, img.height);
					}else{
				            // 完全加载完毕的事件
				    	img.onload = function(){
							callback(img.width, img.height);
				    	}
			        }

				}
			}
		},
		created:function(){

		},
		methods:{
			//用于主页调用当前模板函数，弹出弹框并加载数据
			show:function(returnSrc, that, srcFun,type){
		        let self = this;
		        if (type == 'loginbox'){
		          self.picturetype = true
            }else{
              self.picturetype = false
            }
		        self.dialogmyPicture = true;
		        self.saveParam = false
		        if (returnSrc) {
		        	self.saveParam = {
		        		returnSrc: returnSrc,
		        		that: that,
		        		srcFun: srcFun
		        	}
		        }
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
				self.getfilelist(param);//加载我的文件数据
				self.getlibraryclassify(); //加载图片库分类数据

				self.$nextTick( () => {
					let $pic_li = $('.pic_li');
					let $rectangularBlock = $('.rectangularBlock');
					let $tabs_extendedLine = $('.tabs_extendedLine');
					//我的文件和图片库切换
					$pic_li.on('click',function(){
						//切换时让之前选中的取消选中
//						$(".checked_img").hide();
//						$('.img_box').css("border-color","#ffffff");
//						self.hasimg = true;

						if($(this).html() == "我的文件"){
							$(".el-menu-mypic").show();
							$(".el-menu-library").hide();
						}else{
							$(".el-menu-mypic").hide();
							$(".el-menu-library").show();
						}
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
					$("#waterfall-box").on("scroll",function(){
						var thisHeight = $(this).height();
						var thisscrollTop = $(this).scrollTop();
						var scrollHeight = $("#waterfall-box")[0].scrollHeight;
						if(thisscrollTop + thisHeight >= scrollHeight){
							self.scrollimgpage = self.scrollimgpage + 1;
							var param = {
								systype:self.systype,
								aid:self.radioaid,
								page:self.scrollimgpage,
								pagesize:self.scrollimg
							}
							self.getlibrary(param);
						}
					})
				})
			},
			//弹窗关闭事件
			closeMypic: function(){
				var self = this;
				self.fileaid = 0;
				self.scrollimgpage = 1;
				self.placeholder = '搜索所有文件';
				self.searchMypic = "";
				self.data_img = {aid:0};
				self.newdisabled = false;
				self.hasimg = true;
				$('.myFiles').show();
		       	$('.fileOfimg').hide();
		       	$("#waterfall-box").empty();
			},
			//图片上传前，控制图片大小和格式
	     	beforeMypic: function(file){
	     		var self = this;
	     		if(self.httpStart > 0) return;
            	self.httpStart = 1;
            	if(file.type != "image/jpeg" && file.type != "image/gif" && file.type != "image/png"){
            		self.$notify({
		    			title: '警告',
		    			message: '上传的文件只能是jpeg、jpg、gif或png格式。',
		    			type: 'warning',
		    			offset: 50,
		    			duration: 4000
		    		});
		    		return false;
            	}
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
	      		}else{
	      			self.httpStart = 0;
	      		}
	      		var param = {
      				aid:self.fileaid
      			};
      			self.getfilelist(param);
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
      			var checkimg;
      			var $checked_img = $(".checked_img");
      			var checkimgSize = {
      				w: '',
      				h: ''
      			};
      			for(var i=0;i<$checked_img.length;i++){
      				if(!$($checked_img[i]).is(":hidden")){
      					checkimg = $($checked_img[i]).siblings('img').attr('src');
      					checkimgSize.w = $($checked_img[i]).siblings('img').attr('dataw') || false
      					checkimgSize.h = $($checked_img[i]).siblings('img').attr('datah') || false
      				}
      			}
      			var $checked_icons = $(".checked_icons");
      			for(var i=0;i<$checked_icons.length;i++){
      				if(!$($checked_icons[i]).is(":hidden")){
      					checkimg = $($checked_icons[i]).siblings('img').attr('src');
      					checkimgSize.w = $($checked_icons[i]).siblings('img').attr('dataw') || false
      					checkimgSize.h = $($checked_icons[i]).siblings('img').attr('datah') || false
      				}
      			}
      			var $checked_falls = $(".checked_falls");
      			for(var i=0;i<$checked_falls.length;i++){
      				if(!$($checked_falls[i]).is(":hidden")){
      					checkimg = $($checked_falls[i]).siblings('img').attr('src');
      					checkimgSize.w = $($checked_falls[i]).siblings('img').attr('dataw') || false
      					checkimgSize.h = $($checked_falls[i]).siblings('img').attr('datah') || false
      				}
      			}

      			let saveParam = self.saveParam
      			if(saveParam) { // 判断是否作用在模块上，还是放回img src
		        	saveParam.srcFun(saveParam.that, checkimg, checkimgSize)
      			} else {
	      			// checkimg
	      			let mod = $('.on_module')
	      			let img = mod.find('img')
	      			img.removeAttr('style')
	      			let picBox = mod.find('.picBox')
	      			img.attr('src',checkimg);
	      			let imgSrc = img.attr("src");
					self.getImageWidth(imgSrc,function(w,h){
						mod.css({'width': w, 'height': h})
						mod.find('.resizeBox').css({'width': w, 'height': h})
						if(picBox.hasClass('round') || picBox.hasClass('square')){
							if (parseInt(w) > parseInt(h)) {
								picBox.css({'width': h, 'height': h})
							} else {
								picBox.css({'width': w, 'height': w})
							}
						}
					})
				}
				self.dialogmyPicture = false;
      		},
      pictureedit:function () {  //修改用户名/密码图标
        var self = this;
        var checkimg;
        var $checked_img = $(".checked_img");
        var checkimgSize = {
          w: '',
          h: ''
        };
        for(var i=0;i<$checked_img.length;i++){
          if(!$($checked_img[i]).is(":hidden")){
            checkimg = $($checked_img[i]).siblings('img').attr('src');
            checkimgSize.w = $($checked_img[i]).siblings('img').attr('dataw') || false
            checkimgSize.h = $($checked_img[i]).siblings('img').attr('datah') || false
          }
        }
        var $checked_icons = $(".checked_icons");
        for(var i=0;i<$checked_icons.length;i++){
          if(!$($checked_icons[i]).is(":hidden")){
            checkimg = $($checked_icons[i]).siblings('img').attr('src');
            checkimgSize.w = $($checked_icons[i]).siblings('img').attr('dataw') || false
            checkimgSize.h = $($checked_icons[i]).siblings('img').attr('datah') || false
          }
        }
        var $checked_falls = $(".checked_falls");
        for(var i=0;i<$checked_falls.length;i++){
          if(!$($checked_falls[i]).is(":hidden")){
            checkimg = $($checked_falls[i]).siblings('img').attr('src');
            checkimgSize.w = $($checked_falls[i]).siblings('img').attr('dataw') || false
            checkimgSize.h = $($checked_falls[i]).siblings('img').attr('datah') || false
          }
        }
        var img = $('.on_module')
        if (img.hasClass('username')){
          img.find('i.i_username i').css('backgroundImage','url('+checkimg+')')
        }else if (img.hasClass('password')){
          img.find('i.i_password i').css('backgroundImage','url('+checkimg+')')
        }
        self.dialogmyPicture = false;
      },


      		//图片库一级菜单改变事件
      		radio_type_change:function(val){
      			$("#waterfall-box").empty();
      			var self = this,seclevel = [];
      			self.scrollimgpage = 1;
      			self.systype = val=="图片"?1:2;
      			for(var i=0;i<self.radio_type_tabs.length;i++){
      				if(val == self.radio_type_tabs[i].alname){
      					seclevel = self.radio_type_tabs[i].children;
      				}
      			}
      			//判断是否有二级菜单
      			if(seclevel){
      				$('.nosec').hide();
      				$('.sec').show();
      				$(".library_classifys").empty();
      				var spans = "";
      				for( i in seclevel){
      					spans += "<span class='classify' aid="+seclevel[i].aid+">"+seclevel[i].alname+"</span>"
      				}
      				$(".library_classifys").append(spans);
      				$($(".classify")[0]).addClass("classify_check");

      				self.radioaid = seclevel[0].aid;

      				var param = {
      					systype:self.systype,
						aid:self.radioaid,
						page:self.scrollimgpage,
						pagesize:self.scrollimg
					}
					self.getlibrary(param);

      				$(".classify").on("click",function(){
      					$("#waterfall-box").empty();
      					$(this).siblings().removeClass("classify_check");
      					$(this).addClass("classify_check");
      					self.radioaid = $(this).attr("aid");
      					self.scrollimgpage = 1;
      					var param = {
      						systype:self.systype,
							aid:self.radioaid,
							page:self.scrollimgpage,
							pagesize:self.scrollimg
						}
						self.getlibrary(param);

						$("#waterfall-box").on("scroll",function(){
							var thisHeight = $(this).height();
							var thisscrollTop = $(this).scrollTop();
							var scrollHeight = $("#waterfall-box")[0].scrollHeight;
							if(thisscrollTop + thisHeight >= scrollHeight){
								self.scrollimgpage = self.scrollimgpage + 1;
								var param = {
									systype:self.systype,
									aid:self.radioaid,
									page:self.scrollimgpage,
									pagesize:self.scrollimg
								}
								self.getlibrary(param);
							}
						})




      				});
      			}else{
      				$('.nosec').show();
      				$('.sec').hide();
      			}
      		},
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





	.el-menu-library{
		width: 802px;
		height: 535px;
		position: absolute;
		top: 0;
		right: 0;
		display: none;
	}
	.library_tabs{
		padding: 20px;
	}
	.library_tabs .el-radio-group{

	}
	.library_content{
		height: 458px;
	}
	.library_content .library_classifys{
		padding-left: 20px;
		margin-bottom: 20px;
	}
	.library_content .library_classifys .classify{
		margin-right: 20px;
		cursor: pointer;
	}
	.classify_check{
		color: #557CE1;
	}
	.library_content .library_img{
		height: 420px;
	}
	.library_content .library_imgs{
		width: 742px;
		height: 410px;
		position: relative;
		overflow-y: auto;
		padding: 0 25px;
	}
	.icons_box{
		float: left;
		width: 80px;
		height: 80px;
		border: 1px solid #FFFFFF;
		list-style: none;
		margin: 5px;
		position: relative;
	}
	.icons_box .icons{
		float: left;
		width: 80px;
		height: 80px;
		cursor: pointer;
		border: 0 none;
	}
	.checked_icons{
		display: none;
		width: 17px;
		height: 13px;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 5;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png);
	}


	.library_imgs_falls{  /*瀑布流*/
		width: 792px;
		height: 410px;
		position: relative;
		overflow-y: auto;
	}
	.waterfall{
		width: 175px;
		position: absolute;
		border: 1px solid #FFFFFF;
	}
	.waterfall img{
		float: left;
		width: 175px;
		cursor: pointer;
	}
	.checked_falls{
		display: none;
		width: 17px;
		height: 13px;
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 5;
		background: url(http://static.ebanhui.com/ebh/tpl/default/images/checkfile.png);
	}
	.el-radio-button__orig-radio:checked+.el-radio-button__inner{
		background-color: #527EDF;
	}
	.el-radio-button__orig-radio:checked+.el-radio-button__inner{
		border-color: #527EDF;
	}
</style>
