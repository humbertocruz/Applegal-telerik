Controller('aplicativosUpdateWallpaperView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Wallpaper',
			icon:'theme'
		});
		bibliotecaTypesVar.set([
			'wallpaper'
		]);
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			appBiblioteca = Meteor.subscribe("pubBiblioteca", page, 12, ['wallpaper']);
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo);
		};
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo.theme);
			}
		});
	},
	helpers:{
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
				theme:fields
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
