Page({
	data:{
		methodIndex: '0',
		reasonIndex:'0',
		refundMethod: ['仅退款'],
		refundReason: ['请选择退款原因', '不想要了11111', '个人原因22222', '我也不知道原因3333'],
		id: '',
		link: '',
		src: '',
		title: '',
		price: '',
		num: '',
		creatTime: '',
		state: ''
	},
	onLoad: function(option){
		var that = this;
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/center/details',
			data: {
				// uid: wx.getStorageSync('USER').id
				uid: 1,
				id: option.id
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				that.setData({
					id: res.data.data.id,
					src: res.data.data.good_img,
					title: res.data.data.good_title,
					price: res.data.data.price,
					num: res.data.data.num,
					creatTime: res.data.data.create_time
				})
			}
		})
	},
	refundMethodPicker: function(e){
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			methodIndex: e.detail.value
		})
	},
	refundReasonPicker: function(e){
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			reasonIndex: e.detail.value
		})
	},
	askrefundSubmit: function(e){
		var user = wx.getStorageSync('USER')
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/center/refund',
			data: {
				uid: user.id,
				order_id: e.detail.target.id,
				serve: e.detail.value.refundMethod,
				reason: e.detail.value.refundReason,
				content: e.detail.value.refundDetail
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res)
				if (res.data.status == 200) {
					wx.showToast({
						title: '您的退款申请已提交',
						icon: 'none',
						duration: 2000
					})
					setTimeout(function(){
						wx.redirectTo({
							url: '/pages/order/order'
						})
					},2000)
				} else {
					wx.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	}
})