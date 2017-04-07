Meteor.publish('appAluno', function() {
	var me = this;
	var aluno = Aluno.find({
		userId: this.userId
	});
	var turmas = Turma.find({
		_id:{
			$in:_.pluck(aluno.fetch(),'alunoId')
		}
	});
	if (turmas.count() > 0) {
		cursoIds = _.pluck(turmas.fetch(),'cursoId');
	} else cursoIds = [];
	var cursos = Curso.find({
		_id:{
			$in:cursoIds
		}
	});
	return [aluno,turmas,cursos];
});
