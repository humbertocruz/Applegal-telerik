Controller('notFoundView',{
	rendered:function(){
		$('#notFoundGrid').transition('fade in');
		$('body').css(
			'backgroundColor',
			_.filter(semanticColors,function(e){return e.className == 'orange';})[0].rgb
		);
	},
	helpers:{
		userId:function(){
			return Meteor.userId();
		}
	},
	events:{
		'click #historyBack':function(e,t){
			history.back();
		}
	}
});
