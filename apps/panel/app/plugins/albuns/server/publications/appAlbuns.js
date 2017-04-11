Meteor.publish('appAlbuns', function(search,page,aplicativoId,albumId){

	if (!securityCheck(this.userId, ['manager','albuns'], aplicativoId)) return this.ready();

	if (!page) page = 1;
	if (!search) search = {};
	search.aplicativoId = aplicativoId;
	if (albumId) {
		_id:albumId
	}
	Counts.publish(this,'allAlbuns',Album.find(search));
	var albuns = Album.find(
		search,{
			sort:{
				date:-1
			},
			limit:10,
			skip:(page-1)*10
		}
	);
	if (albuns.count() == 0) return this.ready();
	var bibliotecas = Biblioteca.find({
		aplicativoId:aplicativoId,
		tags:{
			$in:['album']
		},
		albumId:{
			$in:_.pluck(albuns,'_id')
		}
	});
	return [albuns,bibliotecas];
});
