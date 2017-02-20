
Picker.route('/upload/galerias/:id/:aplicativo_id', function(params, req, res, next) {
	var fs = require('fs');
	var dir = '/upload/'+aplicativo_id+'/galerias/';
	try {
		fs.mkdirSync(dir);
	} catch(e) {
		console.log(e);
	}
	_.each(req.files,function(uploaded){
		fs.renameSync('/upload/tmp/'+uploaded.filename, dir+uploaded.filename);
		uploaded.destination = dir;
		uploaded.path = dir+uploaded.filename;
		uploaded.galeria_id = params.id;
		uploaded.appGroup = DomainAppVar.appGroup;
		Foto.insert(uploaded);
	});
	res.end('ok');
});
