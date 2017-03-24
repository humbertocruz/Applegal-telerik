Controller('turmasView', {
	created: function() {
		topTitleVar.set('Ensino - Turmas');
	},
	rendered: function() {

	},
	helpers: {
		turmas: function() {
			return Turma.find({
				cursoId:FlowRouter.getParam('cursoId')
			}, {
				sort: {
					order: 1
				}
			}).fetch();
		},
		status: function() {
			var me = this;
			var userTurma = Aluno.findOne({
				userId: Meteor.userId(),
				cursoId: me.cursoId,
				turmaId: me._id
			});
			if (!userTurma) return 'nothing';
			if (userTurma.approved) return 'done';
			else return 'doing';
		},
		nameCursoRequerido: function() {
			var curso = Curso.findOne(this.requisito);
			return curso.name;
		},
		hasRequisitos: function() {
			var me = this;
			var userTurma = Aluno.find({
				userId: Meteor.userId(),
				cursoId: me.cursoId,
				approved: true
			}).fetch();
			var requisito = me.requisito;
			if (!requisito) return '';
			var test = 'disabled'
			_.each(userTurma, function(c, idx) {
				if (c.cursoId == requisito) test = '';
			});
			return test;
		}
	},
	events: {
		'click #ensinoCadastroEvent': function(e, t) {
			e.preventDefault();
			var me = this;
			htmlConfirm('Inscrição no Curso', 'Você tem Certeza?', function() {
				Meteor.call("eventoCadastro", me._id, function(error, result) {
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
