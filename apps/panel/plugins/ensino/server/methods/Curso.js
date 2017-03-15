Meteor.methods({
	cursosForm: function(fields, aplicativoId) {
		fields.aplicativoId = aplicativoId;
		if (fields._id) {
			fields.user_updated = this.userId;
			fields.date_updates = moment().toDate();
			return Curso.update(fields._id, {
				$set: fields
			});
		} else {
			fields.user_created = this.userId;
			fields.date_created = moment().toDate();
			return Curso.insert(fields);
		}
	}
});
