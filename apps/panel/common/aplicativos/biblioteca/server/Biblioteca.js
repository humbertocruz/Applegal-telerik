/*
** Permissões para o plugin Cloudinary do Meteor
** Apenas Admin, Gerentes e Builders tem permissão para inserir, atualizar ou remover Arquivos
** Dentro de um "autorun" para executar novamente sempre que a variavel aplicativoIdServerVar alterar
*/
Tracker.autorun(function(){
	console.log('Configurando Permissões de Arquivos Cloudinary');
	Biblioteca.allow({
		insert: function(){
			// Admin podem inserir em qualquer App
			if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
			// Gerente só pode inserir em Apps próprios
			if (Roles.userIsInRole(Meteor.userId(), 'manager', aplicativoIdServerVar)) return true;
			// Builder só pode inserir em Apps próprios
			if (Roles.userIsInRole(Meteor.userId(), 'builder', aplicativoIdServerVar)) return true;
			return false;
		},
		update: function(){
			// Admin pode atualizar em qualquer App
			if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
			// Gerentes só podem atualizar em Apps próprios
			if (Roles.userIsInRole(Meteor.userId(), 'manager', aplicativoIdServerVar)) return true;
			// Builder só pode atualizar em Apps próprios
			if (Roles.userIsInRole(Meteor.userId(), 'builder', aplicativoIdServerVar)) return true;
			return false;
		},
		remove: function(){
			// Admin pode remover em qualquer App
			if (Roles.userIsInRole(Meteor.userId(), 'admin')) return true;
			// Gerente só pode remover em Apps próprios
			if (Roles.userIsInRole(Meteor.userId(), 'manager', aplicativoIdServerVar)) return true;
			// Builder só pode remover em Apps próprios
			if (Roles.userIsInRole(Meteor.userId(), 'builder', aplicativoIdServerVar)) return true;
			return false;
		}
	});
});
