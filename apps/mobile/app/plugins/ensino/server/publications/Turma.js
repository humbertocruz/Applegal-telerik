Meteor.publish('appTurmas', function(params) {
	var me = this;
	if (params._id) {
		var search = {
			_id:params._id
		};
	} else {
		var search = {
			cursoId:params.cursoId
		};
	}
	var turmas = Turma.find(search);
	var alunos = Aluno.find({
		userId:this.userId
	});
	return [turmas,alunos];
});
