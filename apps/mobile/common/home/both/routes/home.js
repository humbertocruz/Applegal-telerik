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
	triggersEnter:[
		function(obj,redirect){
			if (Roles.userIsInRole(Meteor.userId(),'guest',Aplicativo.findOne()._id)){
				Bert.alert('Seu acesso ainda não foi confirmado.','warning');
				redirect('suspensoRoute');
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
