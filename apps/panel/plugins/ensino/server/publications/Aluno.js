Meteor.publish("appAluno", function(page, turmaId, aplicativoId){
	return Aluno.find({
		turmaId:turmaId
	})
});
