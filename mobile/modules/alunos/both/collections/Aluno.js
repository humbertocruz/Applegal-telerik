Aluno = new Mongo.Collection('alunos');
Aluno.helpers({
	aluno: function() {
		return Meteor.users.findOne(this.userId);
	},
	curso: function() {
		return Curso.findOne(this.cursoId);
	}
});
