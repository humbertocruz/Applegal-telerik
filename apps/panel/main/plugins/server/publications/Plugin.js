/*
** Publicação automática de todos os plugins existentes
** Apenas para usuários logados com o perfil Admin
**
*/
Meteor.publish('', function() {

	//if (!securityCheck(this.userId,null,null)) return this.ready();

	Counts.publish(this, 'allPlugins', Plugin.find(), {
		noReady: true
	});
	var plugins = Plugin.find({}, {
		sort: {
			title: 1
		}
	});
	return [plugins];

});
