Meteor.methods({
	eventoCadastro: function(turmaId,cursoId) {
		return Aluno.insert({
			date: moment().toDate(),
			cursoId, cursoId,
			turmaId: turmaId,
			userId: this.userId,
			approved: false,
			provas:[],
			trabalhos:[],
			presencas:[]
		});
	}
});
