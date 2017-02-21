Controller('appMenu',{
	helpers:{
		isManagerOrAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			if (Roles.userIsInRole(Meteor.userId(),'manager', FlowRouter.getParam('aplicativoId'))) return true;
			return false;
		},
		aplicativoId:function(){
			return FlowRouter.getParam('aplicativoId');
		}
	}
});
