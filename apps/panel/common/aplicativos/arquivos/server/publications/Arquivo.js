Meteor.publish('appArquivos', function (search,page,aplicativoId) {
	if (!aplicativoId) return [];
	if (!page) page = 1;
	if (!search) search = {};
	search['metadata._Resumable'] = { $exists: false };
	search['metadata.aplicativoId'] = aplicativoId;
	search['metadata.aplicativoId'] = aplicativoId;
	search['metadata.type'] = {
		$in:['logotype','wallpaper']
	};
	var qtd = 10;
	Counts.publish(this, 'appArquivos', Arquivo.find(search), {
		noReady: true
	});
	return Arquivo.find(search,{
		limit:qtd,
		skip: (page - 1) * qtd,
		sort:{
			'metadata.type':1
		}
	});
});
