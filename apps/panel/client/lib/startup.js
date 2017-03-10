// Configura o FlowRouter para esperar até o carregamento da aplicação
FlowRouter.wait();
Meteor.startup(function() {
	// Configura Blaze
	BlazeLayout.setRoot('body');
	// Configura Bart Alert
	Bert.defaults = {
		hideDelay: 3500,
		style: 'growl-top-right',
		type: 'default'
	};
	$.fn.form.settings.rules.cpf = function(value) {
		return TestaCPF(value);
	};
	Tracker.autorun(function(){
		var appId = FlowRouter.getParam('aplicativoId');
		if (!appId) return false;
		Meteor.subscribe("oneAplicativo", appId);
		Meteor.call("setCloudinary", appId, function(err,result){
			if (result){
				console.log(result);
				$.cloudinary.init();
				$.cloudinary.config = {
					cloud_name:result
				};
			}
		});
	});
});
