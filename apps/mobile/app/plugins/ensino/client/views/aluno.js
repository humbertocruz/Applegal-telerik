Controller('alunoView',{
	created:function(){
		var me = this;
		backBtnRouteVar.set({
			route:'ensinoRoute',
			params:{}
		});
		me.autorun(function(){
			appTurmas = me.subscribe("appTurmas",{
				_id:FlowRouter.getParam('turmaId')
			});
			if (appTurmas.ready()) {
				$('.ui.accordion').accordion();
			}
		});
	},
	rendered:function(){

	},
	helpers:{
		notasColor:function(nota){
			if (parseFloat(nota) < 5) return 'red';
			if (parseFloat(nota) < 8) return 'orange';
			if (parseFloat(nota) <= 10) return 'green';
		},
		suaMedia:function(){
			var turmaId = FlowRouter.getParam('turmaId');
			var aluno = Aluno.findOne({
				turmaId:turmaId
			});
			var notas = _.pluck(aluno.provas,'nota');
			var provas = Turma.findOne(FlowRouter.getParam('turmaId')).provas;
			var soma = 0;
			_.each(notas,function(nota){
				soma+=parseFloat(nota);
			});
			return parseFloat(soma/provas.length).toFixed(2);
		},
		suaNota:function(){
			var ndate = moment(this.date).startOf('day');
			var turmaId = FlowRouter.getParam('turmaId');
			var aluno = Aluno.findOne({
				turmaId:turmaId
			});
			var nota = 0;
			_.each(aluno.provas,function(prova){
				if (moment(prova.date).isSame(ndate)) nota = parseFloat(prova.nota);
			});
			return nota.toFixed(2);
		},
		turma:function(){
			if (!appTurmas.ready()) return [];
			var turma = Turma.find(FlowRouter.getParam('turmaId')).fetch();
			return turma;
		}
	}
});
