<template>
	<view>
		<!--
			底部合计
		-->
		<view class="goods_total">
			<view class="goods_total_radio">
				<label class="radio" @click="changeAllState">
					<radio :checked="isFullChecked" color="#c00000" /><text>全选</text>
				</label>
			</view>
			<!-- 
				合计
			-->
			<view class="total_text">
				<text>合计：</text>
				<text class="icon">￥</text><text class="goods_tootal_number">{{ checkedGoodsAmount }}</text>
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
	
	import { mapGetters, mapMutations } from 'vuex'
	
	export default {
		name:"my-settle",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters("Cart", ["checkedCount", "totalCart", "checkedGoodsAmount"]),
			isFullChecked() {
				return this.totalCart === this.checkedCount
			}
		},
		methods: {
			...mapMutations("Cart", ["updateCartAllGoodsState"]),
			changeAllState() {
				this.updateCartAllGoodsState(!this.isFullChecked)
			}
		}
	}
</script>

<style lang="scss">
	.goods_total{
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		bottom: 0;
		padding: 0 	20rpx;
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-top: 1px solid #ccc;
		background-color: var(--greyLight-1);
		text-shadow: 0 0 1px #888;
		
		.icon { font-size: 14px; font-weight: normal; color: #c00000; }
		.goods_tootal_number {
			color: #c00000;
			font-size: 20px;
			font-weight: 600;
			font-family: ".萍方-简";
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
</style>