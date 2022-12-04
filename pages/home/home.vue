<template>
	<view class="container" v-else>
		<!-- 
			top搜素框
		-->
		<view class="search_area">
			<view 
				class="search_ipt"
				@click="gotoSearchPages()"
			>
				<uni-icons type="search" size="17" class="icon" color="#ccc"></uni-icons>
				<text class="placeholder">搜你想搜的哈 !</text>
			</view>
		</view>
		
		<!--
			swiper区域
		-->
		<view class="part">
			<swiper
				:indicator-dots="true" 
				:autoplay="true" 
				:interval="3000" 
				:duration="1000"
				:circular="true"
			>
				<swiper-item 
					v-for="(item, i) in swiperList"
					:key="i"
				>
					<navigator
						class="swiper-item"
						:url="'/subpkg/goods_detail/goods_detail?good_id='+ item.goods_id"
					>
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 
			navList区域
		-->
		<view class="part">
			<view class="nav_list">
				<view 
					class="nav_item"
					v-for="(item, i) in navList"
					:key="i"
					@click="navClickHander(item)"
				>
					<image class="nav_img" :src="item.image_src"></image>
				</view>
			</view>
		</view>
		
		<!-- 
			floor楼层区域
		-->
		<view class="part">
			<view class="floor_list">
				<view 
					class="floor_item"
					v-for="(item, i) in floorList"
					:key="i"
				>
					<!-- floor楼层的大标题 -->
					<image class="floor_title" :src="item.floor_title.image_src"></image>
					
					<!-- floor楼层的商品展示区域 -->
					<view class="floor_img_content">
						<!-- floor楼层商品展示的左侧图片区域 -->
						<navigator 
							class="floor_left_image_content" 
							:url="item.product_list[0].url"
						>
							<image class="floor_img" :style="{ width: item.product_list[0].image_width + 'rpx' }" :src="item.product_list[0].image_src"></image>
						</navigator>
						
						<!-- floor楼层商品展示的右侧图片区域 -->
						<view class="floor_right_image_content">
							<view 
								class="floor_right_image_item"
								v-for="( imgItem, imgI ) in item.product_list"
								v-if="imgI !== 0"
								:key="imgI"
							>
								<image class="floor_img" :style="{ width: imgItem.image_width + 'rpx' }" :src="imgItem.image_src"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import badgeMix from "@/mixin/tabbar_badge.js"
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// msg: "Hello Cherry!!!",
				// 首页轮播图列表
				swiperList: [],
				// 首页分类导航列表
				navList: [],
				// 首页楼层列表
				floorList: [],
				// 骨架屏显示
				loading: true
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			// 首页swiperList
			async getSwiperList() {
				const { data: res } = await uni.$http.get("/api/public/v1/home/swiperdata")
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message 
			},
			// 首页navList
			async getNavList() {
				const { data: res } = await uni.$http.get("/api/public/v1/home/catitems")
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			// 首页navItem点击事件
			navClickHander(item) {
				if(item.name === "分类"){
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			// 首页floorList
			async getFloorList() {
				const { data: res } = await uni.$http.get("/api/public/v1/home/floordata")
				if(res.meta.status !== 200) return uni.$showMsg()
				// 处理 URL 地址
				res.message.forEach(floor => {
					floor.product_list.forEach(prop => { 
						prop.url = '/subpkg/goods_list/goods_list?' + prop.navigator_url.split("?")[1]
					})
				})
				this.floorList = res.message
			},
			// 首页搜素框点击跳转search页面
			gotoSearchPages() {
				uni.navigateTo({
					url: '/subpkg/search_page/search_page'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		margin: 0;
		
		.part { 
			margin: 15rpx;
		}
		
		/**-----------
		* home search
		-------------*/
		.search_area {
			z-index: 999;
			position: sticky;
			top: 0;
			padding: 20rpx 15rpx;
			background-color: var(--greyLight-1);
			
			.search_ipt{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 35px;
				line-height: 35px;
				background: #fff;
				border-radius: 17.5px;
				text-align: center;
				color: #ccc;
				font-size: 13px;
				box-shadow: .3rem .3rem .3rem var(--greyLight-2), 
										-.1rem -.1rem .2rem var(--white);
				
				.icon { margin-right: 10rpx; color: #ccc;}
			}
			
		}
		
		/**---------------
		* home swiperList 
		-----------------*/
		swiper{
			height: 375rpx;
			border-radius: 20px;
			box-shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
			overflow: hidden;
			.swiper-item,image{
				width: 100%;
				height: 100%;
			}
		}
		
		/**------------
		* home navList 
		--------------*/
		.nav_list{
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0 10rpx;
			.nav_img{
				width: 128rpx;
				height: 140rpx;
			}
		}
		
		/**--------------
		* home floorList 
		----------------*/
		.floor_list{
			/* 标题 */
			.floor_title {
				display: flex;
				width: 100%;
				height: 60rpx;
			}
			.floor_item{padding: 20rpx 0;}
			/* 内容 */
			.floor_img_content{
				display: flex;
				.floor_img{
					border-radius: 20rpx;
					box-shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
				}
				/* 左侧 */
				.floor_left_image_content{
					.floor_img{
						margin-right: 10rpx;
						height: 200px;
					}
				}
				/* 右侧 */
				.floor_right_image_content{
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;
					gap: 10rpx;
					.floor_right_image_item{
						.floor_img{height: 95px !important;}
					}
				}
			}
		}
	}
</style>
