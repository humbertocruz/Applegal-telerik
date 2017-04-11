Turma = new Mongo.Collection("plg_ensino_turmas");
Aluno = new Mongo.Collection('plg_ensino_alunos');
Turma.helpers({
	alunos: function() {
		return Aluno.find({
			turmaId:this._id
		}).fetch();
	},
	curso: function() {
		return Curso.findOne({
			_id:this.cursoId,
			aplicativoId: FlowRouter.getParam('aplicativoId')
		});
	}
});
Aluno.helpers({
	turma:function(){
		return Turma.findOne({
			_id:this.turmaId,
			aplicativoId:FlowRouter.getParam('aplicativoId')
		});
	},
	user:function(){
		return Meteor.users.findOne({
			_id:this.userId
		});
	}
});
