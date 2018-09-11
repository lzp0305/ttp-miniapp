const app = getApp()
var template = require('../components/tabBar.js');
Page({
	data: {
	},
	onLoad: function (e){
		var that = this
		template.tabbar("tabBar", 3, this)//0表示第一个tabbar
		var user = wx.getStorageSync('USER');
		if(!user) {
			wx.redirectTo({
				url: '/pages/prelogin/prelogin'
			})
		} else {
			that.setData({
				// avatar: 'http://pytmjc.jxlll.wang'+user.avatar,
				avatar: user.avatar,
				nickname: user.nickname
			})
		}
	}
})

