authRoutes = FlowRouter.group({
	name:'authRoutes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.isCordova){
				if (window == window.parent) {
					location.href = '/emulador.html';
				}
			}
		}
	]
});

authRoutes.route('/login',{
	name: 'loginRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'loginView',
			technotronics:'technotronicsMenu'
		});
	}
});

authRoutes.route('/suspenso',{
	name: 'suspensoRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'suspensoView',
			technotronics:'technotronicsMenu'
		});
	}
});

authRoutes.route('/registro',{
	name: 'registerRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'registerView',
			technotronics:'technotronicsMenu'
		});
	}
});

authRoutes.route('/senha',{
	name: 'passwordRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'passwordView',
			technotronics:'technotronicsMenu'
		});
	}
});

authRoutes.route('/recupera/:id',{
	name: 'recoveryRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'recoveryView',
			technotronics:'technotronicsMenu'
		});
	}
});

authRoutes.route('/logout',{
	name: 'logoutRoute',
	triggersEnter:[
		function(){
			Meteor.logout();
		}
	]
});
