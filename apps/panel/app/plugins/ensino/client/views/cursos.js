Controller('cursosView', {
	created: function() {
		var me = this;
		me.autorun(function() {
			var page = FlowRouter.getQueryParam('page');
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			appCursos = me.subscribe('appCursos', page, aplicativoId);
		});
	},
	rendered: function() {
		$('.ui.checkbox').checkbox();
		$('.ui.popup').popup({
			inline:true
		});
	},
	helpers: {
		dateId:function(date){
			return moment(date).format('YYYY_MM_DD');
		},
		provasAluno:function(){
			var turma = Turma.findOne(this.turmaId);
			var provasAluno = [];
			var me = this;
			_.each(turma.provas,function(prova){
				var nota = false;
				_.each(this.notas,function(nnota,idx){
					if (moment(nnota.date).format('YYYY_MM_DD') == moment(prova.date).format('YYYY_MM_DD')){
						nota = nnota;
					}
				});
				console.log(nota);
				if (!nota) {
					console.log();
					if (moment(prova.date).diff(moment(),'days') >= 0) nota = 'Por Fazer';
					else nota = 'Não Encontrada!';
				}
				provasAluno.push({
					date:prova.date,
					nota:nota,
					alunoId:me._id,
					turmaId:me.turmaId
				});
			});
			return provasAluno;
		},
		trabalhosAluno:function(){
			var turma = Turma.findOne(this.turmaId);
			return turma.trabalhos;
		},
		turmaSetColor:function(){
			if (this.isDone) return 'negative';
			if (this.canAdd) return 'positive';
			return 'warning';
		},
		canAddSet:function(){
			console.log(this.canAdd);
		},
		isDoneSet:function(){
			console.log(this.isDone);
		},
		cursos: function() {
			var cursos = Curso.find({
				aplicativoId:FlowRouter.getParam('aplicativoId')
			}, {
				limit:15,
				sort: {
					order: 1
				}
			});
			return {
				data:cursos.fetch(),
				count:Counts.get('appCursos'),
				page:FlowRouter.getQueryParam('page'),
				pages:(FlowRouter.getQueryParam('page')-1)/15
			}
		}
	},
	events: {
		'click .showTurmasEvent':function(e,t){
			$(e.currentTarget).parent().parent().next('.turmasRow').transition('toggle');
			$('.ui.checkbox').checkbox({
				onChecked:function(){
					if ($(this).attr('name')=='canAdd') {
						Meteor.call("turmasCanAdd", {id:$(this).data('turma'),value:true}, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('A turma está aceitando inscrições!','success');
							}
						});
					}
					if ($(this).attr('name')=='isDone') {
						Meteor.call("turmasIsDone", {id:$(this).data('turma'),value:true}, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('A turma está encerrada!','success');
							}
						});
					}
				},
				onUnchecked:function(){
					if ($(this).attr('name')=='canAdd') {
						Meteor.call("turmasCanAdd", {id:$(this).data('turma'),value:false}, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('A turma não está mais aceitando inscrições!','success');
							}
						});
					}
					if ($(this).attr('name')=='isDone') {
						Meteor.call("turmasIsDone", {id:$(this).data('turma'),value:false}, function(error, result){
							if(error){
								console.log("error", error);
							}
							if(result){
								Bert.alert('A turma voltou a estar ativa!','success');
							}
						});
					}
				}
			});
		},
		'click .showAlunosEvent':function(e,t){
			$(e.currentTarget).parent().parent().next('.alunosRow').transition('toggle');
			$('.ui.checkbox').checkbox();
		},
		'click .showProvasEvent':function(e,t){
			$(e.currentTarget).parent().parent().next('.provasRow').transition('toggle');
		},
		'click .saveNotaAluno':function(e,t){
			var me = this;
			me.nota = $('#turma_'+me.turmaId+'_aluno_'+me.alunoId+'_data_'+moment(me.date).format('YYYY_MM_DD')).find('input').val();
			Meteor.call("alunoChangeNota", me, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					Bert.alert('Nota do Aluno salva com sucesso!','success');
				}
			});
		},
		'click .showTrabalhosEvent':function(e,t){
			$(e.currentTarget).parent().parent().next().next('.trabalhosRow').transition('toggle');
		}
	}
});
