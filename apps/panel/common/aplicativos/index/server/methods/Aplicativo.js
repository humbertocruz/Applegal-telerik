Meteor.methods({
	checkApp:function(aplicativoId){
		if (Aplicativo.findOne(aplicativoId)) return true;
		else return false;
	},
	aplicativosUploadLogo:function(file,aplicativoId){
		file = new Meteor.Collection.ObjectID(file);
		return Aplicativo.update({_id:aplicativoId},{
			$set:{
				appLogo:file
			}
		});
	},
	addUserToAppForm:function(fields){
		var user = Accounts.findUserByUsername(fields.username);
		if (!user) return {msg:'Usuário não encontrado.',status:false};
		if (Roles.userIsInRole(user._id, 'admin')) return {msg:'Este usuário não pode ser adicionado.',status:false};
		if (Roles.getRolesForUser(user._id,fields.aplicativoId).length > 0) return {msg:'Este usuário já está no aplicativo.',status:false};
		Roles.addUsersToRoles(user._id,fields.tipo,fields.aplicativoId);
		return {msg:'Usuário inserido no aplicativo com sucesso.',status:true};
	},
	searchForManager:function(cpf) {

	},
	aplicativosForm: function(fields) {
		var user = Meteor.users.findOne(this.userId);
		fields.createdAt = moment().toDate();
		if (!fields._id) {
			// Grava aplicativo
			var appId = Aplicativo.insert(fields);
			// Se nao for usuario ADMIN
			if (!Roles.userIsInRole(this.userId,'admin')) {
				// Faz usuario atual MANAGER do aplicativo criado
				Roles.addUsersToRoles(this.userId, ['manager'], appId);
			}
			return appId;
		} else {
			fields.updatedAt = moment().toDate();
			fields.updatedBy = Meteor.userId();
			Aplicativo.update(fields._id, {
				$set: fields
			});
			return fields._id;
		}
	},
	aplicativosRemove: function(id) {
		if (!this.userId) return false;
		return Aplicativo.remove(id);
	}
});
