Meteor.publishComposite('appByDomain', function(protocol,domain) {
	return {
		find: function() {
      var app = Aplicativo.find({
        domain:protocol+'//'+domain
      },{
				fields:[
					'info',
					'appLogo',
					'appBg'
				]
			});
			return app;
		}
	}
});
