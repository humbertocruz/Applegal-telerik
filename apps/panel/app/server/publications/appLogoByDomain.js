Meteor.publish('appByDomain', function(protocol,domain){
	// Publica apenas o nome do App e o Logotipo
	var app = Aplicativo.find({
		'info.domain':protocol+'//'+domain
	}, {
		fields:{
			'info.name':1,
			'info.domain':1,
			logotype:1
		}
	});
	return app;
});
