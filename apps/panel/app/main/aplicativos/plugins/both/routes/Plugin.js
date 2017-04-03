aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/app'
});

aplicativosRoutes.route('/:aplicativoId/plugins', {
	name: 'aplicativosPluginsRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosPluginsView'
		});
	}
});
