/*
** Permissões para o plugin Cloudinary do Meteor
** Apenas Admin tem permissão para inserir, atualizar ou remover Arquivos
*/
Meteor.startup(function(){
	console.log('Configurando Permissões de Arquivos Públicos Cloudinary');
	PubGaleria.allow({
		insert: function(){
			// Admin podem inserir em qualquer App
			if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
			return false;
		},
		update: function(){
			// Admin pode atualizar em qualquer App
			if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
			return false;
		},
		remove: function(){
			// Admin pode remover em qualquer App
			if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
			return false;
		}
	});
});
