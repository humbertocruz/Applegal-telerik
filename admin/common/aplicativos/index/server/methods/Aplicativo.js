Meteor.methods({
	addUserToAppForm:function(fields){
		var user = Accounts.findUserByUsername(fields.username);
		if (Roles.userIsInRole(user._id, 'admin')) return {msg:'Este usuário não pode ser adicionado.',status:false};
		if (Roles.getRolesForUser(user._id,fields.aplicativoId).length > 0) return {msg:'Este usuário já está no aplicativo.',status:false};
		Roles.addUsersToRoles(user._id,fields.tipo,fields.aplicativoId);
		return {msg:'Usuário inserido no aplicativo com sucesso.',status:true};
	},
	searchForGerente:function(cpf) {

	},
	aplicativosForm: function(fields) {
		var user = Meteor.users.findOne(this.userId);
		if (!fields._id) {
			// Grava aplicativo
			var appId = Aplicativo.insert(fields);
			// Se nao for usuario ADMIN
			if (!Roles.userIsInRole(this.userId,'admin')) {
				// Faz usuario atual GERENTE do aplicativo criado
				Roles.addUsersToRoles(this.userId, ['gerente'], appId);
			}
			var fs = require('fs');
			// Cria diretorio do aplicativo
			var dir = '/upload/'+appId
			try {
				fs.mkdirSync(dir);
			} catch(e) {
				console.log(e);
			}
			return appId;
		} else {
			return Aplicativo.update(fields._id, {
				$set: fields
			});
		}
	},
	aplicativosRemove: function(id) {
		if (!this.userId) return false;
		return Aplicativo.remove(id);
	}
});
