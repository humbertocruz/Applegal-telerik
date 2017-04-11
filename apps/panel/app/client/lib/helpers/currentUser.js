Template.registerHelper("currentUser", function(){
	return Meteor.user();
});
Template.registerHelper("currentUserId", function(){
	return Meteor.userId();
});
