Controller('leftMenu',{
	created:function(){
	},
	helpers:{
		isManagerOrAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager', FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		},
		isAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			return false;
		},
		appPlugins:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (app) return app.appPlugins();
		},
		userHasPerm:function(plugin){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager',FlowRouter.getParam('aplicativoId'))) return true;
			if (Roles.userIsInRole(Meteor.userId(),plugin,FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		}
	},
	events:{
	}
});
