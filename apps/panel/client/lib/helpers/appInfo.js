Template.registerHelper("appInfo", function(){
	var appInfo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
	console.log(appInfo);
	if (appInfo) return appInfo;
});
