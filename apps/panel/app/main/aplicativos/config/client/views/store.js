Controller('aplicativosUpdateStoreView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Store',
			icon:'android'
		});
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo.store);
			$('.ui.dropdown').dropdown();
		};
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo);
			}
		});
		tinymce.remove();
		tinymce.init({
			selector: 'textarea',
			//language: 'pt_BR',
			skin_url: '/packages/teamon_tinymce/skins/lightgray',
		});
	},
	helpers:{
	},
	events:{
		'submit .aplicativosForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Meteor.call("aplicativosForm", {
				_id:FlowRouter.getParam('aplicativoId'),
				store:fields
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
