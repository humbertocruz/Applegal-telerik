Meteor.methods({
	filiaisForm: function(fields) {
		if (!fields.id) {
			return Filial.insert(fields);
		} else {
			return Filial.update(fields.id, {
				$set: fields
			});
		}
	},
	filiaisRemove: function(id) {
		return Filial.remove(id);
	}
});
