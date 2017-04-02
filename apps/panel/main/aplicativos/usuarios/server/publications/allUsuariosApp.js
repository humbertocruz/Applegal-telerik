Meteor.publish("oneUsuarioApp", function(userId){
	if (!securityCheck(this.userId,['manager'],aplicativoId)) return this.ready();
	return Meteor.users.find(userId);
});
Meteor.publish('allUsuariosApp', function(search,page,aplicativoId){
	if (!securityCheck(this.userId,['manager'],aplicativoId)) return this.ready();

	// se não tiver parametros de busca
	if (!search) search = {};
	// se não tiver indicação de paginção
	if (!page) page = 1;

	var qtd = 10;
	var roles = Roles.getAllRoles().fetch();
	Counts.publish(this,'allUsuariosApp', Roles.getUsersInRole(_.pluck(roles,'name'),aplicativoId));
	var users = Roles.getUsersInRole(_.pluck(roles,'name'),aplicativoId,{
		skip:(page-1)*qtd,
		limit: qtd
	});
	return [users];
});
