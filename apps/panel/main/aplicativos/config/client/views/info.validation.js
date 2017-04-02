Controller('aplicativosUpdateInfoView',{
	rendered:function(){
		if (!appInfoVar.get()) return false;
		if (!appInfoVar.get().info) return false;
		if (!appInfoVar.get().info.name) return false;
		$('#removeForm').form({
			onFailure(p,v){
				return false;
			},
			inline:true,
			fields:{
				removeAppField:{
					indentifier:'removeAppField',
					rules:[
						{
							type:'isExactly['+appInfoVar.get().info.name+']',
							prompt:'Você precisa confirmar o nome do Aplicativo.'
						}
					]
				}
			}
		});
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
