aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/app',
	/*triggersEnter:[
		function(r){
			if (!r.params.aplicativoId) return true;
			appInfoVar.set(Aplicativo.findOne(r.params.aplicativoId));
			Meteor.call('setCloudinary', r.params.aplicativoId, function(err,result){
				$.cloudinary.config({
					cloud_name:result
				});
			});
		}
	]*/
});

aplicativosRoutes.route('/', {
	name: 'aplicativosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left:'leftMenu',
			main: 'aplicativosView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/info', {
	name: 'aplicativosUpdateInfoRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateInfoView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/biblioteca', {
	name: 'aplicativosUpdateCloudinaryRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateCloudinaryView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/aparencia', {
	name: 'aplicativosUpdateThemeRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateThemeView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/wallpaper', {
	name: 'aplicativosUpdateWallpaperRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateWallpaperView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/home', {
	name: 'aplicativosUpdateHomeRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateHomeView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/login', {
	name: 'aplicativosUpdateLoginRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateLoginView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/store', {
	name: 'aplicativosUpdateStoreRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateStoreView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/config/remove', {
	name: 'aplicativosUpdateRemoveRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosUpdateRemoveView'
		});
	}
});

aplicativosRoutes.route('/:aplicativoId/home', {
	name: 'aplicativosIndexRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosHomeView'
		});
	}
});

aplicativosRoutes.route('/novo', {
	name: 'aplicativosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosFormView'
		});
	}
});
