Meteor.publishComposite('appNoticias', function(search, page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	if (!this.userId) return false;

	return {
		find: function() {
			if (!page) page = 1;
			if (!search) search = {};
			search.aplicativoId = aplicativoId;
			var pages = 10;
			Counts.publish(this, 'allNoticias', Noticia.find(search), {
				noReady: true
			});
			var noticias = Noticia.find(search, {
				sort: {
					date: -1
				},
				limit: pages,
				skip: (page - 1) * pages
			});
			return noticias;
		},
		children:[
			{
				find:function(noticia){
					return Assunto.find({
						_id:noticia.assunto_id,
						aplicativoId:aplicativoId
					});
				}
			},
			{
				find:function(noticia){
					return Arquivo.find({
						noticiaId:noticia._id
					});
				}
			}
		]
	}
});
Meteor.publishComposite('oneNoticia', function(id,aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	if (!this.userId) return false;

	return {
		find: function() {
			var noticia = Noticia.find({
				_id: id,
				aplicativoId:aplicativoId
			});
			return noticia;
		},
		children:[
			{
				find:function(noticia){
					return Assunto.find({
						_id:noticia.assunto_id,
						aplicativoId:aplicativoId
					});
				}
			},
			{
				find:function(noticia){
					var arqs = Arquivo.find({
						noticiaId:noticia._id
					});
					return arqs;
				}
			}
		]
	}
});
