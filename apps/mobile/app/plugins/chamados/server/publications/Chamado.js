Meteor.publishComposite('appChamados',function(aplicativoId){
	return {
		find:function(){
			var chamados = Chamado.find({
				user_id:this.userId,
				aplicativoId:aplicativoId,
				close:false
			});
			return chamados;
		},
		children:[
			{
				find:function(chamado){
					return Mensagem.find({chamado_id:chamado._id});
				},
				children:[
					{
						find:function(mensagem){
							return Meteor.users.find(mensagem.user_id);
						}
					}
				]
			}
		]
	}
});
