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
					return appLogo.find({
						'metadata.aplicativoId':app._id
					});
				},
			},
			{
				find: function(app) {
					return appBg.find({
						'metadata.aplicativoId':app._id
					});
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
