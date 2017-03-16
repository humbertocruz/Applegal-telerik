Template.registerHelper("isManagerApp", function(aplicativoId){
	var ger = Roles.userIsInRole(Meteor.userId(),'manager',aplicativoId);
	return ger;
});
