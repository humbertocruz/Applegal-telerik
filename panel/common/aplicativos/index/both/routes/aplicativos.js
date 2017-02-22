aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos'
});

aplicativosRoutes.route('/', {
	name: 'aplicativosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftRailMain',
			main: 'aplicativosView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/modulos', {
	name: 'aplicativosModulosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			leftRail: 'leftRailMain',
			main: 'aplicativosModulosView'
		});
	}
});

aplicativosRoutes.route('/novo', {
	name: 'aplicativosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			leftRail: 'leftRailMain',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/edita', {
	name: 'aplicativosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			leftRail: 'leftRailMain',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/home', {
	name: 'aplicativosHomeRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			leftRail: 'leftRailMain',
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
