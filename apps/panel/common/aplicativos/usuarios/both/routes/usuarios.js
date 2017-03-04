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
	triggersEnter:[
		function(c,redirect){
			Meteor.call("checkApp", c.params.aplicativoId, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(!result){
					Bert.alert('Aplicativo inexistente ou não permitido.','danger');
					FlowRouter.go('homeRoute');
				}
			});
		}
	],
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'aplicativosUsuariosView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/usuarios/novo', {
	name: 'aplicativosUsuariosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'usuariosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/usuarios/:userId', {
	name: 'aplicativosUsuariosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'usuariosFormView'
		});
	}
});
