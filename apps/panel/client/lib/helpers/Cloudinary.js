Template.registerHelper("CloudinaryBaseURL", function(public_id, options){
	return CloudinaryBaseURL + '/' + options + '/' + public_id;
});

Template.registerHelper("clUrl", function(public_id, options){
	return $.cloudinary.url(public_id,{crop:'scale',width:150});
});
