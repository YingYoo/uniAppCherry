// 引入
import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'

Vue.use(Vuex)

// store实例
const store = new Vuex.Store({
	modules: {
		Cart: moduleCart
	}
})

export default store