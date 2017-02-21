assuntosRoutes = FlowRouter.group({
	name: 'assuntosRoutes',
	prefix: '/:aplicativoId/noticias/assuntos',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
			if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
			if (!Roles.userIsInRole(Meteor.userId(), ['manager'], obj.params.aplicativoId)) access = true;
			if (!Roles.userIsInRole(Meteor.userId(), 'noticias', obj.params.aplicativoId)) access = true;

			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

assuntosRoutes.route('/', {
	name: 'noticiasAssuntosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'noticiasAssuntosView'
		});
	}
});

assuntosRoutes.route('/nova', {
	name: 'noticiasAssuntosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'noticiasAssuntosFormView'
		});
	}
});

assuntosRoutes.route('/:id', {
	name: 'noticiasAssuntosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'noticiasAssuntosFormView'
		});
	}
});
