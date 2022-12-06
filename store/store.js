// 引入
import Vue from 'vue'
import Vuex from 'vuex'
// 导入购物车vuex模块
import moduleCart from '@/store/cart.js'
// 导入用户收货地址vuex模块
import moduleUser from '@/store/user.js'


Vue.use(Vuex)

// store实例
const store = new Vuex.Store({
	modules: {
		Cart: moduleCart,
		User: moduleUser
	}
})

export default store