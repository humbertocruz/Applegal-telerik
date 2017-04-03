import { permRoutes } from '../../../permRoutes.js';

albunsRoutes = permRoutes.group({
	name: 'albunsRoutes',
	prefix: '/albuns',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','albuns'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este Plugin!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

albunsRoutes.route('/', {
	name: 'albunsRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'albunsView'
		});
	}

});

albunsRoutes.route('/nova', {
	name: 'albunsInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'formAlbunsView'
		});
	}
});

albunsRoutes.route('/editar/:albumId', {
	name: 'albunsUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'formAlbunsView'
		});
	}
});
