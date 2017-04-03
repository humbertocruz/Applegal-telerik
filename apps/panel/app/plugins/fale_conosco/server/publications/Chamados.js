Meteor.publish("oneChamado", function(chamadoId,aplicativoId){
	// Check de seguranca de permissões
	if (!securityCheck(['manager','chamados'])) return this.ready();
	// Chamados
	var chamados = Chamado.find({
		_id:chamadoId,
		aplicativoId:aplicativoId
	});
	// Usuário de cada Chamado
	var associados = Meteor.users.find({
		_id:{
			$in:_.pluck(chamados.fetch(),'user_id')
		}
	});
	// Mensagens do Chamado
	var mensagens = Mensagem.find({
		chamado_id:{
			$in:_.pluck(chamados.fetch(),'_id')
		},
		aplicativoId:aplicativoId
	});
	return [chamados,associados,mensagens];
});

/*
** publishCompoosite está dando um problema de gerar o ready() no template antes de fazer o publish completo
** como é possivel enviar varias datasources dentro de um array, nao é preciso usar o Publish Composite
**
*/
Meteor.publish("allChamados", function(search,page,aplicativoId){
	// Check de seguranca de permissões
	if (!securityCheck(['manager','chamados'])) return this.ready();
	// Chamados
	var chamados = Chamado.find({
		aplicativoId:aplicativoId
	});
	// Usuário de cada Chamado
	var associados = Meteor.users.find({
		_id:{
			$in:_.pluck(chamados.fetch(),'user_id')
		}
	});
	return [chamados,associados];
});
