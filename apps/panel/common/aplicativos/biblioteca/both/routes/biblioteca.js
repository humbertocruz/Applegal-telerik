aplicativosRoutes = FlowRouter.group({
	name: 'aplicativosRoutes',
	prefix: '/aplicativos'
});

aplicativosRoutes.route('/:aplicativoId/biblioteca', {
	name: 'aplicativosBibliotecaRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'aplicativosBibliotecaAllView'
		});
	}
});
