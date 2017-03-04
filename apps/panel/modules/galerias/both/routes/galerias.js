import { permRoutes } from '../../../permRoutes.js';

galeriasRoutes = permRoutes.group({
	name: 'galeriasRoutes',
	prefix: '/galerias',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','galerias'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

galeriasRoutes.route('/', {
	name: 'galeriasRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'galeriasView'
		});
	}

});

galeriasRoutes.route('/nova', {
	name: 'galeriasInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'formGaleriasView'
		});
	}
});

galeriasRoutes.route('/:id', {
	name: 'galeriasUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'formGaleriasView'
		});
	}
});
