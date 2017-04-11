Template.registerHelper("appInfo", function(){
	var appInfo = Aplicativo.findOne(FlowRouter.getParam('aplicativoId'));
	if (appInfo) return appInfo;
});

Template.registerHelper("appByDomain", function(){
	// encontra o app com o dominio acessado
	var appByDomain = Aplicativo.findOne({
		'info.domain': location.protocol+'//'+location.hostname
	});
	// Se existe o dominio retorno o logotipo
	if (appByDomain) {
		return {
			name:appByDomain.info.name,
			public_id:appByDomain.logotype.public_id,
			cloud_name:appByDomain.logotype.cloud_name
		};
	} else { // se nao existe, enviar o logotipo AppLega
		return {
			name:'App Legal',
			public_id:'AppLegal',
			cloud_name:'technoapp'
		};
	}
});
