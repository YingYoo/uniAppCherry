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
		// 更新购物车商品选中的状态
		updateCartGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult){
				findResult.goods_state = goods.goods_state
				this.commit("Cart/saveLocalStorage")
			}
		},
		// 更新购物车中商品的数量
		updateCartGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult){
				findResult.goods_count = goods.goods_count
				this.commit("Cart/saveLocalStorage")
			}
		}, 
		updateCartAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit("Cart/saveLocalStorage")
		},
		// 根据ID值删除对应的商品 
		removeCartGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit("Cart/saveLocalStorage")
		}
	},
	getters: {
		//统计购物车中商品的数量
		totalCart(state) {
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		//统计购物车中商品的勾选数量
		checkedCount(state) {
			return 	state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count,0)
		},
		//统计购物车中已勾选商品的价格
		checkedGoodsAmount(state) {
			/* 
				1. 先使用 filter 方法, 过滤购物车中已勾选的商品
				2. 再使用 reduce 方法, 将已勾选的商品 * 单价之后, 进行累加
				3. reduce() 的返回值就是已勾选商品的总价
				4. 最后调用 toFixed(2) 方法, 保留两位小数
			*/
		 return state.cart.filter(x => x.goods_state)
											.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
											.toFixed(2)
		}
	}
}