enquetesRoutes = FlowRouter.group({
	name:'escalasRoutes',
	prefix: '/enquetes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

enquetesRoutes.route('/',{
	name: 'enquetesRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'enquetesView',
			technotronics:'technotronicsMenu'
		});
	}
});

enquetesRoutes.route('/:id',{
	name: 'enquetesResponderRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'enquetesResponderView',
			technotronics:'technotronicsMenu'
		});
	}
});
