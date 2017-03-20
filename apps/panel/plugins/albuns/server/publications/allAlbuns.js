Meteor.publishComposite('allAlbuns', function(search,page,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find:function(){
			if (!page) page = 1;
			if (!search) search = {};
			search.aplicativoId = aplicativoId;
			Counts.publish(this,'allAlbuns',Album.find(search));
			var albuns = Album.find(search,{sort:{date:-1},limit:10,skip:(page-1)*10});
			console.log(albuns.fetch());
			return albuns;
		},
		children:[
			{
				find:function(album){
					return Biblioteca.find({
						albumId:album._id,
						tags:{
							$in:[
								'album'
							]
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('oneAlbum', function(id,aplicativoId){
	return {
		find:function(){
			search = {};
			var album = Album.find({
				_id: id,
				aplicativoId: aplicativoId
			});
			return album;
		},
		children:[
			{
				find:function(galeria){
					return Bibioteca.find({
						galeriaId:galeria._id,
						tags:{
							$in:[
								'album'
							]
						}
					});
				}
			}
		]
	}
});
