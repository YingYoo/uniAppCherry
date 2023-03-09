<template>
	<view class="login_container">
		<!-- 
			提示登录的图标
		-->
		<view class="login_avatar">
			<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		</view>
		<!-- 
			登录按钮
		-->
		<button 
			type="primary" 
			class="login_btn" 
			open-type="getUserInfo" 
			@getuserinfo="getUserInfo"
		>一键登录</button>
		<!-- 
			登录提示
		-->
		<view class="login_tips_text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations } from "vuex"
	
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState("User", ["redirectInfo"])
		},
		methods: {
			...mapMutations("User", ["updateUserInfo", "updateToken", "updateRedirectInfo"]),
			// 获取用户基本信息
			getUserInfo(e) {
				// console.log(e)
				// 判断是否成功获取用户信息
				if(e.detail.errMsg === "getUserInfo:fail auth deny") return uni.$showMsg("您取消了登录授权! ")
				// 获取成功 e.detail.userInfo 就是用户基本信息
				// console.log(e.detail)
				
				this.updateUserInfo(e.detail.userInfo)
				
				//获取登录成功之后的 token 字符串
				this.getToken(e.detail)
			},
			// 调用接口 换取永久 token
			async getToken(info) {
				// 调用微信登录接口
				const [err, res] = await uni.login().catch(err => err)
				// 判断是否调用失败
				// console.log(err, res)
				// if(	res.errMsg !== "login:ok") return uni.$showMsg("登录失败 ! ") 
				
				// 准备参数对象
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// console.log(query)
				// 换取 token
				const { data: loginResult } = await uni.$http.post("/api/public/v1/users/wxlogin", query)
				// console.log(loginResult)
				// if(loginResult.meta.status !== 200) return uni.$showMsg("登录失败 ! ")
				uni.$showMsg("登录成功 ! ")
				this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o")
				this.navigateBack()
			},
			navigateBack() {
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login_container {
		/* 
			登录盒子样式
		*/
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		margin: 200px 15rpx;
		padding: 20rpx 0;
		overflow: hidden;
		border-radius: 30rpx;
		box-shadow: .3rem .3rem .6rem #d0d0d0, -.3rem -.3rem .6rem var(--white);
		/* 
			用户头像样式
		*/
		.login_avatar {
			border-radius: 50%;
		}
		/* 
			登录按钮样式
		*/
		.login_btn {
			width: 90%;
			margin: 15px 0;
			background-color: #c00000;
			border-radius: 2em;
			box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
		}
		/* 
			登录提示样式
		*/
		.login_tips_text {
			font-size: 12px;
			color: gray;
		}
	}
</style>