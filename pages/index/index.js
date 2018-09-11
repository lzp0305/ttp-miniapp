const app = getApp()
var template = require('../components/tabBar.js');
Page({
	data: {
		// 不动产公拍选项卡初始位置
		currentTab: 0,
		// 租赁公拍选项卡初始位置
		currentTab2: 0,
		// 轮播图
		bannerImg: [],
		// 上下滚动公拍信息
		auctionInfo: [],
		// 四个公拍信息
		latestAuction: [],
		// 不动产公拍
		BDCEstate: [],
		BDCProperty: [],
		BDCYichun: [],
		BDCNanchang: [],
		// 租赁公拍
		ZLLand: [],
		ZLProperty: [],
		ZLYichun: [],
		ZLNanchang: []
	},
	onLoad: function (options) {
		console.log(app.globalData.userInfo)
		var that = this
		template.tabbar("tabBar", 0, this);//0表示第一个tabbar
		// 轮播图
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/index/balane',
			data: {},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					bannerImg: res.data.data
				})
			}
		});
		// 上下滚动公拍信息
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/index/informat',
			data: {},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					auctionInfo: res.data.data
				})
			}
		});
		// 四个公拍信息
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/index/informat',
			data: {
				num: 4
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					latestAuction: res.data.data
				})
			}
		});
		// 不动产选项卡
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/index/estate_list',
			data: {
				status: 1
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				// console.log(res.data.data)
				that.setData({
					BDCEstate: res.data.data[0],
					BDCProperty: res.data.data[1],
					BDCYichun: res.data.data[2],
					BDCNanchang: res.data.data[3],
				})
			}
		});
		// 租赁选项卡
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/index/estate_list',
			data: {
				status: 2
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				console.log(res.data.data)
				that.setData({
					ZLLand: res.data.data[0],
					ZLYichun: res.data.data[1],
					ZLNanchang: res.data.data[2],
				})
			}
		});
	},
	openCall: function(){
		wx.makePhoneCall({
			phoneNumber: '400-198-1092'
		})
	},

	// 搜索
	searchSubmit: function(e){
		console.log(e.detail.value.keywords);
		wx.navigateTo({
			url: '/pages/classify/classify?keywords='+e.detail.value.keywords
		})
	},

	// 禁止拖动swiper
	notAllTouch: function(res){
		return false;
	},

	// 不动产公拍选项卡
	swiperTab:function(e){
		var that = this;
		that.setData({
			currentTab: e.detail.current
		});
	},
	clickTab:function(e){
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false
		} else {
			that.setData({
				currentTab: e.target.dataset.current
			})
		}
	},
	swiperTab2:function(e){
		var that = this;
		that.setData({
			currentTab2: e.detail.current
		});
	},
	clickTab2:function(e){
		var that = this;
		if (this.data.currentTab2 === e.target.dataset.current) {
			return false
		} else {
			that.setData({
				currentTab2: e.target.dataset.current
			})
		}
	},
	// 跳转到详情页
	toPmdetail: function(e){
		wx.navigateTo({
			url: '/pages/pmdetail/pmdetail?id='+e.currentTarget.id
		})
	},
	//跳转到分类也
	toClassify: function(e){
		wx.navigateTo({
			url: '/pages/classify/classify?id='+e.currentTarget.id
		})
	},
	toNewsdetail: function(e){
		wx.navigateTo({
			url: '/pages/newsdetail/newsdetail?id='+e.currentTarget.id
		})
	}
})

