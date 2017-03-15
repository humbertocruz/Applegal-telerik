Meteor.publishComposite('appAssuntos', function(aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	if (!this.userId) return false;
	return {
		find: function() {
			if (typeof(search) == 'undefined') search = {};
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
