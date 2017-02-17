FlowRouter.notFound = {
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
				Bert.alert('Você precisa fazer o login!', 'warning');
				redirect('loginRoute');
			}
		}
	]
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
			main:'homeView'
		});
	}

});
