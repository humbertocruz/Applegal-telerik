aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos',
	triggersEnter:[
		function(){
			if (!Meteor.userId()) {
				Bert.alert('Faça o Login','danger');
				FlowRouter.go('loginRoute');
			}
		}
	]
});

aplicativosRoutes.route('/:aplicativoId/usuarios', {
	name: 'aplicativosUsuariosRoute',
	action: function() {
		BlazeLayout.render('appLayout', {
			menu: 'mainMenu',
			main: 'aplicativosUsuariosView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/usuarios/novo', {
	name: 'aplicativosUsuariosInsertRoute',
	action: function() {
		BlazeLayout.render('appLayout', {
			menu: 'mainMenu',
			main: 'usuariosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/usuarios/:userId', {
	name: 'aplicativosUsuariosUpdateRoute',
	action: function() {
		BlazeLayout.render('appLayout', {
			menu: 'mainMenu',
			main: 'usuariosFormView'
		});
	}
});
