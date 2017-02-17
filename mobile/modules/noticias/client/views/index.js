Controller('noticiasView', {
	created: function() {
		topTitleVar.set('Notícias');
		Meteor.subscribe('appNoticias', currentFilialVar.get());
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
