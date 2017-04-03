Meteor.methods({
	albunsForm:function(fields,aplicativoId) {
		fields.date = moment(fields.date).toDate();
		fields.aplicativoId = aplicativoId;
		if (!fields._id) {
			fields.active = false;
			fields.user_created = this.userId;
			fields.date_created = moment().toDate();
			return Album.insert(fields);
		} else {
			fields.user_updated = this.userId;
			fields.date_updated = moment().toDate();
			return Album.update(fields._id, {
				$set: fields
			});
		}
	},
	albunsRemove:function(id,aplicativoId) {
		Biblioteca.remove({
			galeriaId:id,
			aplicativoId:aplicativoId
		});
		return Album.remove({
			_id:id,
			aplicativoId:aplicativoId
		});
	},
	albunsActivate:function(id,aplicativoId){
		return Album.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:true
			}
		});
	},
	albunsDeactivate:function(id,aplicativoId){
		return Album.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:false
			}
		});
	}
});
