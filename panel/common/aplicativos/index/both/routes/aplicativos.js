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

aplicativosRoutes.route('/', {
	name: 'aplicativosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'aplicativosView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/modulos', {
	name: 'aplicativosModulosRoute',
	action: function() {
		BlazeLayout.render('appLayout', {
			menu: 'mainMenu',
			main: 'aplicativosModulosView'
		});
	}
});

aplicativosRoutes.route('/novo', {
	name: 'aplicativosInsertRoute',
	action: function() {
		BlazeLayout.render('appLayout', {
			menu: 'mainMenu',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/edita', {
	name: 'aplicativosUpdateRoute',
	action: function() {
		BlazeLayout.render('appLayout', {
			menu: 'mainMenu',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId', {
	name: 'aplicativosIndexRoute',
	triggersEnter:[
		function(context,redirect){
			redirect('aplicativosUsuariosRoute', context.params);
		}
	]
});
