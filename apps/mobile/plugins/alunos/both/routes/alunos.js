alunosRoutes = FlowRouter.group({
	name: 'alunosRoutes',
	prefix: '/alunos',
	triggersEnter: [
		function(obj, redirect) {
			if (!Meteor.userId()) {
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.', 'danger');
				redirect('loginRoute');
			}
		}
	]
});

alunosRoutes.route('/', {
	name: 'alunosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'topMenu',
			main: 'alunosView',
			technotronics: 'technotronicsMenu'
		});
	}
});
