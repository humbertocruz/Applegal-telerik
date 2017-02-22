import { permRoutes } from '../../../permRoutes.js';

enquetesRoutes = permRoutes.group({
	name: 'enquetesRoutes',
	prefix: '/enquetes',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','enquetes'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
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
