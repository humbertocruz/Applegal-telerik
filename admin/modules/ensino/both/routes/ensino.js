ensinoRoutes = FlowRouter.group({
	name: 'ensinoRoutes',
	prefix: '/ensino',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente','ensino'],aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});


ensinoRoutes.route('/', {
	name: 'ensinoRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'turmasView'
		});
	}
});

ensinoRoutes.route('/cursos', {
	name: 'ensinoCursosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'ensinoCursosView'
		});
	}
});

ensinoRoutes.route('/cursos/novo', {
	name: 'ensinoCursosInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'ensinoCursosFormView'
		});
	}
});

ensinoRoutes.route('/cursos/:id/edita', {
	name: 'ensinoCursosUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			main: 'ensinoCursosFormView'
		});
	}

});
