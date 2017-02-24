FlowRouter.notFound = {
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'topMenu',
			main: 'notFoundView',
			technotronics: 'technotronicsMenu'
		});
	}
};

homeRoutes = FlowRouter.group({
	name: 'homeRoutes',
	triggersEnter: [
		function(obj, redirect) {
			if (!Meteor.userId()) {
				redirect('loginRoute');
			}
		}
	]
});

homeRoutes.route('/', {
	name: 'homeRoute',
	action: function() {
		BlazeLayout.render('adminLayout', {
			menu: 'topMenu',
			main: 'homeView',
			technotronics: 'technotronicsMenu'
		});
	}
});
