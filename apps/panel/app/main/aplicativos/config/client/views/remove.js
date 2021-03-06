Controller('aplicativosUpdateRemoveView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Remover Aplicativo',
			icon:'trash'
		});
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo);
		};
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo);
			}
		});
	},
	helpers:{
	},
	events:{
		'submit .aplicativosForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			var id = FlowRouter.getParam('aplicativoId');
			if (id) fields._id = id;
			Meteor.call("aplicativosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('O aplicativo foi salvo com sucesso!','success');
				}
			});
		}
	}
});
