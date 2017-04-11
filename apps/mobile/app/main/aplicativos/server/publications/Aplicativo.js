Meteor.publishComposite('clientApp', function(appInfo) {
	if (!appInfo) return false;
	return {
		find: function() {
			var app = Aplicativo.find({
				'store.appInfoId':appInfo.identifier
			});
			aplicativoVar = app.fetch()[0];
			return app;
		},
		children: [
			{
			find: function(app) {
				return AplicativoPlugin.find({
					aplicativoId:app._id
				});
			},
			children: [
				{
					find: function(appPlug){
						return Plugin.find({
							_id:appPlug.pluginId
						});
					}
				}
			]
		}]
	}
});
