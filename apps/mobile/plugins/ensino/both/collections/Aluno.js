Aluno = new Mongo.Collection('alunos');
Aluno.helpers({
	aluno: function() {
		return Meteor.users.findOne(this.userId);
	},
	turma: function() {
		return Curso.findOne(this.turmaId);
	}
});
