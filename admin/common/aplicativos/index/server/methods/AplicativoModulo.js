Meteor.methods({
	aplicatovosAddModulo:function(moduloId,aplicativoId){
		return AplicativoModulo.insert({
			aplicativoId:aplicativoId,
			moduloId:moduloId
		});
	}
});
