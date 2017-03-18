Meteor.publish('appBiblioteca', function (page,aplicativoId,qtd,typePreselected) {
	if (!aplicativoId) return [];
	if (!page) page = 1;
	search = {
		aplicativoId:aplicativoId,
		tags:{
			$in: typePreselected
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

Meteor.publish('pubBiblioteca', function (page,qtd,typePreselected) {
	var pubApp = Aplicativo.findOne({
		'store.appInfoId':'br.com.applegal.technoapp'
	});
	var aplicativoId = pubApp._id;
	if (!page) page = 1;
	search = {
		aplicativoId:aplicativoId,
		tags:{
			$in: typePreselected
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
