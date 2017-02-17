Meteor.publishComposite('clientApp', function(appInfo) {
	if (!appInfo) {
		appInfo = {
			identifier: Meteor.settings.public.defaultAppInfoId
		};
	}
	return {
		find: function() {
			var app = Aplicativo.find({
				appInfoId:appInfo.identifier
			},{
				limit:1
			});
			aplicativoVar = app.fetch()[0];
			return app;
		},
		children: [{
			find: function(app) {
				return AplicativoModulo.find({
					aplicativoId:app._id
				});
			},
			children: [
				{
					find: function(appMod){
						return Modulo.find({
							_id:appMod.moduloId
						});
					}
				}
			]
		}]
	}
});
