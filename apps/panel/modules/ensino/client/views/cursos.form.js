Controller('ensinoCursosFormView', {
	created: function() {
		alunosSearchVar = new ReactiveVar({});
	},
	rendered: function() {
		var id = FlowRouter.getParam('id');
		if (id) {
			var curso = Curso.findOne(id);
			$('#cursosForm').form('set values', curso);
		}
		$('#requisitoField').dropdown();
	},
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
				route: 'alunosCursosInsertRoute'
			}
		},
		extraLinks: function() {
			return [{
				title: 'Cancelar',
				route: 'ensinoCursosRoute',
				icon: 'close'
			}];
		},
		saveLink: function() {
			return {
				title: 'Salvar',
				icon: 'save',
				form: 'cursosForm'
			}
		},
		requisitos: function() {
			var requisitos = Curso.find({
				_id: {
					$ne: FlowRouter.getParam('id')
				}
			}, {
				sort: {
					name: 1
				}
			}).fetch();
			return requisitos;
		}
	},
	events: {
		'submit #cursosForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			if (id = FlowRouter.getParam('id')) fields._id = id;
			Meteor.call("cursosForm", fields, function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Curso salvo com sucesso', 'success');
					FlowRouter.go('alunosCursosRoute');
				}
			});
		}
	}
});
