Curso = new Mongo.Collection("cursos");
Curso.helpers({
	turmas: function() {
		return Turma.find({
			cursoId: this._id,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		}).fetch();
	}
});
