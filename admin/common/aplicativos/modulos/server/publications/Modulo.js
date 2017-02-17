Meteor.publishComposite('', function() {
	return {
		find: function() {
			Counts.publish(this, 'allModulos', Modulo.find(), {
				noReady: true
			});
			var modulos = Modulo.find({}, {
				sort: {
					title: 1
				}
			});
			return modulos;
		}
	}
});
