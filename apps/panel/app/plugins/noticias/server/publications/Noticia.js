Meteor.publish('appNoticias', function(search, page, aplicativoId, noticiaId) {
	if (!securityCheck(this.userId,['manager','noticia'])) return this.ready();
	if (!page) page = 1;
	if (!search) search = {};
	search.aplicativoId = aplicativoId;
	if (noticiaId) {
		search._id = noticiaId;
	}
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
	if (noticias.count() == 0) return this.ready();
	var assuntos = Assunto.find({
		_id:{
			$in:_.pluck(noticias.fetch(),'assunto_id')
		},
		aplicativoId:aplicativoId
	});
	var bibliotecas = Biblioteca.find({
		aplicativoId:aplicativoId,
		tags:{
			$in:['noticia']
		}
	});
	return [noticias,assuntos,bibliotecas];
});
