Template.registerHelper('arquivoPath', function(public_id){
	if (!public_id) return '/images/photo.png';
	return CloudinaryBaseURL + '/' + public_id;
});
