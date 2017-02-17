var fs = require('fs');
Picker.route('/escalas/download/:escala_id', function(params, req, res, next) {
	var escala = Escala.findOne(params.escala_id);
	try {
		var file = fs.readFileSync(escala.uploaded.path, 'binary');
		res.setHeader('Content-Length', escala.uploaded.size);
		res.setHeader('Content-Disposition', 'attachment; filename="'+escala.uploaded.originalname+'"');
		res.setHeader('Content-Type', escala.uploaded.mimetype);
		res.write(file, 'binary');
		res.end();
	} catch(err) {
		res.end();
	}
});
