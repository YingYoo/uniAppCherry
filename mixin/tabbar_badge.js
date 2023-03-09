import { mapGetters } from "vuex"

export default {
	onShow() {
		this.setBadge()
	},
	computed: {
		...mapGetters("Cart", ["totalCart"])
	},
	methods: {
		setBadge() {
			// 底部tabbar显示徽标
			uni.setTabBarBadge({
				index: 2,
				text: this.totalCart + ""
			})
		}
	},
	watch: {
		totalCart() {
			this.setBadge()
		}
	}
}