Controller('suspensoView',{
	helpers:{
		guest:function(){
			return Roles.userIsInRole(Meteor.userId(),'guest',Aplicativo.findOne()._id);
		}
	}
});
