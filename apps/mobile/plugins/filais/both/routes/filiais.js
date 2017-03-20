filiaisRoutes = FlowRouter.group({
	name: 'filiaisRoutes',
	prefix: '/filiais',
	triggersEnter: [
		function(obj, redirect) {
			if (!Meteor.userId()) {
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.', 'danger', 'fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

filiaisRoutes.route('/', {
	name: 'filiaisRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'topMenu',
			main: 'filiaisView',
			technotronics: 'technotronicsMenu'
		});
	}
});
