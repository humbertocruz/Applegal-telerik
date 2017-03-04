Meteor.methods({
	formAdmin:function(usuario) {
		if (!Roles.userIsInRole('admin')) return false;

		var dt = moment(usuario.profile.birth, 'YYYY-MM-DD');
		usuario.profile.birth = dt.toDate();
		usuario.profile.birth_day = parseInt(dt.format('DD'));
		usuario.profile.birth_month = parseInt(dt.format('MM'));
		usuario.profile.birth_year = parseInt(dt.format('YYYY'));
		if (usuario.id == undefined) {
			var id = Accounts.createUser(usuario);
			Roles.setUserRoles(id, 'admin');
			return id;
		} else {
			var user = Meteor.users.findOne(usuario.id);
			Meteor.users.update(usuario.id, {
				$set: usuario
			});
			return true;
		}
	},
	removeAdmin:function(id) {
		if (!Roles.userIsInRole('admin')) return false;
		Meteor.users.remove(id);
		return true;
	},
	findUserByEmail:function(email) {
		if (!Roles.userIsInRole('admin')) return false;
		return Accounts.findUserByEmail(email);
	},
})
