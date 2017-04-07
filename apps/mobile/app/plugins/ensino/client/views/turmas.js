Controller('turmasView', {
	created: function() {
		var me = this;
		topTitleVar.set('Ensino - Turmas');
		backBtnRouteVar.set({
			route:'ensinoRoute',
			params:{}
		});
		me.autorun(function(){
			me.subscribe("appTurmas", {
				cursoId:FlowRouter.getParam('cursoId')
			});
			me.subscribe('appCursos',{
				_id:FlowRouter.getParam('cursoId')
			});
			me.subscribe('appAluno');
		});
	},
	rendered: function() {

	},
	helpers: {
		hasRequisitos:function(){
			var curso = Curso.findOne(this.cursoId);
			if (curso.requisito=='') return true;
			var requisito = curso.requisito;
			var alunos = Aluno.find({
				cursoId:requisito,
				approved:true
			}).count();
			return (alunos==0?false:true);
		},
		alreadySubs:function(){
			var alunos = Aluno.find({
				cursoId:this.cursoId
			});
			if (alunos.count()>0) return alunos.fetch()[0].turmaId;
			else return false;
		},
		curso:function(){
			return Curso.findOne(FlowRouter.getParam('cursoId'));
		},
		turmas: function() {
			return Turma.find({
				cursoId:FlowRouter.getParam('cursoId')
			}, {
				sort: {
					order: 1
				}
			}).fetch();
		},
		userInscrito:function(){
			return true;
		}
	},
	events: {
		'click #ensinoCadastroEvent': function(e, t) {
			e.preventDefault();
			var me = this;
			htmlConfirm('Inscrição no Curso', 'Você tem Certeza?', function() {
				Meteor.call("eventoCadastro", me._id, FlowRouter.getParam('cursoId'), function(error, result) {
					if (error) {
						console.log("error", error);
					}
					if (result) {
						Bert.alert('Você se inscreveu no curso com sucesso.', 'success');
					}
				});
			});
		}
	}
});
