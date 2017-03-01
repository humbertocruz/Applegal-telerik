// Configura o FlowRouter para esperar até o carregamento da aplicação
FlowRouter.wait();

Meteor.startup(function() {
	//FlowRouter.wait();
	// Configura o BlazeLayout para nao usar um container __blaze-root
	BlazeLayout.setRoot('body');
	Bert.defaults = {
		hideDelay: 3500,
		style: 'fixed-bottom',
		type: 'default'
	};
	Tracker.autorun(function(){
		var app = Aplicativo.findOne();
		if (isAppVar.get()) return false;
		if (app) {
			isAppVar.set(true);
			FlowRouter.initialize();
		}
	});

});
