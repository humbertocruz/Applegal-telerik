Arquivo = new FileCollection('arquivos', {
	resumable: true,
	resumableIndexName: 'appL',
	maxUploadSize:15728640,
	http: [
		{
			method: 'get',
			path: '/md5/:md5',
			lookup: function (params, query) {
				return {
					'md5': params.md5
				};
			},
			handler: function(req, res, next) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Credentials', true);
				return next();
			}
		}
	]
});
