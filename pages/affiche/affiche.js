var WxParse = require('../../wxParse/wxParse.js');
Page({
	data:{
		affiche: []
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
					affiche: res.data.data.affiche,
				})
				var temp = WxParse.wxParse('affiche', 'html', that.data.affiche, that, 0);
				that.setData({
					affiche: temp
				});
			}
		})
	}
})