Meteor.methods({
	pluginsForm: function(fields) {
		if (!fields._id) {
			return Plugin.insert(fields);
		} else {
			return Plugin.update(fields._id, {
				$set: fields
			});
		}
	},
	pluginsRemove: function(id) {
		return Plugin.remove({
			_id:id
		});
	}
});
