aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos'
});

aplicativosRoutes.route('/', {
	name: 'aplicativosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left:'leftMenuAdmin',
			main: 'aplicativosView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/edita', {
	name: 'aplicativosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftEmulatorApp',
			main: 'aplicativosFormView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/emulator', {
	name: 'aplicativosEmulatorRoute',
	action: function() {
		BlazeLayout.render('emulatorLayout', {
			menu: 'topMenu',
			main: 'emulatorView',
			technotronics: 'technotronicsMenu'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/emulator/login', {
	name: 'aplicativosEmulatorLoginRoute',
	action: function() {
		BlazeLayout.render('emulatorLayout', {
			menu: 'topMenu',
			main: 'emulatorLoginView',
			technotronics: 'technotronicsMenu'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/home', {
	name: 'aplicativosIndexRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'aplicativosHomeView'
		});
	}
});

aplicativosRoutes.route('/novo', {
	name: 'aplicativosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'aplicativosFormView'
		});
	}
});
