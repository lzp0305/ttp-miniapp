Page({
	data:{
		list: [],
		page: 0
	},
	onLoad: function (options) {
		var that = this;
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/index/news_list',
			data: {
				page: this.data.page
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				console.log(res.data.data)
				that.setData({
					list: res.data.data
				})
			}
		})
	},
	toNewsdetail: function(e){
		wx.navigateTo({
			url: '/pages/newsdetail/newsdetail?id='+e.currentTarget.id
		})
	},
	// 下拉到底部加载更多
	// onReachBottom: function(){
	// 	var that = this;
	// 	wx.request({
	// 		// 必需
	// 		url: '',
	// 		data: {
	// 			page: that.data.page
	// 		},
	// 		header: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		success: (res) => {
	// 			console.log(res);
	// 			if(res.data.data.length > 0){
	// 				wx.showToast({
	// 					icon: 'loading',
	// 					duration: 500
	// 				})
	// 				setTimeout(function(){
	// 					var list = that.data.list;
	// 					list = list.concat(res.data.data);
	// 					var page =  that.data.page +1;
	// 					that.setData({
	// 						page:page,
	// 						list:list
	// 					})
	// 				},450)
	// 			}else{
	// 				wx.showToast({
	// 					title:'没有更多了 ~。~',
	// 					icon: 'none',
	// 					duration: 500
	// 				})
	// 			}
	// 		}
	// 	})
	// }
})