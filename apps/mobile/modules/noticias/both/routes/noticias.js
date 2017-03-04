noticiasRoutes = FlowRouter.group({
	name:'privateRoutes',
	prefix:'/noticias',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

noticiasRoutes.route('/',{
	name: 'noticiasRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'noticiasView',
			technotronics:'technotronicsMenu'
		});
	}
});

noticiasRoutes.route('/:id',{
	name: 'noticiasDetalheRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'noticiasDetalheView',
			technotronics:'technotronicsMenu'
		});
	}
});
