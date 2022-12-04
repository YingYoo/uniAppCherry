<template name="skeleton">
	<view class="sk-container">
		<view class="container">
			<view class="search_area">
				<view class="search_ipt" data-event-opts="tap,gotoSearchPages">
					<view  class="icon">
						<text
							class="uni-icons icons--uni-icons uniui-search icons--uniui-search sk-pseudo sk-pseudo-circle"
						 style="color:#ccc;font-size:17px;"></text>
					</view>
					<text class="placeholder sk-transparent sk-text-31-4286-256 sk-text"
						style="background-position-x: 50%;">搜你想搜的哈 !</text>
				</view>
			</view>
			<view class="part">
				<swiper autoplay="false" circular="true" duration="1000" indicator-dots="true" interval="3000"
					current="0"></swiper>
			</view>
			<view class="part">
				<view class="nav_list">
					<view class="nav_item">
						<image class="nav_img sk-image"></image>
					</view>
					<view class="nav_item">
						<image class="nav_img sk-image"></image>
					</view>
					<view class="nav_item">
						<image class="nav_img sk-image"></image>
					</view>
					<view class="nav_item">
						<image class="nav_img sk-image"></image>
					</view>
				</view>
			</view>
			<view class="part">
				<view class="floor_list">
					<view class="floor_item">
						<image class="floor_title sk-image"></image>
						<view class="floor_img_content">
							<navigator class="floor_left_image_content">
								<image class="floor_img sk-image" style="width:116px;"></image>
							</navigator>
							<view class="floor_right_image_content">
								<view class="floor_right_image_item">
									<image class="floor_img sk-image" style="width:116px;"></image>
								</view>
								<view class="floor_right_image_item">
									<image class="floor_img sk-image" style="width:116px;"></image>
								</view>
								<view class="floor_right_image_item">
									<image class="floor_img sk-image" style="width:116px;"></image>
								</view>
								<view class="floor_right_image_item">
									<image class="floor_img sk-image" style="width:116px;"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="floor_item">
						<image class="floor_title sk-image"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const DEFAULT_ROW_WIDTH = '100%'
	const DEFAULT_LAST_ROW_WIDTH = '60%'

	export default {
		props: {
			loading: {
				type: Boolean,
				default: true,
			},
			showAvatar: {
				type: Boolean,
				default: true,
			},
			avatarSize: {
				type: String,
				default: '50px',
			},
			avatarShape: {
				type: String,
				default: 'round', // square | round
			},
			showTitle: {
				type: Boolean,
				default: true,
			},
			titleWidth: {
				type: String,
				default: '40%',
			},
			row: {
				type: Number,
				default: 3,
			},
			animate: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {}
		},
		computed: {
			rowList() {
				let list = []
				for (let i = 0; i < this.row; i++) {
					list.push({
						width: i === this.row - 1 && i !== 0 ? DEFAULT_LAST_ROW_WIDTH : DEFAULT_ROW_WIDTH,
					})
				}
				return list
			},
		},
	}
</script>

<style scoped>
	/*
此文件为开发者工具生成，生成时间: 2022/11/28下午10:23:00

在 F:\Uniapp Project\uniapp_project\unpackage\dist\dev\mp-weixin\pages\home\home.wxss 中引入样式
```
@import "./home.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
*/
	.sk-transparent {
		color: transparent !important;
	}

	.sk-text-31-4286-905 {
		background-image: linear-gradient(transparent 31.4286%, #EEEEEE 0%, #EEEEEE 68.5714%, transparent 0%) !important;
		background-size: 100% 70.0000rpx;
		position: relative !important;
	}

	.sk-text {
		background-origin: content-box !important;
		background-clip: content-box !important;
		background-color: transparent !important;
		color: transparent !important;
		background-repeat: repeat-y !important;
	}

	.sk-image {
		background: #EFEFEF !important;
	}

	.sk-pseudo::before,
	.sk-pseudo::after {
		background: #EFEFEF !important;
		background-image: none !important;
		color: transparent !important;
		border-color: transparent !important;
	}

	.sk-pseudo-rect::before,
	.sk-pseudo-rect::after {
		border-radius: 0 !important;
	}

	.sk-pseudo-circle::before,
	.sk-pseudo-circle::after {
		border-radius: 50% !important;
	}

	.sk-container {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: transparent;
	}
</style>
