/*
** Publicação automática de todos os plugins existentes
** Apenas para usuários logados com o perfil Admin
**
*/
Meteor.publishComposite('allOptions', function() {
	if (!this.userId) return false;
	if (!Roles.userIsInRole(this.userId,'admin')) return false;
	return {
		find: function() {
			Counts.publish(this, 'allPptions', Option.find(), {
				noReady: true
			});
			var options = Option.find({}, {
				sort: {
					title: 1
				}
			});
			return options;
		}
	}
});
