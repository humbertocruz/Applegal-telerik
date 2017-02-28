Template.registerHelper("appLogo", function(){
	var app = Aplicativo.findOne();
	if (!app) return false;
	return 'https://panel.applegal.com.br'+appLogo.baseURL+'/md5/'+app.appLogo().md5;
});
