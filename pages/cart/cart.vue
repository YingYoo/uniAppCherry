<template>
	<!--
		空购物车显示
	-->
	<view class="cart_empty" v-if="!cart.length">
		<text class="cart_empty_text">什么? 你的购物车竟然一件商品都没有啊? </text>
	</view>
	
	<view class="container" v-else>
		<!-- 
			购物车列表
		-->
		<view class="cart_goods_list">
			<!--
				购物车列表项
			-->
			<view 
				class="cart_goods_item"
				v-for="(goods, i) in cart"
				:key="i"			
			>
				<my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler"></my-goods>	
					<!-- 
						商品数字输入框
					-->
				<view class="goods_number_input_box">
					<uni-number-box @change="changeValue" />
				</view>
			</view>
		</view>
		<!-- 
			底部合计
		-->
		<view class="goods_total">
			<view class="goods_total_radio">
				<radio :checked="true" color="#c00000"></radio><text>全选</text>
			</view>
			<!-- 
				合计
			-->
			<view class="total_text">
				<text>合计: </text>
				<text class="icon">￥</text><text class="goods_tootal_number"></text>
			</view>
			<!-- 
				结算
			-->
			<view class="total_btn">
				<text>结算<text>({{ checkedCount }})</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations, mapGetters } from "vuex"
	import badgeMix from "@/mixin/tabbar_badge.js"
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				defaultPicArr: [
					'https://img1.baidu.com/it/u=3628940774,3758562637&fm=253&fmt=auto&app=138&f=PNG?w=504&h=500',
					'https://img2.baidu.com/it/u=4209974587,3841752014&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img0.baidu.com/it/u=2086801390,2031158880&fm=253&fmt=auto&app=138&f=JPEG?w=360&h=360',
					'https://img2.baidu.com/it/u=1022497553,3506417681&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img2.baidu.com/it/u=4038110155,1594911775&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
					'https://img2.baidu.com/it/u=676935011,953380937&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img1.baidu.com/it/u=4155093352,2098078758&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img0.baidu.com/it/u=2411921704,4127578841&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=497',
					'https://img0.baidu.com/it/u=981184060,3972560824&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=489',
					'https://img2.baidu.com/it/u=1323959700,334921221&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
				],
			};
		},
		methods: {
			...mapMutations("Cart", ["updateCartGoodsState"]),
			change(value) {
				this.numberValue = value
			},
			changeValue(value) {
				console.log('返回数值：', value);
			},
			blur(e) {
				console.log('blur:', e);
			},
			focus(e) {
				console.log('focus:', e);
			},
			gotoDetailPage(item) {
				console.log(item)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			radioChangeHandler(e) {
				console.log(e)
				this.updateCartGoodsState(e)
			}
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		computed: {
			...mapState("Cart", ["cart"]),
			...mapGetters("Cart", ["checkedCount"])
		}
	}
</script>

<style lang="scss" scoped>
	/*
		cart_empty
	*/
	.cart_empty { 
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
	}
	
	.container { 
		margin: 15rpx;
		
		.cart_goods_list {
			display: flex;
			flex-direction: column;
			gap: 10rpx;
			border-radius: 10px;
			
			
			.cart_goods_item { 
				position: relative; 
				border-radius: 20rpx;
				box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
				
				.goods_number_input_box {
					position: absolute;
					right: 10px;
					bottom: 10px;
					
					/deep/.uni-numbox-btns.data-v-dd94a2a8{ width: 10px; }
					/deep/.uni-numbox__minus.data-v-dd94a2a8{ border-radius: 7px 0 0 7px; }
					/deep/.uni-numbox__plus.data-v-dd94a2a8 { border-radius: 0 7px 7px 0; } 
				}
			}
			/**----------
			* goods_item
			-----------*/
			/deep/.goods_item { 
				display: flex;
				flex-direction: row;
				margin-bottom: 10rpx;
				padding: 15rpx;
				
				.goods_radio{ margin: 35px 10rpx 0 0; }
				/**----------------
				* goods_item_cover
				-----------------*/
				.goods_item_cover {
					margin: 0;
					height: 100px;
					/**-------------------
					* goods_item_img
					---------------------*/
					.goods_img { 
						display: block;
						margin-right: 20rpx;
						width: 100px;
						height: 100px;
						border-radius: 20rpx;
						box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
					}
				}
				
				/**------------------
				* goods_item_desc
				--------------------*/
				.goods_item_desc {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.goods_name {
						font-size: 13px;
						height: 80px;
						line-height: 1.5;
						font-weight: 600;
					}
					.goods_price {
						font-size: 18px;
						color: #c00000;
						font-weight: 600;
						font-family: ".萍方-简";
						.icon{font-weight: normal; font-size: 14px}
					}
				}
			}
		}
		
		.goods_total{
			z-index: 999;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: fixed;
			left: 0;
			bottom: 0;
			padding: 5rpx 20rpx;
			width: 100%;
			height: 50px;
			border-top: 1px solid #ccc;
			
			.goods_total_radio { 
				display: flex;
				align-items: center;
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
	}
</style>
