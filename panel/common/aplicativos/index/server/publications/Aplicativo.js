Meteor.publishComposite("allAplicativos", function(search,page){
	// Apenas usuário logado
	if (!this.userId) return false;
	// Apenas para ADMIN
	if (!Roles.userIsInRole(this.userId,'admin')) return false;
	return {
		find: function() {
			if (!page) page = 1;
			if (!search) search = {};
			var pages = 10;
			if (Roles.userIsInRole(this.userId,'admin')) {
			} else {
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
					name: 1
				},
				limit: pages,
				skip: (page - 1) * pages
			});
			return aplicativos;
		},
		children:[
			{
				find:function(app){
					return AplicativoModulo.find({
						aplicativoId:app._id
					});
				}
			}
		]
	}
});
Meteor.publish("oneAplicativo", function(id){
	// Apenas usuário logado
	if (!this.userId) return false;
	// Apenas para ADMIN
	if (!Roles.userIsInRole(this.userId,'admin')) return false;
	var aplicativo = Aplicativo.find(id);
	return aplicativo;
});
