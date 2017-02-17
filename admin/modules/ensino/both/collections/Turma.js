Turma = new Mongo.Collection("turmas");
Turma.helpers({
	aluno: function() {
		return Meteor.users.findOne(this.userId);
	},
	curso: function() {
		return Curso.findOne({
			_id:this.cursoId,
			aplicativoId: aplicativoVar.get()._id
		});
	}
});
