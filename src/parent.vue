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
  #parent{
    width: 100%;
    height: 100%;
  } 
  .module{
     position: absolute;
     background-color: #F9F8F8;
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
    word-break:break-all; /*支持IE，chrome，FF不支持*/
　　word-wrap:break-word;/*支持IE，chrome，FF*/
  }
  .editor{
    box-sizing: border-box;
    padding: 8px;
    width: 400px;
    height: 400px;
    word-break:break-all; /*支持IE，chrome，FF不支持*/
　　word-wrap:break-word;
  }
  .editor p {
    margin:5px 0;
  }
  .pageHeader{
    width: 100%;
    min-height:100px; 
  }
  .pageHeader img{
    margin-left: 50%;
    transform:translateX(-50%); 
    -ms-transform:translateX(-50%);  
    -moz-transform:translateX(-50%); 
    -webkit-transform:translateX(-50%);
    -o-transform:translateX(-50%); 
  }
</style>
