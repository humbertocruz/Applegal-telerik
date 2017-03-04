Controller('topMenu',{
	created:function(){
	},
	rendered:function(){
	},
	helpers:{
		topTitle:function(){
			return topTitleVar.get();
		}
	},
	events:{
		'click .reloadHome':function(e,t){
			var app = Aplicativo.findOne();
			if (!app) return false;

			$('.iconAlpha').transition('hide').transition({
				animation: app.iconAnimation,
				durantion: app.iconDuration,
				interval: app.iconInterval
			});
		}
	}
});
