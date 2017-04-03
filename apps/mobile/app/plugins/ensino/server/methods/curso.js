Meteor.methods({
	eventoCadastro: function(turmaId) {
		return Aluno.insert({
			date: moment().toDate(),
			turmaId: turmaId,
			userId: this.userId,
			approved: false,
			notas:[],
			trabalhos:[],
			presencas:[]
		});
	}
});
