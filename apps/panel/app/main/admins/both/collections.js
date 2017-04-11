Meteor.users.helpers({
	apps:function(){
		// obter groups ( aplicativos ) do usuario logado
		var groups = Roles.getGroupsForUser(this._id);
		return Aplicativo.find({
			_id:{
				$in:groups
			}
		}).fetch();
	}
});
