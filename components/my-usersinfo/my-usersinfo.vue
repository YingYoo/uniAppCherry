<template>
	<view class="userinfo_container">
		<!-- 
			用户头像区域
		-->
		<view class="avatar_box">
			<!-- 用户头像 https://thirdwx.qlogo.cn/mmopen/vi_32/sYdKwaHatCHplZAKrdsT8HdRlU0T9Qaseibm9s2dsGAepKgUWibJp9LD7t3KXqrzibUbM0MGwczzTPtiavDG1TWByQ/132-->
			<image :src="userinfo.avatarUrl" class="avatar_img"></image>
			<!-- 用户昵称 -->
			<view class="nickname">多余的余宝.</view>
		</view>
		<!-- 
			用户面板区域
		-->
		<view class="panel_body_list">
			<!-- 第一个面板区域 -->
			<view class="panel">
				<!-- panel 主体区域 -->
				<view class="panel_list">
					<!-- panel 的 item 项 -->
					<view class="panel_item">
						<text class="panel_num">8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel_item">
						<text class="panel_num">14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel_item">
						<text class="panel_num">18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel_item">
						<text class="panel_num">84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			
			<!-- 第二个面板区域 -->
			<view class="panel">
				<!-- panel 主体区域 -->
				<view class="panel_title">我的订单</view>
				<view class="panel_list">
					<!-- panel 的 item 项 -->
					<view class="panel_item">
						<!-- icon 图标 -->
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text class="panel_item_text">待付款</text>
					</view>
					<view class="panel_item">
						<!-- icon 图标 -->
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text class="panel_item_text">待收货</text>
					</view>
					<view class="panel_item">
						<!-- icon 图标 -->
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text class="panel_item_text">退款/退货</text>
					</view>
					<view class="panel_item">
						<!-- icon 图标 -->
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text class="panel_item_text">全部订单</text>
					</view>
				</view>
			</view>
			
			<!-- 第3个面板区域 -->
			<view class="panel">
				<view class="panel_list_item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel_list_item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel_list_item">
					<text>关于我们</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 
			退出登录按钮
		-->
		<view class="login_out">
			<button type="primary" class="login_out_btn" @click="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations } from "vuex"
	
	export default {
		name:"my-usersinfo",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState("User", ["userinfo"])
		},
		methods: {
			...mapMutations("User", ["updateAddress", "updateUserInfo", "updateToken"]),
			async loginOut() {
				// 询问用户是否退出登录
				const [ err, succ ] = await uni.showModal({
					title: "提示",
					content: "确认退出登录吗 ? "
				}).catch(err => err)
				
				if(succ && succ.confirm) {
					// 用户确认操作
					// 需要清空vuex中的 address, userinfo 和 token
					this.updateAddress({})
					this.updateUserInfo({})
					this.updateToken("")
				}
			}
		}
	}
</script>

<style lang="scss">
	.userinfo_container {
		height: 100%;
		background-color: #f4f4f4;
		/* 
			用户头像区域
		*/	
		.avatar_box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 400rpx;
			background-color: #c00000;
			/* 用户头像 */
			.avatar_img {
				width: 90px;
				height: 90px;
				border-radius: 50%;
				border: 2px solid #fff;
				box-shadow: .3rem .3rem .3rem #792727,
				            -.3rem -.3rem .3rem #d62e2e;
			}
			/* 用户昵称 */
			.nickname {
				margin-top: 10px;
				color: #fff;
				font-size: 16px;
			}
		}
		/*
			用户面板区域
		*/
		.panel_body_list {
			position: relative;
			top: -25px;
			padding: 0 20rpx;
			.panel {
				margin-bottom: 20rpx;
				background-color: #fff;
				border-radius: 15rpx;
				// box-shadow: 0.3rem 0.3rem 0.6rem #d0d0d0, -0.2rem -0.2rem 0.5rem var(--white);
				// panel标题
				.panel_title {
					line-height: 45px;
					padding-left: 20rpx;
					font-size: 15px;
					border-bottom: 1px solid #f4f4f4;
				}
				.panel_list {
					display: flex;
					justify-content: space-between;
					.panel_item {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;
						padding: 20rpx; 
						font-size: 13px;
						
						// panel_num
						.panel_num {
							margin-bottom: 5rpx;
							font-weight: 600;
							font-size: 15px;
							color: #000;
						}
						
						// icon
						.icon {
							width: 35px;
							height: 35px;
						}
						// text
						.panel_item_text {
							margin-top: 10rpx;
						}
					}
				}
				/* 
					第3个面板
				*/
				.panel_list_item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 20rpx;
					font-size: 15px;
					line-height: 45px;
					&:not(:last-child) { 
						border-bottom: 1px solid #f4f4f4; 
					}
				}
			}
		}
		/* 
			退出登录按钮
		*/
		.login_out {
			.login_out_btn {
				background-color: #c00000;
				color: #fff;
				border-radius: 2em;
				margin: 0 20rpx;
				font-size: 14px;
			}
			
		}
	}
</style>