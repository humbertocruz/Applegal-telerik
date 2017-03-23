Meteor.publishComposite('appTurmas', function(page, cursoId, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find: function() {
			var search = {};
			search.aplicativoId = aplicativoId;
			search.cursoId = cursoId;
			if (!page) page = 1;
			var pages = 10;
			Counts.publish(this, 'appTurmas', Turma.find(search), {
				noReady: true
			});
			var turmas = Turma.find(search, {
				sort: {
					year: -1
				},
				limit: pages,
				skip: (page - 1) * pages
			});
			return turmas;
		},
		children: [{
			find: function(turma){
				return Curso.find({
					_id:turma.cursoId,
					aplicativoId:aplicativoId
				});
			}
		},{
			find: function(turma) {
				return Aluno.find({
					turmaId:turma._id,
					aplicativoId:aplicativoId
				});
			}
		}]
	}
});

Meteor.publishComposite('appTurmas', function(turmaId, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find: function() {
			var turma = Turma.find(turmaId);
			return turmas;
		},
		children: [{
			find: function(turma){
				return Curso.find({
					_id:turma.cursoId,
					aplicativoId:aplicativoId
				});
			}
		},{
			find: function(turma) {
				return Aluno.find({
					turmaId:turma._id,
					aplicativoId:aplicativoId
				});
			}
		}]
	}
});
