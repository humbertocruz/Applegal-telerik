import { permRoutes } from '../../../permRoutes.js';

documentosRoutes = permRoutes.group({
	name: 'documentosRoutes',
	prefix: '/documentos',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','documentos'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

documentosRoutes.route('/', {
	name: 'documentosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'documentosView'
		});
	}

});

documentosRoutes.route('/nova', {
	name: 'documentosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'documentosFormView'
		});
	}
});

documentosRoutes.route('/:id/edita', {
	name: 'documentosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'documentosFormView'
		});
	}
});
