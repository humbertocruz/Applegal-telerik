var fs = require('fs');
Meteor.methods({
	fotosRemove:function(id,aplicativoId) {
		var foto = Foto.findOne({
			_id:id,
			aplicativoId: aplicativoId
		});
		try {
			fs.unlinkSync(foto.path);
		} catch(e){
			console.log(e);
		}
		return Foto.remove({
			_id:id,
			aplicativoId: aplicativoId
		});
	}
});
