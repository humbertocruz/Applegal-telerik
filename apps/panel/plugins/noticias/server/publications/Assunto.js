Meteor.publishComposite('appAssuntos', function(page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	if (!this.userId) return false;
	if (page == null) page = 1;
	return {
		find: function() {
			var search = {};
			search.aplicativoId = aplicativoId;
			Counts.publish(this, 'appAssuntos', Assunto.find(
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
