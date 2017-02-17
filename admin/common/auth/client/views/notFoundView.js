Controller('notFoundView',{
	helpers:{
		userId:function(){
			return Meteor.userId();
		}
	}
});
