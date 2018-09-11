const app = getApp()
var template = require('../components/tabBar.js');
Page({
	data:{
		currentTab: 0,
		page1: 0,
		page2: 0,
		orderList:[],
		payorderList: []
	},
	onLoad: function (options) {
		var that = this
		template.tabbar("tabBar", 3, this);
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/center/joinorder',
			data: {
				uid: 1,
				type: 1,
				page: that.data.page1
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res)
				var page1 =  that.data.page1 +1;
				that.setData({
					orderList: res.data.data,
					page1: page1
				})
			}
		})
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/center/payorder',
			data: {
				uid: 1,
				type: 1,
				page: that.data.page2
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res2) => {
				console.log(res2)
				var page2 =  that.data.page2 +1;
				that.setData({
					payorderList: res2.data.data,
					page2: page2
				})
			}
		})
	},
	swiperTab: function (e) {
		var that = this;
		that.setData({
			currentTab: e.detail.current
		});
	},
	clickTab: function(e){
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	},
	// 下拉到底部加载更多
	onReachBottom: function(){
		var that = this;
		if (that.data.currentTab == 0) {
			wx.request({
				// 必需
				url: 'http://pytmjc.jxlll.wang/wap/center/joinorder',
				data: {
					uid: 1,
					type: 1,
					page: that.data.page1
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
							var joinorder = that.data.joinorder;
							joinorder = joinorder.concat(res.data.data);
							var page1 =  that.data.page1 +1;
							that.setData({
								page1: page1,
								joinorder: joinorder
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
		} else {
			wx.request({
				// 必需
				url: 'http://pytmjc.jxlll.wang/wap/center/payorder',
				data: {
					uid: 1,
					type: 1,
					page: that.data.page2
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
							var payorder = that.data.payorder;
							payorder = payorder.concat(res.data.data);
							var page2 =  that.data.page2 +1;
							that.setData({
								page2: page2,
								payorder: payorder
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
	}
})