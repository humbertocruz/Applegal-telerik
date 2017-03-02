Meteor.publishComposite('allWallpapers', function (page) {
	if (!page) page = 1;
	var search = {};
	//if (!search.metadata) search.metadata = {};
	search['metadata.public'] = true;
	search['metadata.type'] = 'wallpaper';
	search['metadata.aplicativoId'] = false;
	var qtd = 10;
	return {
		find:function(){
			Counts.publish(this, 'allWallpapers', Arquivo.find(search), {
				noReady: true
			});
			console.log(search);
			var arqs = Arquivo.find(search,
				{
					limit:qtd,
					skip: (page - 1) * qtd
			});
			console.log(arqs.count());
			return arqs;
		}
	}
});
Meteor.publish('oneArquivo', function (id) {
	if (id) return Arquivo.find(id);
	else return false;
});
