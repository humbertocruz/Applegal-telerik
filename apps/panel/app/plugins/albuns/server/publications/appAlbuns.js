Meteor.publish('appAlbuns', function(search,page,aplicativoId){

	if (!securityCheck(this.userId, ['manager','albuns'], aplicativoId)) return this.ready();

	if (!page) page = 1;
	if (!search) search = {};
	search.aplicativoId = aplicativoId;
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

	//var bibliotecas = Biblioteca.find({
	//});
	return [albuns];
});
