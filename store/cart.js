export default {
	namespaced: true,
	
	state: () => ({
		cart: JSON.parse(uni.getStorageSync("cart") || "[]")
	}),
	mutations: {
		// 加入购物车
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit("Cart/saveLocalStorage")
		},
		// 本地存储
		saveLocalStorage(state) {
			uni.setStorageSync("cart", JSON.stringify(state.cart))
		},
		// 更新购物车选中的状态
		updateCartGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult){
				findResult.goods_state = goods.goods_state
				this.commit("Cart/saveLocalStorage")
			}
		}
	},
	getters: {
		//统计购物车中商品的数量
		totalCart(state) {
			let count = 0
			state.cart.forEach(goods => count += goods.goods_count)
			return count
		},
		//统计购物车中商品的总价钱
		checkedCount(state) {
			return 	state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count,0)
		}
	}
}