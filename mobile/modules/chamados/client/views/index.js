Controller('chamadosView',{
	created:function(){
		topTitleVar.set('Chamados de Suporte');
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
