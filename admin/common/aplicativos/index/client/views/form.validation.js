Controller('aplicativosFormView',{
	rendered:function(){
		$('#aplicativosForm').form({
			onFailure(prompts,values){
				return false;
			},
			inline:true,
			fields:{
				nameField:{
					indentifier:'nameField',
					rules:[
						{
							type:'empty',
							prompt:'O nome não pode estar vazio'
						}
					]
				},
				domainField:{
					indentifier:'domainField',
					optional: true,
					rules:[
						{
							type:'url',
							prompt:'O domínio não está correto'
						}
					]
				},
				headerField:{
					indentifier:'headerField',
					rules:[
						{
							type:'empty',
							prompt:'Deve-se escolher a cor do cabeçalho'
						}
					]
				},
				sidebarField:{
					indentifier:'sidebarField',
					rules:[
						{
							type:'empty',
							prompt:'Deve-se escolher a cor do menu lateral'
						}
					]
				},
				emailField:{
					indentifier:'emailField',
					rules:[
						{
							type:'empty',
							prompt:'O email não pode estar vazio'
						},
						{
							type:'email',
							prompt:'O email não é válido'
						}
					]
				}
			}
		});
	}
});
