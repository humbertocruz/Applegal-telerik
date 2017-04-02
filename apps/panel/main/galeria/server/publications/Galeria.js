Meteor.publish('pubGaleria', function (page,qtd,libType) {
	if (page == null) page = 1;
	search = {
		tags:{
			$in:libType
		}
	};

	Counts.publish(this, 'pubGaleria', PubGaleria.find(search), {
		noReady: true
	});
	return PubGaleria.find(search,{
		limit:qtd,
		skip: (page - 1) * qtd
	});
});
