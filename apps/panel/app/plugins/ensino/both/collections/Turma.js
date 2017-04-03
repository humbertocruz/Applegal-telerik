Turma = new Mongo.Collection("plg_ensino_turmas");
Aluno = new Mongo.Collection('plg_ensino_alunos');
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
