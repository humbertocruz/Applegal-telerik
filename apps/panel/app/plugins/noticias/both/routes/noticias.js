import { permRoutes } from '../../../permRoutes.js';

noticiasRoutes = permRoutes.group({
	name: 'noticiasRoutes',
	prefix: '/noticias',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','noticias'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

noticiasRoutes.route('/', {
	name: 'noticiasRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'noticiasView'
		});
	}
});

noticiasRoutes.route('/nova', {
	name: 'noticiasInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'formNoticiasView'
		});
	}
});

noticiasRoutes.route('/editar/:noticiaId', {
	name: 'noticiasUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'formNoticiasView'
		});
	}
});
