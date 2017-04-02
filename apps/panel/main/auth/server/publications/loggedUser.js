/*Meteor.publishComposite('', function(){
	return {
		find:function(){
			// Usuario logado - isso já é padrão do Meteor, mas adicionaremos publicacoes relacionadas
			return Meteor.users.find(this.userId);
		},
		children:[
			{
				// Aplicativos do usuário logado
				find:function(user){
					if (Roles.userIsInRole(this.userId,'admin')) return false;
					var groups = Roles.getGroupsForUser(user._id);
					Counts.publish(this, 'allAplicativos', Aplicativo.find({
						_id:{
							$in:groups
						}
					}), {
						noReady: true
					});
					return Aplicativo.find({
						_id:{
							$in:groups
						}
					});
				},
				children:[
					{
						find:function(app){
							return AplicativoPlugin.find({
								aplicativoId:app._id
							});
						}
					}
				]
			}
		]
	}
});
*/
