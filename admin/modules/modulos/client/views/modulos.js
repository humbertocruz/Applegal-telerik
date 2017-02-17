Controller('aplicativosModulosView',{
	created:function(){
		Tracker.autorun(function(){
			Meteor.subscribe("allAplicativosModulos", {}, FlowRouter.getQueryParam('page'), aplicativoVar.get()._id);
		});
	},
	helpers:{
		ready:function(){
			return true;
		},
		header:function(){
			return {
				title:'Módulos do Aplicativos',
				icon:'android'
			}
		},
		newLink:function(){
			return false;
		},
		extraLinks:function(){
			return [
				{
					title:'Retornar',
					route:'aplicativosRoute',
					icon:'close'
				}
			]
		},
		modulos_disponiveis:function(){
			var modAtivos = _.pluck(AplicativoModulo.find().fetch(),'moduloId');
			var modulos = Modulo.find({_id:{$nin:modAtivos}}).fetch();
			return modulos;
		},
		modulos_ativos:function(){
			return AplicativoModulo.find().fetch();
		}
	},
	events:{
		'click .addModulo':function(e,t){
			var me = this;
			e.preventDefault();
			htmlConfirm('Adicionar Módulo','Você tem Certeza?',function(){
				Meteor.call("aplicatovosAddModulo", me._id, aplicativoVar.get()._id, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Módulo Adicionado com sucesso!','success');
					}
				});
			});
		}
	}
});
