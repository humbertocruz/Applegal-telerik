Controller('notFoundView',{
	rendered:function(){
		$('#notFoundGrid').transition('horizontal flip in');
		if (FlowRouter.getRouteName() == 'notFoundRoute') {
			console.log(FlowRouter.getRouteName());
			$('body').css('background-color','#db2828;');
		}
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
