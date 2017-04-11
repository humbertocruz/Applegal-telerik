Controller('adminLayout',{
	created:function(){

	},
	rendered:function(){

	},
	events:{

	},
	helpers:{
		bgTypeImage:function(){
			var appInfo = Aplicativo.findOne();
			if (appInfo) {
				if (typeof(appInfo.wallpaper) == 'object') return true;
				else return false;
			}
		},
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
