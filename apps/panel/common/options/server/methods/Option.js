Meteor.methods({
	optionsForm: function(fields) {
		console.log(fields);
		if (!this.userId) return false;
		if (!Roles.userIsInRole(this.userId,'admin')) return false;
		var opt = Option.findOne();
		if (!opt) {
			return Option.insert(fields);
		} else {
			return Option.update(opt._id, {
				$set: fields
			});
		}
	},
	otionsRemove: function(id) {
		if (!this.userId) return false;
		if (!Roles.userIsInRole(this.userId,'admin')) return false;
		return Option.remove({
			_id:id
		});
	}
});
