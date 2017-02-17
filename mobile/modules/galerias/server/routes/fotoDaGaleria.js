Picker.route('/fotoDaGaleria/:foto_id', function(params, req, res, next) {
	var fs = require('fs');
	var foto = Foto.findOne(params.foto_id);
	var img = fs.readFileSync('./'+foto.path);
	res.writeHead(200, {'Content-Type': 'image' });
	res.end(img, 'binary');
});
