Meteor.publishComposite('appAlbuns',function(aplicativoId){
	return {
		find:function(){
			var albuns = Album.find({
				active:true,
				aplicativoId:aplicativoId
			});
			return albuns;
		},
		children:[
			{
				find:function(album){
					return Biblioteca.find({
						tags:{
							$all:[
								'album',
								album._id
							]
						}
					});
				}
			}
		]
	}
});
Meteor.publishComposite('oneAlbum',function(id, aplicativoId){
	return {
		find:function(){
			var album = Album.find({
				active:true,
				_id: id,
				aplicativoId:aplicativoId
			});
			return album;
		},
		children:[
			{
				find:function(album){
					var bib = Biblioteca.find({
						tags:{
							$all:[
								'album',
								album._id
							]
						}
					});
					console.log(bib.fetch());
					return bib;
				}
			}
		]
	}
});
