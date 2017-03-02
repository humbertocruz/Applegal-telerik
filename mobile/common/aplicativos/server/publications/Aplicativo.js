Meteor.publishComposite('clientApp', function(appInfo) {
	if (!appInfo) {
		appInfo = {
			identifier: Meteor.settings.public.defaultAppInfoId,
			identfier: Meteor.settings.public.defaultAppInfoId
		};
	}
	return {
		find: function() {
			var app = Aplicativo.find({
				appInfoId:appInfo.identifier
			});
			aplicativoVar = app.fetch()[0];
			return app;
		},
		children: [
			{
				find: function(app) {
					return Arquivo.find(app.appLogo,{limit:1});
				},
			},
			{
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
