Controller('mainMenu',{
	created:function() {
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
	},
	helpers:{
		user:function(){
			return Meteor.user();
		}
	}
});
