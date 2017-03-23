Meteor.publishComposite('appCursos', function(page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find: function() {
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
			return cursos;
		},
		children:[
			{
				find:function(curso){
					return Curso.find(curso.requisito);
				}
			}
		]
	}
});
Meteor.publishComposite("oneCurso", function(cursoId){
	return {
		find: function() {
			return Curso.find(cursoId);
		},
		children:[
			{
				find:function(curso){
					return Curso.find(curso.requisito);
				}
			}
		]
	}
});
