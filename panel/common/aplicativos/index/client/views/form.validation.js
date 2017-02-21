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
				appInfoIdField:{
					indentifier:'appInfoIdField',
					optional: true,
					rules:[
						{
							type:'empty',
							prompt:'O App ID deve ser informado.'
						}
					]
				},
				itemsPerPageField:{
					indentifier:'itemsPerPageField',
					rules:[
						{
							type:'minLength[2]',
							prompt:'Quantidade de registros por página deve ser maior dez ou mais.'
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
