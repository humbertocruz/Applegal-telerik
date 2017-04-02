FlowRouter.notFound = {
	name: 'notFoundRoute',
	action: function() {
		BlazeLayout.render('loginLayout',{
			menu:'siteMenu',
			main:'notFoundView'
		});
	}
};
homeRoutes = FlowRouter.group({
	name: 'homeRoutes',
	triggersEnter: [
		function(obj, redirect) {
			if (!Meteor.userId()) {
				Bert.alert('Você precisa fazer o login!', 'warning','growl-top-right');
				redirect('loginRoute');
			}
		}
	]
});

homeRoutes.route('/nao-encontrado',{
	name: 'notFoundRouteHome',
	action: function() {
		BlazeLayout.render('loginLayout',{
			menu:'siteMenu',
			main:'notFoundView'
		});
	}
});

homeRoutes.route('/',{
	name: 'homeRoute',
	triggersEnter: [
		function(obj, redirect) {
			redirect('aplicativosRoute');
		}
	],
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left:'leftMenu',
			main:'homeView'
		});
	}
});
