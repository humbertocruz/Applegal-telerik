Meteor.publishComposite('allAplicativosModulos', function(search, page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	if (!this.userId) return false;

	return {
		find: function() {
			if (!search) search = {};
			search.aplicativoId = aplicativoId;
			var appModulos = AplicativoModulo.find(search);
			return appModulos;
		},
		children:[
			{
				find: function(appMod){
					return Aplicativo.find(appMod.aplicativoId);
				}
			},
			{
				find: function(appMod){
					return Modulo.find(appMod.moduloId);
				}
			}
		]
	}
});
