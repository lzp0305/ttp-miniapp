function tabBarInit() {
	 return [{
		"active":0,
		"page_path": "/pages/index/index",
		"icon_path": "/images/tab_icon1.png",
		"active_icon_path": "/images/tab_icon1_hover.png",
		"text": "首页"
		},{
		"active": 0,
		"page_path": "/pages/classify/classify",
		"icon_path": "/images/tab_icon2.png",
		"active_icon_path": "/images/tab_icon2_hover.png",
		"text": "分类"
		},{
		"active": 0,
		"page_path": "/pages/service/service",
		"icon_path": "/images/tab_icon3.png",
		"active_icon_path": "/images/tab_icon3_hover.png",
		"text": "便民服务中心"
		},{
		"active": 0,
		"page_path": "/pages/me/me",
		"icon_path": "/images/tab_icon4.png",
		"active_icon_path": "/images/tab_icon4_hover.png",
		"text": "我的"
		}
	]
}

function tabBarMain(bindName = "tabdata", id, target) {
	var that = target;
	var bindData = {};
	var otabbar = tabBarInit();
	otabbar[id]['icon_path'] = otabbar[id]['active_icon_path']//换当前的icon
	otabbar[id]['active'] = 1;
	bindData[bindName] = otabbar
	that.setData({ bindData });
}

module.exports = {
	tabbar: tabBarMain
}