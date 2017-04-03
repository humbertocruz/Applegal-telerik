Controller('configMenu',{
	created:function(){
		Meteor.call("setServerAppId", FlowRouter.getParam('aplicativoId'));
		Tracker.autorun(function(){
			appCloudinary = Meteor.subscribe("AppCloudinary", FlowRouter.getParam('aplicativoId'));
		});
	},
	helpers:{
		app:function(){
			if (!appCloudinary.ready()) return false;
			var app = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
			app.cloudinary = AppCloudinary.findOne({aplicativoId:app._id});
			return app;
		}
	}
});
