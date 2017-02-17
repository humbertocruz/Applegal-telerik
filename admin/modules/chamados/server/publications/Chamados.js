Meteor.publishComposite('oneChamado', function(id,aplicativoId){
	if (typeof(DomainAppVar) == 'undefined') return false;
	return {
		find:function(){
			var chamado = Chamado.find({
				_id:id,
				aplicativoId:aplicativoId
			});
			return chamado;
		},
		children:[
			{
				find:function(chamado){
					var mensagens = Mensagem.find({
						chamado_id:chamado._id,
						aplicativoId:aplicativoId
					});
					return mensagens;
				},
				children:[
					{
						find:function(mensagem){
							return Meteor.users.find({
								_id:mensagem.userId
							});
						}
					}
				]
			}
		]
	}
});
Meteor.publishComposite('allChamados', function(search,page,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return false;
	return {
		find:function(){
			if (!search) search = {};
			search.aplicativoId = aplicativoId
			Counts.publish(this,'allChamados',Chamado.find(search));
			var chamados = Chamado.find(search);
			return chamados;
		},
		children:[
			{
				find:function(conversa){
					return Meteor.users.find({
						_id:conversa.user_id
					});
				}
			},
			{
				find:function(chamado){
					return Mensagem.find({
						chamado_id:chamado._id,
						aplicativoId
					});
				}
			}
		]
	}
});
