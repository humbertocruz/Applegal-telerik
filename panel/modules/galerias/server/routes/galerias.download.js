Picker.route('/fotoDaGaleria/:foto_id/:aplicativo_id', function(params, req, res, next) {
	try {
		var foto = Foto.findOne({
			_id:params.foto_id,
			aplicativoId:aplicativo_id
		});
		res.writeHead(200, {'Content-Type': 'image' });
		gm(foto.path).autoOrient().resize(320).stream(function (err, stdout, stderr) {
			if (stdout) stdout.pipe(res);
		});
	} catch(err) {
		res.end();
	}
});
