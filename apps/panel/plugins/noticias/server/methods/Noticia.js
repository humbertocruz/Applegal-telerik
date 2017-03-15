Meteor.methods({
	removeNoticiaFoto:function(id){
		var not = Noticia.update(id,{
			$set:{
				imagem:''
			}
		});
		return not;
	},
	noticiasAddFoto:function(arquivo, noticiaId){
		var not = Noticia.update(arquivo.noticiaId,{
			$set:{
				imagem:arquivo.public_id
			}
		});
		return not;
	},
	noticiasForm: function(fields,aplicativoId) {
		fields.date = moment(fields.date, 'YYYY-MM-DD').toDate();
		fields.aplicativoId = aplicativoId;
		if (!fields._id) {
			fields.user_created = this.userId;
			fields.date_created = moment().toDate();
			fields.active = false;
			var noticiaId = Noticia.insert(fields);
		} else {
			fields.user_updated = this.userId;
			fields.date_updated = moment().toDate();
			var noticiaId = Noticia.update(fields._id, {
				$set: fields
			});
		}
		return noticiaId;
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
