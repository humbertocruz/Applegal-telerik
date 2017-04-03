Meteor.publish('appTurmas', function(page, cursoId, aplicativoId, turmaId) {

	if (!securityCheck(this.userId,['manager','ensino'],aplicativoId)) return this.ready();

	if (turmaId) {
		var search = {
			_id: turmaId
		};
	} else {
		var search = {
			aplicativoId: aplicativoId,
			cursoId:cursoId
		}
	}
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
	if (turmas.count()==0) return this.ready();
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
