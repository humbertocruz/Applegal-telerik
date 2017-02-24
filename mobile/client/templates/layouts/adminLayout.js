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
		appBg:function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			var bg = app.appBg();
			return 'background-image:url(/gridfs/fundos/md5/'+bg.md5+') !important;';
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
