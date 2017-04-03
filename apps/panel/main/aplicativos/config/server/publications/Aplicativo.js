//Meteor.publish("allAplicativos", function(page,pages,search){
Meteor.publish("allAplicativos", function(params){

	// Segurança - Apenas ADMINS
	if (!securityCheck(this.userId,null,null)) return this.ready();

	// Verifica os parametros e criar os não enviados com valores padrão
	if (!params) params = {};
	if (!params.page) params.page = 1;
	if (!params.pages) params.pages = 15;
	if (!params.search) params.search = {};

	if (!Roles.userIsInRole(this.userId,'admin')) {
		var groups = Roles.getGroupsForUser(this.userId, 'manager');
		params.search._id = {
			$in:groups
		};
	}
	Counts.publish(this, 'allAplicativos', Aplicativo.find(params.earch), {
		noReady: true
	});
	var aplicativos = Aplicativo.find(params.search, {
		sort: {
			'info.name': 1
		},
		sort: {
			name:1
		},
		limit: params.pages,
		skip: (params.page - 1) * params.pages
	});
	var plugins = AplicativoPlugin.find({
		aplicativoId:{
			$in:_.pluck(aplicativos.fetch(),'_id')
		}
	});

	if (serverShowLogsVar) {
		console.log(aplicativos.fetch());
		console.log(plugins.fetch());
	}
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
