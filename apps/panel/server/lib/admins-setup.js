Meteor.startup(function() {
	var userAdm = Accounts.findUserByEmail('admin@applegal.com.br');
	if (!userAdm) {
		var admin = {
			username: 'admin',
			password: 'WcmJLc2017',
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
	} else {
		var ida = userAdm._id;
	}
	var appLegal = Aplicativo.findOne();
	if (!appLegal) {	// InitDB
		var app = {
			"name" : "Techno App",
			"domain" : "",
			"mailFrom" : "admin@applegal.com.br",
			"headerBackgroundColor" : "blue",
			"sidebarBackgroundColor" : "violet",
			"itemsPerPage" : "25",
			"createdAt" : moment().toDate(),
			"createdBy" : ida,
			"appInfoId" : "br.com.applegal.applegal",
			"headersOpacity" : ".5",
			"theme" : "lighten",
			"iconQuantity" : "three",
			"iconColor" : "blue",
			"iconOpacity" : ".5",
			"iconType" : "circular",
			"iconAnimation" : "drop",
			"iconDuration" : "300",
			"iconInterval" : "150",
			"loginType" : "username",
			"loginTitle" : "CPF",
			"loginTitleMask" : "999.999.999-99",
			"loginTitleValidation" : "cpf",
			"loginTitleKeyboard" : "tel",
			"loginPasswordKeyboard" : "tel",
			"privacy" : "<p>Pol&iacute;tica de Privacidade</p>\n<p>- O aplicativo poder&aacute; detectar o n&uacute;mero do celular em uso para controle de acesso de usu&aacute;rios</p>\n<p>- As informa&ccedil;&otilde;es do us&aacute;rios fornecidas no aplicativo n&atilde;o ser&atilde;o compartilhadas com terceiros com excess&ccedil;&atilde;o:</p>\n<p>- O preenchimento do Anivers&aacute;rio aparecer&aacute; para outros usu&aacute;rios</p>\n",
			"appBg" : "background",
			"appLogo" : "applegal"
		};
		appId = Aplicativo.insert(app);
		Roles.addUsersToRoles(ida, ['admin']);
		var cloudApp = {
			aplicativoId: appId,
			api_key: "736491884223886",
			api_secret: "tF11P67FRg9jT-TB9PerfMZq7Y8",
			cloud_name:"technoapp"
		};
		cloudId = AppCloudinary.insert(cloudApp);
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
