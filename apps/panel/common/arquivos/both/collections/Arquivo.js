Arquivo = new Mongo.Collection("arquivos");
Arquivo.allow({
	insert: function(){
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
		if (Roles.userIsInRole(Meteor.userId(), 'manager', FlowRouter.getParam('aplicativoId'))) return true;
		return false;
	},
	update: function(){
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
		if (Roles.userIsInRole(Meteor.userId(), 'manager', FlowRouter.getParam('aplicativoId'))) return true;
		return false;
	},
	remove: function(){
		if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
		if (Roles.userIsInRole(Meteor.userId(), 'manager', FlowRouter.getParam('aplicativoId'))) return true;
		return false;
	}
});
