import { permRoutes } from '../../../permRoutes.js';

servicosRoutes = permRoutes.group({
	name: 'servicosRoutes',
	prefix: '/escalas/servicos',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','escalas'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

servicosRoutes.route('/', {
	name: 'escalasServicosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasServicosView'
		});
	}
});

servicosRoutes.route('/nova', {
	name: 'escalasServicosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasServicosFormView'
		});
	}
});

servicosRoutes.route('/:id', {
	name: 'escalasServicosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'escalasServicosFormView'
		});
	}
});
