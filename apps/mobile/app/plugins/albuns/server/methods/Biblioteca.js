Meteor.methods({
	like:function(id){
		var bib = Biblioteca.findOne(id);
		var likes = bib.likes;
		if (!likes) likes = 0;
		likes++;
		return Biblioteca.update(id,{
			$set:{
				likes:likes
			}
		});
	}
});
