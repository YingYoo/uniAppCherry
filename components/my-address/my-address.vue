<template>
	<view class="container">
		<!--
			收货地址标题
		-->
		<view class="address_title">
			<!-- 
				左侧图标
			-->
			<uni-icons type="location" size="20"></uni-icons>
			<!-- 
				描述
			-->
			<text class="address_title_text">收货地址</text>
		</view>
		<!-- 
			address_main
		-->
		<view class="address_main">
			<!-- 
				选择收货地址的盒子
			-->
			<view 
				class="address_choose_box"
				v-if="JSON.stringify(address) === '{}'"
				@click="chooseAddress"
			>
				<!--
					选择收货地址的按钮
				-->
				<button 
					type="primary" 
					size="mini" 
					class="btnChooseAddress" 
					@click="chooseAddress"
				>请选择收货地址+</button>
			</view>
			
			<!-- 
				展示收货地址信息的盒子
			-->
			<view 
				class="address_info_box"
				@click="chooseAddress"
				v-else
			>
				<!--
					顶部边框线
				-->
				<view v-if="JSON.stringify(address) !== '{}'">
					<image src="/static/cart_border@2x.png" class="address_border top" ></image>
				</view>
				<view class="row1">
					<view class="row1_left">
						<view class="username">收货人：<text>{{ address.userName }}</text></view>
					</view>
					<view class="row1_right">
						<view class="phone">电话：<text>{{ address.telNumber }}</text></view>
						<uni-icons type="arrowright" size="16"></uni-icons>
					</view>
				</view>
				<view class="row2">
					<view class="row2_left">收货地址：</view>
					<view class="row2_right">{{ addStr }}</view>
				</view>
				<!--
					底部边框线
				-->
				<view v-if="JSON.stringify(address) !== '{}'">
					<image src="/static/cart_border@2x.png" class="address_border bottom"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations, mapGetters } from "vuex"
	
	export default {
		name:"my-address",
		data() {
			return {
				// 收货地址
				// address: {/* username: '啊啊啊啊' */},	
			};
		},
		methods: {
			...mapMutations("User", ["updateAddress"]),
			async chooseAddress() {
				/* 
					1. 调用小程序提供的API, chooseAddress()方法,即可使用选择收货地址的功能				 返回一个数组, 第一项为错误对象, 第二项为成功之后的收货地址信息
				*/
				const [ err, succ ] = await uni.chooseAddress().catch(err => err)		
				// 2. 用户成功的选择了收货地址
				if(err === null && succ.errMsg === "chooseAddress:ok") {
					// 为data里面的	收货地址对象赋值
					// this.address = succ
					this.updateAddress(succ)
				}
				
			// 	if(err && (err.errMsg === "chooseAddress: fail auth deny" || err.errMsg === "chooseAddress: fail authorize no response")) {
			// 		this.reAuth()
			// 	}
			// },
			// // 调用此方法, 重新授权
			// async reAuth() {
			// 	// 1. 提示用户对地址进行授权
			// 	const [ err2, confirmResult ] = await uni.showModal({
			// 		content: "检测到您没有打开地址权限, 是否去设置打开?",
			// 		confirmText: "确认",
			// 		cancelText: "取消"
			// 	})
				
			// 	// 2. 如果弹窗异常, 直接退出
			// 	if(err2) return
				
			// 	//3. 如果用户点击了 "取消" 按钮, 则提示用户 "您取消了地址授权!"
			// 	if(confirmResult.cancel) return uni.$showMsg("您取消了地址授权! ")
				
			// 	// 4. 如果用户点击了 "确认" 按钮, 则调用uni.openSetting() 方法进入授权页面, 让用户重新授权		
			// 	if(confirmResult.confirm) return uni.openSetting({
			// 		// 4.1. 授权结束, 需要对授权的结果进一步判断
			// 		success: (settingResult) => {
			// 			// 4.2. 地址授权的值等于 true, 提示用户 "授权成功!"
			// 			if(settingResult.authSetting["scope.address"]) return uni.$showMsg("授权成功! 请选择地址")
			// 			// 4.3. 地址授权的值等于 false, 提示用户 "您取消了地址授权! "
			// 			if(!settingResult.authSetting["scope.address"]) return uni.$showMsg("您取消了地址授权! ")
			// 		}
			// 	})
			}
		},
		computed: {
			...mapState("User", ["address"]),
			...mapGetters("User", ["addStr"])
		}
	}
</script>

<style lang="scss">
	.container{ 
		position: sticky;
		top: 0;
	}
	/*
		address_title
	*/
	.address_title{
		z-index: 999;
		display: flex;
		align-items: center;
		position: sticky;
		top: 0;
		margin-bottom: 15rpx; 
		padding-left: 5px;
		height: 40px;
		font-size: 14px;
		border-bottom: 1px solid #bbb;
		background-color: var(--greyLight-1);
		/*
			address_title_text
		*/
		.address_title_text {
			margin-left: 5px;
		}
	}
	.address_main {
		margin: 15rpx;
		border-radius: 20rpx;
		/* 
			选择收货地址盒子
		*/
		.address_choose_box { 
			display: flex; 
			justify-content: center;
			align-items: center;
			height: 100px;
			
			.btnChooseAddress{ 
				border-radius: 45rpx;
				line-height: 35px;
				background-color: #c00000;
				box-shadow: .3rem .3rem .6rem #d0d0d0, -.3rem -.3rem .6rem var(--white);
			}
		}
		/* 
			展示收货信息的盒子
		*/
		.address_info_box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			font-size: 12px;
			border-radius: 20rpx;
			box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
			/*
				底部边框线
			*/
			.address_border{
				display: block;
				width: 100%;
				height: 6px;
			}
			.address_border.top{
				border-radius: 20rpx 20rpx 0 0;
			} 
			.address_border.bottom {
				border-radius: 0 0 25rpx 25rpx;
			}
			.row1 {
				display: flex;
				justify-content: space-between;
				margin: 15rpx;
				
				.row1_right {
					display: flex;
					justify-content: space-between;
				}
			}
			
			.row2 {
				display: flex;
				margin: 20rpx 15rpx 15rpx;
				
				.row2_left {
					white-space: nowrap;
				}
			}
		}
	}
	
	// .address_choose_box,
	// .address_info_box {
	// 	margin: 15rpx;
	// 	border-radius: 20rpx;
	// 	box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
	// }
</style>