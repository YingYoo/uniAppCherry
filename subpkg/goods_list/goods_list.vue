<template>
	<view>
		<view class="container">
			<view class="goods_list">
				<view
					v-for="(goods, i) in goodsList"
					 :key="i"
					 @click="gotoDetailPage(goods)"
				>
					<my-goods :goods="goods"></my-goods>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsData: {
					// 查询关键词
					query: '',
					// 查询商品id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示数据的条数
					pageSize: 10,
				},
				goodsList: [],
				// 商品总数
				total: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			this.goodsData.query = options.query || ''
			this.goodsData.cid = options.cid || ''
			this.getGoodsList()
		},
		onReachBottom() {
			if(this.goodsData.pagenum * this.goodsData.pageSize >= this.total) return uni.$showMsg('没有更多商品了哦!')
			if(this.isLoading) return
			this.goodsData.pagenum += 1
			 this.getGoodsList()
		},
		onPullDownRefresh() {
			this.goodsData.pagenum = 1
			this.total = 0
			this.goodsList = []
			this.getGoodsList(()=> uni.stopPullDownRefresh())
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading = true
				const { data:res } = await uni.$http.get('/api/public/v1/goods/search', this.goodsData)
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.isLoading = false
				cb && cb()
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			gotoDetailPage(goods) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 15rpx;
		.goods_list { 
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			gap: 10rpx;
			border-radius: 10px;
			
			/**----------
			* goods_item
			-----------*/
			.goods_item { 
				display: flex;
				flex-direction: column;
				margin-bottom: 10rpx;
				padding: 15rpx;
				width: 325rpx;
				border-radius: 20rpx;
				background-color: #fff;
				box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
				
				.goods_radio{ margin: 0; }
				/**----------------
				* goods_item_cover
				-----------------*/
				.goods_item_cover {
					/**-------------------
					* goods_item_img
					---------------------*/
					.goods_img { 
						display: block;
						margin: 0 20rpx 20rpx 0;
						width: 100%;
						height: 162.5px;
					}
				}
				
				/**------------------
				* goods_item_desc
				--------------------*/
				.goods_name {
					margin-bottom: 20rpx;
					font-size: 13px;
					line-height: 1.5;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
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
</style>
