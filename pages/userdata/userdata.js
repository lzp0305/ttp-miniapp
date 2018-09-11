var interval = null
Page({
	data:{
		name: '',
		nickname: '',
		phone: '',
		wechat: '',
		region: ['江西省', '南昌市', '青山湖区'],
		address: '',
		 phoneNumOk: false
	},
	onLoad: function(){
		var that = this;
		var user = wx.getStorageSync('USER');
		that.setData({
			name: user.true_name,
			phone: user.phone,
			wechat: user.weixin,
			region:[user.province, user.city, user.district],
			address: user.address,
			nickname: user.nickname
		})
	},
	bindRegionChange: function (e) {
		this.setData({
			region: e.detail.value
		})
	},

	userdataSubmit: function(e) {
		var warn = "";//弹框时提示的内容
		var flag = true;//判断信息输入是否完整
		if(e.detail.value.name==""){
			warn = "请填写您的姓名！";
		}else if(e.detail.value.wechat==""){
			warn = "请输入您的微信号";
		}else if(e.detail.value.region==""){
			warn = "请选择所在地";
		}else if(e.detail.value.address==""){
			warn = "请输入您的详细地址";
		}else{
			flag=false;
			var that = this;
			var userInfo = {
					true_name: e.detail.value.name,
					nickName: e.detail.value.nickname,
					weixin: e.detail.value.wechat,
					province: e.detail.value.region[0],
					city: e.detail.value.region[1],
					district: e.detail.value.region[2],
					address: e.detail.value.address
			};
			console.log('提交表单');
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/login/userinfo',
				data: {
					phone: this.data.phone,
					userInfo: userInfo
				},
				header: {
					'content-type': 'application/json' // 默认值
				},
				success: function(res) {
					console.log('成功，返回数据为：↓↓↓↓↓')
					console.log(res.data)
					wx.setStorageSync('USER', res.data.user)
					wx.showToast({
						title: '资料修改成功',
						icon: 'success',
						duration: 2000,
						success: function(){
							setTimeout(function(){
								wx.navigateBack({
									delta: 1
								})
							},2000)
						}
					})
				}
			})
		}
		//如果信息填写不完整，弹出输入框
		if(flag==true){
			wx.showModal({
				title: '提示',
				content: warn
			})
		}
	}
})