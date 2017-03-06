Template.registerHelper('arquivoPath', function(public_id,options){
	if (!public_id) return '/images/photo.png';
	if (typeof(options) == 'string') {
		public_id = options + '/' + public_id;
	}
	return CloudinaryBaseURL + '/' + public_id;
});
