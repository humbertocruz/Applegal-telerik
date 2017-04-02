Meteor.publish('appEnquetes', function(search,page,aplicativoId){
	if (!search) search = {}
	search.aplicativoId = aplicativoId;
	Counts.publish(this,'appEnquetes',Enquete.find(search));
	var enquetes = Enquete.find(search);
	return [enquetes];
});
