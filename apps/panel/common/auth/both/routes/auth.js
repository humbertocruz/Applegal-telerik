FlowRouter.route('/login', {
	name: 'loginRoute',
	action: function() {
		BlazeLayout.render('loginLayout', {
			main: 'loginView'
		});
	}
});

FlowRouter.route('/recuperar-senha', {
	name: 'passwordRoute',
	action: function() {
		BlazeLayout.render('loginLayout', {
			main: 'passwordView'
		});
	}
});

FlowRouter.route('/nova-senha/:token', {
	name: 'passwordResetRoute',
	action: function() {
		BlazeLayout.render('loginLayout', {
			main: 'passwordResetView'
		});
	}
});

/*FlowRouter.route('/cadastre-se', {
	name: 'registerRoute',
	action: function() {
		BlazeLayout.render('loginLayout', {
			main: 'registerView'
		});
	}
});*/

FlowRouter.route('/logout', {
	name: 'logoutRoute',
	triggersEnter: [
		function() {
			Meteor.logout();
		}
	]
});
