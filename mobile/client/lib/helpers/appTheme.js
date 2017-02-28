Template.registerHelper("appThemeText", function(){
	var app = Aplicativo.findOne();
	if (!app) return false;
	if (app.theme == 'lighten') return '';
	else return 'inverted';
});

Template.registerHelper("appThemeBgColor", function(){
	var app = Aplicativo.findOne();
	if (!app) return false;
	if (app.theme == 'lighten') return 'rgba(255,255,255,.3) !important';
	else return 'rgba(0,0,0,.3) !important';
});

Template.registerHelper("iconRGBA", function(){
	var app = Aplicativo.findOne();
	if (!app) return false;
	var alpha = app.iconOpacity;
	var iconColor = _.where(semanticColors,{className:app.iconColor});
	var rgb = hexToRgb(iconColor[0].rgb);
	return 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')';
});

Template.registerHelper("menusRGBA", function(){
	var app = Aplicativo.findOne();
	if (!app) return false;
	var alpha = app.headersOpacity;
	var menusColor = _.where(semanticColors,{className:app.headerBackgroundColor});
	var rgb = hexToRgb(menusColor[0].rgb);
	return 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')';
});
