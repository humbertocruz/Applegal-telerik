Meteor.publishComposite('allCursos', function(search, page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find: function() {
			if (!search) search = {};
			if (!page) page = 1;
			search.aplicativoId = aplicativoId;
			var pages = 10;
			Counts.publish(this, 'allCursos', Curso.find(search), {
				noReady: true
			});
			var cursos = Curso.find({}, {
				sort: {
					name: 1
				},
				limit:pages,
				skip:(page-1)*pages
			});
			return cursos;
		},
		children: [{
			find: function(curso) {
				return Meteor.users.find({
					_id:curso.userId,
					aplicativoId:aplicativoId
				});
			}
		}]
	}
});
