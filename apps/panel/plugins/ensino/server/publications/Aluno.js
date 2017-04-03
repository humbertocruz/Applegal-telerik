Meteor.publish('appAlunos', function(page, turmaId, aplicativoId, alunoId) {

	if (!securityCheck(this.userId,['manager','ensino'],aplicativoId)) return this.ready();

	if (alunoId) {
		var search = {
			_id: alunoId
		};
	} else {
		var search = {
			aplicativoId: aplicativoId,
			turmaId:turmaId
		}
	}
	if (!page) page = 1;
	var pages = 10;
	Counts.publish(this, 'appAlunos', Aluno.find(search), {
		noReady: true
	});
	var alunos = Aluno.find(search, {
		sort: {
			date: -1
		},
		limit: pages,
		skip: (page - 1) * pages
	});
	if (alunos.count()==0) return this.ready();
	var turmas = Turma.find(alunos.fetch()[0].turmaId);
	var cursos = Curso.find(turmas.fetch()[0].cursoId);
	var users = Meteor.users.find({
		_id:{
			$in:_pluck(alunos,'userId')
		}
	});

	return [alunos,turmas,cursos,users];
});
