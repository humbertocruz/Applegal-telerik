Controller('leftEmulatorApp',{
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
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		},
		appModulos:function(){
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			if (app) return app.appModulos();
		},
		userHasPerm:function(modulo){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager',FlowRouter.getParam('aplicativoId'))) return true;
			if (Roles.userIsInRole(Meteor.userId(),modulo,FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		}
	}
});
