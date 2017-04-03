chamadosRoutes = FlowRouter.group({
	name:'chamadosRoutes',
	prefix:'/chamados',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

chamadosRoutes.route('/',{
	name: 'chamadosRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'chamadosView',
			technotronics:'technotronicsMenu'
		});
	}
});

chamadosRoutes.route('/:id',{
	name: 'mensagensRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'mensagensView',
			technotronics:'technotronicsMenu'
		});
	}
});
