Meteor.publishComposite('', function() {
	return {
		find: function() {
			var aluno = Aluno.find({
				userId: this.userId
			});
			return aluno;
		},
		children: []
	}
});
