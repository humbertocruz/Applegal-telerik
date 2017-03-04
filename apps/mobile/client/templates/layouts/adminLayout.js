Controller('adminLayout',{
	created:function(){

	},
	rendered:function(){

	},
	events:{

	},
	helpers:{
		noApp:function(){
			if (!Aplicativo.findOne()) return true;
			else return false;
		},
		isOffline:function(){
			return !Meteor.status().connected;
		},
		isLoading:function(){
			return isLoadingVar.get();
		}
	}
});
