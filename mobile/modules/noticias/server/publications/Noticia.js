Meteor.publishComposite('appNoticias', function(filialId) {
	return {
		find: function() {
			var noticias = Noticia.find({
				active: true,
				aplicativoId: aplicativoVar._id
			}, {
				sort: {
					date: -1
				}
			});
			return noticias;
		},
		children: [{
			find: function(noticia) {
				return Assunto.find(noticia.assunto_id);
			}
		}]
	}
});
