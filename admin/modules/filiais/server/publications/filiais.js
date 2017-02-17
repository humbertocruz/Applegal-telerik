Meteor.publishComposite('allFiliais', function() {
	if (typeof(DomainAppVar) == 'undefined') return false;
	return {
		find: function() {
			Counts.publish(this, 'allFiliais', Filial.find(), {
				noReady: true
			});
			var filiais = Filial.find({}, {
				sort: {
					name: 1
				}
			});
			return filiais;
		},
		children: []
	}
});
