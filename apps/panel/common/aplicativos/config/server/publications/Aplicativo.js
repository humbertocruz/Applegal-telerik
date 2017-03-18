Meteor.publishComposite("allAplicativos", function(page,pages,search){
	if (!page) page = 1;
	if (!pages) pages = 10;
	if (!search) search = {};
	// Apenas usuário logado
	if (!this.userId) return false;
	// Apenas para ADMIN
	// if (!Roles.userIsInRole(this.userId,'admin')) return false;
	return {
		find: function() {
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
				limit: pages,
				skip: (page - 1) * pages
			});
			return aplicativos;
		},
		children:[
			{
				find:function(app){
					return AplicativoPlugin.find({
						aplicativoId:app._id
					});
				}
			}
		]
	}
});
Meteor.publishComposite("oneAplicativo", function(aplicativoId){
	// Apenas usuário logado
	if (!this.userId) return false;
	// Apenas para ADMIN
	// if (!Roles.userIsInRole(this.userId,'admin')) return false;
	return {
		find: function() {
			var aplicativo = Aplicativo.find(aplicativoId);
			return aplicativo;
		},
		children:[
			{
				find:function(app){
					return AplicativoPlugin.find({
						aplicativoId:app._id
					});
				}
			}
		]
	}
});

Meteor.publish("AppCloudinary", function(aplicativoId){
	return AppCloudinary.find({aplicativoId:aplicativoId});
});
