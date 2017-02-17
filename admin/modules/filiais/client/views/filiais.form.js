Controller('filiaisFormView', {
	created: function() {
		filiaisSearchVar = new ReactiveVar({});
	},
	rendered: function() {
		var id = FlowRouter.getParam('id');
		if (id) {
			var filial = Filial.findOne(id);
			$('#filiaisForm').form('set values', filial);
		}
	},
	helpers: {
		ready: function() {
			return true;
		},
		header: function() {
			return {
				title: (FlowRouter.getParam('id') == undefined ? 'Inserir Filial' : 'Editar Filial'),
				icon: 'building'
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
				form: 'filiaisForm'
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
		'submit #filiaisForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			if (id = FlowRouter.getParam('id')) fields._id = id;
			Meteor.call("filiaisForm", fields, function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Filial salva com sucesso', 'success');
					FlowRouter.go('filiaisRoute');
				}
			});
		}
	}
});
