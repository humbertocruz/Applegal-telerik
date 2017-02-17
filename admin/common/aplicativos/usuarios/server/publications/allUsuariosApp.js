Meteor.publishComposite('allUsuariosApp', function(search,page,aplicativoId){
	// apenas com o id do aplicativo
	if (typeof(aplicativoId) == 'undefined') return false;
	// apenas usuários logados
	if (!this.userId) return false;

	// se não tiver parametros de busca
	if (!search) search = {};
	// se não tiver indicação de paginção
	if (!page) page = 1;
	return {
		find:function(){
			// 10 por página
			var qtd = 10;
			var roles = Roles.getAllRoles().fetch();
			Counts.publish(this,'allUsuariosApp', Roles.getUsersInRole(_.pluck(roles,'name'),aplicativoId));
			var users = Roles.getUsersInRole(_.pluck(roles,'name'),aplicativoId,{
				skip:(page-1)*qtd,
				limit: qtd
			});
			return users;
		},
		children:[
		]
	}
});
