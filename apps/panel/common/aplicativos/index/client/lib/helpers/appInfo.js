Template.registerHelper("appInfo", function(){
	return Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
});
