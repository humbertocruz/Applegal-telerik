// ToDo
// Essa server-route não tem segurança pois disponibiliza qq documento de qualquer aplicativo para quem tiver a url
// a chave documento_id é complexa mas não garante a segurança

Picker.route('/documentos/download/:documento_id', function(params, req, res, next) {
	var fs = require('fs');
	var doc = Documento.findOne(params.documento_id);
	try {
		var file = fs.readFileSync(doc.uploaded.path, 'binary');
		res.setHeader('Content-Length', doc.uploaded.size);
		res.setHeader('Content-Disposition', 'attachment; filename="'+doc.uploaded.originalname+'"');
		res.setHeader('Content-Type', doc.uploaded.mimetype);
		res.write(file, 'binary');
		res.end();
	} catch(err) {
		res.end();
	}
});
