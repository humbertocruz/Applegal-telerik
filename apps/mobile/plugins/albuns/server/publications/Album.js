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
