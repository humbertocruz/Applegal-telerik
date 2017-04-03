Meteor.methods({
	turmasCanAdd:function(data) {
		return Turma.update(data.id,{
			$set:{
				canAdd:data.value
			}
		})
	},
	turmasForm: function(fields, aplicativoId) {
		fields.aplicativoId = aplicativoId;
		if (fields._id) {
			fields.user_updated = this.userId;
			fields.date_updates = moment().toDate();
			return Turma.update(fields._id, {
				$set: fields
			});
		} else {
			fields.user_created = this.userId;
			fields.date_created = moment().toDate();
			return Turma.insert(fields);
		}
	}
});
