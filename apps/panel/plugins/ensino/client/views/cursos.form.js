Controller('ensinoCursosFormView', {
	created: function() {
		Tracker.autorun(function() {
			var aplicativoId = FlowRouter.getParam('aplicativoId');
			var cursoId = FlowRouter.getParam('cursoId');
			oneCurso = Meteor.subscribe("oneCurso", cursoId, aplicativoId);
		});
	},
	rendered: function() {
		var id = FlowRouter.getParam('cursoId');
		if (id) {
			var curso = Curso.findOne(id);
			$('#cursosForm').form('set values', curso);
		}
		$('#requisitoField').dropdown();
	},
	helpers: {
		requisitos: function() {
			var requisitos = Curso.find({
				_id: {
					$ne: FlowRouter.getParam('cursoId')
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
			Meteor.call("cursosForm", fields, FlowRouter.getParam('aplicativoId'), function(error, result) {
				if (error) {
					console.log("error", error);
				}
				if (result) {
					Bert.alert('Curso salvo com sucesso', 'success');
					FlowRouter.go('ensinoRoute',{aplicativoId:FlowRouter.getParam('aplicativoId')});
				}
			});
		}
	}
});
