Controller('aplicativosUpdateThemeView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Aparência',
			icon:'theme'
		});
		bibliotecaTypesVar.set([
			'wallpaper'
		]);
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			appBiblioteca = Meteor.subscribe("appBiblioteca", page, aplicativoId, 12, 'wallpaper');
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo);
		};
	},
	helpers:{
		ready:function(){
			return appArquivos.ready();
		},
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
