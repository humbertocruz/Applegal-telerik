Template.registerHelper("backBtnRouteHelper", function(){
	if (!backBtnRouteVar.get()) return '';
	return FlowRouter.url(backBtnRouteVar.get().route, backBtnRouteVar.get().params);
});
