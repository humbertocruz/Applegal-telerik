Controller('mainMenu',{
	created:function() {
	},
	rendered:function(){
		$('.ui.dropdown').dropdown();
		$('#adminSubMenuShow').popup({
			inline:true,
			hoverable:true,
			position: 'bottom right'
		});
		$('#profileSubMenuShow').popup({
			inline:true,
			hoverable:true,
			position: 'bottom right'
		});
	},
	helpers:{
		user:function(){
			return Meteor.user();
		}
	}
});
