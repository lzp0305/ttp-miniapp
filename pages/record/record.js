Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		pay: [],
		paycount: '',
		page: 0
	},
	onLoad: function (options) {
		var that = this;
		// console.log(options.id)
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/product/pay_order',
			data: {
				id: options.id,
				page: that.data.page
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res)
				var page =  that.data.page +1;
				that.setData({
					pay: res.data.data.data,
					paycount: res.data.data.count,
					page: page
				})
			}
		})
	},
	// 下拉到底部加载更多
	onReachBottom: function(){
		var that = this;
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/product/pay_order',
			data: {
				id: options.id,
				page: that.data.page
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res);
				if(res.data.data.length > 0){
					wx.showToast({
						icon: 'loading',
						duration: 500
					})
					setTimeout(function(){
						var pay = that.data.pay;
						pay = pay.concat(res.data.data);
						var page =  that.data.page +1;
						that.setData({
							page:page,
							pay:pay
						})
					},450)
				}else{
					wx.showToast({
						title:'没有更多了 ~。~',
						icon: 'none',
						duration: 500
					})
				}
			}
		})
	}
})