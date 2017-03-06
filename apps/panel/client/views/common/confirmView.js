htmlConfirm = function(title,message,callback){
	confirmViewVar.set({
		title:title,
		message:message
	});
	$('#confirmView').modal({
		onApprove:callback
	}).modal('show');
}
Controller('confirmView',{
	created:function(){
		confirmViewVar = new ReactiveVar();
	},
	helpers:{
		'confirmView':function(){
			return confirmViewVar.get();
		}
	}
});
