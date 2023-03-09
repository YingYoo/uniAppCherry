<template>
	<view>
		<!--
			底部合计
		-->
		<view class="goods_total">
			<view class="goods_total_radio">
				<label class="radio" @click="changeAllState">
					<radio :checked="isFullChecked" color="#c00000" /><text>全选</text>
				</label>
			</view>
			<!-- 
				合计
			-->
			<view class="total_text">
				<text>合计：</text>
				<text class="icon">￥</text><text class="goods_tootal_number">{{ checkedGoodsAmount }}</text>
			</view>
			<!-- 
				结算
			-->
			<view 
				class="total_btn"
				@click="settlement"
			>
				<text>结算<text>({{ checkedCount }})</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapGetters, mapMutations } from 'vuex'
	
	export default {
		name:"my-settle",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				// 提示秒数
				seconds: 3,
				// 定时器
				timer: null
			};
		},
		computed: {
			...mapState("User", ["token"]),
			...mapState("Cart", ["cart"]),
			...mapGetters("Cart", ["checkedCount", "totalCart", "checkedGoodsAmount"]),
			...mapGetters("User", ["addStr"]),
			isFullChecked() {
				return this.totalCart === this.checkedCount
			}
		},
		methods: {
			...mapMutations("Cart", ["updateCartAllGoodsState"]),
			...mapMutations("User", ["updateRedirectInfo"]),
			changeAllState() {
				this.updateCartAllGoodsState(!this.isFullChecked)
			},
			settlement() {
				if(!this.checkedCount) return uni.$showMsg("请至少选择一件商品! ")
				if(!this.addStr) return uni.$showMsg("请至少选择一个收货地址! ")
				if(!this.token) return this.delayNavigate()
				// 支付
				this.payOrder()
			},
			showTips(n) {
				uni.showToast({
					icon: 'none',
					title: '检测到您还没有登录, 暂不支持结算功能哟! ' + n + '秒后自动跳转登录页',
					mask: true,
					duration: 1500
				})
			},
			// 延迟导航到 my 页面
			delayNavigate() {
				this.seconds = 3
				// 1. 展示提示信息, 此时seconds值 = 3	
				this.showTips(this.seconds)
				// 2. 创建定时器, 每隔 1 秒执行一次
				this.timer = setInterval(() => {
					// 2.1 先让秒数自减1
					this.seconds--
					if(this.seconds <= 0) {
						// 清除定时器
						clearInterval(this.timer)
						// 跳转 my 页面
						uni.switchTab({
							url: "/pages/my/my",
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					
					// 2.2 再根据最新秒数, 进行提示
					this.showTips(this.seconds)
				}, 1000)
			},
			// 支付
			async payOrder() {
				// 创建订单
				const orderInfo = {
					// order_price: this.checkedGoodsAmount
					order_price: 0.01,
					consignee_addr: this.addStr,
					goods: this.cart.filter(x => x.goods_state).map(x => ({
						goods_id: x.goods_id,
						goods_number: x.goods_count,
						goods_price: x.goods_price
					}))
				}
				const { data: res } = await uni.$http.post("/api/public/v1/my/orders/create", orderInfo)
				if(res.meta.status !== 200) return uni.$showMsg("订单创建失败 ! ")
				// 订单编号
				const orderNumber = res.message.order_number
				// 订单预支付
				const { data: res2 } = await uni.$http.post("/api/public/v1/my/orders/req_unifiedorder", {
					order_number: orderNumber
				})
				if(res2.meta.status !== 200) return uni.$showMsg("预付订单生成失败 ! ")
				const payInfo = res2.message.pay
				// 微信支付
				const [ err, succ ] = await uni.requestPayment(payInfo)
				if(err) return uni.$showMsg("订单支付已取消 ! ")
				const { data: res3 } = await uni.$http.post("/api/public/v1/my/orders/chkOrder", {
					order_number: orderNumber
				}) 
				if(res3.meta.status !== 200) return uni.$showMsg("订单未支付 ! ")
				uni.showToast({
					title: "支付成功 !",
					icon: "success"
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods_total{
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 0 	20rpx;
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-top: 1px solid #ccc;
		background-color: var(--greyLight-1);
		
		.icon { font-size: 14px; font-weight: normal; color: #c00000; }
		.goods_tootal_number {
			color: #c00000;
			font-size: 20px;
			font-weight: 600;
			font-family: ".萍方-简";
		}
		
		// 结算
		.total_btn{
			min-width: 120px;
			height: 100%;
			line-height: 50px;
			text-align: center;
			color: #fff;
			background-color: #c00000;
		}
	}
</style>