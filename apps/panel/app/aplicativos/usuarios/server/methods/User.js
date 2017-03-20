Meteor.methods({
	removeUsuarioApp:function(userId,aplicativoId){
		var roles = Roles.getRolesForUser(userId, aplicativoId);
		return Roles.removeUsersFromRoles(userId,roles,aplicativoId);
	},
	addUserToAppForm:function(fields){
		var user = Accounts.findUserByEmail(fields.email);
		if (!user) return {msg:'Usuário não encontrado.',status:false};
		if (Roles.userIsInRole(user._id, 'admin')) return {msg:'Este usuário não pode ser adicionado.',status:false};
		if (Roles.getRolesForUser(user._id,fields.aplicativoId).length > 0) return {msg:'Este usuário já está no aplicativo.',status:false};
		Roles.addUsersToRoles(user._id,fields.tipo,fields.aplicativoId);
		return {msg:'Usuário inserido no aplicativo com sucesso.',status:true};
	},
	usuariosAppForm:function(fields, aplicativoId){
		if (!Roles.userIsInRole(this.userId, 'admin') && !Roles.userIsInRole(this.userId, 'manager',aplicativoId)) return false;
		var dt = moment(fields.profile.birth).startOf('day');
		var roles = fields.roles;
		delete fields.roles;
		fields.profile.birth = dt.toDate();
		fields.profile.birth_day = parseInt(dt.format('DD'));
		fields.profile.birth_month = parseInt(dt.format('MM'));
		fields.profile.birth_year = parseInt(dt.format('YYYY'));
		if (fields._id == undefined) {
			var id = Accounts.createUser(fields);
			Roles.setUserRoles(id, roles, aplicativoId);
			return id;
		} else {
			//var user = Meteor.users.findOne(fields._id);
			var id = Meteor.users.update(fields._id, {
				$set: fields
			});
			Roles.setUserRoles(fields._id, roles, aplicativoId);
			return id;
		}
	}
});
