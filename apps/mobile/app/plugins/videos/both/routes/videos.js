videosRoutes = FlowRouter.group({
	name: 'videosRoutes',
	prefix: '/videos',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
			// Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
			// Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','videos'], obj.params.aplicativoId)) access = true;
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
			menu: 'mainMenu',
			left: 'leftMenu',
			main: 'videosView'
		});
	}

});
