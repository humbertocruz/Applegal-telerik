Controller('ensinoCursosView', {
	created: function() {
		alunosSearchVar = new ReactiveVar({});
	},
	rendered: function() {},
	helpers: {
		ready: function() {
			return true;
		},
		header: function() {
			return {
				title: 'Alunos - Cursos',
				icon: 'student'
			}
		},
		newLink: function() {
			return {
				title: 'Adicionar',
				route: 'ensinoCursosInsertRoute'
			}
		},
		extraLinks: function() {
			return [{
				title: 'Cancelar',
				route: 'ensinoRoute',
				icon: 'close'
			}];
		},
		cursos: function() {
			var alunos = Curso.find(alunosSearchVar.get(), {
				sort: {
					order: 1
				}
			}).fetch();
			return alunos;
		}
	},
	events: {
		'click #addBtn': function(e, t) {

		}
	}
});
