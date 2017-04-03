import { permRoutes } from '../../../permRoutes.js';

tiposRoutes = permRoutes.group({
	name: 'tiposRoutes',
	prefix: '/documentos/tipos',
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

tiposRoutes.route('/', {
	name: 'documentosTiposRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'documentosTiposView'
		});
	}
});

tiposRoutes.route('/nova', {
	name: 'documentosTiposInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'documentosTiposFormView'
		});
	}
});

tiposRoutes.route('/:id', {
	name: 'documentosTiposUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'documentosTiposFormView'
		});
	}
});
