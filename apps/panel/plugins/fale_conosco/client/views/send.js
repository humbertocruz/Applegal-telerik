Controller('insertMensagemView',{
	rendered(){
		$('#mensagensForm .ui.dropdown').dropdown();
		$('#mensagensForm').form({
			onFailure(prompts,values){
				return false;
			},
			inline:true,
			fields:{
				subjectField:{
					indentifier:'subjectField',
					rules:[
						{
							type:'empty',
							prompt:'O assunto não deve estar vazio'
						}
					]
				},
				bodyField:{
					indentifier:'bodyField',
					rules:[
						{
							type:'empty',
							prompt:'Escolha ao menos um destinatário'
						}
					]
				},
				toField:{
					indentifier:'toField',
					rules:[
						{
							type:'empty',
							prompt:'A mensagem não deve estar vazia'
						}
					]
				}
			}
		});
	},
	helpers:{
		user:function(){
			return Meteor.user();
		},
		destinatarios:function(){
			return Meteor.users.find().fetch();
		}
	},
	events:{
		'submit #mensagensForm'(e,t){
			e.preventDefault();
			var fields = $(e.target).form('get values');
			Meteor.call("insertMensagem",fields, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('A mensagem foi enviada com sucesso!','success','growl-top-right');
					 FlowRouter.go('mensagensRoute')
				}
			});
		}
	}
});
