profileRoutes = FlowRouter.group({
	name:'profileRoutes',
	prefix:'/profile',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','warning');
				redirect('loginRoute');
			}
		}
	]
});

profileRoutes.route('/',{
	name: 'profileRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left:'leftMenuProfile',
			main:'profileView'
		});
	}
});

profileRoutes.route('/user/:id',{
	name: 'profileUserRoute',
	triggersEnter:[
		function(obj, redirect) {
			if (!aplicativoVar.get()) {
				Bert.alert('Aplicativo não selecionado.','danger');
				FlowRouter.go('aplicativosRoute');
			}
		}
	],
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left:'leftMenuProfile',
			main:'profileView'
		});
	}
});
