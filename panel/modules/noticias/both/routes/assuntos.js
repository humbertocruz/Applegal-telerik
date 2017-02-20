assuntosRoutes = FlowRouter.group({
	name: 'assuntosRoutes',
	prefix: '/noticias/assuntos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente', 'noticias'],aplicativoVar.get()._id)) {
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
