escalasRoutes = FlowRouter.group({
	name:'escalasRoutes',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});
escalasRoutes.route('/escalas',{
	name: 'escalasRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'escalasView',
			technotronics:'technotronicsMenu'
		});
	}

});

escalasRoutes.route('/escalas/:id',{
	name: 'escalasPDFViewRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'escalasPDFView',
			technotronics:'technotronicsMenu'
		});
	}

});
