Controller('modulosFormView',{
	rendered:function(){
		$('#modulosForm').form({
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
				}
			}
		});
	}
});
