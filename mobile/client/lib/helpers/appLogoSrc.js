Template.registerHelper("appLogoSrc", function(){
	var logo = Aplicativo.findOne().appLogo();
	return appLogo.baseURL+'/md5/'+logo.md5;
});
