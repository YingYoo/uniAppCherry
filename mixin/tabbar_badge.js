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