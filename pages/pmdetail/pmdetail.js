var WxParse = require('../../wxParse/wxParse.js');

Page({
	data:{
		coverBgDisplay: 'none',
		countDownDay: '00',
		countDownHour: '00',
		countDownMinute: '00',
		countDownSecond: '00',
		id: '',
		thisState: '',//0正在进行，1未开始，2已结束，3已交保证金
		userState: '', //0已登录已交保证金，1已登录未交保证金，2未登录
		endtime: '',
		finishTime: '',
		src: [],
		title: '',
		company: '',
		price: '',
		who: '',
		startPrice: '',
		addStep: '',
		type: '拍卖',
		deposit: '',
		duringTime: '',
		delayTime: '',
		affiche: '',
		notice: '',
		paycount: '',
		topQ: '该标的物可以贷款吗？',
		topA: '亲，如您需要贷款，可点击“拍卖服务”选择金融服务，相对应地区的金融机构咨询贷款详情。亲，如您需要贷款，可点击“拍卖服务”选择金融服务，相对应地区的金融机构咨询贷款详情。亲，如您需要贷款，可点击“拍卖服务”选择金融服务，相对应地区的金融机构咨询贷款详情。',
		article: '',
		pay: [],
		twiceLawyer: []
	},
	onLoad: function (options) {
		var that = this;
		// console.log(options.id)
		wx.request({
			// 必需
			url: 'http://pytmjc.jxlll.wang/wap/product/info',
			data: {
				id: options.id
			},
			header: {
				'Content-Type': 'application/json'
			},
			success: (res) => {
				that.setData({
					addStep: res.data.data.addStep,
					affiche: res.data.data.affiche,
					article: res.data.data.article,
					company: res.data.data.company,
					delayTime: res.data.data.delayTime,
					deposit: res.data.data.deposit,
					duringTime: res.data.data.duringTime,
					endtime: res.data.data.endtime,
					finishTime: res.data.data.finishTime,
					id: res.data.data.id,
					notice: res.data.data.notice,
					pay: res.data.data.pay,
					paycount: res.data.data.paycount,
					price: res.data.data.price,
					src: res.data.data.src,
					startPrice: res.data.data.startPrice,
					thisState: res.data.data.thisState,
					title: res.data.data.title,
					twiceLawyer: res.data.data.twiceLawyer,
					// userState: res.data.data.userState,
					userState: 0,
					who: res.data.data.who
				});
				console.log(res.data.data.twiceLawyer)
				// 倒计时
				var totalSecond = this.data.finishTime - Date.parse(new Date())/1000;
				var interval = setInterval(function () {
					// 秒数
					var second = totalSecond;
					// 天数位
					var day = Math.floor(second / 3600 / 24);
					var dayStr = day.toString();
					if (dayStr.length == 1) dayStr = '0' + dayStr;
					// 小时位
					var hr = Math.floor((second - day * 3600 * 24) / 3600);
					var hrStr = hr.toString();
					if (hrStr.length == 1) hrStr = '0' + hrStr;
					// 分钟位
					var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
					var minStr = min.toString();
					if (minStr.length == 1) minStr = '0' + minStr;
					// 秒位
					var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
					var secStr = sec.toString();
					if (secStr.length == 1) secStr = '0' + secStr;
					this.setData({
						countDownDay: dayStr,
						countDownHour: hrStr,
						countDownMinute: minStr,
						countDownSecond: secStr,
					});
					totalSecond--;
					if (totalSecond < 0) {
						clearInterval(interval);
						wx.showToast({
							title: '活动已结束',
							icon: 'none'
						});
						this.setData({
							countDownDay: '00',
							countDownHour: '00',
							countDownMinute: '00',
							countDownSecond: '00',
							thisState: 2
						});
					}
				}.bind(this), 1000);
				var temp1 = WxParse.wxParse('affiche', 'html', that.data.affiche, that, 0);
				that.setData({
					affiche: temp1
				});
				var temp2 = WxParse.wxParse('notice', 'html', that.data.notice, that, 0);
				that.setData({
					notice: temp2
				});
				var temp3 = WxParse.wxParse('article', 'html', that.data.article, that, 0);
				that.setData({
					article: temp3
				});
				// var conp = Number(that.data.price.replace(',',''))+Number(that.data.addStep.replace(',',''))
				var conp = Number(that.data.price)+Number(that.data.addStep)
				console.log(conp)
				that.setData({
					conPrice: conp
				})
			}
		})






		// // 新闻详情
		// var temp = WxParse.wxParse('article', 'html', that.data.article, that, 0);
		// that.setData({
		// 	article: temp
		// });
		// console.log("系统当前时间："+Date.parse(new Date()).toString().substr(0,10))
	},
	showCover: function(){
		var that = this;
		that.setData({
			coverBgDisplay: 'block',
			thisState: '-1'
		})
	},
	hideCover: function(){
		var that = this;
		that.setData({
			coverBgDisplay: 'none',
			thisState: '3'
		})
	},
	subtract: function(){
		var that = this;
		that.setData({
			conPrice: Number(this.data.conPrice)-Number(this.data.addStep)
		})
	},
	add: function(){
		var that = this;
		that.setData({
			conPrice: Number(this.data.conPrice)+Number(this.data.addStep)
		});
	},
	changeConPrice: function(event){
		var that = this;
		that.setData({
			conPrice: event.detail.value
		})
	},
	outPriceFinish: function(e){
		var that = this;
		var cp = that.data.conPrice;
		var op = that.data.price.replace(',','');
		console.log('加价'+cp+'当前价'+op)
		if (Number(cp) <= Number(op)) {
			wx.showToast({
				title: '出价应大于当前价！',
				icon: 'none',
				duration: 2000
			})
		} else {
			var value = wx.getStorageSync('USER');
			var uid = value.id;
			wx.request({
				// 必需
				url: 'http://pytmjc.jxlll.wang/wap/product/buy',
				data: {
					id: e.currentTarget.id,
					addprice: cp,
					uid: uid
				},
				header: {
					'Content-Type': 'application/json'
				},
				success: (res) => {
					if (res.data.status == 200) {
						wx.showToast({
							title: '出价成功！',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function(){
							wx.navigateTo({
								url: 'pmdetail'
							})
						},2000)
					} else {
						wx.showToast({
							title: ''+res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				}
			})
		}
	},
	toFwdetail: function(e){
		wx.navigateTo({
			url: '/pages/fwdetail/fwdetail?id='+e.currentTarget.id
		})
	},
	toNotice: function(e){
		wx.navigateTo({
			url: '/pages/notice/notice?id='+e.currentTarget.id
		})
	},
	toRecord: function(e){
		wx.navigateTo({
			url: '/pages/record/record?id='+e.currentTarget.id
		})
	},
	toAffiche: function(e){
		wx.navigateTo({
			url: '/pages/affiche/affiche?id='+e.currentTarget.id
		})
	},
	toPaydeposit: function(e){
		console.log(e.currentTarget.id)
		wx.navigateTo({
			url: '/pages/paydeposit/paydeposit?id='+e.currentTarget.id
		})
	}
})