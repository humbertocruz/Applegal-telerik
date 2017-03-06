Template.registerHelper("CloudinaryBaseURL", function(public_id, options){
	return CloudinaryBaseURL + '/' + options + '/' + public_id;
});
