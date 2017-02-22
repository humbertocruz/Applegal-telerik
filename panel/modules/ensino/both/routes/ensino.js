import { permRoutes } from '../../../permRoutes.js';

ensinoRoutes = permRoutes.group({
	name: 'ensinoRoutes',
	prefix: '/ensino',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','ensino'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});


ensinoRoutes.route('/', {
	name: 'ensinoRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'turmasView'
		});
	}
});

ensinoRoutes.route('/cursos', {
	name: 'ensinoCursosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'ensinoCursosView'
		});
	}
});

ensinoRoutes.route('/cursos/novo', {
	name: 'ensinoCursosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'ensinoCursosFormView'
		});
	}
});

ensinoRoutes.route('/cursos/:id/edita', {
	name: 'ensinoCursosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'ensinoCursosFormView'
		});
	}

});
