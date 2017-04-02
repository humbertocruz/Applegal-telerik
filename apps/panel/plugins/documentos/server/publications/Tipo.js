Meteor.publish('allTipos', function(search,page,aplicativoId){
	if (!securityCheck(this.userId,['manager','documentos'],aplicativoId)) return this.ready();
	if (!search) search = {};
	search.aplicativoId = aplicativoId;
	Counts.publish(this,'allTipos',Tipo.find(search), { noReady: true });
	var tipos = Tipo.find(search,{sort:{name:-1}});
	return [tipos];
});
