Meteor.publishComposite('appNoticias', function(search, page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return this.ready();
	if (!this.userId) return this.ready();
	var authorized = false;

	if (Roles.userIsInRole(this.userId, ['admin'])) authorized = true;
	if (Roles.userIsInRole(this.userId, ['manager','noticias'], aplicativoId)) authorized = true;

	if (!authorized) return this.ready();

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
			}
		]
	}
});
Meteor.publishComposite('oneNoticia', function(id,aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return this.ready();
	if (!this.userId) return this.ready();
	var authorized = false;

	if (Roles.userIsInRole(this.userId, ['admin'])) authorized = true;
	if (Roles.userIsInRole(this.userId, ['manager','noticias'], aplicativoId)) authorized = true;

	if (!authorized) return this.ready();

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
			}
		]
	}
});
