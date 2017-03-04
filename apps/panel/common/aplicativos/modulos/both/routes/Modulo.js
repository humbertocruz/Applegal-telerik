aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos'
});

aplicativosRoutes.route('/:aplicativoId/modulos', {
	name: 'aplicativosModulosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'aplicativosModulosView'
		});
	}
});
