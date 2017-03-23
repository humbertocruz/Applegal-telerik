Controller('ensinoTurmasView', {
	created: function() {
		Tracker.autorun(function() {
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var cursoId = FlowRouter.getParam('cursoId');
			appTurmas = Meteor.subscribe('appTurmas', page, cursoId, aplicativoId);
			oneCurso = Meteor.subscribe("oneCurso", cursoId);
		});
	},
	rendered: function() {},
	helpers: {
		curso: function(){
			var curso = Curso.findOne(FlowRouter.getParam('cursoId'));
			return curso;
		},
		turmas: function() {
			return Turma.find({
				cursoId:FlowRouter.getParam('cursoId')
			}, {
				sort: {
					order: 1
				}
			}).fetch();
		}
	},
	events: {
	}
});
