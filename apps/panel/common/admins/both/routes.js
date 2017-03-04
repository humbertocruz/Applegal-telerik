adminsRoutes = FlowRouter.group({
	name:'adminsRoutes',
	prefix:'/admins',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','warning');
				redirect('loginRoute');
			}
		}
	]
});

adminsRoutes.route('/',{
	name: 'adminsRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left:'leftMenuAdmin',
			main:'adminsView'
		});
	}
});

adminsRoutes.route('/novo',{
	name: 'adminsInsertRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left:'leftMenuAdmin',
			main:'adminsFormView'
		});
	}
});

adminsRoutes.route('/editar/:id',{
	name: 'adminsUpdateRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left:'leftMenuAdmin',
			main:'adminsFormView'
		});
	}
});
