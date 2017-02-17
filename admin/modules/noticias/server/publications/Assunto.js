Meteor.publishComposite('appAssuntos', function(search, page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	if (!this.userId) return false;

	return {
		find: function() {
			if (!search) search = {};
			search.aplicativoId = aplicativoId;
			Counts.publish(this, 'allAssuntos', Assunto.find(
				search
			), {
				noReady: true
			});
			var assuntos = Assunto.find(search, {
				sort: {
					name: 1
				}
			});
			return assuntos;
		}
	}
});
