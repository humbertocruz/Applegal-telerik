Arquivo = new FileCollection('arquivos', {
	resumable: true,
	resumableIndexName: 'appL',
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
		},
		{
       method: 'head',
       path: '/_resumable',
       lookup: function(params, query){},
       handler: function(req, res, next) {
        if (req.headers && req.headers.origin) {
          res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
          res.setHeader('Access-Control-Allow-Credentials', true);
				}
        next();
        return;
			}
    },
		{
       method: 'post',
       path: '/_resumable',
       lookup: function(params, query) {},
       handler: function(req, res, next) {
        if (req.headers && req.headers.origin) {
           res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
           res.setHeader('Access-Control-Allow-Credentials', true);
				}
        next();
        return;
			}
    },
    {
       method: 'options',
       path: '/_resumable',
       lookup: function(params, query) {},
       handler: function(req, res, next) {
        if (req.headers && req.headers.origin) {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'x-auth-token, user-agent',
            'Access-Control-Allow-Methods': 'POST, HEAD'
					});
          res.end();
          return;
				}
			}
    }
	]
});
