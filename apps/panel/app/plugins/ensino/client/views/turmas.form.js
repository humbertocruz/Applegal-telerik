Controller('ensinoTurmasFormView', {
	created: function() {
		var me = this;
		provasVar = new ReactiveVar([]);
		trabalhosVar = new ReactiveVar([]);
		me.autorun(function() {
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var turmaId = FlowRouter.getParam('turmaId');
			oneTurma = me.subscribe("appTurmas", 1, false, aplicativoId, turmaId);
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
		turma:function(){
			var turma = Turma.findOne(FlowRouter.getParam('turmaId'));
			return turma;
		},
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
		'submit #addProvaForm':function(e,t){
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			provasVar.get().push({date:moment(fields.new_prova_date).toDate()});
			Meteor.call("turmasForm", {_id:FlowRouter.getParam('turmaId'),provas:provasVar.get()}, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('Data da Prova adicionada com sucesso','success');
				}
			});
		},
		'submit #addTrabalhoForm':function(e,t){
			console.log('novo trabalho');
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			trabalhosVar.get().push({date:moment(fields.new_trabalho_date).toDate()});
			Meteor.call("turmasForm", {_id:FlowRouter.getParam('turmaId'),trabalhos:trabalhosVar.get()}, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('Data do Trabalho adicionada com sucesso','success');
				}
			});
		},
		'click .removeProvaDate':function(e,t){
			var me = this;
			var found = false;
			_.each(provasVar.get(),function(prova,idx){
				var clicked = moment(me.date).format('YYYY-MM-DD');
				var loop = moment(prova.date).format('YYYY-MM-DD');
				if (clicked == loop) found = idx;
			});
			var provas = provasVar.get();
			provas.splice(found,1);
			provasVar.set(provas);
			Meteor.call("turmasForm", {_id:FlowRouter.getParam('turmaId'),provas:provasVar.get()}, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('Data da Prova removida com sucesso','success');
				}
			});
		},
		'click .removeTrabalhoDate':function(e,t){
			var me = this;
			var found = false;
			_.each(trabalhosVar.get(),function(prova,idx){
				var clicked = moment(me.date).format('YYYY-MM-DD');
				var loop = moment(prova.date).format('YYYY-MM-DD');
				if (clicked == loop) found = idx;
			});
			var trabalhos = trabalhosVar.get();
			trabalhos.splice(found,1);
			trabalhosVar.set(provas);
			Meteor.call("turmasForm", {_id:FlowRouter.getParam('turmaId'),trabalhos:trabalhosVar.get()}, FlowRouter.getParam('aplicativoId'), function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					 Bert.alert('Data do Trabalho removida com sucesso','success');
				}
			});
		},
		'submit #turmasForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields._id = FlowRouter.getParam('turmaId');
			fields.cursoId = FlowRouter.getParam('cursoId');
			if (!fields._id) {
				fields.canAdd = false;
				fields.isDone = false;
			}
			fields.provas = provasVar.get();
			fields.trabalhos = trabalhosVar.get();
			console.log(fields);
			Meteor.call("turmasForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Turma salva com sucesso', 'success');
					FlowRouter.go('ensinoRoute',{
						aplicativoId:FlowRouter.getParam('aplicativoId')
					});
				}
			});
		}
	}
});
