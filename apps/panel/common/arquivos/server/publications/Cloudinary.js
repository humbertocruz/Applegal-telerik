Meteor.publish("AppCloudinary", function(aplicativoId){
	return AppCloudinary.find({
		aplicativoId:aplicativoId
	});
});
