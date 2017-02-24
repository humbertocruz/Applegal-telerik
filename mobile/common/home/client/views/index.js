Controller('homeView', {
	created: function() {
		topTitleVar.set('Home');
		Tracker.autorun(function(){
			Meteor.subscribe('allNoticias', currentFilialVar.get());
		});
	},
	rendered: function() {

	},
	helpers: {
		userId: function() {
			return Meteor.userId();
		},
		locationOrigin: function() {
			if (location.origin == "http://localhost:4000") {
				return "http://localhost:3000";
			} else {
				return 'https://admin.gremiopioneiro.com.br';
			}
		},
		modulos:function(){
			var appMods = AplicativoModulo.find().fetch();
			return appMods;
		}
	},
	events: {
		'click #showPhoneNumber': function(e, t) {
			return window.plugins.sim.getSimInfo(

				function(result) {
					$('#numberField').val(result.phoneNumber);
				},
				function(error) {
					return error;
				}
			);
		}
	}
});
