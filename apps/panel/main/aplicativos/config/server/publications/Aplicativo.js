Meteor.publish("allAplicativos", function(page,pages,search){
	if (!securityCheck(this.userId,null,null)) return this.ready();

	if (!page) page = 1;
	if (!pages) pages = 15;
	if (!search) search = {};

	if (!Roles.userIsInRole(this.userId,'admin')) {
		var groups = Roles.getGroupsForUser(this.userId, 'manager');
		search._id = {
			$in:groups
		};
	}
	Counts.publish(this, 'allAplicativos', Aplicativo.find(search), {
		noReady: true
	});
	var aplicativos = Aplicativo.find(search, {
		sort: {
			'info.name': 1
		},
		sort: {
			name:1
		},
		limit: pages,
		skip: (page - 1) * pages
	});
	var plugins = AplicativoPlugin.find({
		aplicativoId:{
			$in:_.pluck(aplicativos.fetch(),'_id')
		}
	});

	return [aplicativos,plugins];
});

Meteor.publish("oneAplicativo", function(aplicativoId){
	if (!securityCheck(this.userId,null,null)) return this.ready();

	var aplicativo = Aplicativo.find(aplicativoId);
	var plugins = AplicativoPlugin.find({
		aplicativoId:aplicativo.fetch()[0]._id
	});
	return [aplicativo,plugins];
});

Meteor.publish("AppCloudinary", function(aplicativoId){
	// Apenas usuário logado
	if (!this.userId) return false;
	return AppCloudinary.find({aplicativoId:aplicativoId});
});
