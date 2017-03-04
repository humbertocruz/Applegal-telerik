Controller('homeView', {
	created: function() {
		topTitleVar.set('Home');
	},
	rendered: function() {
		// Aparece os icones dos módulos conforme a configuração
		var app = Aplicativo.findOne();

		$('.iconAlpha').transition({
			animation: app.iconAnimation,
			durantion: app.iconDuration,
			interval: app.iconInterval
		});
	},
	helpers: {
		userId: function() {
			return Meteor.userId();
		},
		modulos:function(){
			var appMods = AplicativoModulo.find().fetch();
			return appMods;
		}
	},
	events: {
		'click .moduloClickEvent':function(e,t){
			var me = this;
			$(e.currentTarget).transition('jiggle',function(){
				FlowRouter.go(me.modulo().route);
			});
		},
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
