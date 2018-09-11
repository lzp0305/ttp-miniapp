var WxParse = require('../../wxParse/wxParse.js');

Page({
	data:{
		id: '',
		uid: '',
		src: [],
		title: '',
		company: '',
		price: '',
		article: '',
		fwState: 0,
	},
	onLoad: function (options) {
		var that = this;
		var USER = wx.getStorageSync('USER')
		if (USER) {
			wx.getStorage({
				key: 'USER',
				success: function(res) {
					that.setData({
						fwState: 1,
						uid: res.data.id
					})
					wx.request({
						url: 'http://pytmjc.jxlll.wang/wap/product/service_info',
						data: {
							uid: that.data.uid,
							id: options.id
						},
						header: {
							'Content-Type': 'application/json'
						},
						success: (res) => {
							console.log(res.data)
							if (res.data.code == 200) {
								that.setData({
									article: res.data.data.content,
									company: res.data.data.address,
									id: res.data.data.id,
									price: res.data.data.price,
									src: res.data.data.src,
									thisState: res.data.data.thisState,
									title: res.data.data.good_title,
									total_income: res.data.data.total_income
								});
								var temp3 = WxParse.wxParse('article', 'html', that.data.article, that, 0);
								that.setData({
									article: temp3
								});
							} else if(res.data.code == 400) {
								wx.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 2000
								})
								setTimeout(function(){
									wx.navigateBack({
										delta: 1
									})
								},2000)
							}
						}
					})
				}
			})
		} else {
		}
	},
	payit: function(e){
		var user = wx.getStorageSync('USER')
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/order/pay',
			data: {
				uid: user.id,
				pay: 1,
				id: e.currentTarget.id,
				num: 1
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res)
			}
		})
	}
})