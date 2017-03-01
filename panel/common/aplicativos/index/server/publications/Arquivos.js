Meteor.publish("appArquivos", function(page){
	return Arquivo.find({},{
		limit:5,
		skip:(page-1)*5
	});
});
