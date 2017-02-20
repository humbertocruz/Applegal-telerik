Meteor.publishComposite('', function(){
	return {
		find:function(){
			// Usuario logado - isso já é padrão do Meteor, mas adicionaremos publicacoes relacionadas
			return Meteor.users.find(this.userId);
		},
		children:[
			{
				// Aplicativos do usuário logado
				find:function(user){
					var groups = Roles.getGroupsForUser(user._id);
					return Aplicativo.find({
						_id:{
							$in:groups
						}
					});
				},
				children:[
					{
						find:function(app){
							return AplicativoModulo.find({
								aplicativoId:app._id
							});
						}
					}
				]
			}
		]
	}
});
