Controller('alunosView', {
	created: function() {
		topTitleVar.set('Alunos');
	},
	rendered: function() {

	},
	helpers: {
		cursos: function() {
			return Curso.find({}, {
				sort: {
					order: 1
				}
			}).fetch();
		},
		status: function() {
			var me = this;
			var userCurso = Aluno.findOne({
				userId: Meteor.userId(),
				cursoId: me._id
			});
			if (!userCurso) return 'nothing';
			if (userCurso.approved) return 'done';
			else return 'doing';
		},
		nameCursoRequerido: function() {
			var curso = Curso.findOne(this.requisito);
			return curso.name;
		},
		hasRequisitos: function() {
			var me = this;
			var userCursos = Aluno.find({
				userId: Meteor.userId(),
				approved: true
			}).fetch();
			var requisito = me.requisito;
			if (!requisito) return '';
			var test = 'disabled'
			_.each(userCursos, function(c, idx) {
				if (c.cursoId == requisito) test = '';
			});
			return test;
		}
	},
	events: {
		'click .signUpEvent': function(e, t) {
			e.preventDefault();
			var me = this;
			htmlConfirm('Inscrição no Curso', 'Você tem Certeza?', function() {
				Meteor.call("signUpEvent", me._id, function(error, result) {
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
