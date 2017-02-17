var fs = require('fs');
Picker.route('/escalas/view/:escala_id', function(params, req, res, next) {
	try {
		var escala = Escala.findOne(params.escala_id);
		var file = fs.readFileSync(escala.uploaded.path,'binary');
		res.setHeader('access-control-allow-origin', '*');
		res.setHeader('Content-Length', escala.uploaded.size);
		res.setHeader('Content-Type', escala.uploaded.mimetype);
		res.write(file, 'binary');
		res.end();
	} catch(err) {
		res.end();
	}
});
