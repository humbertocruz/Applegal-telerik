Controller('homeView', {
	created: function() {
		topTitleVar.set('Home');
		Tracker.autorun(function(){
			//Meteor.subscribe('allNoticias');
		});
	},
	rendered: function() {
		// Aparece os icones dos módulos conforme a configuração
		var app = Aplicativo.findOne();
		$('.iconAlpha').transition({
			animation: app.iconAnimation,
			durantion: 1000,
			interval: 50
		});
	},
	helpers: {
		userId: function() {
			return Meteor.userId();
		},
		modulos:function(){
			var appMods = AplicativoModulo.find().fetch();
			return appMods;
		},
		appLogo:function(){
			var app = Aplicativo.findOne();
			if (!app) return false;
			return appLogo.baseURL+'/md5/'+app.appLogo().md5;
		}
	},
	events: {
		'click .moduloClickEvent':function(e,t){
			var me = this;
			$(e.currentTarget).transition('jiggle',function(){
				FlowRouter.go(me.modulo().path);
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
