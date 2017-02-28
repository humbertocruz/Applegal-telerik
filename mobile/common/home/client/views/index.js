Controller('homeView', {
	created: function() {
		topTitleVar.set('Home');
		Tracker.autorun(function(){
			Meteor.subscribe('allNoticias', currentFilialVar.get());
		});
	},
	rendered: function() {
		Meteor.setTimeout(function(){
			$('.iconAlpha').each(function(ic,ix){
				var bg = $(ix).css('backgroundColor').split('(')[1];
				bg = bg.split(')')[0];
				bg = bg.split(',');
				var alpha = Aplicativo.findOne().iconOpacity;
				rgba = 'rgba('+bg[0]+''+bg[1]+','+bg[2]+','+alpha+') !important';
				$(ix).css('backgroundColor',rgba);

			});
		},1000);
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
