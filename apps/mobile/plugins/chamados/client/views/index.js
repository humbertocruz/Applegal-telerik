Controller('chamadosView',{
	created:function(){
		topTitleVar.set('Chamados de Suporte');
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
		Tracker.autorun(function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			Meteor.subscribe("appChamados", app._id);
		});
	},
	rendered:function(){

	},
	helpers:{
		chamados:function(){
			var chamados = Chamado.find().fetch();
			return {
				data:chamados,
				count:chamados.length
			}
		}
	},
	events:{
		'click #abrirChamadoBtn':function(e,t){
			Meteor.call("startChamado", function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 FlowRouter.go('mensagensRoute',{id:result});
				}
			});
		}
	}
});
