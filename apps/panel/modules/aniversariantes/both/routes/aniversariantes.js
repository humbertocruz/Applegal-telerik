import { permRoutes } from '../../../permRoutes.js';

aniversariantesRoutes = permRoutes.group({
	name: 'aniversariantesRoutes',
	prefix: '/aniversariantes',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','aniversariantes'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

aniversariantesRoutes.route('/', {
	name: 'aniversariantesRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuApp',
			main: 'aniversariantesView'
		});
	}

});
