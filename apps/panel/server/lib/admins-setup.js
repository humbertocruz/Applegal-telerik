Meteor.startup(function() {
	var userAdm = Accounts.findUserByEmail('admin@applegal.com.br');
	if (!userAdm) {
		var admin = {
			username: 'admin',
			password: 'WsmJLc2017',
			email: 'admin@applegal.com.br',
			profile: {
				name: 'Administrador',
				birth: moment('2017-02-01').toDate(),
				birth_day: 1,
				birth_month: 2,
				birth_year: 2017,
				active: true
			}
		};
		var ida = Accounts.createUser(admin);
		Accounts.addEmail(ida, 'admin@applegal.com.br', true);
		Roles.addUsersToRoles(ida,['admin']);
	} else {
		var ida = userAdm._id;
		Roles.addUsersToRoles(ida,['admin']);
	}
	var plugins = Plugin.findOne();
	if (!plugins) {
		var plugins = [{
			"admin": true,
			"mobile": true,
			"path": "noticias",
			"title": "Notícias",
			"route": "noticiasRoute",
			"icon": "newspaper"
		},
		{
			"admin": false,
			"mobile": true,
			"path": "aniversariantes",
			"title": "Aniversariantes",
			"route": "aniversariantesRoute",
			"icon": "birthday"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "galerias",
			"title": "Galerias",
			"route": "galeriasRoute",
			"icon": "image"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "enquetes",
			"title": "Enquetes",
			"route": "enquetesRoute",
			"icon": "wizard"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "escalas",
			"title": "Escalas",
			"route": "escalasRoute",
			"icon": "file text outline"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "documentos",
			"title": "Documentos",
			"route": "documentosRoute",
			"icon": "file word outline"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "ensino",
			"title": "Ensino",
			"route": "ensinoRoute",
			"icon": "student"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "chamados",
			"title": "Fale Conosco",
			"route": "chamadosRoute",
			"icon": "comments outline"
		},
		{
			"admin": true,
			"mobile": true,
			"path": "filiais",
			"title": "Filiais",
			"route": "filiaisRoute",
			"icon": "building"
		}];
		_.each(plugins, function(mod){
			Plugin.insert(mod);
		});
	}
});
