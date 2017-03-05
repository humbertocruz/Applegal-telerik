Meteor.publishComposite('allWallpapers', function (page) {
	if (!page) page = 1;
	var search = {};
	//if (!search.metadata) search.metadata = {};
	search['metadata.public'] = true;
	search['metadata.type'] = 'wallpaper';
	search['metadata._Resumable'] = { $exists: false };
	search['metadata.aplicativoId'] = false;
	var qtd = 8;
	return {
		find:function(){
			Counts.publish(this, 'allWallpapers', Arquivo.find(search), {
				noReady: true
			});
			var arqs = Arquivo.find(search,
				{
					limit:qtd,
					skip: (page - 1) * qtd
			});
			return arqs;
		}
	}
});

Meteor.publishComposite('appWallpapers', function (page,aplicativoId) {
	if (!page) page = 1;
	var search = {};
	//if (!search.metadata) search.metadata = {};
	search['metadata._Resumable'] = { $exists: false };
	search['metadata.type'] = 'wallpaper';
	search['metadata.aplicativoId'] = aplicativoId;
	var qtd = 8;
	return {
		find:function(){
			Counts.publish(this, 'appWallpapers', Arquivo.find(search), {
				noReady: true
			});
			var arqs = Arquivo.find(search,
				{
					limit:qtd,
					skip: (page - 1) * qtd
			});
			return arqs;
		}
	}
});

Meteor.publishComposite('appLogotipos', function (page,aplicativoId) {
	if (!page) page = 1;
	var search = {};
	search['metadata._Resumable'] = { $exists: false };
	search['metadata.type'] = 'logotype';
	search['metadata.aplicativoId'] = aplicativoId;
	var qtd = 8;
	return {
		find:function(){
			Counts.publish(this, 'appLogotipos', Arquivo.find(search), {
				noReady: true
			});
			var arqs = Arquivo.find(search,
				{
					limit:qtd,
					skip: (page - 1) * qtd
			});
			return arqs;
		}
	}
});


Meteor.publish('oneArquivo', function (id) {
	if (id) return Arquivo.find(id);
	else return false;
});
