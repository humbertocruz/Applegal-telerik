documentosRoutes = FlowRouter.group({
	name:'chamadosRoutes',
	prefix:'/documentos',
	triggersEnter:[
		function(obj,redirect){
			if (!Meteor.userId()){
				Bert.alert('Você precisa fazer o login para ter permissão de acesso.','danger','fixed-bottom');
				redirect('loginRoute');
			}
		}
	]
});

documentosRoutes.route('/',{
	name: 'documentosRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'documentosView',
			technotronics:'technotronicsMenu'
		});
	}
});

documentosRoutes.route('/:id',{
	name: 'documentosPDFRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'topMenu',
			main:'documentosPDFView',
			technotronics:'technotronicsMenu'
		});
	}
});
