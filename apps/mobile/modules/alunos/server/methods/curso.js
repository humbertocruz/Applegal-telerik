Meteor.methods({
	signUpEvent: function(cursoId) {
		return Aluno.insert({
			date: moment().toDate(),
			cursoId: cursoId,
			userId: this.userId,
			approved: false
		});
	}
});
