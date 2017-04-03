Controller('ensinoAlunosView', {
	created: function() {
		var me = this;
		me.autorun(function() {
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var turmaId = FlowRouter.getParam('turmaId');
			appAlunos = me.subscribe('appAlunos', page, turmaId, aplicativoId);
		});
	},
	rendered: function() {},
	helpers: {
		cursoId:function(){
			var turma = Turma.findOne(FlowRouter.getParam('turmaId'));
			return (turma ? turma.cursoId : false);
		},
		turma: function(){
			var turma = Turma.findOne(FlowRouter.getParam('turmaId'));
			return turma;
		},
		alunos: function() {
			var alunos = Aluno.find({
				turmaId:FlowRouter.getParam('turmaId')
			});
			return {
				data:alunos.fetch(),
				count:Counts.get('appAlunos'),
				page:FlowRouter.getQueryParam('page'),
				pages:1
			}
		}
	},
	events: {
	}
});
