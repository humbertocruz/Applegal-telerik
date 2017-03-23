Controller('cursosView', {
	created: function() {
		Tracker.autorun(function() {
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			appCursos = Meteor.subscribe('appCursos', page, aplicativoId);
		});
	},
	rendered: function() {},
	helpers: {
		cursos: function() {
			return Curso.find({}, {
				sort: {
					order: 1
				}
			}).fetch();
		}
	},
	events: {
	}
});
