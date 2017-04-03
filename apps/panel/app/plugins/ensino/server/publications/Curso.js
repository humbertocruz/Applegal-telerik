Meteor.publish('appCursos', function(page, aplicativoId, cursoId) {
	if(!securityCheck(this.userId,['manager','ensino'],aplicativoId)) return this.ready();
	var search = {};
	if (!page) page = 1;
	search.aplicativoId = aplicativoId;
	if (cursoId) search._id = cursoId;
	var pages = 15;
	Counts.publish(this, 'appCursos', Curso.find(search), {
		noReady: true
	});
	var cursos = Curso.find(search, {
		sort: {
			order: 1
		},
		limit:pages,
		skip:(page-1)/pages
	});
	if (cursos.count() == 0) return this.ready();
	var turmas = Turma.find({
		cursoId:{
			$in:_.pluck(cursos.fetch(),'_id')
		}
	});
	if (turmas.count()>0){
		var alunos = Aluno.find({
			turmaId:{
				$in:_.pluck(turmas.fetch(),'_id')
			}
		});
	} else alunos = [];
	if (alunos.count()>0){
		var users = Meteor.users.find({
			_id:{
				$in:_.pluck(alunos.fetch(),'userId')
			}
		});
	} else users = [];
	return [cursos,turmas,alunos,users];
});
