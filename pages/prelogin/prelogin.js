Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		text: '授权'
	},
	accredit: function(){
		var that = this;
		wx.getSetting({
			success: function(res){
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						success: function(res) {
							wx.setStorageSync('userInfo',res)
							console.log('储存了用户信息');
							wx.redirectTo({
								url: '/pages/login/login'
							})
						}
					})
				}
			}
		})
	},
	bindGetUserInfo: function(res) {
		var that = this;
		if(res.detail.userInfo) {
			that.setData({
				text: '下一步'
			})
		}else {
			wx.showToast({
				title: '拒绝授权将无法使用此小程序的部分功能，请允许授权',
				icon: 'none',
				duration: 2000
			})
		}
	}
})