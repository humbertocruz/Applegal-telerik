Album = new Mongo.Collection('albuns');
Album.helpers({
	fotos:function(){
		return Biblioteca.find({
			albumId:this._id,
			tags:{
				$all:[
					'album'
				]
			}
		}).fetch();
	}
});
