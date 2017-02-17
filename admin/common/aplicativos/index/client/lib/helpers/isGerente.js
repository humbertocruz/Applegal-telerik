Template.registerHelper("isGerenteApp", function(aplicativoId){
	var ger = Roles.userIsInRole(Meteor.userId(),'gerente',aplicativoId);
	return ger;
});
