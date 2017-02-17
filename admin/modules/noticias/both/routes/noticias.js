noticiasRoutes = FlowRouter.group({
	name: 'noticiasRoutes',
	prefix: '/noticias',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'noticias'], aplicativoVar.get()._id)) {
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
