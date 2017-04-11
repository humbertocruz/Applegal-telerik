Controller('noticiasView', {
	created: function() {
		topTitleVar.set('Notícias');
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
		Tracker.autorun(function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			Meteor.subscribe('appNoticias', app._id);
		});
	},
	rendered: function() {

	},
	helpers: {
		noticias: function() {
			var noticias = Noticia.find({}, {
				sort: {
					date: -1
				}
			}).fetch();
			return {
				data: noticias,
				count: noticias.length
			}
		}
	},
	events: {}
});
