Turma = new Mongo.Collection("turmas");
Aluno = new Mongo.Collection('alunos');
Turma.helpers({
	alunos: function() {
		return Aluno.findOne({
			turmaId:this._id
		});
	},
	curso: function() {
		return Curso.findOne({
			_id:this.cursoId,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		});
	}
});
