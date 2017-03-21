Controller('aplicativosUpdateLoginView',{
	created:function(){
		subMenuTitleVar.set({
			title:'Configuração do Aplicativo - Login',
			icon:'user'
		});
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
	},
	rendered:function(){
		var loadApp = function(aplicativo){
			$('.aplicativosForm').form('set values',aplicativo);
			$('.ui.dropdown').dropdown();
		};
		Tracker.autorun(function(){
			var aplicativo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (aplicativo) {
				loadApp(aplicativo.login);
			}
		});
	},
	helpers:{
	},
	events:{
		'click #configFacebookEvent':function(e,t){
			console.log('event');
			$('#configFacebookModal').modal({
				onApprove:function(){
					var fields = $('#configFacebookForm').form('get values');
					fields.social = 'facebook';
					Meteor.call("configAppFaceBook", fields, FlowRouter.getParam('aplicativoId'), function(error, result){
						if(error){
							console.log("error", error);
						}
						if(result){
							Bert.alert('Login pelo Facebook configurado.','success');
						}
					});
				}
			}).modal('show');
		},
		'submit .aplicativosForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			Meteor.call("aplicativosForm", {
				_id: FlowRouter.getParam('aplicativoId'),
				login:fields
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
