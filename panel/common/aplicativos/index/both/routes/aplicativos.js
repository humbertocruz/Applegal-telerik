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
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'aplicativosModulosView'
		});
	}
});

aplicativosRoutes.route('/novo', {
	name: 'aplicativosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/edita', {
	name: 'aplicativosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/home', {
	name: 'aplicativosHomeRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'aplicativosHomeView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId', {
	name: 'aplicativosIndexRoute',
	triggersEnter:[
		function(context,redirect){
			var superU = false;
			if (Roles.userIsInRole(Meteor.userId(),'admin')) superU = true;
			if (Roles.userIsInRole(Meteor.userId(),'manager',context.params.aplicativoId)) superU = true;
			if (superU) {
				redirect('aplicativosUpdateRoute', context.params);
			} else {
				redirect('aplicativosHomeRoute', context.params);
			}
		}
	]
});
