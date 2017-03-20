Album = new Mongo.Collection('albuns');
Album.helpers({
	fotos:function(){
		return Biblioteca.find({
			albumId:this._id,
			tags:{
				$in:[
					'album'
				]
			}
		},{
			limit:50
		}).fetch();
	}
});
