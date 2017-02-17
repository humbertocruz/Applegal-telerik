aniversariantesRoutes = FlowRouter.group({
	name:'aniversariantesRoutes',
	prefix:'/aniversariantes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

aniversariantesRoutes.route('/',{
	name: 'aniversariantesRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'aniversariantesView',
			technotronics:'technotronicsMenu'
		});
	}
});
