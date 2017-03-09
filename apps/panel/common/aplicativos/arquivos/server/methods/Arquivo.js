Meteor.methods({
	configCloudinary:function(fields){
		var config = AppCloudinary.findOne({
			aplicativoId:fields.aplicativoId
		});
		if (config) {
			return AppCloudinary.update(config._id,{
				$set:fields
			});
		} else {
			return AppCloudinary.insert(fields);
		}
	}
});
