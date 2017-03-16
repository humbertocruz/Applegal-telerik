Controller('notFoundView',{
	rendered:function(){
		$('#notFoundGrid').transition('fade in');
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
