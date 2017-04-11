Aluno = new Mongo.Collection('plg_ensino_alunos');
Aluno.helpers({
	aluno: function() {
		return Meteor.users.findOne(this.userId);
	},
	turma: function() {
		return Turma.findOne(this.turmaId);
	}
});
