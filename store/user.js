export default {
	// 开启命名空间
	namespaced: true,
	
	// state数据
	state: () => ({
		//收货地址
		address: JSON.parse(uni.getStorageSync("address") || "{}"),
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
			uni.getStorageSync('address', JSON.stringify(state.address))
		}
	},
	
	// 数据包裹器
	getters: {
		// 收货地址计算属性
		addStr(state) {
			if(!state.address.provinceName) return ''
			// 拼接 省, 市, 区, 详细地址 的字符串并返回给用户
			return state.address.provinceName + state.address.cityName + state.address.countyname + state.address.detailInfo
		}
	},
}