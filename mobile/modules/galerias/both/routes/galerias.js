galeriasRoutes = FlowRouter.group({
	name:'privateRoutes',
	prefix:'/galerias',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

galeriasRoutes.route('/',{
	name: 'galeriasRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'galeriasView',
			technotronics:'technotronicsMenu'
		});
	}
});

galeriasRoutes.route('/:id',{
	name: 'fotosRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'fotosView',
			technotronics:'technotronicsMenu'
		});
	}
});
