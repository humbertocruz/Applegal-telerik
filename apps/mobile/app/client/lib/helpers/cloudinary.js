Template.registerHelper("clUrl", function(public_id, options){
	// Se não tiver options, usa {}
	if (options) {
		var hash = options.hash;
	} else {
		var hash = {};
	}
	// Se não enviar o cloud_name, tentar com o Cloudinary Technotronics
	if (!hash.cloud_name) hash.cloud_name = 'technoapp';
	// Inicializa cloudinary
	var cl = cloudinary.Cloudinary.new({cloud_name:hash.cloud_name});

	// Retorna a url publica ou privativa
	var url = cl.url(public_id,hash).replace('http:','https:');
	return url;
});
