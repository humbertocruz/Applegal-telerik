Meteor.publish('appServicos',function(aplicativoId){
	return Servico.find({
		aplicativoId:aplicativoId
	});
});
