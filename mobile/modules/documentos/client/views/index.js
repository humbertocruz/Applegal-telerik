Controller('documentosView',{
	created:function(){
		topTitleVar.set('Documentos');
	},
	rendered:function(){

	},
	helpers:{
		documentos:function(){
			var documentos = Documento.find({},{sort:{date:-1}}).fetch();
			return {
				data:documentos,
				count:documentos.length
			}
		}
	},
	events:{
		'click #documentosEmailSendEvent':function(e,t){
			var me = this;
			htmlConfirm('Receber por Email','Você deseja receber este arquivo no seu Email ?',function(){
				Meteor.call("emailsSendDocument", me._id, function(error, result){ 
					if(error){
						console.log("error", error);
					}
					if(result){
						Bert.alert('Você receberá este arquivo por email em breve.','success');
					}
				});
			});
		}
	}
});
