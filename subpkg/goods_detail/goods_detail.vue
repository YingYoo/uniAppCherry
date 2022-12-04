<template>
	<view class="container" v-if="goods_info.goods_name">
		<!-- 
			顶部轮播图
		-->
		<swiper 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="1000"
			:circular="true"
		>
			<swiper-item 
				class="swiper-item"
				v-for="(item, i) in goods_info.pics"
				:key="i"
			>
				<image :src="item.pics_big" @click="previews(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 
			商品信息
		-->
		<view class="goods_infos">
			<!-- 商品价格 -->
			<view class="goods_price"><text class="icon">￥</text>{{ goods_info.goods_price }}</view>
			<!-- 商品内容 -->
			<view class="goods_info_content">
				<!-- 商品名字 -->
				<view class="goods_name">{{ goods_info.goods_name }}</view>
				<view class="goods_others">
					<!-- 收藏 -->
					<view class="goods_favo">
						<uni-icons type="star" size="20" color="gray"></uni-icons>
						<text class="goods_favo_text">收藏</text>
					</view> 
					<!-- 运费 -->
					<view class="goods_yf">快递: 免运费--{{ cart.length }}</view>
				</view>
			</view>
		</view>
		<!-- 
			商品详情
		-->
		<view class="goods_introduce">
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		</view>
		<!-- 
			商品导航
		-->
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations, mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				goods_info: {},
				// 商品底部导航栏
				options: [
					{
						icon: 'shop',
						text: '店铺',
						info: 2,
						infoBackgroundColor:'#c00000',
						infoColor:"#fff"
					}, 
					{
						icon: 'cart',
						text: '购物车',
						info: 2,
						infoBackgroundColor:'#c00000',
						infoColor:"#fff"
					},
				],
				buttonGroup: [
					{
						text: '加入购物车',
						backgroundColor: '#ff9200',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#c00000',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods: {
			...mapMutations("Cart", ["addToCart"]),
			async getGoodsDetail(goods_id) {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail' ,{ goods_id })
				if(res.meta.status !== 200) return uni.$showMsg()
				
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, "<img style='display: block;'").replace(/webp/g, 'jpg')
				
				this.goods_info = res.message
			},
			previews(i) {
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big) 
				})
			},
			// 商品导航点击事件
			onClick (e) {
				if(e.content.text === "购物车") {
					uni.switchTab({
						url: '/pages/cart/cart'// 跳转购物车页面
					})
				}
			},
			// 商品导航按钮点击事件
			buttonClick (e) {
				uni.$showMsg("加入成功")
				if (e.content.text === "加入购物车") {
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true,
						goods_count: 1
					}
					this.addToCart(goods)
					console.log(goods)
				}
			}
		},
		computed: {
			...mapState("Cart", ["cart"]),
			...mapGetters("Cart", ["totalCart"])
		},
		watch: {
			// 页面首次加载不会调用watch
			totalCart: {
				handler(newVal) {
					const findResult = this.options.find(x => x.text === "购物车")
					if (findResult){
						findResult.info = newVal
					}
				},
				// 声明侦听器: 页面首次加载完毕后,立即调用		
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
	.container { 
		margin: 0;
		/**---------------
		* 	swiperList 
		-----------------*/
		swiper{
			height: 750rpx;
			// border-radius: 20px;
			box-shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
			overflow: hidden;
			.swiper-item,image{
				width: 100%;
				height: 100%;
			}
		}
		/**-------------
		* goods_infos
		--------------*/
		.goods_infos {
			padding: 20rpx;
			/**-------------
			* goods_price
			--------------*/
			.goods_price {
				margin: 20rpx 0;
				font-size: 25px;
				font-weight: 600;
				font-family: ".萍方-简";
				color: #c00000;
				.icon{font-weight: normal; font-size: 14px}
			}
			/**------------------
			* goods_info_content
			--------------------*/
			.goods_info_content {
				margin: 0;
				/**-------------
				* 	goods_name
				--------------*/
				.goods_name {
					line-height: 1.5;
					font-weight: 550;
				}
				/**-------------
				* 	goods_name
				--------------*/
				.goods_others {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					margin: 20rpx 0;
					font-size: 15px;
					color: gray;
					/**-------------
					* 	goods_favo
					--------------*/
					.goods_favo {
						display: flex;
						margin-right: 20rpx;
						padding: 0 20rpx 0 15rpx;
						.goods_favo_text { padding-left: 5rpx; }
					}
					/**-------------
					* 	goods_yf
					--------------*/
					.goods_yf {
						color: gray;
						font-size: 12px;
					}
				}
			}
		}
		/**------------------
		* 		goods_nav
		--------------------*/
		.goods_nav {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
		}
	}
</style>
