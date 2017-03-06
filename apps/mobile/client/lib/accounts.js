Meteor.startup(function(){
	Accounts.onLogout(function() {
		Bert.alert('Você foi desconectado.', 'success');
		FlowRouter.go('loginRoute');
		isLoadingVar.set(false);
	});
	Accounts.onLogin(function(user) {
		if (Meteor.isCordova) {
			window.plugins.sim.getSimInfo(
				function(sim) {
					console.log(sim);
				},
				function(error) {
					console.log(error);
				});
		}
	});
});
