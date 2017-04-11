Meteor.publish('appAssuntos', function(page, aplicativoId) {
	if (!securityCheck(this.userId,['manager','noticias'],aplicativoId)) return this.ready();
	if (page == null) page = 1;

	var search = {};
	search.aplicativoId = aplicativoId;
	Counts.publish(this, 'appAssuntos', Assunto.find(
		search
	), {
		noReady: true
	});
	var assuntos = Assunto.find(search, {
		sort: {
			name: 1
		}
	});
	return [assuntos];

});
