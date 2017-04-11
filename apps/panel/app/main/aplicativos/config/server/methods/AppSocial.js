Meteor.methods({
	configAppFaceBook:function(fields,aplicativoId){
		 fields.aplicativoId = aplicativoId;
		 return Social.upsert({aplicativoId:aplicativoId}, {$set:fields});
	},
	setConfigFacebook:function(aplicativoId){
		var social = Social.findOne({
			social:'facebook',
			aplicativoId:aplicativoId
		});
	}
});
