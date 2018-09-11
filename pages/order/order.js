const app = getApp()
var template = require('../components/tabBar.js');
Page({
	data:{
		currentTab: 0,
		orderList:[
			//0:待付款，1:已付款，2:已完成，3:已取消 , 4:退款中 , 5:已退款
		]
	},
	onLoad: function (options) {
		var that = this
		template.tabbar("tabBar", 3, this)
		console.log(options.on)
		that.setData({
			currentTab: options.on
		})
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/center/myorder',
			data: {
				// uid: wx.getStorageSync('USER').id
				uid: 1
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res.data.data);
				that.setData({
					orderList: res.data.data
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
	askrefund: function(e){
		var that = this;
		console.log(e.currentTarget.id)
		wx.navigateTo({
			url: '/pages/askrefund/askrefund?id='+e.currentTarget.id
		})
	},
	toFwdetail: function(e){
		console.log(e.currentTarget.id);
		wx.navigateTo({
			url: '/pages/fwdetail/fwdetail?id='+e.currentTarget.id
		})
	},
	goforpay: function(e){
		console.log(e.currentTarget.dataset.orderid);
		var user = wx.getStorageSync('USER')
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/order/pay',
			data: {
				uid: user.id,
				pay: 2,
				id: e.currentTarget.dataset.orderid,
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res)
			}
		})
	},
	cancel: function(e){
		console.log(e);
		var user = wx.getStorageSync('USER');
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/center/cancel',
			data: {
				uid: user.id,
				id: e.currentTarget.dataset.orderid
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				if (res.data.status == 200) {
					wx.showToast({
						title: '取消成功',
						icon: 'success',
						duration: 2000
					})
					setTimeout(function(){
						wx.redirectTo({
							url: '/pages/order/order'
						})
					},2000)
				} else {}
			}
		})
	}
})