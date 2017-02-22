import { permRoutes } from '../../../permRoutes.js';

filiaisRoutes = permRoutes.group({
	name: 'filiaisRoutes',
	prefix: '/filiais',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','filiais'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

filiaisRoutes.route('/', {
	name: 'filiaisRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'filiaisView'
		});
	}
});

filiaisRoutes.route('/nova', {
	name: 'filiaisInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'filiaisFormView'
		});
	}
});

filiaisRoutes.route('/:id/edita', {
	name: 'filiaisUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'filiaisFormView'
		});
	}
});
