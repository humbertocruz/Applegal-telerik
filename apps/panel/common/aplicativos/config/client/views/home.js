Controller('aplicativosUpdateHomeView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Home Page',
			icon:'home'
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
				loadApp(aplicativo.home);
			}
		});
	},
	helpers:{
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		semanticColors:function(){
			return _.sortBy(semanticColors,'title');
		}
	},
	events:{
		'submit .aplicativosForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Meteor.call("aplicativosForm", {
				_id:FlowRouter.getParam('aplicativoId'),
				home:fields
			}, function(error, result){
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
