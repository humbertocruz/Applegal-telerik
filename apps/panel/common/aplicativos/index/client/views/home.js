Controller('aplicativosHomeView',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
	}
});
