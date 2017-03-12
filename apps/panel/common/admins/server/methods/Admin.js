Meteor.methods({
	formAdmin:function(usuario) {
		var dt = moment(usuario.profile.birth, 'YYYY-MM-DD');
		usuario.profile.birth = dt.toDate();
		usuario.profile.birth_day = parseInt(dt.format('DD'));
		usuario.profile.birth_month = parseInt(dt.format('MM'));
		usuario.profile.birth_year = parseInt(dt.format('YYYY'));
		if (usuario._id == undefined) {
			var id = Accounts.createUser(usuario);
			Roles.setUserRoles(id, 'admin');
			return id;
		} else {
			return Meteor.users.update(usuario._id, {
				$set: usuario
			});
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
