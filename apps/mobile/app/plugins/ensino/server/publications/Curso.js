Meteor.publishComposite('appCursos', function(aplicativoId) {
	return {
		find: function() {
			var cursos = Curso.find({
				aplicativoId:aplicativoId
			}, {
				sort: {
					order: 1
				}
			});
			return cursos;
		},
		children: [{
			find:function(curso){
				return Turma.find({
					cursoId:curso._id
				});
			}
		}]
	}
});
