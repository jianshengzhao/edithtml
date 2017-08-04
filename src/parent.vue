<template>
  <div id="parent">
    <router-view></router-view> 
  </div>
</template>
<script>
  export default {
    name: 'parent'
  }
</script>
<style>
  *{
    margin:0;
    padding:0;
    font-family: -apple-system, "SF UI Text", "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif;
    /*font-family: "Microsoft YaHe";*/
  }
  html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  ::-webkit-scrollbar {
      width: 4px;
      height: 12px;
  }
  ::-webkit-scrollbar-track-piece{
      background-color: #fff;
    /*  -webkit-border-radius: 6px;*/
  }
  ::-webkit-scrollbar-thumb:vertical{
      height: 8px;
      width: 3px;
      background-color: #c9c9c9;
      -webkit-border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:horizontal{
      width: 4px;
      background-color: #c9c9c9;
     /* -webkit-border-radius: 6px;*/
  }
  Pseudo ::scrollbar-corner element
  ::-webkit-scrollbar-corner {
      background-color: #c9c9c9;
  }
  Pseudo ::scrollbar-thumb element
  ::-webkit-scrollbar-thumb {
      background-color: #c9c9c9;
      border-radius: 4px;
  }
  Pseudo ::scrollbar-track element
  ::-webkit-scrollbar-track {
      background-color: #c9c9c9;
  }
  input{
    outline: 0;
  }
  #parent{
    width: 100%;
    height: 100%;
  } 
  .module{
    position: absolute;
    background-color: #fff;
    z-index: 49;
  }
  .rectangle{    
    width: 200px;
    height: 50px;
    box-sizing: border-box;
  }
  .radius {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .text{
    width: 200px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    text-align: left;
    word-break:break-all;
    word-wrap:break-word;
  }
  .editor{
    box-sizing: border-box;
    padding: 8px;
    width: 400px;
    height: 400px;
    word-break:break-all;
    word-wrap:break-word;
  }
  .editor p {
    margin:5px 0;
  }
  .pageHeader{
    width: 100%;
    height: 140px;
  }
  .pageHeader .imgbox{
    width: 100%;
    height: 100%;    
    overflow: hidden;
  }
  .pageHeader img{
    display:block;
    margin-left: 50%;
    transform:translateX(-50%); 
    -ms-transform:translateX(-50%);  
    -moz-transform:translateX(-50%); 
    -webkit-transform:translateX(-50%);
    -o-transform:translateX(-50%);
    min-width: 100%;
  }
  .navigation {
    width: 100%;
    height:50px; 
  }
  .navigation a{
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
    color: #808080;
    float: left;
    display: inline;
    cursor: pointer;
  }
  .navigation a:hover{
    color: #338bff;
  }
  .login_box{
    float: right;
    width: 126px;
    padding-right: 5px;
  }
  .search_box{
    float: right;
    width: 140px;
    margin-top: 11px;    
    border: 1px solid #dcdcdc;
    background-color: #fff;
    border-radius: 2px;
  }
  .inp_search{
    width: 100px;
    height: 30px;
    line-height: 30px;
    border: 0 none;
    padding: 0 6px;
    font-size: 12px;
    color: #333;
    float: left;
    display: inline;
    border-radius: 2px 0 0 2px;
    font-family: 微软雅黑;
    vertical-align: middle;
  }
  .btn-search{
    background: url(http://static.ebanhui.com/ebh/tpl/newschoolindex/images/plate-newsolico.jpg) no-repeat left center;
    background-position: center;
    border: medium none;
    cursor: pointer;
    height: 30px;
    width: 24px;
    float: left;
    vertical-align: middle;
  }
  .WeChat {
    width: 305px;
    height: 330px;
  }
  .mod-title{
    box-sizing: border-box;
    width: 100%;
    padding: 16px 0 0 14px;
    height: 40px;
    line-height: 24px;
    font-size: 20px;
  }
  .QRcode{
    width: 212px;
    height: 212px;
    background: #f7f7f7;
    border-radius: 4px;
    padding: 10px;
    margin: 15px auto 25px;
  }
  .QRcode img{
    display: block;
    width: 212px;
    height: 212px;
  }
  .schoolProfile{
    width: 900px;
    height: 332px;
    font-size: 15px;
    color: #808080;
    line-height: 24px;
  }
  .profile{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    padding:50px 10px 20px 12px;
    overflow: hidden;
    box-sizing: border-box;
  }
  #badge{
    float: left;
    width:36%;
    border-radius: 50%;
    margin: 10px 10px 0 10px;
    max-width: 220px;
    min-width: 80px;
  }
  .hotLabel{
    width: 305px;
    height: 330px;
    font-size: 16px;
  }
  .news{
    width: 305px;
    height: 330px;
    font-size: 14px;
  }
  .hotLabelList, .newsList {
    position: absolute;
    top:0;
    left: 0;    
    padding:50px 10px 10px 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .hl_li {
    display: inline-block;
    margin: 5px;
    padding: 8px 12px;
    background-color: #ebf3ff;
    color: #157aff;
  }
  .newsList{
    padding:50px 20px 10px;
  }
  .news_li{
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    background:url(http://static.ebanhui.com/ebh/tpl/newschoolindex/images/newsico.png) no-repeat left center;
    text-indent: 5px;
    border-bottom: 1px dashed #ebebeb;
  }
/*-------------enlist-----------------*/
  .enlist, .dynamics{
    width: 305px;
    height: 330px;
    font-size: 14px;
  }
  .enlistList, .dynamicsList{
    position: absolute;
    top:0;
    left: 0;    
    padding:50px 10px 10px 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  } 
  .enlist_li, .dynamics_li{
    position: relative;
    height: 80px;
    border-bottom: 1px solid #eee;
  }
  .enlist_li img, .dynamics_li img{
    position: absolute;
    top: 15px;
    left: 10px;
    border-radius: 50%;
    overflow: hidden;
  }
  .enlist_li:last-child, .dynamics_li:last-child{
    border:0;
  } 
  .enlist_li p, .dynamics_li p{
    position: absolute;
    top: 15px;
    left: 72px;
    color: #333;
  }
  .openservice{
    position: absolute;
    top:40px;
    left: 72px;
  }
  .openservice a{
    padding: 0 10px;
    color: #338bff;
  }
  .carousel{
    position: relative;
    width: 1200px;
    height: 330px;
    background: #fff;
  }
  .screenBox{
    position: absolute;
    top:0;
    left:50%;
    transform: translateX(-50%);
    -ms-transform:translateX(-50%);  
    -moz-transform:translateX(-50%); 
    -webkit-transform:translateX(-50%);
    -o-transform:translateX(-50%);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .screenBox img{
    position: absolute;
    top:0;
    left:50%;
    transform: translateX(-50%);
    -ms-transform:translateX(-50%);   /* IE 9 */
    -moz-transform:translateX(-50%);  /* Firefox */
    -webkit-transform:translateX(-50%); /* Safari 和 Chrome */
    -o-transform:translateX(-50%);
    height: 100%;
  }
  .barbox{
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    -ms-transform:translateX(-50%);   
    -moz-transform:translateX(-50%); 
    -webkit-transform:translateX(-50%); 
    -o-transform:translateX(-50%);
    height: 12px;
  }
  .barbox li {
    float: left;
    margin: 0 3px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color:#6297c5; 
    cursor: pointer;
  }
  .barbox li.on {
    background-color:#010f17;
  }
/*-------------enlisttodo-----------------*/

</style>
