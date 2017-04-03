Controller('promptView',{
	created:function(){
		promptViewVar = new ReactiveVar();
	},
	helpers:{
		'promptView':function(){
			return promptViewVar.get();
		}
	}
});
