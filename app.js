//app.js
App({
	onLaunch: function () {
		// 登录
		var user = wx.getStorageSync('USER');
		if(!user){
			wx.login({
				success: function(res) {
					if (res.code) {
						//发起网络请求
						wx.request({
							url: 'http://pytmjc.jxlll.wang/wap/login/index',
							data: {
								code: res.code
							},
							header: {
								'content-type': 'application/json'
							},
							success: function(res) {
								if(res.data.status == 200){
									// console.log(res);
									wx.setStorageSync('USER', res.data.user);
								}
							}
						})
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			});
		} else {
			wx.login({
				success: function(res) {
					if (res.code) {
						//发起网络请求
						wx.request({
							url: 'http://pytmjc.jxlll.wang/wap/login/index',
							data: {
								code: res.code
							},
							header: {
								'content-type': 'application/json'
							},
							success: function(res) {
								// console.log(res);
								if(res.data.status == 200){
									// console.log(res);
									wx.setStorageSync('USER', res.data.user);
								}
							}
						})
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			});
		}
		// 定时任务，商品监测
		// setInterval(function(){
		// 	wx.request({
		// 		// 必需
		// 		url: 'http://pytmjc.jxlll.wang/wap/product/detection',
		// 		data: {},
		// 		header: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		success: (res) => {
		// 			console.log(res)
		// 		}
		// 	})
		// },5000)
	},
	globalData: {
		userInfo: 'aaaa',
		userLoginState: 0
	}
})