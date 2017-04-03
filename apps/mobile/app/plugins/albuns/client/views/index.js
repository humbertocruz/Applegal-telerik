Controller('albunsView',{
	created:function(){
		topTitleVar.set('Álbum de Fotos');
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
		Tracker.autorun(function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			Meteor.subscribe("appAlbuns", app._id);
		});
	},
	rendered:function(){

	},
	helpers:{
		albuns:function(){
			var albuns = Album.find({},{sort:{date:-1}});
			return {
				data:albuns.fetch(),
				count:albuns.length
			}
		}
	},
	events:{
	}
});
