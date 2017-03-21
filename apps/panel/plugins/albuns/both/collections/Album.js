Album = new Mongo.Collection('albuns');
Album.helpers({
	fotos:function(){
		return Biblioteca.find({
			tags:{
				$all:[
					'album',
					this._id
				]
			}
		},{
			limit:50
		}).fetch();
	}
});
