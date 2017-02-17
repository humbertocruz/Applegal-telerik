Meteor.methods({
	profileForm:function(fields){
		var birth = moment(fields.birth).startOf('day');
		var user = {
			phone: fields.phone,
			name: fields.name,
			birth: birth.toDate(),
			birth_day: birth.format('DD'),
			birth_month: birth.format('MM'),
			birth_year: birth.format('YYYY')
		};
		_.each(fields.apps,function(app){
			if (fields.id == this.userId) {
				if (!_.contains(app.perm,'gerente')) {
					app.perm.push('gerente');
				}
			}
			if (!app.perm) {
				var roles = Meteor.user().roles;
				delete roles[app.app];
				Meteor.users.update(fields.id,{$set:{roles:roles}});
			} else {
				Roles.setUserRoles(fields.id, app.perm, app.app);
			}
		});
		return Meteor.users.update(fields.id,{$set:{profile:user}});
	}
});
