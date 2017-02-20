Meteor.publish("appModulos", function(aplicativoId){
	if (!this.userId) return false;
	var appsModulos = AplicativoModulo.find({
		aplicativoId: aplicativoId
	});
	return appsModulos;
});
