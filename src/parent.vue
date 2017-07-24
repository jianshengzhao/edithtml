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
</style>
