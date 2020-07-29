Component({
	data: {
		active: 0,
		list: [
			{
				icon: 'home-o',
				text: '首页',
				url: '/pages/tab-firstpage/firstpage'
			},
			{
				icon: 'search',
				text: '体检',
				url: '/pages/tab-examination/examination'
			},
			{
				icon: 'search',
				text: '我的',
				url: '/pages/tab-me/me'
			}
		]
	},

	methods: {
		onChange(event) {
			this.setData({ active: event.detail });
			wx.switchTab({
				url: this.data.list[event.detail].url
			});
		},

		init() {
			const page = getCurrentPages().pop();
			this.setData({
				active: this.data.list.findIndex(item => item.url === `/${page.route}`)
			});
		}
	}
});
