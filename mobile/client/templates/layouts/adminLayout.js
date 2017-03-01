Controller('adminLayout',{
	created:function(){

	},
	rendered:function(){
		//Meteor.setTimeout(function(){
			//$('.ui.left.sidebar').sidebar('attach events', '.toggleSidebar');
			//$('.ui.bottom.sidebar').sidebar('attach events', '.toggleTechnotronics');
		//}, 1000);
	},
	events:{

	},
	helpers:{
		appBg:function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			var bg = app.appBg();
			if (bg) {
				return 'https://panel.applegal.com.br'+appBg.baseURL+'/md5/'+bg.md5;
			} else {
				return 'https://panel.applegal.com.br'+Arquivo.baseURL+'/md5/'+app.bgImage;
			}
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
