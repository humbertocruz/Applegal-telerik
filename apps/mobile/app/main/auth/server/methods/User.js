Meteor.methods({
	registerCheckEmail:function(fields){
		var user = Accounts.findUserByEmail(fields.email);
		if (user) return true; else return false;
	},
	registerCheckUsername:function(username){
		var user = Accounts.findUserByUsername(username);
		if (user) return true; else return false;
	},
	registerUser: function(fields, fieldsTwo, aplicativoId) {
		var dt = moment(fieldsTwo.birthday).tz('America/Sao_Paulo');
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
		var app = Aplicativo.findOne(aplicativoId);
		Accounts.addEmail(id, fieldsTwo.email, true);
		Roles.addUsersToRoles(id, [app.login.roleRegister], aplicativoId);
		return id;
	},
	usersFindByUsername: function(fields) {
		var user = Accounts.findUserByUsername(fields.username);
		if (user == undefined) return false;
		else return user;
	},
	usersFindByEmail: function(fields) {
		var user = Accounts.findUserByEmail(fields.email);
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
