albunsRoutes = FlowRouter.group({
	name:'privateRoutes',
	prefix:'/albuns',
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

albunsRoutes.route('/',{
	name: 'albunsRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'albunsView',
			technotronics:'technotronicsMenu'
		});
	}
});

albunsRoutes.route('/:id',{
	name: 'fotosRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'fotosView',
			technotronics:'technotronicsMenu'
		});
	}
});
