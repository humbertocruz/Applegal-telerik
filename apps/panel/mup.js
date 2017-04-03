module.exports = {
	servers: {
		one: {
			host: 'panel.applegal.com.br',
			username: 'root',
			pem: '/home/humberto/.ssh/id_rsa',
			// password:
			// or leave blank for authenticate from ssh-agent
		}
	},

	meteor: {
		name: 'appLegal',
		path: '.',
		servers: {
			one: {},
		},
		buildOptions: {
			serverOnly: true,
		},
		env: {
			ROOT_URL: 'https://panel.applegal.com.br',
			MONGO_URL: 'mongodb://applegal:flaiwoeijoa90293oiv23kijsdh093d@mongo.applegal.com.br/applegal?authSource=admin',
			MAIL_URL: 'smtp://postmaster%40mg.applegal.com.br:afdef17f2edd9ec26c2fc070b2976605@smtp.mailgun.org:587',
			PORT: 4000,
			CLUSTER_WORKERS_COUNT: 'auto',
			KADIRA_APP_ID: 'pE2aTg4fw5uqeTWYm',
			KADIRA_APP_SECRET: 'fa3c304a-3cda-4a5a-aaae-ca5a81e7ccf7'
		},

		// change to 'kadirahq/meteord' if your app is not using Meteor 1.4
		docker: {
			image: 'abernix/meteord:base',
		},
		deployCheckWaitTime: 60,

		// Show progress bar while uploading bundle to server
		// You might need to disable it on CI servers
		enableUploadProgressBar: true
	},

	//mongo: {
	//  oplog: true,
	//  port: 27017,
	//  version: '3.4.1',
	//  servers: {
	//    one: {},
	//  },
	//},
};
