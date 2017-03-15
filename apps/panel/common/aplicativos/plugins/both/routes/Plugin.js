aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos'
});

aplicativosRoutes.route('/:aplicativoId/plugins', {
	name: 'aplicativosPluginsRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'aplicativosPluginsView'
		});
	}
});
