Meteor.methods({
	fotosRemove:function(id,aplicativoId) {
		return	appGaleriaFoto.remove({
			_id:id,
			'metadata.aplicativoId': aplicativoId
		});
	}
});
