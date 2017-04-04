Meteor.methods({
	loadAppByCode:function(code){
		 var app = Aplicativo.findOne({
			 'info.code':code.code
		 });
		 if (!app) return false;
		 var agora = moment();
		 if (app.info.code_time < agora) return false;
		 return app;
	}
});
