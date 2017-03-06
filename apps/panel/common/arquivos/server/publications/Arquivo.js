Meteor.publishComposite('allWallpapers', function (page) {
	if (!page) page = 1;
	var search = {
		tags: {
			$all:['wallpaper','public']
		}
	};
	return {
		find:function(){
			Counts.publish(this, 'allWallpapers', Arquivo.find(search), {
				noReady: true
			});
			var arqs = Arquivo.find(search,{
				limit:8,
				skip:(page-1)*8
			});
			return arqs;
		}
	}
});

Meteor.publish('oneArquivo', function (public_id) {
	if (public_id) return Arquivo.find({public_id:public_id});
	else return false;
});
