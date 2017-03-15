/*
** Publicação automática de todos os plugins existentes
** Apenas para usuários logados com o perfil Admin
**
*/
Meteor.publishComposite('', function() {
	if (!this.userId) return false;
	if (!Roles.userIsInRole(this.userId,'admin')) return false;
	return {
		find: function() {
			Counts.publish(this, 'allPlugins', Plugin.find(), {
				noReady: true
			});
			var plugins = Plugin.find({}, {
				sort: {
					title: 1
				}
			});
			return plugins;
		}
	}
});
