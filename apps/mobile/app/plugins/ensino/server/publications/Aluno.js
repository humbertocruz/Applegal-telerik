Meteor.publish('', function() {
	var aluno = Aluno.find({
		userId: this.userId
	});
	var turmas = Turma.find({
		_id:{
			$in:_.pluck(aluno.fetch(),'alunoId')
		}
	});
	if (turmas.count() > 0) {
		var cursos = Curso.find({
			_id:{
				$in:_.pluck(turmas.fetch(),'cursoId')
			}
		});
	} else cursos = this.ready();
	return [aluno,turmas,cursos];
});
