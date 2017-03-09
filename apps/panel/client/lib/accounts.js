Accounts.onResetPasswordLink(function(token, done){
	FlowRouter.go('passwordResetRoute',{token:token});
	done();
});
Meteor.startup(function(){
	Accounts.onLogout(function(){
		FlowRouter.go('loginRoute');
		return true;
	});
	Accounts.onLogin(function(){
		//var groups = Roles.getGroupsForUser(Meteor.userId());
		//var user = Meteor.user();
		//if (groups.length == 1) {
		//	aplicativoVar.set(Aplicativo.findOne(groups[0]));
		//}
		Bert.alert('Login efeutado com sucesso!', 'success');
	});
});
