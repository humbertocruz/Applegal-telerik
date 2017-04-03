Controller('aplicativosUpdateCloudinaryView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Conta Cloudinary',
			icon:'cloud'
		});
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));

		Tracker.autorun(function(){
			appCloudinary = Meteor.subscribe("AppCloudinary", FlowRouter.getParam('aplicativoId'));
		});
	},
	rendered:function(){
		AppCloudinary.find({
			aplicativoId:FlowRouter.getParam('aplicativoId')
		}).observe({
			added:function(appC){
				$('#cloudinaryForm').form('set values',appC);
			}
		});
	},
	helpers:{
	},
	events:{
		'submit #cloudinaryForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields.aplicativoId = FlowRouter.getParam('aplicativoId');
			Meteor.call("configCloudinary", fields, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Repositório de Arquivos configurado com sucesso','success');
				}
			});
		}
	}
});
