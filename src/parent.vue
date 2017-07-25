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
  .rectangle{
    position: absolute;
    width: 200px;
    height: 50px;
    text-align:center;
    box-sizing: border-box;
    background-color: #4998ff;
    color: #fff;
  }
</style>
