aniversariantesRoutes = FlowRouter.group({
	name:'aniversariantesRoutes',
	prefix:'/aniversariantes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
			if (!Roles.userIsInRole(Meteor.userId(),'subscriber',aplicativoIdVar.get())) {
				Bert.alert('Você ainda não tem permissão de acesso.','danger','fixed-bottom');
				redirect('homeRoute');
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
