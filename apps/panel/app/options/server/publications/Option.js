/*
** Publica dados das Opções da plataforma
**
** Apenas para usuários Admin
**
*/
Meteor.publish("allOptions", function(){
	// Se nao for "Admin" sair imediatamente
	if (!Roles.userIsInRole(this.userId,'admin')) return false;

	// Le dados, sempre vai haver apenas um registro
	var options = Option.find({},{
		limit:1
	});
	// Retorna dados
	return options;
});
