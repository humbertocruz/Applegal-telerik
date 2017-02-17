Meteor.methods({
	servicosForm:function(fields){
		fields.appGroup = DomainAppVar.appGroup;
		 if (!fields.id){
			 return Servico.insert(fields);
		 } else {
			 return Servico.update(fields.id,{$set:fields});
		 }
	},
	servicosRemove:function(id){
		return Servico.remove({
			_id:id,
			appGroup:DomainAppVar.appGroup
		});
	}
});
