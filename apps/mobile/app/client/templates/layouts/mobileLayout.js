Controller('adminLayout',{
	created:function(){

	},
	rendered:function(){

	},
	events:{

	},
	helpers:{
		isApp:function(){
			return isAppVar.get();
		},
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
