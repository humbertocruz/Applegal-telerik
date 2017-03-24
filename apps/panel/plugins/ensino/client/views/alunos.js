Controller('ensinoAlunosView', {
	created: function() {
		Tracker.autorun(function() {
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var turmaId = FlowRouter.getParam('turmaId');
			appTurmas = Meteor.subscribe('appAlunos', page, turmaId, aplicativoId);
			oneCurso = Meteor.subscribe("oneTurma", turmaId);
		});
	},
	rendered: function() {},
	helpers: {
		turma: function(){
			var turma = Turma.findOne(FlowRouter.getParam('turmaId'));
			return turma;
		},
		alunos: function() {
			return Aluno.find({
				turmaId:FlowRouter.getParam('turmaId')
			}, {
				sort: {
					name: 1
				}
			}).fetch();
		}
	},
	events: {
	}
});
