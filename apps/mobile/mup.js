module.exports = {
  servers: {
    one: {
      host: 'm.applegal.com.br',
      username: 'root',
      // pem: '/Users/humberto/.ssh/id_rsa',
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'appLegalMobile',
    path: '.',
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://m.applegal.com.br',
      MONGO_URL: 'mongodb://10.132.62.239/applegal5',
      MAIL_URL:'smtp://applegal%40applegal.com.br:N32w7csfPU@mail.applegal.com.br:587',
      PORT: 4050
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
