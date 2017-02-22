import { permRoutes } from '../../permRoutes.js';

chamadosRoutes = permRoutes.group({
	name: 'chamadosRoutes',
	prefix: '/chamados',
	triggersEnter: [
		function(obj, redirect) {
			var access = false;
      // Admin tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['admin'])) access = true;
      // Manager e Perm Exclusiva do App tem acesso
			if (Roles.userIsInRole(Meteor.userId(), ['manager','chamados'], obj.params.aplicativoId)) access = true;
      // Niguem mais tem acesso
			if (!access) {
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
			left: 'leftMenuApp',
			main:'chamadosView'
		});
	}

});

chamadosRoutes.route('/:id',{
	name: 'mensagensRoute',
	action: function() {
		BlazeLayout.render('adminLayout',{
			menu:'mainMenu',
			left: 'leftMenuApp',
			main:'talkView'
		});
	}

});

chamadosRoutes.route('/close/:id',{
	name: 'chamadosCloseRoute',
	triggersEnter:[
		function(){
			Meteor.call("chamadosClose", FlowRouter.getParam('id'), FlowRouter.getParam('aplicativoId'), function(error, result){
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
