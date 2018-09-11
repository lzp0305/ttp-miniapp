var WxParse = require('../../wxParse/wxParse.js');
Page({
	data: {
		id: '',
		src: '',
		title: '',
		date: '',
		article: ''
	},
	onLoad: function (options) {
		var that = this;
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/index/news_info',
			data: {
				id: options.id
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res.data.data);
				that.setData({
					src: res.data.data.image,
					title: res.data.data.title,
					article: res.data.data.content,
					date: res.data.data.create_at,
					id: res.data.data.id
				})
				var temp = WxParse.wxParse('article', 'html', that.data.article, that, 0);
				that.setData({
					article: temp
				});
			}
		})
	},
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: this.data.title,
			path: '/pages/newsdetail/newsdetail?id='+this.data.id,
			imageUrl: this.data.src
		}
	}
})