authRoutes = FlowRouter.group({
	name:'authRoutes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

FlowRouter.route('/login',{
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

FlowRouter.route('/registro',{
	name: 'registerRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'registerView',
			technotronics:'technotronicsMenu'
		});
	}
});

FlowRouter.route('/senha',{
	name: 'passwordRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'passwordView',
			technotronics:'technotronicsMenu'
		});
	}
});

FlowRouter.route('/recupera/:id',{
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
