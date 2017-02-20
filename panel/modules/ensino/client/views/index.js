Controller('turmasView', {
	created: function() {
		selectCursoVar = new ReactiveVar();
		alunosSearchVar = new ReactiveVar({});
		Tracker.autorun(function() {
			allTurmas = Meteor.subscribe('allTurmas', alunosSearchVar.get(), FlowRouter.getQueryParam('page'));
		});
	},
	rendered: function() {},
	helpers: {
		ready: function() {
			return allTurmas.ready();
		},
		header: function() {
			return {
				title: 'Alunos',
				icon: 'student'
			}
		},
		newLink: function() {
			return {
				title: 'Adicionar'
			}
		},
		extraLinks: function() {
			return [{
				title: 'Professores',
				route: 'ensinoProfessoresRoute',
				icon: 'sidebar'
			}, {
				title: 'Cursos',
				route: 'ensinoCursosRoute',
				icon: 'sidebar'
			}, {
				title: 'Turmas',
				route: 'ensinoTurmasRoute',
				icon: 'sidebar'
			}];
		},
		cursos: function() {
			return Curso.find({}, {
				sort: {
					order: 1
				}
			}).fetch();
		},
		selectCurso: function() {
			return selectCursoVar.get();
		},
		alunos: function() {
			var page = FlowRouter.getQueryParam('page');
			if (!page) page = 1;
			var qtd = 10;
			var alunos = Turma.find(alunosSearchVar.get(), {
				sort: {
					date: -1
				},
				limit: qtd,
				skip: (page - 1) * qtd
			}).fetch();

			$('.ui.progress').progress({
				duration: 200,
				total: Math.ceil(Counts.get('allTurmas') / qtd),
				value: page
			});
			return {
				page: FlowRouter.getQueryParam('page'),
				data: alunos,
				count: Counts.get('allTurmas'),
				pages: Math.ceil(Counts.get('allTurmas') / qtd)
			};
		}
	},
	events: {
		'click #addBtn': function(e, t) {

		},
		'click .selectCursoEvent': function(e, t) {
			e.preventDefault();
			var me = this;
			selectCursoVar.set(me._id);
			var search = {
				cursoId: me._id
			};
			alunosSearchVar.set(search);
		}
	}
});
