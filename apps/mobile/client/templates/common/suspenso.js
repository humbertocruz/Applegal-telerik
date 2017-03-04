Controller('suspensoView',{
	helpers:{
		newUser:function(){
			return Roles.userIsInRole(Meteor.userId(),'novo');
		}
	}
});
