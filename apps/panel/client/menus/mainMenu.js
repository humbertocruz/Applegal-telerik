Controller('mainMenu',{
	created:function() {
	},
	rendered:function(){
		$('#adminMenu').transition('slide down in');
		$('.ui.dropdown').dropdown();
	},
	helpers:{
		user:function(){
			return Meteor.user();
		}
	}
});
