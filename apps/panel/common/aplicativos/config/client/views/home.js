Controller('aplicativosUpdateHomeView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Home Page',
			icon:'home'
		});
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
	},
	rendered:function(){
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo);
			}
		});
	},
	helpers:{
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		}
	},
	events:{
		'submit .aplicativosForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			var id = FlowRouter.getParam('aplicativoId');
			fields.appBg = bgSelectedVar.get();
			fields.appLogo = logoSelectedVar.get();
			if (id) fields._id = id;
			Meteor.call("aplicativosForm",fields, function(error, result){
				if(error){
					console.log("error", error);
					//isLoadingVar.set(false);
				}
				if(result){
					//isLoadingVar.set(false);
					Bert.alert('O aplicativo foi salvo com sucesso!','success');
				}
			});
		}
	}
});
