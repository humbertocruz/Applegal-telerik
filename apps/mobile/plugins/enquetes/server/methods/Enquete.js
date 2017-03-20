Meteor.methods({
	enquetesResponder:function(fields){
		fields.user_id = this.userId;
		return EnqueteResposta.insert(fields);
	}
});
