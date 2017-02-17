Meteor.publishComposite('allTurmas', function(search, page, aplicativoId) {
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find: function() {
			if (!search) search = {};
			search.approved = false;
			search.aplicativoId = aplicativoId;
			if (!page) page = 1;
			var pages = 10;
			Counts.publish(this, 'allTurmas', Turma.find(search), {
				noReady: true
			});
			var turmas = Turma.find(search, {
				sort: {
					date: -1
				},
				limit: pages,
				skip: (page - 1) * pages
			});
			return turmas;
		},
		children: [{
			find: function(turma) {
				return Meteor.users.find({
					_id:turma.userId,
					aplicativoId:aplicativoId
				});
			}
		}]
	}
});
