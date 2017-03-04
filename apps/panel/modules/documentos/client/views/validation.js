Controller('documentosFormView',{
	rendered:function(){
		$('#documentosForm').form({
			onFailure(prompts,values){
				return false;
			},
			inline:true,
			fields:{
				titleField:{
					indentifier:'titleField',
					rules:[
						{
							type:'empty',
							prompt:'O Título não deve estar vazio'
						}
					]
				},
				dateField:{
					indentifier:'dateField',
					rules:[
						{
							type:'empty',
							prompt:'A Data não deve estar vazio'
						}
					]
				},
				assuntoField:{
					indentifier:'assuntoField',
					rules:[
						{
							type:'empty',
							prompt:'O Assunto não deve estar vazio'
						}
					]
				}
			}
		});
	}
});
