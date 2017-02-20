chamadosRoutes = FlowRouter.group({
	name: 'chamadosRoutes',
	prefix: '/chamados',
	triggersEnter: [
		function(obj, redirect) {
			if (!Roles.userIsInRole(Meteor.userId(), ['gerente','chamados'],aplicativoVar.get()._id)) {
				Bert.alert('Você não tem permissão de acesso a este módulo!', 'danger');
				redirect('homeRoute');
			}
		}
	]
});

chamadosRoutes.route('/',{
	name: 'chamadosRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			main:'chamadosView'
		});
	}

});

chamadosRoutes.route('/:id',{
	name: 'mensagensRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			main:'talkView'
		});
	}

});

chamadosRoutes.route('/close/:id',{
	name: 'chamadosCloseRoute',
	triggersEnter:[
		function(){
			Meteor.call("chamadosClose", FlowRouter.getParam('id'), aplicativoVar.get()._id, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Chamado encerrado com sucesso.','success');
					FlowRouter.go('chamadosRoute');
				}
			});
		}
	]

});
