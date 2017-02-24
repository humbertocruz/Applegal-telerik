Meteor.startup(function() {
	var appLegal = Aplicativo.findOne();
	if (!appLegal) {
		var admin = {
			username: '000.000.000-00',
			password: '123123',
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
		// InitDB
		var app = {
			"filiais": false,
			"logo": "/images/technotronics.png",
			"name": "Techno App",
			"domain":"",
			"mailFrom": "admin@applegal.com.br",
			"headerBackgroundColor":"blue",
			"sidebarBackgroundColor":"violet",
			"itemsPerPage":15,
			"createdAt":moment().toDate(),
			"appInfoId":"br.com.applegal.applegal",
			"privacidade":"<p>Pol&iacute;tica de Privacidade</p>\n<p>- O aplicativo poder&aacute; detectar o n&uacute;mero do celular em uso para controle de acesso de usu&aacute;rios</p>\n<p>- As informa&ccedil;&otilde;es do us&aacute;rios fornecidas no aplicativo n&atilde;o ser&atilde;o compartilhadas com terceiros com excess&ccedil;&atilde;o:</p>\n<p>- O preenchimento do Anivers&aacute;rio aparecer&aacute; para outros usu&aacute;rios</p>\n"
		};
		appId = Aplicativo.insert(app);
		Roles.addUsersToRoles(ida, ['admin']);
	}
	var modulos = Modulo.findOne();
	if (!modulos) {
		var modulos = [{
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
		_.each(modulos, function(mod){
			Modulo.insert(mod);
		});
	}
});
