Meteor.startup(function(){
	var go = false;
	Tracker.autorun(function(){
		if (Roles.subscription.ready()){
			go = true;
		}
		if (appId = FlowRouter.getParam('aplicativoId')) {
			if (Aplicativo.find().count() > 0) go = true;
			else go = false;
		}
		// se GO inicia plataforma
		if (go && !flowRouterInit.get()) {
			FlowRouter.initialize();
			flowRouterInit.set(true);
		}
	});
});
