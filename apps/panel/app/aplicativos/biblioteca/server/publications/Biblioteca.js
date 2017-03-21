Meteor.publish('appBiblioteca', function (page,aplicativoId,qtd,libType,id) {
	if (aplicativoId == null) return [];
	if (page == null) page = 1;
	if (id == null) id = undefined;
	search = {
		aplicativoId: aplicativoId,
		tags:{
			$in:libType
		}
	};
	Counts.publish(this, 'appBiblioteca', Biblioteca.find(search), {
		noReady: true
	});
	return Biblioteca.find(search,{
		limit:qtd,
		skip: (page - 1) * qtd
	});
});
