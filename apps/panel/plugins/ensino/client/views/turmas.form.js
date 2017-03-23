Controller('ensinoTurmasFormView', {
	rendered: function() {
		var id = FlowRouter.getParam('id');
		if (id) {
			var curso = Curso.findOne(id);
			$('#turmasForm').form('set values', curso);
		}
	},
	helpers: {
	},
	events: {
		'submit #turmasForm': function(e, t) {
			e.preventDefault();
			var fields = $(e.currentTarget).form('get values');
			fields._id = FlowRouter.getParam('turmaId');
			fields.cursoId = FlowRouter.getParam('cursoId');

			Meteor.call("turmasForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Turma salva com sucesso', 'success');
					FlowRouter.go('ensinoTurmasRoute',{
						aplicativoId:FlowRouter.getParam('aplicativoId'),
						cursoId:FlowRouter.getParam('cursoId')
					});
				}
			});
		}
	}
});
