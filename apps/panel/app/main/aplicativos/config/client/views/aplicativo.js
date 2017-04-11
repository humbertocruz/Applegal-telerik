Controller('aplicativosIndexView',{
	helpers:{
		aplicativo:function(){
			return Aplicativo.findOne(FlowRouter.geParam('id'));
		},
		isAdmin:function(){
			if (Roles.userIsInRole(Meteor.userId(),'admin')) return true;
			return false;
		}
	}
});
