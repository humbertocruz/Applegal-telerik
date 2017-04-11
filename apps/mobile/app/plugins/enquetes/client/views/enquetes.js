Controller('enquetesView',{
	created:function(){
		topTitleVar.set('Enquetes');
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
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
