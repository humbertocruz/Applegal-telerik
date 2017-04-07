Meteor.publish('appTurmas', function(params) {
	var me = this;
	var turmas = Turma.find({
		cursoId:params.cursoId
	});
	var cursos = Curso.find(params.cursoId);
	return [turmas,cursos];
});
