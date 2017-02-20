enquetesRoutes = FlowRouter.group({
	name: 'enquetesRoutes',
	prefix: '/enquetes',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'enquetes'], aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

enquetesRoutes.route('/', {
	name: 'enquetesRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'enquetesView'
		});
	}

});

enquetesRoutes.route('/nova', {
	name: 'enquetesInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'enquetesFormView'
		});
	}
});

enquetesRoutes.route('/:id', {
	name: 'enquetesUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'enquetesFormView'
		});
	}
});

enquetesRoutes.route('/qa/:id', {
	name: 'enquetesQARoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'enquetesQAView'
		});
	}
});

enquetesRoutes.route('/resultados/:id', {
	name: 'enquetesResultRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'enquetesResultView'
		});
	}
});
