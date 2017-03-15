Controller('formNoticiasView',{
	rendered:function(){
		$('#noticiasForm').form({
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
							prompt:'O título não deve estar vazio'
						}
					]
				},
				dateField:{
					indentifier:'dateField',
					rules:[
						{
							type:'empty',
							prompt:'Digite uma data válida.'
						}
					]
				},
				corField:{
					indentifier:'corField',
					rules:[
						{
							type:'empty',
							prompt:'Escolha uma cor.'
						}
					]
				}
			}
		});
	}
})
