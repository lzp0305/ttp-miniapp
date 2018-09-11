var WxParse = require('../../wxParse/wxParse.js');
Page({
	data:{
		notice: []
	},
	onLoad: function (options) {
		var that = this;
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/info',
			data: {
				id: options.id
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				that.setData({
					notice: res.data.data.notice,
				})
				var temp = WxParse.wxParse('notice', 'html', that.data.notice, that, 0);
				that.setData({
					notice: temp
				});
			}
		})
	}
})