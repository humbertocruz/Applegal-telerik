Meteor.publishComposite('oneEnquete', function(id,aplicativoId){
	console.log(id,aplicativoId);
	return {
		find:function(){
			var enquete = Enquete.find({
				_id:id,
				aplicativoId:aplicativoId
			});
			console.log(enquete.fetch());
			return enquete;
		},
		children:[
			{
				find:function(enquete){
					return EnqueteResposta.find({
						enquete_id:enquete._id,
						aplicativoId:aplicativoId
					});
				}
			}
		]
	}
});
Meteor.publishComposite('appEnquetes', function(search,page,aplicativoId){
	return {
		find:function(){
			if (!search) search = {}
			search.aplicativoId = aplicativoId;
			Counts.publish(this,'appEnquetes',Enquete.find(search));
			var enquetes = Enquete.find(search);
			return enquetes;
		},
		children:[
			{
				find:function(enquete){
					return EnqueteResposta.find({
						enquete_id:enquete._id,
						aplicativoId:aplicativoId
					});
				}
			}
		]
	}
});
