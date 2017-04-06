import { permRoutes } from '../../../permRoutes.js';

cadastroRoutes = permRoutes.group({
	name: 'cadastroRoutes',
	prefix: '/cadastro',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
			// Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
			// Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','cadastro'], obj.params.aplicativoId)) access = true;
			// Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

cadastroRoutes.route('/', {
	name: 'cadastroRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'cadastroView'
		});
	}
});
