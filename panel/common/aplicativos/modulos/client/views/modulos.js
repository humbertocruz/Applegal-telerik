Controller('aplicativosModulosView',{
	created:function(){
		updateModuloVar = new ReactiveVar(false);
		Tracker.autorun(function(){
			var appId = FlowRouter.getParam('aplicativoId');
			if (!appId) return false;
			Meteor.subscribe("oneAplicativo", appId);
		});
	},
	helpers:{
		updateModulo:function(){
			return updateModuloVar.get();
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
			var modAtivos = _.pluck(Aplicativo.findOne(FlowRouter.getParam('aplicativoId')).appModulos(),'moduloId');
			var modulos = Modulo.find({_id:{$nin:modAtivos}}).fetch();
			return modulos;
		},
		modulos_ativos:function(){
			return AplicativoModulo.find({
				aplicativoId:FlowRouter.getParam('aplicativoId')
			},{
				sort:{
					order:1
				}
			}).fetch();
		}
	},
	events:{
		'submit #appModuloForm':function(e,t){
			var me = this;
			e.preventDefault();
			var fields = $('#appModuloForm').form('get values');
			fields._id = updateModuloVar.get();
			fields.aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.call("aplicativosUpdateModulo", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Módulo Adicionado com sucesso!','success');
				}
			});
		},
		'click .updateModulo':function(e,t){
			var me = this;
			e.preventDefault();
			updateModuloVar.set(me._id);
			var fields = AplicativoModulo.findOne(me._id);
			$('#appModuloForm').form('set values',fields);
		},
		'click .addModulo':function(e,t){
			var me = this;
			e.preventDefault();
			htmlConfirm('Adicionar Módulo','Você tem Certeza?',function(){
				var fields = {
					aplicativoId:FlowRouter.getParam('aplicativoId'),
					moduloId: me._id
				}
				Meteor.call("aplicativosAddModulo", fields, function(error, result){
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
