Meteor.startup(function(){
  securityCheck = function(userId, roles,aplicativoId) {
  	var authorized = false;
  	if (Roles.userIsInRole(userId, ['admin'])) authorized = true;
    if (Roles.userIsInRole(userId, roles, aplicativoId)) authorized = true;
  	return authorized;
  }
});
