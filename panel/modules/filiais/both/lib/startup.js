Meteor.startup(function() {
	var filiais = Filial.find();
	if (filiais.count() == 1) {
		filiais = filiais.fetch();
		FilialUnicaVar = ReactiveVar(filiais[0]);
	} else {
		FilialUnicaVar = ReactiveVar(false);
	}
});
