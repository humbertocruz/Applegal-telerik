module.exports = {
  servers: {
    one: {
      host: 'panel.applegal.com.br',
      username: 'root',
      // password:
      // or leave blank for authenticate from ssh-agent
    },
    two: {
      host: '174.138.73.135',
      username: 'root',
      pem: '/Users/humberto/.ssh/id_rsa'
    }
  },

  meteor: {
    name: 'appLegal',
    path: '.',
    servers: {
      //one: {},
			two: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://panel.applegal.com.br',
      MONGO_URL: 'mongodb://10.132.62.239/applegal_dev',
      MAIL_URL:'smtp://admin%40applegal.com.br:N32w7csfPU@mail.applegal.com.br:587',
      PORT: 4000
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
