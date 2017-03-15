Meteor.publish('appBiblioteca', function (page,aplicativoId,qtd) {
	if (!aplicativoId) return [];
	if (!page) page = 1;
	search = {
		aplicativoId:aplicativoId,
		tags:{
			$in:[
				'logotype',
				'wallpaper',
				'noticia',
				'documento',
				'galeria',
				'enquete'
			]
		}
	};
	Counts.publish(this, 'appBiblioteca', Biblioteca.find(search), {
		noReady: true
	});

	return Biblioteca.find(search,{
		limit:qtd,
		skip: (page - 1) * qtd
	});
});
