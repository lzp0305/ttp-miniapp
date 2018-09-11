var interval = null
Page({
	data:{
		phoneNumOk: false,
		disabled: true,
		text: '获取短信验证码',
		currentTime: 61
	},
	bindRegionChange: function (e) {
		this.setData({
			region: e.detail.value
		})
	},
	getCode: function (options){
		var that = this;
		var currentTime = that.data.currentTime
		interval = setInterval(function () {
			currentTime--;
			that.setData({
				text: currentTime+'秒'
			})
			if (currentTime <= 0) {
				clearInterval(interval)
				that.setData({
					text: '重新发送',
					currentTime:61,
					phoneNumOk: true,
					disabled: false
				})
			}
		}, 1000)
	},
	getSecurity: function(e){
		this.getCode();
		var that = this
		that.setData({
			phoneNumOk: false,
			disabled: true
		})
		console.log(e)
	},

	// 手机号部分
	inputPhoneNum: function (e) {
		let phoneNumber = e.detail.value
		if (phoneNumber.length === 11) {
			let checkedNum = this.checkPhoneNum(phoneNumber)
		} else {
			let checkedNum = this.checkPhoneNum(phoneNumber)
		}
	},
	checkPhoneNum: function (phoneNumber) {
		var that = this
		let str = /^1\d{10}$/
		if (str.test(phoneNumber)) {
			that.setData({
				phoneNumOk: true,
				disabled: false
			})
		} else {
			that.setData({
				phoneNumOk: false,
				disabled: true
			})
		}
	},
	userdataSubmit: function(e) {
		var warn = "";//弹框时提示的内容
		var flag = true;//判断信息输入是否完整
		if(e.detail.value.phone==""){
			warn = "请填写您的手机号！";
		}else if(!(/^1\d{10}$/.test(e.detail.value.phone))){
			warn = "手机号格式不正确！";
		}else if(e.detail.value.security==""){
			warn = "请输入验证码！"
		}else if(!(e.detail.value.security.length=="4")){
			warn = "验证码格式不正确！"
		}else{
			flag=false;
			var that = this;
			// console.log('form发生了submit事件，携带数据为：', e.detail.value);
			wx.login({
				success: function(res) {
					console.log('wx.login成功执行，即将向后台发送请求')
					if (res.code) {
						wx.request({
							url: 'http://pytmjc.jxlll.wang/wap/login/register',
							data: {
								code: res.code,
								phone: e.detail.value.phone,
								send: e.detail.value.security
							},
							header: {
								'content-type': 'application/json'
							},
							success: function(res) {
								console.log('收到后台返回值');
								console.log(res)
								if(res.data.status == 200){
									console.log('该用户是老用户，数据库中有该手机号');
									wx.setStorageSync('USER', res.data.user);
									wx.showModal({
										title: '恭喜您绑定成功',
										content: '点击【确定】进入个人中心',
										success: function(){
											wx.redirectTo({
												url: '/pages/me/me'
											})
										}
									})
								} else if(res.data.status == 300){
									console.log('该用户是新用户，数据库没有该手机号');

									var  password = res.data.user.password;
									console.log('向后台发送用户信息并注册')
									wx.getStorage({
										key: 'userInfo',
										success: function(res) {
											console.log('用户信息为：↓↓↓↓↓')
											console.log(res.userInfo)
											console.log(e.detail.value.phone);
											wx.request({
												url: 'http://pytmjc.jxlll.wang/wap/login/userinfo',
												data: {
													userInfo: res.data.userInfo,
													phone: e.detail.value.phone
												},
												header: {
													'content-type': 'application/json' // 默认值
												},
												success: function(res) {
													console.log(res)
													if(res.data.status == 200){
														wx.setStorageSync('USER', res.data.user);
														wx.showModal({
															title: '恭喜您注册成功',
															content: '您的初始密码为'+password+'\r\n请妥善保管并及时通过PC端修改密码',
															success: function(){
																wx.redirectTo({
																	url: '/pages/me/me'
																})
															}
														})
													}else{
														wx.showToast({
															title: '系统维护中，请稍后再试',
															icon: 'none',
															duration: 2000
														})
													}
													console.log('服务器成功获取了用户数据')
												}
											})
										}
									})
								} else if(res.data.status == 400) {
									wx.showToast({
										title: res.data.msg,
										icon: 'none',
										duration: 2000
									})
								}
							}
						})
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			});
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