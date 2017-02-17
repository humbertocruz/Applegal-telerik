Controller('adminLayout',{
	created:function(){

	},
	rendered:function(){
		Meteor.setTimeout(function(){
			$('.ui.left.sidebar').sidebar('attach events', '.toggleSidebar');
			$('.ui.bottom.sidebar').sidebar('attach events', '.toggleTechnotronics');
		}, 1000);
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
