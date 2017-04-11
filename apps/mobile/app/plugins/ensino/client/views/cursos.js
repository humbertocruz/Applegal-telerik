Controller('ensinoView', {
	created: function() {
		var me = this;
		topTitleVar.set('Ensino');
		backBtnRouteVar.set({
			route:'homeRoute',
			params:{}
		});
		me.autorun(function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			me.subscribe('appCursos', {
				aplicativoId:app._id
			});
			me.subscribe('appAluno');
		});
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
		}
	},
	events: {
		'click .signUpEvent': function(e, t) {
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
