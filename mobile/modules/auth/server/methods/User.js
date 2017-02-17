Meteor.methods({
	registerUser: function(fields, fieldsTwo) {
		var dt = moment(fieldsTwo.aniversario, 'DD/MM/YYYY').tz('America/Sao_Paulo');
		var userObject = {
			username: fields.username,
			password: fields.password1,
			profile: {
				name: fieldsTwo.name,
				phone: fieldsTwo.phone,
				birth: dt.toDate(),
				birth_day: parseInt(dt.format('DD')),
				birth_month: parseInt(dt.format('MM')),
				birth_year: parseInt(dt.format('YYYY'))
			}
		};
		var id = Accounts.createUser(userObject);
		Accounts.addEmail(id, fieldsTwo.email, true);
		Roles.addUsersToRoles(id, ['associado', 'suspenso', 'novo']);
		return id;
	},
	usersFindByCPF: function(fields) {
		var user = Accounts.findUserByUsername(fields.username);
		if (user == undefined) return false;
		else return user;
	},
	usersChangePasswordWithCode: function(fields) {
		var user = Meteor.users.findOne(fields._id);
		if (fields.code == user.profile.recovery) {
			return Accounts.setPassword(fields._id, fields.password1);
		} else {
			return false;
		}
	}
});
