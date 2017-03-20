Meteor.methods({
	fotosRemove:function(id,aplicativoId) {
		return	Biblioteca.remove({
			_id:id,
			aplicativoId: aplicativoId
		});
	}
});
