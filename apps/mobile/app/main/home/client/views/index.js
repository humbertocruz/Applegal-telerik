Controller('homeView', {
	created: function() {
		topTitleVar.set('Home');
		backBtnRouteVar.set();
	},
	rendered: function() {
		// Aparece os icones dos módulos conforme a configuração
		var app = Aplicativo.findOne();

		$('.iconAlpha').transition({
			animation: app.home.iconAnimation,
			durantion: app.home.iconDuration,
			interval: app.home.iconInterval
		});
	},
	helpers: {
		userId: function() {
			return Meteor.userId();
		},
		plugins:function(){
			var appPlugs = AplicativoPlugin.find().fetch();
			return appPlugs;
		}
	},
	events: {
		'click .pluginClickEvent':function(e,t){
			var me = this;
			$(e.currentTarget).transition('jiggle',function(){
				FlowRouter.go(me.plugin().route);
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
