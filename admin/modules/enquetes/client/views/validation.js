Controller('enquetesFormView',{
	rendered:function(){
		$('#enquetesFormView').form({
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
	}
});
