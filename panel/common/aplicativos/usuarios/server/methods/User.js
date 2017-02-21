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
		if (fields._id == undefined) {
			var id = Accounts.createUser(fields);
			Roles.setUserRoles(fields._id, roles, aplicativoId);
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
