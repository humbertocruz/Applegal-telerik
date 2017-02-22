Meteor.publishComposite('appByDomain', function(protocol,domain) {
	return {
		find: function() {
      var app = Aplicativo.find({
        domain:protocol+'//'+domain
      });
      return app;
		},
		children:[
			{
				find:function(app){
					return appLogo.find({
						'metadata._Resumable': { $exists: false },
						'metadata.aplicativoId': app._id
					});
				}
			}
		]
	}
});
