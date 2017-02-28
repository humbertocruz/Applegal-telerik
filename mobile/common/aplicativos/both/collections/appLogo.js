appLogo = new FileCollection('logos', {
	resumable: true,
	//resumableIndexName: 'appL',
	http: [
		{
			method: 'get',
			path: '/md5/:md5',
			lookup: function (params, query) {
				return {
					'md5': params.md5
				};
			},
			handler: function (req, res, next) {
				// if (req.headers && req.headers.origin) {
				res.setHeader('Access-Control-Allow-Origin', '*'); // For Cordova
				res.setHeader('Access-Control-Allow-Credentials', true);
				//  }
				next();
			}
		},
		{
			method: 'options',  // Enable an OPTIONS endpoint (for CORS)
      path: '/_resumable',  // this will be at route "/gridfs/myFiles/:md5"
      lookup: function (params, query) {  // uses express style url param
				return {
					'md5': params.md5
				};
      },
      handler: function (req, res, next) {  // Custom express.js handler for OPTIONS
         res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': req.headers.origin,  // For Cordova
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'x-auth-token, user-agent',
            'Access-Control-Allow-Methods': 'GET, PUT'
         });
         res.end();
         return;
      }
    }
	]
});
