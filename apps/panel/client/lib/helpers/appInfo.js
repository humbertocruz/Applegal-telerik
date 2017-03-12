Template.registerHelper("appInfo", function(){
	var appInfo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
	if (appInfo) return appInfo;
});
