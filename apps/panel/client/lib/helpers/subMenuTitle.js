Template.registerHelper("subMenuTitle", function(argument){
	return subMenuTitleVar.get();
});
Template.registerHelper("extraLinks", function(argument){
	return extraLinksVar.get();
});
Template.registerHelper("saveLink", function(){
	return saveLinkVar.get();
});
