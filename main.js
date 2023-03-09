import App from './App'
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
// 引入store
import store from './store/store.js'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求根路径
$http.baseUrl = "https://api-hmugo-web.itheima.net"/* https://www.uinav.com */

// 请求拦截器
$http.beforeRequest = function (options) {
	wx.showLoading({
	  title: '数据加载中...',
	})
	if(options.url.indexOf("/my/") !== -1) {
		options.header = {
			Authorization: store.state.User.token
		}
	}
}

// 响应拦截器
$http.afterRequest = function () {
  wx.hideLoading()
}

uni.$showMsg = function(title = "数据加载中...", duration = 1500){
	uni.showToast({
		title,
		duration,
		icon: "none"
	})
}
// #ifndef VUE3
import Vue, { VueElement } from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
		store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif