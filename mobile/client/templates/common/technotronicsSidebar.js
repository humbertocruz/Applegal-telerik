Controller('technotronicsSidebar',{
	rendered:function(){
		Meteor.setTimeout(function(){
			//$('.ui.left.sidebar').sidebar('attach events', '.toggleSidebar');
			$('.ui.bottom.sidebar').sidebar('attach events', '.toggleTechnotronics');
		}, 1000);
	},
	events:{
		'click #technotronicsSidebar':function(e,t){
			$('#technotronicsSidebar').sidebar('hide');
		}
	}
});
