videosRoutes = FlowRouter.group({
	name: 'videosRoutes',
	prefix: '/videos',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
			// Assintante do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['subscriber'], aplicativoIdVar.get())) access = true;
			// Niguem mais tem acesso
			if (!access) {
				Bert.alert('Você não tem permissão de acesso a este Plugin!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

videosRoutes.route('/', {
	name: 'videosRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu:'topMenu',
			main:'videosView',
			technotronics:'technotronicsMenu'
		});
	}

});
