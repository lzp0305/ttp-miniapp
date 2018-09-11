const app = getApp()
var template = require('../components/tabBar.js');
Page({
	data: {
		page: 0,
		twiceLawyer: []
	},
	onLoad: function () {
		var that = this;
		template.tabbar("tabBar", 2, this)//0表示第一个tabbar
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/service',
			data: {
				// class: 1,
				// city: 2,
				page: that.data.page
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				console.log(res.data);
				var page =  that.data.page +1;
				that.setData({
					twiceLawyer: res.data.data,
					page:page
				})
			}
		});
	},
	toFwdetail: function(e){
		wx.navigateTo({
			url: '/pages/fwdetail/fwdetail?id='+e.currentTarget.id
		})
	},
	// 下拉到底部加载更多
	onReachBottom: function(){
		var that = this;
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/service',
			data: {
				page:that.data.page
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
						var twiceLawyer = that.data.twiceLawyer;
						twiceLawyer = twiceLawyer.concat(res.data.data);
						var page =  that.data.page +1;
						that.setData({
							page:page,
							twiceLawyer:twiceLawyer
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
