Meteor.publishComposite('allAdmins', function(search){
	// apenas usuários logados
	if (!this.userId) return false;

	// se não tiver parametros de busca
	if (!search) search = {};

	return {
		find:function(){
			Counts.publish(this,'allAdmins', Roles.getUsersInRole('admin'));
			var admins = Roles.getUsersInRole('admin');
			return admins;
		}
	}
});
