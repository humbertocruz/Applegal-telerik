noticiasRoutes = FlowRouter.group({
	name: 'noticiasRoutes',
	prefix: '/:aplicativoId/noticias',
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

noticiasRoutes.route('/', {
	name: 'noticiasRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'noticiasView'
		});
	}
});

noticiasRoutes.route('/nova', {
	name: 'noticiasInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'formNoticiasView'
		});
	}
});

noticiasRoutes.route('/:id', {
	name: 'noticiasUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'formNoticiasView'
		});
	}
});
