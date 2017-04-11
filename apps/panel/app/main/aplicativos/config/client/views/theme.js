Controller('aplicativosUpdateThemeView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Aparência',
			icon:'theme'
		});
		bibliotecaTypesVar.set([
			'wallpaper','logotype'
		]);
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var libType = bibliotecaTypesVar.get();
			appBiblioteca = Meteor.subscribe("appBiblioteca", page, aplicativoId, 12, libType);
		});
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo);
			$('.ui.dropdown').dropdown();
			$('#bgChanger .item').tab();
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
		},
		bgTypeImage:function(){
			var appInfo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (appInfo) {
				if (typeof(appInfo.wallpaper) == 'object') return true;
				else return false;
			}
		}
	},
	events:{
		'click .bgColorChangeEvent':function(e,t){
			e.preventDefault();
			var me = this;
			htmlConfirm('Aviso','Deseja alterar a cor de fundo do App ?',function(){
				Meteor.call("appChangeBgColor", {
					appId:FlowRouter.getParam('aplicativoId'),
					rgb:me.rgb
				}, function(error, result){
					if(error){
						console.log("error", error);
					}
					if(result){
						 Bert.alert('Cor de Fundo configurada com sucesso!','success');
					}
				});
			});
		},
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
