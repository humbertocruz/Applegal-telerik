Meteor.methods({
	usuariosAppForm:function(fields, aplicativoId){
		if (!Roles.userIsInRole(this.userId, 'admin') && !Roles.userIsInRole(this.userId, 'manager',aplicativoId)) return false;
		var dt = moment(fields.profile.birth, 'YYYY-MM-DD');
		var roles = fields.roles;
		delete fields.roles;
		fields.profile.birth = dt.toDate();
		fields.profile.birth_day = parseInt(dt.format('DD'));
		fields.profile.birth_month = parseInt(dt.format('MM'));
		fields.profile.birth_year = parseInt(dt.format('YYYY'));

		if (fields.id == undefined) {
			var id = Accounts.createUser(fields);
			Roles.setUserRoles(id, roles, aplicativoId);
			return id;
		} else {
			var user = Meteor.users.findOne(fields.id);
			var id = Meteor.users.update(fields.id, {
				$set: fields
			});
			Roles.setUserRoles(id, roles, aplicativoId);
			return id;
		}
	}
});
