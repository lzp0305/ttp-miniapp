Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		id: '',
		title: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
		deposit: '2800',
		name: '某某某',
		index: 0,
		array: ['身份证', '驾驶证', '其他1', '其他2'],
		region: ['江西省', '南昌市', '青山湖区'],
		customItem: '全部'
	},
	onLoad: function(){
	},
	bindPickerChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	bindRegionChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			region: e.detail.value
		})
	},
	aassdd1: function(e){
		var that = this;
		console.log(e.detail.value.length)
		if (e.detail.value.length !== 0) {
			that.setData({
				ok1: true
			})
		} else {}
	},
	aassdd2: function(e){
		var that = this;
		console.log(e.detail.value.length)
		if (e.detail.value.length !== 0) {
			that.setData({
				ok2: true
			})
		} else {}
	},
	aassdd3: function(e){
		var that = this;
		console.log(e.detail.value.length)
		if (e.detail.value.length !== 0) {
			that.setData({
				ok3: true
			})
		} else {}
	},
	aassdd4: function(e){
		var that = this;
		console.log(e.detail.value.length)
		if (e.detail.value.length !== 0) {
			that.setData({
				ok4: true
			})
		} else {}
	},
	formSubmit:function(){
		// console.log(this.data.ok1)
		if (this.data.ok1 == true) {
			if (this.data.ok2 == true) {
				if (this.data.ok3 == true) {
					if (this.data.ok4 == true) {
						console.log('okokok')
					} else {
						wx.showToast({
							title: '请认真阅读注意事项并确认勾选',
							icon: 'none',
							duration: 2000
						})
					}
				} else {
					wx.showToast({
						title: '请认真阅读注意事项并确认勾选',
						icon: 'none',
						duration: 2000
					})
				}
			} else {
				wx.showToast({
					title: '请认真阅读注意事项并确认勾选',
					icon: 'none',
					duration: 2000
				})
			}
		} else {
			wx.showToast({
				title: '请认真阅读注意事项并确认勾选',
				icon: 'none',
				duration: 2000
			})
		}
	}
})