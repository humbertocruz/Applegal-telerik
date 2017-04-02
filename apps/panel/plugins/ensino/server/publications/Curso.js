Meteor.publish('appCursos', function(page, aplicativoId) {
	if(!securityCheck(this.userId,['manager','ensino'],aplicativoId)) return this.ready();

	var search = {};
	if (!page) page = 1;
	search.aplicativoId = aplicativoId;
	var pages = 10;
	Counts.publish(this, 'appCursos', Curso.find(search), {
		noReady: true
	});
	var cursos = Curso.find({}, {
		sort: {
			name: 1
		},
		limit:pages,
		skip:(page-1)*pages
	});
	return [cursos];
});
