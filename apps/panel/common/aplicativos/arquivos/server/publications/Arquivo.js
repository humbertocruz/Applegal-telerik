Meteor.publish('appArquivos', function (page,aplicativoId) {
	if (!aplicativoId) return [];
	if (!page) page = 1;
	search = {
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
	var qtd = 8;
	Counts.publish(this, 'appArquivos', Arquivo.find(search), {
		noReady: true
	});

	return Arquivo.find(search,{
		limit:qtd,
		skip: (page - 1) * qtd
	});
});
