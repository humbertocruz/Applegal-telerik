Meteor.methods({
	noticiasUploadFoto:function(fileId, aplicativoId, noticiaId){
		fileId = new Meteor.Collection.ObjectID(fileId);
		return Noticia.update(noticiaId,{
			$set:{
				imagem:fileId
			}
		})
	},
	noticiasForm: function(fields,aplicativoId) {
		fields.date = moment(fields.date, 'YYYY-MM-DD').toDate();
		fields.aplicativoId = aplicativoId;
		if (!fields._id) {
			fields.user_created = this.userId;
			fields.date_created = moment().toDate();
			fields.active = false;
			return Noticia.insert(fields);
		} else {
			fields.user_updated = this.userId;
			fields.date_updated = moment().toDate();
			return Noticia.update(fields._id, {
				$set: fields
			});
		}
	},
	removeNoticia: function(id, aplicativoId) {
		return Noticia.remove({
			_id:id,
			aplicativoId: aplicativoId
		});
	},
	noticiasActivate: function(id, aplicativoId) {
		return Noticia.update({
			_id:id,
			aplicativoId: aplicativoId
		}, {
			$set: {
				active: true
			}
		});
	},
	noticiasDeactivate: function(id, aplicativoId) {
		return Noticia.update({
			_id:id,
			aplicativoId: aplicativoId
		}, {
			$set: {
				active: false
			}
		});
	}
});
