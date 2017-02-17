Controller('technotronicsMenu', {
	helpers: {
		currentFilial: function() {
			return Filial.findOne(currentFilialVar.get());
		}
	}
});
