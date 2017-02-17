Picker.route('/upload/documentos/:id/:aplicativoId', function(params, req, res, next) {
	if (!this.userId) return false;
	var groups = Roles.getGroupsForUser(this.userId, 'gerente');
	if (!_.contains(groups,params.aplicativoId)) return false;
	
	var fs = require('fs');
	var dir = '/upload/'+DomainAppVar.appGroup+'/documentos/';
	try {
		fs.mkdirSync(dir);
	} catch(e) {
		console.log(e);
	}
	var documento = Documento.findOne({
		_id:params.id,
		aplicativoId: params.aplicativoId
	});
	_.each(req.files,function(uploaded){
		try {
			if (documento.uploaded) {
				fs.unlinkSync(documento.uploaded.path);
			}
		} catch(e) {
			console.log(e);
		}
		fs.renameSync('/upload/tmp/'+uploaded.filename, dir+uploaded.filename);
		uploaded.destination = dir;
		uploaded.path = dir+uploaded.filename;
		Documento.update(params.id,{
			$set:{
				uploaded:uploaded
			}
		});
	});
	res.end('ok');
});
