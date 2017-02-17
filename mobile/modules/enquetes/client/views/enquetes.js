Controller('enquetesView',{
	created:function(){
		topTitleVar.set('Enquetes');
	},
	rendered:function(){

	},
	helpers:{
		enquetes:function(){
			var enquetes = Enquete.find({},{sort:{date:-1}}).fetch();
			return {
				data:enquetes,
				count:enquetes.length
			}
		}
	},
	events:{
		
	}
});
