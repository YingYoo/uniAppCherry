<template>
	<view class="container">
		<!-- 
			用户未登录时, 显示登录组件
		-->
		<my-login v-if="!token"></my-login>
		<!-- 
			用户登陆成功后, 显示用户信息组件
		-->
		<my-usersinfo v-else></my-usersinfo>
	</view>
</template>

<script>
	
	import badgeMix from "@/mixin/tabbar_badge.js"
	import { mapState } from "vuex"
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				
			};
		},
		computed: {
			...mapState("User", ["token"])
		}
	}
</script>

<style lang="scss">
	.container {
		margin:  0;
		
	}
</style>
