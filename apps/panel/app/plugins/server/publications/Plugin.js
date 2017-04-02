/*
** Publicação automática de todos os plugins existentes
** Apenas para usuários logados com o perfil Admin
**
*/
Meteor.publishComposite('', function() {
	if (!this.userId) return this.ready();
	if (!Roles.userIsInRole(this.userId,'admin')) return this.ready();
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
