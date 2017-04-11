cadastroRoutes = FlowRouter.group({
	name: 'cadastroRoutes',
	prefix: '/cadastro',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
			// Assinante do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['subscriber'], aplicativoIdVar.get())) access = true;
			// Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

cadastroRoutes.route('/', {
	name: 'cadastroRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu:'topMenu',
			main:'cadastroView',
			technotronics:'technotronicsMenu'
		});
	}

});
