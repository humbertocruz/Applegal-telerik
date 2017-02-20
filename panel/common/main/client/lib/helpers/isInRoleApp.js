Template.registerHelper("isInRoleApp", function(appId,permissao){
	var roles = Roles.getRolesForUser(Meteor.userId(), appId);
	if (_.contains(roles,'manager')) return true;
	if (_.contains(roles,permissao)) return true;
	return false;
});
