Controller('ensinoTurmasFormView', {
	created: function() {
		provasVar = new ReactiveVar([]);
		trabalhosVar = new ReactiveVar([]);
		Tracker.autorun(function() {
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var turmaId = FlowRouter.getParam('turmaId');
			oneTurma = Meteor.subscribe("oneTurma", turmaId, aplicativoId);
		});
	},
	rendered: function() {
		var id = FlowRouter.getParam('turmaId');
		if (id) {
			var turma = Turma.findOne(id);
			if (!turma) return false;
			$('#turmasForm').form('set values', turma);
			if (turma.provas) provasVar.set(turma.provas);
			if (turma.trabalhos) trabalhosVar.set(turma.trabalhos);
		}
	},
	helpers: {
		curso: function(){
			var curso = Curso.findOne(FlowRouter.getParam('cursoId'));
			return curso;
		},
		turmaProvas:function(){
			return provasVar.get();
		},
		turmaTrabalhos:function(){
			return trabalhosVar.get();
		}
	},
	events: {
		'click #newProvaEvent':function(e,t){
			e.preventDefault();
			var novaProva = {
				date:moment($('#newProvaDate').val()).toDate()
			}
			provasVar.get().push(novaProva);
		},
		'click #newProvaEvent':function(e,t){
			e.preventDefault();
			var novaTrabalho = {
				date:moment($('#newTrabalhoDate').val()).toDate()
			}
			trabalhosVar.get().push(novaTrabalho);
		},
		'submit #turmasForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields._id = FlowRouter.getParam('turmaId');
			fields.cursoId = FlowRouter.getParam('cursoId');
			fields.provas = provasVar.get();
			fields.trabalhos = trabalhosVar.get();

			Meteor.call("turmasForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Turma salva com sucesso', 'success');
					FlowRouter.go('ensinoTurmasRoute',{
						aplicativoId:FlowRouter.getParam('aplicativoId'),
						cursoId:FlowRouter.getParam('cursoId')
					});
				}
			});
		}
	}
});
