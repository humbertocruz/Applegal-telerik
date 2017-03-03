Meteor.methods({
	fotosRemove:function(id,aplicativoId) {
		return	Arquivo.remove({
			_id:id,
			'metadata.aplicativoId': aplicativoId
		});
	}
});
