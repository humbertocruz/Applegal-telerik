pushConfigure = function(appId) {
	var config = Aplicativo.findOne(appId);
	Push.Configure({
	  gcm: {
	    apiKey: config.apiKey,
	    projectNumber: config.projectNumber
	  },
		production: true
	});

};
