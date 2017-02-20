filiaisRoutes = FlowRouter.group({
	name: 'filiaisRoutes',
	prefix: '/filiais',

});

filiaisRoutes.route('/', {
	name: 'filiaisRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'filiaisView'
		});
	}
});

filiaisRoutes.route('/nova', {
	name: 'filiaisInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'filiaisFormView'
		});
	}
});

filiaisRoutes.route('/:id/edita', {
	name: 'filiaisUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'filiaisFormView'
		});
	}
});
