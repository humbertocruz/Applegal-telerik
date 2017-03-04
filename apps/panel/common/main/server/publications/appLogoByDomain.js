Meteor.publishComposite('appByDomain', function(protocol,domain) {
	return {
		find: function() {
      var app = Aplicativo.find({
        domain:protocol+'//'+domain
      });
      return app;
		}
	}
});
