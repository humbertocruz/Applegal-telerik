Meteor.publishComposite('allAdmins', function(page){
	// apenas usuários Admins
	if (!Roles.userIsInRole(this.userId,'admin')) return this.ready();

	if (!page) page = 1;

	return {
		find:function(){
			Counts.publish(this,'allAdmins', Roles.getUsersInRole('admin'));
			var admins = Roles.getUsersInRole('admin');
			return admins;
		}
	}
});
