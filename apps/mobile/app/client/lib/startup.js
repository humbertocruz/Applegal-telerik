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
	$.fn.form.settings.rules.cpf = function(value) {
		return TestaCPF(value);
	};
	FlowRouter.initialize();

	Tracker.autorun(function(){
		var app = Aplicativo.findOne();
		if (!app) return false;
		if (isAppVar.get()) return false;

		isAppVar.set(true);
		userLikesVar = new ReactiveVar([]);
		aplicativoIdVar.set(app._id);

	});

});
