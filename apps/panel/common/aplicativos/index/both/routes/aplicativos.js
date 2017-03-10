aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos',
	triggersEnter:[
		function(r){
			if (!r.params.aplicativoId) return true;
			appInfoVar.set(Aplicativo.findOne(r.params.aplicativoId));
			Meteor.call('setCloudinary', r.params.aplicativoId, function(err,result){
				if (result){
					$.cloudinary.init();
					$.cloudinary.config = {
						cloud_name:result
					};
				}
			});
		}
	]
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
