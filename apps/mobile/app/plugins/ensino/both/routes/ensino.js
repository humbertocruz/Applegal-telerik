ensinoRoutes = FlowRouter.group({
	name: 'ensinoRoutes',
	prefix: '/ensino',
	triggersEnter: [
		function(obj, redirect) {
			if (!Meteor.userId()) {
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.', 'danger');
				redirect('loginRoute');
			}
		}
	]
});

ensinoRoutes.route('/', {
	name: 'ensinoRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'topMenu',
			main: 'ensinoView',
			technotronics: 'technotronicsMenu'
		});
	}
});

ensinoRoutes.route('/:cursoId/turmas', {
	name: 'turmasRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'topMenu',
			main: 'turmasView',
			technotronics: 'technotronicsMenu'
		});
	}
});
