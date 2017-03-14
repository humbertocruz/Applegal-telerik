/*
** Rotas para a Biblioteca de Arquivos
** Apenas para Admins
*/
arquivosRoutes = FlowRouter.group({
	name: 'bibliotecaRoutes',
	prefix: '/biblioteca',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

arquivosRoutes.route('/', {
	name: 'bibliotecaRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'bibliotecaView'
		});
	}
});

arquivosRoutes.route('/novo', {
	name: 'bibliotecaInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'bibliotecaFormView'
		});
	}
});

arquivosRoutes.route('/:id', {
	name: 'bibliotecaUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'mainMenu',
			left: 'leftMenuAdmin',
			main: 'bibliotecaFormView'
		});
	}
});
