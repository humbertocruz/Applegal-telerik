Option = new Mongo.Collection('options');
Option.allow({
	insert: function(){
		return Roles.userIsInRole(Meteor.userId(),'admin');
	},
	update: function(){
		return Roles.userIsInRole(Meteor.userId(),'admin');
	},
	remove: function(){
		return Roles.userIsInRole(Meteor.userId(),'admin');
	}
});
