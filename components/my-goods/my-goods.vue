<template>
	<view class="goods_item">
		
		<view class="goods_radio">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
		</view>
		<!-- 
			商品封面
		-->
		<view class="goods_item_cover">
			<image :src="goods.goods_small_logo || defaultPicArr[Math.floor(Math.random() * defaultPicArr.length)]" class="goods_img" mode=""></image>
		</view>
		<!-- 
			商品描述
		-->
		<view class="goods_item_desc">
			<!-- 
				商品名称
			-->
			<view class="goods_name">{{ goods.goods_name }}</view>
			<!-- 
				商品信息
			-->
			<view class="goods_info">
				<view class="goods_price"><text class="icon">￥</text>{{ goods.goods_price | toFixed }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props:{
			goods: {
				type: Object,
				default: {}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
		},
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
				]
			};
		},
		filters: {
			toFixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClickHandler() {
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	
</style>