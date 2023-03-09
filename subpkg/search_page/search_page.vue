<template>
	<view>
		<view 
			class="container"
		>
			<!--
				搜索框
			-->
			<view class="search_bar">
				<uni-search-bar @input="input" :radius="100" cancelButton="none" />
			</view>
			<!-- 
				请求返回的内容
			-->
			<view class="search_result_list" v-if="searchResults.length !== 0">
				<view 
					class="search_result_item"
					v-for="(item, i) in searchResults"
					:key="i"
					@click="gotoDetail(item.goods_id)"
				>
					<!-- 返回的商品名称 -->
					<view class="search_result_goods_name">{{ item.goods_name }}</view>
					<uni-icons type="arrowright" size="18"></uni-icons>
				</view>
			</view>
			<!-- 
				搜索历史
			-->
			<view class="history_content" v-else>
				<!-- 标题 -->
				<view class="history_title" v-if="historyList.length !== 0">
					<text>搜索历史记录</text>
					<uni-icons type="trash" size="20" class="history_icon" @click="clearHistorys()"></uni-icons>
				</view>
				<!-- tag列表 -->
				<uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)" :customStyle="'display: inline-block;margin: 30rpx 30rpx 0 0;padding: 5px 10px;border-radius: 20px;background: #c00000; border-color: #c00000;box-shadow: .3rem .3rem .6rem #E4EBF5, -.2rem -.2rem .5rem #fff;'"></uni-tag>
				
				<view>
					<uni-popup ref="popup" type="dialog">
						<uni-popup-dialog content="确定清空历史记录吗?" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
					</uni-popup>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				// 搜素关键字
				kw: '',
				//搜素返回结果列表
				searchResults: [],
				// 搜索历史列表
				historyList: []
			}
		},
		props: {
			bgColor: {
				type: String,
				default: '#aaa'
			},
			radius: {
				type: Number,
				default: 20
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e.trim()
					this.getSearchResults()
				},500)
			},
			// 获取搜素列表
			async getSearchResults() {
				if(this.kw === '') {
					this.searchResults = []
					return
				}
				const { data:res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				this.saveSearchHistory()
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			// 保存历史记录
			saveSearchHistory() {
				// this.historyList.push(this.kw)
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				// 本地存储
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 清空历史记录
			async clearHistorys() {
				// 询问用户是否清除历史记录
				const [ err, succ ] = await uni.showModal({
					title: "提示",
					content: "确认清空历史记录吗 ? "
				}).catch(err => err)
				
				if(succ && succ.confirm) {
					// 用户确认操作
					// 需要清空vuex中的 historyList, kw 
					this.historyList = []
					uni.setStorageSync('kw', '[]')
				}
			},
			// 跳转到商品列表
			gotoGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed: {
			historys() {
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.container {
		margin: 15rpx;
		border-radius: 20px;
		box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
		    
		/*--------------
		* 	searchIpt
		*--------------*/
		.search_bar { 
			position: sticky;
			top: 0;
			border-radius: 20px;
			background-color: E4EBF5;
			
			.uni-searchbar .uni-searchbar__box{ 
				background-color: E4EBF5 !important;
				box-shadow: inset .2rem .2rem .5rem #d0d0d0, 
										inset -.2rem -.2rem .5rem #ffffff;
			}
		}
		.uni-searchbar__box-search-input{ font-size: 16px }
		
		/*------------------
		* searchResultsList
		*------------------*/
		.search_result_list {
			margin-bottom: 20rpx;
			max-height: 450px;
			overflow-y: scroll;
			&::-webkit-scrollbar{display: none;}
			
			.search_result_item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: relative;
				margin: 20rpx 10rpx;
				border-radius: 10px;
				height: 40px;
				font-size: 13px;
				padding: 10rpx;
				&:hover{background-color: #fff; color: #c00000;}
				&::after{ 
					content: '';
					display: block;
					position: absolute;
					bottom: 0;
					width: 95%;
					height: 1px;
					background-color: #f5f5f5;
				}
				
				.search_result_goods_name {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		/*------------------
		* 	historyList
		*------------------*/
		.history_content{
			margin: 20rpx;
			padding-bottom: 30rpx;
			
			.history_title { 
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 35px;
				border-bottom: 1px solid  #c0c4cc;
				
				/*------------------
				* 		historyIcon
				*------------------*/
				.history_icon {
					color: #000;
					&.hover {
						background: #f5f5f5;
						color: #c00000;
						border-radius: 5px;
					}
				}
			}
		}
	}
</style>
