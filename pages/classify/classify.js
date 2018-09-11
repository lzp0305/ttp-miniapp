const app = getApp()
var template = require('../components/tabBar.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data:{
		list: [],
		leftIn: {},
		rightIn: {},
		leftOut: {},
		rightOut: {},
		zz: {},
		show: false,
		clas1: [],
		clas1id: '1',
		clas2: [],
		clas2id: '',
		city1: [],
		city1id: '2',
		city2: [],
		city2id: '',
		page: 0,
		keywords: ''
	},
	onLoad: function (options) {
		var that = this
		template.tabbar("tabBar", 1, this);
		if (typeof(options.id)=="undefined") {
			console.log('id为空，传默认值')
			// 请求分类一级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/cates',
				data: {},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						clas1: res.data.data
					})
				}
			});
			// 请求分类二级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/cates_son',
				data: {
					pid: 1
				},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						clas2: res.data.data,
						clas1id: res.data.data[0].parent_id
					});
				}
			});
			// 请求城市一级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/city',
				data: {},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						city1: res.data.data
					})
				}
			});
			// 请求城市二级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/city_son',
				data: {
					pid: 2
				},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						city2: res.data.data,
						city1id: res.data.data[0].pid
					})
				}
			});
			if (typeof(options.keywords)=="undefined") {
				wx.request({
					url: 'http://pytmjc.jxlll.wang/wap/product/lists',
					data: {
						class: that.data.clas1id,
						cate: that.data.clas2id,
						city: that.data.city1id,
						area: that.data.city2id,
						page: that.data.page
					},
					header: {'content-type': 'application/json'},
					success: function(res) {
						console.log(res);
						var page =  that.data.page +1;
						that.setData({
							list: res.data.data,
							page:page
						})
					}
				});
			} else {
				that.setData({
					keywords: options.keywords
				})
				wx.request({
					url: 'http://pytmjc.jxlll.wang/wap/product/lists',
					data: {
						class: that.data.clas1id,
						cate: that.data.clas2id,
						city: that.data.city1id,
						area: that.data.city2id,
						page: that.data.page,
						keywords: options.keywords
					},
					header: {'content-type': 'application/json'},
					success: function(res) {
						console.log(res);
						var page =  that.data.page +1;
						that.setData({
							list: res.data.data,
							page:page
						})
					}
				});
			}
				
		} else {
			// 请求分类一级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/cates',
				data: {
					class: options.id
				},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						clas1: res.data.data
					})
				}
			});
			// 请求分类二级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/cates_son',
				data: {
					pid: options.id
				},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						clas2: res.data.data,
						clas1id: res.data.data[0].parent_id
					});
				}
			});
			// 请求城市一级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/city',
				data: {},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						city1: res.data.data
					})
				}
			});
			// 请求城市二级
			wx.request({
				url: 'http://pytmjc.jxlll.wang/wap/product/city_son',
				data: {
					pid: 2
				},
				header: {'content-type': 'application/json'},
				success: function(res) {
					that.setData({
						city2: res.data.data,
						city1id: res.data.data[0].pid
					})
				}
			});
			if (typeof(options.keywords)=="undefined") {
				wx.request({
					url: 'http://pytmjc.jxlll.wang/wap/product/lists',
					data: {
						class: that.data.clas1id,
						cate: that.data.clas2id,
						city: that.data.city1id,
						area: that.data.city2id,
						page: that.data.page
					},
					header: {'content-type': 'application/json'},
					success: function(res) {
						console.log(res);
						var page =  that.data.page +1;
						that.setData({
							list: res.data.data,
							page:page
						})
					}
				});
			} else {
				wx.request({
					url: 'http://pytmjc.jxlll.wang/wap/product/lists',
					data: {
						class: that.data.clas1id,
						cate: that.data.clas2id,
						city: that.data.city1id,
						area: that.data.city2id,
						page: that.data.page,
						keywords: options.keywords
					},
					header: {'content-type': 'application/json'},
					success: function(res) {
						console.log(res);
						var page =  that.data.page +1;
						that.setData({
							list: res.data.data,
							page:page
						})
					}
				});
			}
		}
	},
	selectAll: function(){
		var that = this
		// 不动产选项卡
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/lists',
			data: {},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					list: res.data.data
				})
			}
		});
	},
	showSelectCover: function(){
		var that = this;
		that.setData({
			show: !this.data.show
		})
		var lleft = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease',
		})
		this.lleft = lleft
		lleft.left('0rpx').opacity(1).step()
		this.setData({
			leftIn:lleft.export()
		})
		var rright = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease',
		})
		this.rright = rright
		rright.right('0rpx').step()
		this.setData({
			rightIn:rright.export()
		})
	},
	hideSelectCover: function(){
		var that = this;
		that.setData({
			show: !this.data.show
		})
		var lleft = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease',
		})
		this.lleft = lleft
		lleft.left('-150rpx').opacity(1).step()
		this.setData({
			leftOut:lleft.export()
		})
		var rright = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease',
		})
		this.rright = rright
		rright.right('-600rpx').step()
		this.setData({
			rightOut:rright.export()
		})
	},
	changeClas1: function(e){
		var that = this;
		// 请求分类二级
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/cates_son',
			data: {
				pid: e.currentTarget.id
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					clas2: res.data.data,
					clas2id: '',
					clas1id: res.data.data[0].parent_id
				});
			}
		});
	},
	changeClas2: function(e){
		var that = this;
		that.setData({
			clas2id: e.currentTarget.id
		});
	},
	changeCity1: function(e){
		var that = this;
		// 请求城市二级
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/city_son',
			data: {
				pid: e.currentTarget.id
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					city2: res.data.data,
					city2id: '',
					city1id: res.data.data[0].pid
				})
			}
		});
	},
	changeCity2: function(e){
		var that = this;
		that.setData({
			city2id: e.currentTarget.id
		});
	},
	done: function(options){
		console.log(options)
		var that = this;
		console.log('分类__class__'+that.data.clas1id)
		console.log('类型__cate__'+that.data.clas2id)
		console.log('城市__city__'+that.data.city1id)
		console.log('地区__area__'+that.data.city2id)
		console.log('________________________________')
		wx.request({
			url: 'http://pytmjc.jxlll.wang/wap/product/lists',
			data: {
				class: that.data.clas1id,
				cate: that.data.clas2id,
				city: that.data.city1id,
				area: that.data.city2id,
				keywords: that.data.keywords
			},
			header: {'content-type': 'application/json'},
			success: function(res) {
				that.setData({
					list: res.data.data,
					page:1
				})
			}
		});
		that.hideSelectCover();
	},
	// 跳转到详情页
	toPmdetail: function(e){
		wx.navigateTo({
			url: '/pages/pmdetail/pmdetail?id='+e.currentTarget.id
		})
	},
	// 下拉到底部加载更多
	onReachBottom: function(){
		var that = this;
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/product/lists',
			data: {
				class: that.data.clas1id,
				cate: that.data.clas2id,
				city: that.data.city1id,
				area: that.data.city2id,
				page:that.data.page,
				keywords: that.data.keywords
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
						var list = that.data.list;
						list = list.concat(res.data.data);
						var page =  that.data.page +1;
						that.setData({
							page:page,
							list:list
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