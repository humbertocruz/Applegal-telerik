Meteor.methods({
	escalasForm:function(fields){
		fields.appGroup = DomainAppVar.appGroup;
		if (!fields.id){
			return Escala.insert(fields);
		} else {
			return Escala.update(fields.id,{$set:fields});
		}
	},
	escalasRemove:function(id){
		var escala = Escala.findOne({
			_id:id,
			appGroup:DomainAppVar.appGroup
		});
		try {
			fs.unlinkSync(escala.uploaded.path);
		} catch(e){
		}
		return Escala.remove({
			_id:id,
			appGroup:DomainAppVar.appGroup
		});
	}
});
