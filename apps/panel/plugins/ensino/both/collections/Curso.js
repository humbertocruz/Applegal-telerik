Curso = new Mongo.Collection("plg_ensino_cursos");
Curso.helpers({
	turmas: function() {
		return Turma.find({
			cursoId: this._id,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		}).fetch();
	},
	reqCurso: function(){
		return Curso.findOne(this.requisito);
	}
});
