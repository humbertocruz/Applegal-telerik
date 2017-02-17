Meteor.methods({
	modulosForm: function(fields) {
		if (!fields._id) {
			return Modulo.insert(fields);
		} else {
			return Modulo.update(fields._id, {
				$set: fields
			});
		}
	},
	modulosRemove: function(id) {
		return Modulo.remove({
			_id:id
		});
	}
});
