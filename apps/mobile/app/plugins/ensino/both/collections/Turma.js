Turma = new Mongo.Collection('plg_ensino_turmas');
Turma.helpers({
	curso: function() {
		return Curso.findOne(this.cursoId);
	},
	alunos:function(){
		return Aluno.find({
			turmaId:this._d
		}).fetch();
	}
});
