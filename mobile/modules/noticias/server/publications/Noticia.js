Meteor.publishComposite('appNoticias', function(aplicativoId) {
	return {
		find: function() {
			var noticias = Noticia.find({
				active: true,
				aplicativoId: aplicativoId
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
			},
			find: function(noticia) {
				return Arquivo.find(noticia.imagem);
			}
		}]
	}
});

Meteor.publishComposite('oneNoticias', function(id, aplicativoId) {
	return {
		find: function() {
			var noticias = Noticia.find({
				_id: id,
				aplicativoId: aplicativoId
			});
			return noticias;
		},
		children: [{
			find: function(noticia) {
				return Assunto.find(noticia.assunto_id);
			},
			find: function(noticia) {
				return Arquivo.find(noticia.imagem);
			}
		}]
	}
});
