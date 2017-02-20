Meteor.publishComposite('allTipos', function(search,page,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find:function(){
			if (!search) search = {};
			search.aplicativoId = aplicativoId;
			Counts.publish(this,'allTipos',Tipo.find(search), { noReady: true });
			var tipos = Tipo.find(search,{sort:{name:-1}});
			return tipos;
		}
	}
});
