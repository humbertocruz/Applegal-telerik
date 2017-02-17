var fs = require('fs');
Meteor.methods({
	galeriasForm:function(fields,aplicativoId) {
		fields.date = moment(fields.date).toDate();
		fields.aplicativoId = aplicativoId;
		if (!fields._id) {
			fields.active = false;
			fields.user_created = this.userId;
			fields.date_created = moment().toDate();
			return Galeria.insert(fields);
		} else {
			fields.user_updated = this.userId;
			fields.date_updated = moment().toDate();
			return Galeria.update(fields._id, {
				$set: fields
			});
		}
	},
	galeriasRemove:function(id,aplicativoId) {
		var fotos = Foto.find(
			{
				galeria_id:id,
				aplicativoId:aplicativoId
			}).fetch();
		_.each(fotos,function(foto){
			try {
				fs.unlinkSync(foto.path);
				Foto.remove({
					_id:foto._id,
					aplicativoId:aplicativoId
				});
			} catch(e){
				console.log(e);
			}
		});
		return Galeria.remove({
			_id:id,
			aplicativoId:aplicativoId
		});
	},
	galeriasActivate:function(id,aplicativoId){
		return Galeria.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:true
			}
		});
	},
	galeriasDeactivate:function(id,aplicativoId){
		return Galeria.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:false
			}
		});
	}
});
