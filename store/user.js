export default {
	// 开启命名空间
	namespaced: true,
	
	// state数据
	state: () => ({
		// 收货地址
		address: JSON.parse(uni.getStorageSync("address") || "{}"),
		token: uni.getStorageSync("token" || ""),
		// 用户的基本信息
		userinfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
		// 重定向 object 对象
		redirectInfo: null
	}),
	
	// 方法
	mutations: {
		// 更新收货地址
		updateAddress(state, address) {
			state.address = address
			this.commit("User/saveAddressToStorage")
		},
		// 将收货地址持久化保存到本地
		saveAddressToStorage(state) {
			uni.setStorageSync("address", JSON.stringify(state.address))
		},
		// 更新用户的基本信息
		updateUserInfo(state, userinfo) { 
			state.userinfo = userinfo	
			this.commit("User/saveUserInfoToStorage")
		},
		// 更新token
		updateToken(state, token) {
			state.token = token	
			this.commit("User/saveTokenToStorage")
		},
		// 将用户基本信息保存到本地
		saveUserInfoToStorage(state) {
			uni.setStorageSync("userinfo", JSON.stringify(state.userinfo))
		},
		// 将token保存到本地
		saveTokenToStorage(state) {
			uni.setStorageSync("token", state.token)
		},
		// 更新重定向的信息对象
		updateRedirectInfo(state, info) {
			state.redirectInfo = info
			console.log(state.redirectInfo)
		}
	},
	
	// 数据包裹器
	getters: {
		// 收货地址计算属性
		addStr(state) {
			if(!state.address.provinceName) return ''
			// 拼接 省, 市, 区, 详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	},
}