<template>
	<!--
		空购物车显示
	-->
	<view class="cart_empty" v-if="!cart.length">
		<view class="cart_empty_img">
			<image src="../../static/cart_empty@2x.png"></image>
		</view>
		<text class="cart_empty_text">空空如也~</text>
	</view>

	
	<view class="container" v-else>
		
		<!-- <view>
			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog content="确定删除该商品吗?" :duration="2000" :before-close="true" @open="open" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view> -->
		
		<!-- 
			购物车标题
		-->
		<view class="cart_title">
			<!-- 
				左侧图标
			-->
			<uni-icons type="shop" size="20"></uni-icons>
			<!-- 
				描述
			-->
			<text class="cart_title_text">购物车</text>
		</view>
		<!-- 
			购物车列表
		-->
		<view class="cart_goods_list">
			<!--
				购物车列表项
			-->
			<uni-swipe-action>
				<view
				class="cart_goods_item"
					v-for="(goods, i) in cart"
					:key="i"			
				>
					<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
						<my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>	
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
			
		<view>
			<my-settle></my-settle>
		</view>
		
	</view>
</template>

<script>
	
	import { mapState, mapMutations, } from "vuex"
	import badgeMix from "@/mixin/tabbar_badge.js"
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: "#c00000"
					}
				}],
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
			...mapMutations("Cart", ["updateCartGoodsState", "updateCartGoodsCount", "removeCartGoodsById"]), 
			gotoDetailPage(item) {
				console.log(item)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			// 商品勾选状态发生变化
			radioChangeHandler(e) {
				this.updateCartGoodsState(e)
			},
			// 商品的数量发生变化
			numChangeHandler(e) {
				this.updateCartGoodsCount(e)
			},
			// 点击滑动取消按钮
			swipeActionClickHandler(goods) {
				this.removeCartGoodsById(goods.goods_id)
			},
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		computed: {
			...mapState("Cart", ["cart"])
		}
	}
</script>

<style lang="scss" scoped>
	/*
		cart_empty
	*/
	.cart_empty { 
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		/*
			cart_empty_img
		*/
		.cart_empty_img {
			width: 100px;
			height: 100px;
			image{ display: block; width: 100%; height: 100%; }
		}
		/*
			cart_empty_text
		*/
		.cart_empty_text{ 
			margin-top: 20rpx;
			font-size: 13px;
			color: gray;
		}
	}
	
	.container { 
		margin: 0 15rpx 15rpx;
		/* 
			cart_title
		*/
		.cart_title{
			z-index: 999;
			display: flex;
			align-items: center;
			position: sticky;
			top: 0;
			margin: 0 0 15rpx 0;
			padding-left: 5px;
			height: 40px;
			font-size: 14px;
			border-bottom: 1px solid #bbb;
			background-color: var(--greyLight-1);
			/*
				cart_title_text
			*/
			.cart_title_text {
				margin-left: 5px;
			}
		}
		.cart_goods_list {
			display: flex;
			flex-direction: column;
			gap: 10rpx;
			padding-bottom: 50px;
			border-radius: 10px;
			
			
			.cart_goods_item { 
				margin-bottom: 15rpx;
				border-radius: 20rpx;
				box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
			}
			/**----------
			* goods_item
			-----------*/
			/deep/.goods_item { 
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 15rpx;
				
				.goods_radio{ margin-right: 10rpx; }
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
					/* 
						goods_info
					*/
					.goods_info{
						display: flex;
						justify-content: space-between;
						.goods_number_input_box {
							.uni-numbox-btns.data-v-dd94a2a8{ width: 10px; }
							.uni-numbox__minus.data-v-dd94a2a8{ border-radius: 5px 0 0 5px; }
							.uni-numbox__plus.data-v-dd94a2a8 { border-radius: 0 5px 5px 0; } 
						}
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
	}
</style>
