Meteor.publish('appTurmas', function(page, cursoId, aplicativoId) {

	if (!securityCheck(this.userId,['manager','ensino'],aplicativoId)) return this.ready();

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
	var cursos = Curso.find({
		_id:{
			$in:_.pluck(turmas,'cursoId')
		}
	});
	var alunos = Aluno.find({
		turmaId:{
			$in:_.pluck(turmas,'_id')
		}
	});
	return [turmas,cursos,alunos];
});
