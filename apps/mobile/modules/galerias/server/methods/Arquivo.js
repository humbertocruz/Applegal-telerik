Meteor.methods({
	like:function(id){
		var arq = Arquivo.findOne(id);
		var likes = arq.likes;
		if (!likes) likes = 0;
		likes++;
		return Arquivo.update(id,{
			$set:{
				likes:likes
			}
		});
	}
});
