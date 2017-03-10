Template.registerHelper("clUrl", function(public_id, options){
	var arq = Arquivo.findOne({
		public_id:public_id
	});
	if (!arq) return false;
	var cl = cloudinary.Cloudinary.new({cloud_name:arq.cloud_name});
	options.hash.type = arq.type;
	if (arq.type == 'authenticated') {
		options.hash.sign_url = true;
	}
	return cl.url(public_id,options.hash);
});
