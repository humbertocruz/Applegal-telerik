Meteor.publishComposite('oneChamado', function(id,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return this.ready();
	if (!this.userId) return this.ready();
	var authorized = false;

	if (Roles.userIsInRole(this.userId, ['admin'])) authorized = true;
	if (Roles.userIsInRole(this.userId, ['manager','chamados'], aplicativoId)) authorized = true;

	if (!authorized) return this.ready();
	return {
		find:function(){
			return Chamado.find({
				_id:id,
				aplicativoId:aplicativoId
			});
			console.log('ready chamados');
		},
		children:[
			{
				find:function(chamado){
					var mensagens = Mensagem.find({
						chamado_id:chamado._id,
						aplicativoId:aplicativoId
					});
					console.log('ready msgs');
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
Meteor.publish("allChamados", function(search,page,aplicativoId){
	if (typeof(aplicativoId) == 'undefined') return this.ready();
	if (!this.userId) return this.ready();
	var authorized = false;

	if (Roles.userIsInRole(this.userId, ['admin'])) authorized = true;
	if (Roles.userIsInRole(this.userId, ['manager','chamados'], aplicativoId)) authorized = true;

	if (!authorized) return this.ready();

	var chamados = Chamado.find({
		aplicativoId:aplicativoId
	});
	var associados = Meteor.users.find({
		_id:{
			$in:_.pluck(chamados.fetch(),'user_id')
		}
	});
	return [chamados,associados];
});
/*
publishComposite('allChamados', function(search,page,aplicativoId){

	if (typeof(aplicativoId) == 'undefined') return this.ready();
	if (!this.userId) return this.ready();
	var authorized = false;

	if (Roles.userIsInRole(this.userId, ['admin'])) authorized = true;
	if (Roles.userIsInRole(this.userId, ['manager','chamados'], aplicativoId)) authorized = true;

	if (!authorized) return this.ready();

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
				find:function(chamado){
					return Meteor.users.find({
						_id:chamado.user_id
					},{
						limit:1
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
*/
