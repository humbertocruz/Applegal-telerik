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
	},
	helpers: {
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
		}
	}
});
