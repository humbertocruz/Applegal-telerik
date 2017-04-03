Controller('cursosView', {
	created: function() {
		var me = this;
		me.autorun(function() {
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			appCursos = me.subscribe('appCursos', page, aplicativoId);
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
