Controller('aniversariantesView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			var appId = FlowRouter.getParam('aplicativoId');
			appAniversariantes = Meteor.subscribe("appAniversariantes", appId);
		});
	},
	helpers:{
		aniversariantes:function(){
			var search = {
				'roles':FlowRouter.getParam('aplicativoId')
			};
			var users = Meteor.users.find(search);
			console.log(users.fetch());
			return {
				data:users.fetch()
			};
		}
	}
});
