Meteor.methods({
	documentosForm:function(fields,aplicativoId) {
		fields.date = moment(fields.date).toDate();
		fields.aplicativoId = aplicativoId;
		if (!fields._id) {
			fields.user_created = this.userId;
			fields.date_created = new Date();
			fields.active = false;
			return Documento.insert(fields);
		} else {
			fields.user_updated = this.userId;
			fields.date_updated = new Date();
			return Documento.update(fields._id, {
				$set: fields
			});
		};
	},
	documentosRemove:function(id,aplicativoId) {
		var fs = require('fs');
		var documento = Documento.findOne({
			_id:id,
			aplicativoId:aplicativoId
		});
		try {
			fs.unlinkSync(documento.uploaded.path);
		} catch(e){
			console.log(e);
		}
		return Documento.remove({
			_id:id,
			aplicativoId:aplicativoId
		});
	},
	documentosActivate:function(id,aplicativoId){
		return Documento.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:true
			}
		});
	},
	documentosDeactivate:function(id,aplicativoId){
		return Documento.update({
			_id:id,
			aplicativoId:aplicativoId
		}, {
			$set: {
				active:false
			}
		});
	}
});
