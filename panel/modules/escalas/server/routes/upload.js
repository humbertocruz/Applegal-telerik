var fs = require('fs');
var dir = '/upload/escalas/';
Picker.route('/upload/escalas/:id', function(params, req, res, next) {
	try {
		fs.mkdirSync(dir);
	} catch(e) {
		console.log(e);
	}
	var escala = Escala.findOne({
		_id:params.id,
		appGroup:DomainAppVar.appGroup
	});
	_.each(req.files,function(uploaded){
		try {
			if (escala.uploaded.path) {
				fs.unlinkSync(escala.uploaded.path);
			}
		} catch(e) {
			console.log(e);
		}
		fs.renameSync('/upload/tmp/'+uploaded.filename, dir+uploaded.filename);
		uploaded.destination = dir;
		uploaded.path = dir+uploaded.filename;
		Escala.update({
			_id:params.id,
			appGroup:DomainAppVar.appGroup
		},{
			$set:{
				uploaded:uploaded
			}
		});
	});
	res.end('escala ok');
});
