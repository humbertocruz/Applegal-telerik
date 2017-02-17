Meteor.methods({
	tiposForm:function(fields,aplicativoId){
		fields.aplicativoId = aplicativoId;
		 if (!fields._id){
			 return Tipo.insert(fields);
		 } else {
			 return Tipo.update(fields._id,{$set:fields});
		 }
	},
	tiposRemove:function(id,aplicativoId){
		return Tipo.remove({
			_id:id,
			aplicativoId:aplicativoId
		});
	}
});
