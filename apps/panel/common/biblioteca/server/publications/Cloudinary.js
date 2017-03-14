/*
** Faz o "Publish" dos dados da conta Cloudinary de um determinado App
** Usado apenas na tela de configuração Cloudinary do App
*/
Meteor.publish("AppCloudinary", function(aplicativoId){
	// Verifica se tem permissão
	var allowed = false;
	if (Roles.userIsInRole(this.userId, 'admin')) allowed = true;
	if (Roles.userIsInRole(this.userId, 'manager', aplicativoId)) allowed = true;
	if (Roles.userIsInRole(this.userId, 'builder', aplicativoId)) allowed = true;
	if (!allowed) return false;

	// Sempre retorna a publicação para o registro com dados Cloudinary do Aplicativo especificado
	return AppCloudinary.find({
		aplicativoId:aplicativoId
	});
});
