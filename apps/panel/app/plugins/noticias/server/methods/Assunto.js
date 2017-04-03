Meteor.methods({
	assuntosForm: function(fields,aplicativoId) {
		fields.aplicativoId = aplicativoId;
		if (!fields._id) {
			return Assunto.insert(fields);
		} else {
			return Assunto.update(fields._id, {
				$set: fields
			});
		}
	},
	assuntosRemove: function(id,aplicativoId) {
		return Assunto.remove({
			_id:id,
			aplicativoId:aplicativoId
		});
	}
});
