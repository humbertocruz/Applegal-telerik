Meteor.startup(function() {
	var appLegal = Aplicativo.findOne();
	if (!appLegal) {
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
		// InitDB
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
			"privacy" : "<p>Pol&iacute;tica de Privacidade</p>\n<p>- O aplicativo poder&aacute; detectar o n&uacute;mero do celular em uso para controle de acesso de usu&aacute;rios</p>\n<p>- As informa&ccedil;&otilde;es do us&aacute;rios fornecidas no aplicativo n&atilde;o ser&atilde;o compartilhadas com terceiros com excess&ccedil;&atilde;o:</p>\n<p>- O preenchimento do Anivers&aacute;rio aparecer&aacute; para outros usu&aacute;rios</p>\n<p>- O aplicativo detecta a posi&ccedil;&atilde;o atual do usu&aacute;rio via GPS para posicionamento das informa&ccedil;&otilde;es mas n&atilde;o salva essa informa&ccedil;&atilde;o</p>",
			"appBg" : "technoapp-background",
			"appLogo" : "technoapp-logo"
		};
		appId = Aplicativo.insert(app);
		Roles.addUsersToRoles(ida, ['admin']);
		var cloudApp = {
			aplicativoId: appId,
			api_key: "682511396465386",
			api_secret: "DGYelhLmboXBQ2MvRlUI49kKU1o",
			cloud_name:"technotronics"
		};
		cloudId = AppCloudinary.insert(cloudApp);
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
