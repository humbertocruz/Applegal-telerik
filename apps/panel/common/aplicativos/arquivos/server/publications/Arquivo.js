Meteor.publish('appArquivos', function (page,aplicativoId) {
	if (!aplicativoId) return [];
	if (!page) page = 1;
	search = {
		$or:[
			{
				tags:{
					$all:[
						aplicativoId,
						'logotype'
					]
				}
			},{
				tags:{
					$all:[
						aplicativoId,
						'wallpaper'
					]
				}
			}
		]
	};
	var qtd = 8;
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
