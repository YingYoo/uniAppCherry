<template>
	<view>
		<view 
			class="search_area"
			:style="{ 'background': bgColor }"
		>
			<view 
				class="search_ipt"
				:style="{ 'border-radius': radius + 'px', 'background': bgColor}"
				@click="searchIptClickHandler()"
			>
				<uni-icons type="search" size="17" class="icon" color="#ccc"></uni-icons>
				<text class="placeholder">搜你想搜的哈 !</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props: {
			// 背景颜色
			bgColor: {
				type: String,
				default: "#c00000"
			},
			// 圆角尺寸
			radius: {
				type: Number,
				default: 20
			}
		},
		methods: {
			// 模拟输入框点击事件
			searchIptClickHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	.search_area {
		z-index: 999;
		position: sticky;
		top: 0;
		padding: 20rpx 15rpx;
		
		.search_ipt{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 35px;
			line-height: 35px;
			background: #fff;
			text-align: center;
			color: #ccc;
			font-size: 13px;
			box-shadow: .3rem .3rem .3rem #792727,
			            -.3rem -.3rem .3rem #d62e2e;
			
			.icon { margin-right: 10rpx; color: #ccc;}
		}
		
	}
</style>