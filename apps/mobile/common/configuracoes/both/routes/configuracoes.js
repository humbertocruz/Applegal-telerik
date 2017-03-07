managerRoutes = FlowRouter.group({
	name:'managerRoutes',
	prefix:'/configuracoes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
			if (!Roles.userIsInRole(Meteor.userId(),'manager',aplicativoIdVar.get())) {
				Bert.alert('Você ainda não tem permissão de acesso.','danger','fixed-bottom');
				redirect('homeRoute');
			}
		}
	]
});

managerRoutes.route('/',{
	name: 'managerRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'configuracoesView',
			technotronics:'technotronicsMenu'
		});
	}
});
