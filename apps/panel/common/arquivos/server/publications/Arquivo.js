Meteor.publishComposite('allWallpapers', function (page) {
	if (!page) page = 1;
	var search = {};
	//if (!search.metadata) search.metadata = {};
	search['public'] = true;
	search['type'] = 'wallpaper';
	search['aplicativoId'] = false;
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
	search['type'] = 'wallpaper';
	search['aplicativoId'] = aplicativoId;
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
	search['type'] = 'logotype';
	search['aplicativoId'] = aplicativoId;
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
