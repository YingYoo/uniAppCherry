<template>
	<view>
		<!--
			顶部搜素框
		-->
		<view class="top_search">
			<my-search @click="gotoSearchPages()"></my-search>
		</view>
		
		<view class="scroll_view_container">
			<!-- 
				左侧滚动导航区域
			-->
			<scroll-view 	
				scroll-y="true" 
				class="scroll_left_cateList"
				:style="{ height: wh + 'px' }"
			>
				<block
					v-for="(item, i) in cateList"
					:key="i"
				>
					<view 
						:class="['scroll_left_item', i === active ? 'active' : ' ']"
						@click="activeChanged(i)"
					>{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			
			<!-- 
				右侧滚动内容区域
			-->
			<scroll-view 
				scroll-y="true" 
				class="scroll_right_sub_cate_content"
				:style="{ height: wh + 'px' }"
				:scroll-top="scrollTop"
			>
				<block
					v-for="(sItem, sI) in subCateContent"
					:key="sI"
				>
					<view class="scroll_right_sub_cate_item">
						<!-- 右侧二级内容标题 -->
						<view class="sub_cate_item_title"> {{ sItem.cat_name }} </view>
						<!-- 右侧二级内容 -->
						<view class="sub_cate_img_list">
							<view 
								class="sub_cate_img_item"
								v-for="(imgItem, imgI) in sItem.children"
								:key="imgI"
								@click="gotoGoodsList(imgItem)"
							>
								<!-- 图片 -->
								<image class="sub_item_img" :src="imgItem.cat_icon"></image>
								<!-- 文字 -->
								<text class="sub_item_desc">{{ imgItem.cat_name }}</text>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	
	import badgeMix from "@/mixin/tabbar_badge.js"
	
	export default {
		mixins: [badgeMix],
		data() {
			return {
				// 窗口实际所用高度 = 整个屏幕高度 - 顶部navigationBar导航栏高度 - 底部tabbar导航栏高度
				wh: 0,
				// 左侧分类列表
				cateList: [],
				// 左侧默认选中第一项
				active: 0,
				// 右侧二级分类内容
				subCateContent: [],
				// 滚动条距离顶部的距离
				scrollTop: 0
			};
		},
		onLoad() {
			// 获取当前系统的信息
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 55 //55是顶部搜素框的高度
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				this.subCateContent = res.message[0].children
			},
			activeChanged(i) {
				this.active = i
				this.subCateContent = this.cateList[i].children
				
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(imgItem) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + imgItem.cat_id
				})
			},
			gotoSearchPages() {
				uni.navigateTo({
					url: '/subpkg/search_page/search_page'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
	  --primary-light: #8abdff;
	  --primary: #6d5dfc;
	  --primary-dark: #5b0eeb;
	  
	  --white: #FFFFFF;
	  --greyLight-1: #E4EBF5;
	  --greyLight-2: #c8d0e7;
	  --greyLight-3: #bec8e4;
	  --greyDark: #9baacf;
	  background: var(--greyLight-1);
	}
	
	.scroll_view_container{
		display: flex;
		padding: 0 15rpx;
		/*------------ 
			左侧滚动区域
		-------------*/
		.scroll_left_cateList { 
			width: 120px;
			box-shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
			::-webkit-scrollbar{display: none;}
			
			.scroll_left_item { 
				margin: 15rpx;
				padding: 10rpx;
				line-height: 25px;
				text-align: center;
				font-size: 13px;
				color: #444;
				
				// 被选中的item样式
				&.active {
					position: relative;
					box-shadow: inset .2rem .2rem .2rem #c2c8d0,
					            inset -.2rem -.2rem .2rem #ffffff;
					color: #000;
					border-radius: 20rpx; 
					
					&::before {
						content: '';
						display: block;
						position: absolute;
						top: 30%;
						left: 0px;
						margin-left: 10rpx;
						width: 4px;
						height: 14px;
						background-color: #c00000;
					}
				}
			}
		}
		
		/*------------
			右侧滚动区域
		-------------*/
		.scroll_right_sub_cate_content {
			margin-left: 0;
			::-webkit-scrollbar {display: none}
			
			.scroll_right_sub_cate_item { 
				position: relative;
				margin: 15rpx 2rpx 15rpx 15rpx;
				padding: 20rpx;
				text-align: center;
				// box-shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
				box-shadow: .3rem .3rem .6rem #d0d0d0, -.2rem -.2rem .5rem var(--white);
				border-radius: 20rpx;
				
				.sub_cate_item_title {
					position: relative;
					margin-bottom: 15rpx;
					
					&::before,
					&::after {
						content: '';
						display: block;
						position: absolute;
						top: 50%;
						width: 70px;
						height: 1px;
						background: #cdcdcd;
					}
					
					&::before {left: 0%}
					&::after {right: 0%}
				}
				
				/*-------------------------
					右侧滚动区域二级列表图片内容
				--------------------------*/
				.sub_cate_img_list { 
					display: flex;
					flex-wrap: wrap;
					
					.sub_cate_img_item {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 33.33%;
						
						/* 图片 */
						.sub_item_img { 
							margin: 30rpx 15rpx 15rpx;
							width: 65px; 
							height: 65px;  
							border-radius: 30rpx;
							box-shadow: .2rem .2rem .5rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
						}
						
						/* 文字 */
						.sub_item_desc { font-size: 13px }
					}
				}
			}
		}
	}
</style>
